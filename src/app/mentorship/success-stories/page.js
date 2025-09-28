// src/app/mentorship/success-stories/page.js
"use client";

import { motion } from "framer-motion";
import Testimonials from "@/components/sections/Testimonials";

export default function SuccessStoriesPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">Success Stories</h1>
        <p className="text-muted-foreground">Wins from focused mentorship and smart plans.</p>
      </header>

      <Testimonials />
    </motion.div>
  );
}
