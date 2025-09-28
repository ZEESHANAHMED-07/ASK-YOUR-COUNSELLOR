// src/app/blog/[slug]/CategoryClient.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function titleCase(slug) {
  return (slug || "")
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function CategoryClient({ slug }) {
  const title = titleCase(slug);

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span className="mx-1">/</span>
        {title}
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">
        This is a placeholder for the “{title}” category. We will list curated articles here soon.
      </p>

      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Fresh, well-structured articles</li>
          <li>Shareable links and summaries</li>
          <li>Search and tags</li>
        </ul>
      </div>
    </motion.div>
  );
}
