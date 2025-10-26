// src/app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { useAuthContext } from "../config/providers/AuthProvider";

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const [data, setData] = useState({
    bookingsCount: 0,
    applicationsCount: 0,
    recentBookings: [],
    recentApplications: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!user?.uid) {
          setError("Please sign in to view your dashboard.");
          setData({ bookingsCount: 0, applicationsCount: 0, recentBookings: [], recentApplications: [] });
          return;
        }
        const res = await fetch(`/api/dashboard?userId=${encodeURIComponent(user.uid)}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load");
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load dashboard");
      }
    }
    if (!loading) load();
    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Your Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your mentorship bookings and exam applications.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/5">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Mentorship Bookings</CardTitle>
              <CardDescription>Total confirmed slots</CardDescription>
            </div>
            <div className="rounded-md bg-indigo-600 text-white px-3 py-1 text-sm font-medium">{data.bookingsCount}</div>
          </CardHeader>
          <CardContent>
            {data.recentBookings?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet. <Link href="/mentorship" className="hover:underline">Book a slot</Link>.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b">
                      <th className="py-2 pr-3">Date</th>
                      <th className="py-2 pr-3">Slot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentBookings.map((b) => (
                      <tr key={b.id} className="border-b last:border-none">
                        <td className="py-2 pr-3">{b.date}</td>
                        <td className="py-2 pr-3"><span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5">{b.slot}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Exam Applications</CardTitle>
              <CardDescription>Total applications submitted</CardDescription>
            </div>
            <div className="rounded-md bg-emerald-600 text-white px-3 py-1 text-sm font-medium">{data.applicationsCount}</div>
          </CardHeader>
          <CardContent>
            {data.recentApplications?.length === 0 ? (
              <p className="text-sm text-muted-foreground">No applications yet. <Link href="/exams" className="hover:underline">Browse exams</Link>.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b">
                      <th className="py-2 pr-3">Category</th>
                      <th className="py-2 pr-3">Submitted</th>
                      <th className="py-2 pr-3">Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentApplications.map((a) => {
                      const ts = a?.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : null;
                      const filesCount = Object.values(a.uploads || {}).reduce((acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0);
                      return (
                        <tr key={a.id} className="border-b last:border-none">
                          <td className="py-2 pr-3 capitalize">{a.category || 'unknown'}</td>
                          <td className="py-2 pr-3">{ts ? ts.toLocaleString() : ''}</td>
                          <td className="py-2 pr-3">
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5">{filesCount}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Shortcuts to common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/mentorship" className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">Book Mentorship</Link>
              <Link href="/exams" className="rounded-md border px-3 py-2 text-sm hover:bg-muted/50">Apply for Exams</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Help & Support</CardTitle>
            <CardDescription>Get assistance when you need it</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li><Link href="/forum" className="hover:underline">Ask in the Forum</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Support</Link></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
