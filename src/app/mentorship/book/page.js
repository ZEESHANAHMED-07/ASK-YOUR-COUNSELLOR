// src/app/mentorship/book/page.js
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import Button from "../../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/Card";
import { auth } from "../../config/firebaseConfig";

export default function BookMentorPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]); // [{time, available}]
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");
  const todayStr = new Date().toISOString().slice(0, 10);
  // Track authenticated user (component scope)
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);
  const next30Days = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    return { iso, label };
  });

  const fetchAvailability = async (d) => {
    try {
      setLoading(true);
      setMessage("");
      const res = await fetch(`/api/mentorship?date=${encodeURIComponent(d)}`);
      if (!res.ok) throw new Error("Failed to fetch availability");
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (e) {
      setMessage("Could not load availability. Please try again.");
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const onBook = async (slot) => {
    try {
      setBooking(true);
      setMessage("");
      const doBooking = async () => {
        const res = await fetch("/api/mentorship", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            slot: slot.time || slot,
            // Send real authenticated user info if available
            user: currentUser
              ? {
                  id: currentUser.uid,
                  name: currentUser.displayName || currentUser.email || "User",
                  email: currentUser.email || null,
                }
              : { id: "guest", name: "Guest" },
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Booking failed");
        }
        return data;
      };

      await toast.promise(doBooking(), {
        loading: "Booking...",
        success: "Slot booked successfully!",
        error: (e) => e.message || "Booking failed",
      });

      setMessage("✅ Slot booked successfully!");
      fetchAvailability(date);
    } catch (e) {
      setMessage(`❌ ${e.message}`);
    } finally {
      setBooking(false);
    }
  };

  const confirmBook = (slot) => {
    const id = toast.custom(
      (t) => (
        <div className="w-[320px] rounded-md border bg-white shadow-lg p-4">
          <div className="text-sm font-medium">Confirm booking</div>
          <div className="mt-1 text-sm text-muted-foreground">
            Date: <span className="font-medium">{date}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Slot: <span className="font-medium">{slot.time}</span>
          </div>
          <div className="mt-3 flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.dismiss(t.id)}
              disabled={booking}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={async () => {
                toast.dismiss(t.id);
                await onBook(slot);
              }}
              disabled={booking}
            >
              Confirm
            </Button>
          </div>
        </div>
      ),
      { id: `confirm-${slot.time}-${date}`, position: "bottom-right", duration: 5000 }
    );
    return id;
  };

  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Book a Mentor</h1>
      <p className="text-muted-foreground mb-8">Pick a date and choose one of the 5 available time slots.</p>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Date</CardTitle>
          <CardDescription>Check availability and book your session</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="border rounded-md px-3 py-2 text-sm"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button onClick={() => fetchAvailability(date)} variant="secondary" disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {/* Pick a specific future day (next 30 days) */}
          <div className="mt-4">
            <div className="mb-2 text-xs text-muted-foreground">Pick a specific day</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
              {next30Days.map(({ iso, label }) => (
                <Button
                  key={iso}
                  size="sm"
                  variant={date === iso ? "default" : "outline"}
                  onClick={() => setDate(iso)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>


          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading && (
              <div className="col-span-full text-sm text-muted-foreground">Loading slots...</div>
            )}
            {!loading && slots.length === 0 && (
              <div className="col-span-full text-sm text-muted-foreground">No slots available.</div>
            )}
            {!loading &&
              slots.map((s) => (
                <Button
                  key={s.time}
                  variant={s.available ? "default" : "ghost"}
                  className="justify-between"
                  disabled={!s.available || booking}
                  onClick={() => (currentUser ? confirmBook(s) : toast.error("Please sign in to book a slot"))}
                >
                  <span>{s.time}</span>
                  <span className={`text-xs ${s.available ? "text-green-600" : "text-red-500"}`}>
                    {s.available ? "Available" : "Booked"}
                  </span>
                </Button>
              ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm min-h-5">{message}</div>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <Button href="/mentorship">Browse Mentors</Button>
      </div>

      {/* Toaster for react-hot-toast */}
      <Toaster position="top-right" />
    </motion.div>
  );
}
