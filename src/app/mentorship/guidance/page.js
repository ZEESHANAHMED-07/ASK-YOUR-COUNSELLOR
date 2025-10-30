// src/app/mentorship/guidance/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { useI18n } from "../../../lib/i18n";

const topics = [
  { slug: "career-guidance", title: "Career Guidance & Mindset", desc: "Clarity on long-term direction and motivation." },
  { slug: "productivity", title: "Productivity & Time Management", desc: "Routines, tracking, and deep work practices." },
  { slug: "exam-updates", title: "Exam Updates & News", desc: "Important changes, notifications, and dates." },
  { slug: "day-in-the-life", title: "Day in the Life of a Topper", desc: "Real schedules and lesson summaries." },
];

export default function GuidancePage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{t("guidance.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("guidance.desc")}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic) => (
          <Card key={topic.slug}>
            <CardHeader>
              <CardTitle className="text-base">{topic.title}</CardTitle>
              <CardDescription>{topic.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${topic.slug}`} className="text-sm hover:underline">{t("home.highlights.explore")} →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
