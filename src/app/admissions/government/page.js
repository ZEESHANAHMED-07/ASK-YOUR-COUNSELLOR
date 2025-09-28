// src/app/admissions/government/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GovernmentAdmissionsPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/admissions" className="hover:underline">Admissions</Link>
        <span className="mx-1">/</span>
        Government
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-2">Government Colleges</h1>
      <p className="text-muted-foreground mb-6">
        Information on counseling processes, quotas, reservations, and document verification will be detailed here.
      </p>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Centralized counseling steps and timelines</li>
          <li>Category/Quota details and documentation</li>
          <li>Seat allotment, reporting, and fee payments</li>
        </ul>
      </div>
    </motion.div>
  );
}
