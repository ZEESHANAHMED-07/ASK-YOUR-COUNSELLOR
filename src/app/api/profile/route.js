import { NextResponse } from "next/server";
import { db, firebaseConfig } from "../../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function verifyIdToken(idToken) {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const u = Array.isArray(data.users) && data.users.length > 0 ? data.users[0] : null;
    return u || null;
  } catch (_) {
    return null;
  }
}

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const u = await verifyIdToken(token);
    if (!u?.localId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const uid = u.localId;
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    const base = {
      uid,
      displayName: u.displayName || "",
      email: u.email || "",
      photoURL: u.photoUrl || "",
      about: "",
      location: "",
      website: "",
    };
    const profile = snap.exists() ? { ...base, ...snap.data() } : base;
    return NextResponse.json({ profile });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const u = await verifyIdToken(token);
    if (!u?.localId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const uid = u.localId;
    const body = await req.json().catch(() => ({}));
    const allowed = ["displayName", "about", "location", "website"];
    const update = Object.fromEntries(
      Object.entries(body || {}).filter(([k, v]) => allowed.includes(k) && typeof v !== "undefined")
    );
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: "No valid fields" }, { status: 400 });
    }

    const ref = doc(db, "users", uid);
    await setDoc(ref, update, { merge: true });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}