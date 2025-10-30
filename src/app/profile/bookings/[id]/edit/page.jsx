"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "../../../../config/providers/AuthProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../../components/ui/Card";
import Button from "../../../../../components/ui/Button";
import { Toaster, toast } from "react-hot-toast";

export default function EditBookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ date: "", slot: "" });

  useEffect(() => {
    const load = async () => {
      try {
        if (!user?.uid || !id) return;
        setLoading(true);
        // Try fetching a single booking by id; fallback to list + find
        let booking = null;
        const direct = await fetch(`/api/mentorship?id=${encodeURIComponent(id)}`, { cache: "no-store" });
        if (direct.ok) {
          const d = await direct.json();
          booking = d.booking || d.data || null;
        }
        if (!booking) {
          const list = await fetch(`/api/mentorship?userId=${encodeURIComponent(user.uid)}`, { cache: "no-store" });
          if (list.ok) {
            const d = await list.json();
            const arr = Array.isArray(d.bookings) ? d.bookings : [];
            booking = arr.find((x) => String(x.id) === String(id)) || null;
          }
        }
        if (!booking) throw new Error("Booking not found");
        setForm({ date: booking.date || "", slot: booking.slot || "" });
      } catch (e) {
        toast.error(e.message || "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.uid, id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSave = async () => {
    try {
      if (!user) return;
      setSaving(true);
      const token = await user.getIdToken();
      const res = await fetch("/api/mentorship", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, userId: user.uid, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to update booking");
      toast.success("Booking updated");
      router.push("/profile");
    } catch (e) {
      toast.error(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit Booking</CardTitle>
          <CardDescription>Update your booking date and slot, then save.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="date">Date</label>
                <input id="date" name="date" type="date" value={form.date} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="slot">Slot</label>
                <input id="slot" name="slot" value={form.slot} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="secondary" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={onSave} disabled={saving || loading}>{saving ? "Saving..." : "Save"}</Button>
        </CardFooter>
      </Card>
      <Toaster position="top-right" />
    </div>
  );
}
