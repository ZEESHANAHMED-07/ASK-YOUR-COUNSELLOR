import { db } from "../../config/firebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

const allSlots = [
  "10:00 - 10:30 AM",
  "11:00 - 11:30 AM",
  "12:00 - 12:30 PM",
  "2:00 - 2:30 PM",
  "3:00 - 3:30 PM",
];

// GET — available slots for a given date
export async function GET(req) {
  try {
    const date = req.nextUrl.searchParams.get("date");
    if (!date) {
      return NextResponse.json({ error: "Date required" }, { status: 400 });
    }

    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("date", "==", date));
    const snapshot = await getDocs(q);
    const bookedSlots = snapshot.docs.map((doc) => doc.data().slot);

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

    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("date", "==", date),
      where("slot", "==", slot)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return NextResponse.json({ error: "Slot already booked!" }, { status: 400 });
    }

    await addDoc(bookingsRef, { date, slot, user });

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
