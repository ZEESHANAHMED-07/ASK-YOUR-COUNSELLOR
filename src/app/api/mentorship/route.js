import { db } from "../../config/firebaseConfig";
import { collection, collectionGroup, getDocs, query, where, addDoc, orderBy, limit, doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

const allSlots = [
  "10:00 - 10:30 AM",
  "11:00 - 11:30 AM",
  "12:00 - 12:30 PM",
  "2:00 - 2:30 PM",
  "3:00 - 3:30 PM",
];

// GET — user bookings or availability for a date
export async function GET(req) {
  try {
    const { searchParams } = req.nextUrl;
    const userId = searchParams.get("userId");
    const date = searchParams.get("date");

    // If a userId is provided, return that user's bookings
    if (userId) {
      const userBookingsRef = collection(db, "users", userId, "bookings");
      const snap = await getDocs(query(userBookingsRef, orderBy("date", "desc"), limit(20)));
      const bookings = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      return NextResponse.json({ userId, bookings });
    }

    // Otherwise, availability for a date across all users
    if (!date) {
      return NextResponse.json({ error: "Date required" }, { status: 400 });
    }

    let bookedSlots = [];
    try {
      const qAll = query(collectionGroup(db, "bookings"), where("date", "==", date));
      const snapshot = await getDocs(qAll);
      bookedSlots = snapshot.docs.map((doc) => doc.data().slot);
    } catch (err) {
      // Fallback if collection group index is missing: scan each user's subcollection
      if (err?.code === 'failed-precondition') {
        const usersSnap = await getDocs(collection(db, "users"));
        const slotsSet = new Set();
        for (const u of usersSnap.docs) {
          const subSnap = await getDocs(query(collection(db, "users", u.id, "bookings"), where("date", "==", date)));
          for (const d of subSnap.docs) {
            const s = d.data()?.slot;
            if (s) slotsSet.add(s);
          }
        }
        bookedSlots = Array.from(slotsSet);
      } else {
        throw err;
      }
    }

    const slots = allSlots.map((slot) => ({
      time: slot,
      available: !bookedSlots.includes(slot),
    }));

    return NextResponse.json({ date, slots });
  } catch (error) {
    console.error("GET /api/mentorship error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH — update or cancel a booking
export async function PATCH(req) {
  try {
    const { id, userId, date, slot, status } = await req.json();
    if (!id || !userId) {
      return NextResponse.json({ error: "id and userId are required" }, { status: 400 });
    }

    const update = {};
    if (typeof status === "string") update.status = status;
    if (typeof date === "string" && date) update.date = date;
    if (typeof slot === "string" && slot) {
      if (!allSlots.includes(slot)) return NextResponse.json({ error: "Invalid slot" }, { status: 400 });
      update.slot = slot;
    }
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const ref = doc(db, "users", userId, "bookings", id);
    await updateDoc(ref, update);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/mentorship error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — book a slot
export async function POST(req) {
  try {
    const { date, slot, user } = await req.json();
    if (!date || !slot || !user) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // Ensure the slot is one of the allowed slots
    if (!allSlots.includes(slot)) {
      return NextResponse.json({ error: "Invalid slot" }, { status: 400 });
    }

    // Ensure user has an id
    const userId = user?.id || user?.uid;
    if (!userId) {
      return NextResponse.json({ error: "Missing user.id" }, { status: 400 });
    }

    // Check global conflicts across all users via collectionGroup
    const qConflict = query(
      collectionGroup(db, "bookings"),
      where("date", "==", date),
      where("slot", "==", slot)
    );
    let snapshot;
    try {
      snapshot = await getDocs(qConflict);
    } catch (err) {
      if (err?.code === 'failed-precondition') {
        // Fallback: scan users subcollections without collectionGroup index
        const usersSnap = await getDocs(collection(db, "users"));
        let conflict = false;
        for (const u of usersSnap.docs) {
          const subSnap = await getDocs(query(collection(db, "users", u.id, "bookings"), where("date", "==", date)));
          if (subSnap.docs.some((d) => d.data()?.slot === slot)) {
            conflict = true;
            break;
          }
        }
        if (conflict) {
          return NextResponse.json({ error: "Slot already booked!" }, { status: 400 });
        }
      } else {
        throw err;
      }
    }

    if (snapshot && !snapshot.empty) {
      return NextResponse.json({ error: "Slot already booked!" }, { status: 400 });
    }

    // Store booking under the user's subcollection
    const userBookingsRef = collection(db, "users", userId, "bookings");
    await addDoc(userBookingsRef, { date, slot, user });

    // Fire-and-forget email notification to admin using Resend HTTP API
    try {
      const apiKey = process.env.RESEND_API_KEY;
      const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
      if (apiKey) {
        const subject = `New mentorship booking: ${date} - ${slot}`;
        const text = [
          `A new mentorship slot has been booked.`,
          '',
          `Date: ${date}`,
          `Slot: ${slot}`,
          `User ID: ${user?.id || 'N/A'}`,
          `User Name: ${user?.name || 'N/A'}`,
          `User Email: ${user?.email || 'N/A'}`,
          `Timestamp: ${new Date().toISOString()}`,
        ].join('\n');

        // Avoid blocking the response; do not await excessively
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from,
            to: 'soumo2020.saha@gmail.com',
            subject,
            text,
          }),
          cache: 'no-store',
        }).catch(() => {});
      } else {
        console.warn('[Mentorship] RESEND_API_KEY not set; skipping email notify');
      }
    } catch (e) {
      console.warn('[Mentorship] Failed to send booking email', e);
    }

    return NextResponse.json({ success: true, message: "Slot booked successfully!" });
  } catch (error) {
    console.error("POST /api/mentorship error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
