// src/components/mentorship/BookingWidget.js
"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import Button from "../ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/Card";
import { auth } from "../../app/config/firebaseConfig";
import { useI18n } from "../../lib/i18n";

export default function BookingWidget({ showToaster = false }) {
  const { t } = useI18n();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState("");
  const todayStr = new Date().toISOString().slice(0, 10);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  const next30Days = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    // Build a short, single-line label e.g., "Mon 4 Nov" to avoid wrapping
    const wk = d.toLocaleDateString(undefined, { weekday: "short" });
    const mo = d.toLocaleDateString(undefined, { month: "short" });
    const label = `${wk} ${d.getDate()} ${mo}`;
    return { iso, label };
  });

  const fetchAvailability = async (d) => {
    try {
      setLoading(true);
      setMessage("");
      const res = await fetch(`/api/mentorship?date=${encodeURIComponent(d)}`);
      if (!res.ok) throw new Error(t("mentorship.book.error.fetch"));
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (e) {
      setMessage(t("mentorship.book.error.load"));
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
            user: currentUser
              ? { id: currentUser.uid, name: currentUser.displayName || currentUser.email || "User", email: currentUser.email || null }
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
        loading: t("mentorship.book.toast.loading"),
        success: t("mentorship.book.toast.success"),
        error: (e) => e.message || t("mentorship.book.toast.error"),
      });

      setMessage(t("mentorship.book.message.success"));
      fetchAvailability(date);
    } catch (e) {
      setMessage(`${t("mentorship.book.message.error_prefix")} ${e.message}`);
    } finally {
      setBooking(false);
    }
  };

  const confirmBook = (slot) => {
    const id = toast.custom(
      (tctx) => (
        <div className="w-[320px] rounded-md border border-input bg-background text-foreground shadow-lg p-4">
          <div className="text-sm font-medium">{t("mentorship.book.confirm_booking")}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {t("mentorship.book.date")}: <span className="font-medium">{date}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {t("mentorship.book.slot")}: <span className="font-medium">{slot.time}</span>
          </div>
          <div className="mt-3 flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => toast.dismiss(tctx.id)} disabled={booking}>
              {t("mentorship.book.cancel")}
            </Button>
            <Button size="sm" onClick={async () => { toast.dismiss(tctx.id); await onBook(slot); }} disabled={booking}>
              {t("mentorship.book.confirm")}
            </Button>
          </div>
        </div>
      ),
      { id: `confirm-${slot.time}-${date}`, position: "bottom-right", duration: 5000 }
    );
    return id;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("mentorship.book.select_date")}</CardTitle>
          <CardDescription>{t("mentorship.book.check_availability")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="[color-scheme:light] dark:[color-scheme:dark] border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
              value={date}
              min={todayStr}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button onClick={() => fetchAvailability(date)} variant="secondary" disabled={loading}>
              {loading ? t("mentorship.book.loading") : t("mentorship.book.refresh")}
            </Button>
          </div>
          <div className="mt-4">
            <div className="mb-2 text-xs text-muted-foreground">{t("mentorship.book.pick_specific_day")}</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
              {next30Days.map(({ iso, label }) => (
                <Button
                  key={iso}
                  size="sm"
                  variant={date === iso ? "default" : "outline"}
                  onClick={() => setDate(iso)}
                  className="whitespace-nowrap"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading && <div className="col-span-full text-sm text-muted-foreground">{t("mentorship.book.loading_slots")}</div>}
            {!loading && slots.length === 0 && (
              <div className="col-span-full text-sm text-muted-foreground">{t("mentorship.book.no_slots")}</div>
            )}
            {!loading &&
              slots.map((s) => (
                <Button
                  key={s.time}
                  variant={s.available ? "default" : "ghost"}
                  className="justify-between"
                  disabled={!s.available || booking}
                  onClick={() => (currentUser ? confirmBook(s) : toast.error(t("mentorship.book.sign_in_to_book")))}
                >
                  <span>{s.time}</span>
                  <span className={`text-xs ${s.available ? "text-green-600" : "text-red-500"}`}>
                    {s.available ? t("mentorship.book.available") : t("mentorship.book.booked")}
                  </span>
                </Button>
              ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm min-h-5">{message}</div>
        </CardFooter>
      </Card>
      {showToaster && <Toaster position="top-right" />}
    </>
  );
}
