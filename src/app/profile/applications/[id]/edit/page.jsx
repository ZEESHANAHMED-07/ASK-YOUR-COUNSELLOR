"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "../../../../config/providers/AuthProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../../components/ui/Card";
import Button from "../../../../../components/ui/Button";
import { Toaster, toast } from "react-hot-toast";

export default function EditApplicationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [app, setApp] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", city: "", state: "", category: "" });

  useEffect(() => {
    const load = async () => {
      try {
        if (!user?.uid || !id) return;
        setLoading(true);
        // Try fetching a single application by id; fallback to list + find
        let appData = null;
        const direct = await fetch(`/api/applications?id=${encodeURIComponent(id)}`, { cache: "no-store" });
        if (direct.ok) {
          const d = await direct.json();
          appData = d.application || d.app || null;
        }
        if (!appData) {
          const list = await fetch(`/api/applications?userId=${encodeURIComponent(user.uid)}`, { cache: "no-store" });
          if (list.ok) {
            const d = await list.json();
            const arr = Array.isArray(d.applications) ? d.applications : [];
            appData = arr.find((x) => String(x.id) === String(id)) || null;
          }
        }
        if (!appData) throw new Error("Application not found");
        setApp(appData);
        setForm({
          name: appData.name || "",
          email: appData.email || "",
          phone: appData.phone || "",
          age: appData.age || "",
          city: appData.city || "",
          state: appData.state || "",
          category: appData.category || "",
        });
      } catch (e) {
        toast.error(e.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.uid, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSave = async () => {
    try {
      if (!user) return;
      setSaving(true);
      const token = await user.getIdToken();
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, userId: user.uid, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to update application");
      toast.success("Application updated");
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
          <CardTitle className="text-base">Edit Application</CardTitle>
          <CardDescription>Update your application details and save.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading...</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input id="email" name="email" value={form.email} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="age">Age</label>
                <input id="age" name="age" value={form.age} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="city">City</label>
                <input id="city" name="city" value={form.city} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium" htmlFor="state">State</label>
                <input id="state" name="state" value={form.state} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <label className="text-sm font-medium" htmlFor="category">Exam</label>
                <input id="category" name="category" value={form.category} onChange={onChange} className="border rounded-md px-3 py-2 text-sm" />
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
