// src/app/forum/rooms/[room]/RoomClient.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "../../../../components/ui/Button";

function titleCase(slug) {
  return (slug || "")
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

const sampleThreads = [
  { id: 1, title: "How to build a 60-day revision plan?", replies: 8, author: "Ritika" },
  { id: 2, title: "PYQ strategy for last 2 weeks?", replies: 12, author: "Dev" },
  { id: 3, title: "Time management: working + preparation", replies: 5, author: "Arun" },
];

export default function RoomClient({ roomSlug }) {
  const room = titleCase(roomSlug);

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/forum" className="hover:underline">Forum</Link>
        <span className="mx-1">/</span>
        {room}
      </div>

      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{room} Room</h1>
          <p className="text-muted-foreground">Discuss strategies, resources, and solve doubts together.</p>
        </div>
        <Button href="/forum/ask">Ask a Doubt</Button>
      </header>

      <div className="rounded-lg border divide-y">
        {sampleThreads.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground/90">{t.title}</h3>
              <p className="text-xs text-muted-foreground">by {t.author} • {t.replies} replies</p>
            </div>
            <Link href="#" className="text-sm hover:underline">Open →</Link>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm">
        <p className="text-muted-foreground">Keep it respectful. Share sources. Help each other grow.</p>
      </div>
    </motion.div>
  );
}
