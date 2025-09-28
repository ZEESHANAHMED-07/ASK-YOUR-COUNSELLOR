// src/app/exams/[...slug]/SlugClient.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

function titleCase(str) {
  return (str || "")
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function SlugClient({ segments = [] }) {
  const sectionTitle = segments.map(titleCase).join(" • ");
  const root = ((segments && segments[0]) || "").toLowerCase();

  const officialByCategory = {
    upsc: [
      { label: "UPSC Online Application", href: "https://upsconline.nic.in" },
      { label: "UPSC Official Website", href: "https://www.upsc.gov.in" },
      { label: "UPSC Exam Calendar", href: "https://www.upsc.gov.in/examinations/exam-calendar" },
    ],
    ssc: [
      { label: "SSC Official Portal", href: "https://ssc.gov.in" },
      { label: "SSC Calendar", href: "https://ssc.gov.in/exams/schedule" },
    ],
    bank: [
      { label: "IBPS Official Portal", href: "https://www.ibps.in" },
      { label: "SBI Careers", href: "https://sbi.co.in/web/careers" },
      { label: "RBI Opportunities", href: "https://opportunities.rbi.org.in" },
    ],
    "engineering-medical": [
      { label: "JEE Main (NTA)", href: "https://jeemain.nta.ac.in" },
      { label: "NEET (NTA)", href: "https://exams.nta.ac.in/NEET" },
      { label: "NTA Official", href: "https://nta.ac.in" },
    ],
  };

  const officialLinks =
    officialByCategory[root] ||
    (root.includes("jee") || root.includes("engineering")
      ? officialByCategory["engineering-medical"]
      : root.includes("neet") || root.includes("medical")
      ? officialByCategory["engineering-medical"]
      : []);

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/exams" className="hover:underline">Exams</Link>
        {segments.map((s, i) => (
          <span key={i}>
            <span className="mx-1">/</span>
            {titleCase(s)}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-2">{sectionTitle || "Exams"}</h1>
      <p className="text-muted-foreground mb-6">
        This page is a placeholder for <span className="font-medium">{sectionTitle || "Exams"}</span>. Detailed content, downloads, and tools will be added soon.
      </p>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Syllabus outlines and PDF downloads</li>
          <li>Notifications, dates, and official links</li>
          <li>Previous Year Papers and solutions</li>
          <li>Notes, resources, and curated roadmaps</li>
          <li>Mock test recommendations</li>
        </ul>
      </div>

      {officialLinks.length > 0 && (
        <div className="mt-6 rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-2">Official Links</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {officialLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Button href="/mentorship">Get 1:1 mentorship</Button>
        <Button href="/exams" variant="secondary">Back to Exams</Button>
      </div>
    </motion.div>
  );
}
