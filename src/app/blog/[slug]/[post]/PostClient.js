// src/app/blog/[slug]/[post]/PostClient.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function titleCase(slug) {
  return (slug || "")
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function PostClient({ categorySlug, postSlug }) {
  const category = titleCase(categorySlug);
  const postTitle = titleCase(postSlug);

  return (
    <motion.article
      className="mx-auto max-w-3xl px-4 py-12 prose prose-neutral dark:prose-invert"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span className="mx-1">/</span>
        <Link href={`/blog/${categorySlug}`} className="hover:underline">{category}</Link>
        <span className="mx-1">/</span>
        <span className="text-foreground/90">{postTitle}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">{postTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          In {category} • <time dateTime="2025-01-01">Jan 1, 2025</time> • by <span className="font-medium">Team AYC</span>
        </p>
      </header>

      <section className="space-y-4">
        <p>
          This is a template for a blog post detail page. Replace this content with your actual article text, images, and references.
        </p>
        <p>
          Structure your post with clear subheadings, short paragraphs, and actionable advice. Use highlighted callouts and lists where helpful.
        </p>

        <h2>Key Takeaways</h2>
        <ul>
          <li>Break down the problem into understandable chunks.</li>
          <li>Give specific steps, not generic tips.</li>
          <li>Provide links to official resources where relevant.</li>
        </ul>

        <h2>Next Steps</h2>
        <p>
          Add a CTA to relevant mentorship, exam guides, or courses at the end of your article.
        </p>
      </section>

      <footer className="mt-10 border-t pt-6 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">Share:</span>
        <a
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent("https://askyourcounsellor.com/blog")}`}
        >
          X/Twitter
        </a>
        <a
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://askyourcounsellor.com/blog")}`}
        >
          LinkedIn
        </a>
        <Link className="hover:underline" href="/mentorship">Get Mentorship</Link>
      </footer>
    </motion.article>
  );
}
