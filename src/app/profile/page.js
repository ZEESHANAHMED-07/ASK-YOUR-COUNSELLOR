"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../config/providers/AuthProvider";
import Button from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import { Toaster, toast } from "react-hot-toast";
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ displayName: "", email: "" });
  const [appsLoading, setAppsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [changingPwd, setChangingPwd] = useState(false);
  // Editing moved to dedicated pages

  const loadProfile = async () => {
    try {
      if (!user) return;
      setLoading(true);
      const token = await user.getIdToken();
      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      const p = data.profile || {};
      setForm({ displayName: p.displayName || "", email: p.email || user.email || "" });
    } catch (e) {
      toast.error(e.message || "Could not load profile");
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      if (!user?.uid) return;
      setAppsLoading(true);
      const res = await fetch(`/api/applications?userId=${encodeURIComponent(user.uid)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load applications");
      const data = await res.json();
      setApplications(Array.isArray(data.applications) ? data.applications : []);
    } catch (e) {
      toast.error(e.message || "Could not load applications");
      setApplications([]);
    } finally {
      setAppsLoading(false);
    }
  };

  const loadBookings = async () => {
    try {
      if (!user?.uid) return;
      setBookingsLoading(true);
      const res = await fetch(`/api/mentorship?userId=${encodeURIComponent(user.uid)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load bookings");
      const data = await res.json();
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (e) {
      toast.error(e.message || "Could not load bookings");
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    loadApplications();
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSave = async () => {
    try {
      if (!user) return;
      setSaving(true);
      const token = await user.getIdToken();
      const payload = { displayName: form.displayName };
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to save profile");
      toast.success("Profile updated");
      await loadProfile();
    } catch (e) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const canChangePassword = !!user?.providerData?.some((p) => p?.providerId === "password");

  const onChangePassword = async () => {
    try {
      if (!user) return;
      if (!canChangePassword) {
        toast.error("Password can be changed only for email/password accounts");
        return;
      }
      if (!pwdCurrent || !pwdNew) {
        toast.error("Enter current and new password");
        return;
      }
      setChangingPwd(true);
      const cred = EmailAuthProvider.credential(user.email, pwdCurrent);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, pwdNew);
      setPwdCurrent("");
      setPwdNew("");
      toast.success("Password updated");
    } catch (e) {
      const msg = e?.message?.includes("wrong-password") ? "Current password is incorrect" : e?.message || "Failed to update password";
      toast.error(msg);
    } finally {
      setChangingPwd(false);
    }
  };

  const fmtDateTime = (v) => {
    try {
      if (!v) return "-";
      if (typeof v === "string" || typeof v === "number") return new Date(v).toLocaleString();
      if (v.seconds) return new Date(v.seconds * 1000).toLocaleString();
      return new Date(v).toLocaleString();
    } catch {
      return "-";
    }
  };

  const cancelBooking = async (id) => {
    try {
      if (!user) return;
      const ok = window.confirm("Cancel this booking?");
      if (!ok) return;
      const token = await user.getIdToken();
      const res = await fetch("/api/mentorship", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, userId: user.uid, status: "cancelled" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to cancel booking");
      toast.success("Booking cancelled");
      await loadBookings();
    } catch (e) {
      toast.error(e.message || "Cancel failed");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
          <CardDescription>Update your name. Email is read-only.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label htmlFor="displayName" className="text-sm font-medium">Name</label>
                <input
                  id="displayName"
                  name="displayName"
                  value={form.displayName}
                  onChange={onChange}
                  className="border rounded-md px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  disabled
                  className="border rounded-md px-3 py-2 text-sm bg-muted"
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={onSave} disabled={saving || loading}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change password</CardTitle>
          <CardDescription>
            {canChangePassword ? "Update your account password." : "Password change is unavailable for social sign-in accounts (e.g. Google)."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label htmlFor="pwdCurrent" className="text-sm font-medium">Current password</label>
              <input
                id="pwdCurrent"
                type="password"
                value={pwdCurrent}
                onChange={(e) => setPwdCurrent(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
                disabled={!canChangePassword}
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="pwdNew" className="text-sm font-medium">New password</label>
              <input
                id="pwdNew"
                type="password"
                value={pwdNew}
                onChange={(e) => setPwdNew(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
                disabled={!canChangePassword}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onChangePassword} disabled={!canChangePassword || changingPwd}>
            {changingPwd ? "Updating..." : "Update password"}
          </Button>
        </CardFooter>
      </Card>

      {/* Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Applications</CardTitle>
          <CardDescription>Recent submissions linked to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {appsLoading ? (
            <div className="text-sm text-muted-foreground">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="text-sm text-muted-foreground">No applications found.</div>
          ) : (
            <div className="grid gap-3">
              {applications.map((app) => (
                <div key={app.id} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">{app.category ? app.category.toUpperCase() : "APPLICATION"}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">{fmtDateTime(app.createdAt)}</div>
                      <Button size="sm" variant="secondary" href={`/profile/applications/${app.id}/edit`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Bookings</CardTitle>
          <CardDescription>Mentorship slots you have booked.</CardDescription>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
            <div className="text-sm text-muted-foreground">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="text-sm text-muted-foreground">No bookings found.</div>
          ) : (
            <div className="grid gap-3">
              {bookings.map((b) => (
                <div key={b.id} className="rounded-md border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">{b.slot || "Slot"}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">{b.date || "-"}</div>
                      <Button size="sm" variant="secondary" href={`/profile/bookings/${b.id}/edit`}>
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => cancelBooking(b.id)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                  {b.user?.name && (
                    <div className="mt-2 text-sm">
                      <span className="text-muted-foreground">Booked by: </span>
                      <span className="font-medium">{b.user.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
}