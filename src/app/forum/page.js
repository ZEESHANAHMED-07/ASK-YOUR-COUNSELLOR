// src/app/forum/page.js
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MessageSquare, Users, MessageCircle } from "lucide-react";

const rooms = [
  { slug: "upsc", title: "UPSC Room", desc: "Discuss strategies, resources, and doubts for UPSC." },
  { slug: "ssc", title: "SSC Room", desc: "CGL, CHSL, and more—share notes and PYQs." },
  { slug: "bank", title: "Banking Room", desc: "IBPS, SBI, RBI—prep tips and materials." },
  { slug: "jee-neet", title: "JEE/NEET Room", desc: "Concepts, questions, and exam plans." },
];

export default function ForumPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Community Forum</h1>
        <p className="mt-2 text-muted-foreground">
          Ask doubts, join discussion rooms, and learn with peers.
        </p>
        <div className="mt-4 flex gap-3">
          <Button href="/forum/ask" aria-label="Post a question"><MessageSquare className="h-4 w-4 mr-2" />Ask Doubts</Button>
          <Button href="/forum/rooms/upsc" variant="secondary" aria-label="Peer learning tips"><Users className="h-4 w-4 mr-2" />Peer Learning</Button>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-3 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> Discussion Rooms
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((r) => (
            <Card key={r.slug}>
              <CardHeader>
                <CardTitle className="text-base">{r.title}</CardTitle>
                <CardDescription>{r.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/forum/rooms/${r.slug}`} className="text-sm hover:underline">Enter Room →</Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
