// src/app/blog/page.js
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Link from "next/link";

const categories = [
  { slug: "exam-updates", title: "Exam Updates & News", desc: "Important notifications, changes, and key dates." },
  { slug: "career-guidance", title: "Career Guidance & Motivation", desc: "Clarity on paths, mindset, and long-term planning." },
  { slug: "productivity", title: "Productivity / Time Management", desc: "Systems, routines, and study tactics that work." },
  { slug: "day-in-the-life", title: "Day in the Life of a Topper", desc: "Real routines, lessons, and strategies from toppers." },
];

export default function BlogPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Blog / Articles</h1>
      <p className="text-muted-foreground mb-8">Insights to help you prepare smarter and stay motivated.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Card key={c.slug}>
            <CardHeader>
              <CardTitle className="text-base">{c.title}</CardTitle>
              <CardDescription>{c.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/blog/${c.slug}`} className="text-sm hover:underline">Explore →</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
