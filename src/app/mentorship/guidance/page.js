// src/app/mentorship/guidance/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const topics = [
  { slug: "career-guidance", title: "Career Guidance & Mindset", desc: "Clarity on long-term direction and motivation." },
  { slug: "productivity", title: "Productivity & Time Management", desc: "Routines, tracking, and deep work practices." },
  { slug: "exam-updates", title: "Exam Updates & News", desc: "Important changes, notifications, and dates." },
  { slug: "day-in-the-life", title: "Day in the Life of a Topper", desc: "Real schedules and lesson summaries." },
];

export default function GuidancePage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Motivation & Guidance Articles</h1>
      <p className="text-muted-foreground mb-8">Curated articles to help you stay consistent and prepare smarter.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((t) => (
          <Card key={t.slug}>
            <CardHeader>
              <CardTitle className="text-base">{t.title}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${t.slug}`} className="text-sm hover:underline">Explore →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
