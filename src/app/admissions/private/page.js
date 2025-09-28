// src/app/admissions/private/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivateAdmissionsPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/admissions" className="hover:underline">Admissions</Link>
        <span className="mx-1">/</span>
        Private
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-2">Private Colleges</h1>
      <p className="text-muted-foreground mb-6">
        Detailed information about application timelines, scholarships, institute-specific portals and interviews will be added here.
      </p>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Application timelines and key dates</li>
          <li>Scholarships and financial aid</li>
          <li>Interview preparation and portfolio tips</li>
        </ul>
      </div>
    </motion.div>
  );
}
