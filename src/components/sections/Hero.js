// src/components/sections/Hero.js
// Hero section with premium minimal design, motion entrance, and CTA buttons.

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "../ui/Button";

const container = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:pt-20 sm:pb-20">
      <div className="text-center flex flex-col items-center gap-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground"
          aria-label="Highlight"
        >
          Your Path to Success Starts Here
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={container}
          className="text-4xl sm:text-5xl font-semibold tracking-tight"
        >
          Your Path to Success Starts Here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="max-w-2xl text-muted-foreground"
        >
          Get mentorship, exam guidance, and free learning resources.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3"
          aria-label="Primary actions"
        >
          <Link href="/mentorship" aria-label="Join Mentorship">
            <Button>Join Mentorship</Button>
          </Link>
          <Link href="/courses" aria-label="Explore Courses">
            <Button variant="secondary">Explore Courses</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
