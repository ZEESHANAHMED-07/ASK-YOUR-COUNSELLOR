// src/app/forum/ask/page.js
"use client";

import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";

const categories = [
  { value: "upsc", label: "UPSC" },
  { value: "ssc", label: "SSC" },
  { value: "bank", label: "Bank Exams" },
  { value: "jee-neet", label: "JEE/NEET" },
  { value: "other", label: "Other" },
];

export default function AskPage() {
  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Ask a Doubt</h1>
      <p className="text-muted-foreground mb-6">Post your question and get answers from mentors and peers.</p>

      <form className="grid gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input id="title" name="title" type="text" placeholder="Summarize your question"
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
          <select id="category" name="category" className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50">
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">Details</label>
          <textarea id="details" name="details" rows={6} placeholder="Provide context, what you tried, and where you're stuck"
                    className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
          <input id="tags" name="tags" type="text" placeholder="e.g., time-management, polity, organic-chem"
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" />
          <p className="mt-1 text-xs text-muted-foreground">Comma-separated. Use specific, relevant tags.</p>
        </div>
        <div className="flex gap-3">
          <Button type="submit">Post Question</Button>
          <Button href="/forum" variant="secondary">Back to Forum</Button>
        </div>
      </form>
    </motion.div>
  );
}
