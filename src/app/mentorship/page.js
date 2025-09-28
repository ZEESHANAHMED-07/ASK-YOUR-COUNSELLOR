// src/app/mentorship/page.js
"use client";

import { motion } from "framer-motion";
import MentorCard from "@/components/mentorship/MentorCard";
import Button from "@/components/ui/Button";
import Link from "next/link";

const mentors = [
  { id: 1, name: "Priya S.", title: "IIT Grad • Physics", rating: 4.9 },
  { id: 2, name: "Karan M.", title: "Medical Coach • Biology", rating: 4.8 },
  { id: 3, name: "Neha R.", title: "Admissions • SOP/LoR", rating: 5.0 },
];

export default function MentorshipPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Mentorship</h1>
      <p className="text-muted-foreground mb-6">Book 1:1 sessions and accelerate your progress.</p>

      {/* Sub-navigation */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Button href="/mentorship/book" size="sm">Book a Mentor</Button>
        <Button href="/mentorship/plans" variant="secondary" size="sm">Study Plans</Button>
        <Link href="/mentorship/guidance" className="text-sm text-muted-foreground hover:text-foreground">Guidance Articles</Link>
        <Link href="/mentorship/success-stories" className="text-sm text-muted-foreground hover:text-foreground">Success Stories</Link>
        <Link href="/mentorship/strategies" className="text-sm text-muted-foreground hover:text-foreground">Exam Strategies</Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((m) => (
          <MentorCard key={m.id} mentor={m} />
        ))}
      </div>
    </motion.div>
  );
}
