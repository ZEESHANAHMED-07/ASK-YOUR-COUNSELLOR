// src/components/sections/Testimonials.js
// Success stories with subtle motion and premium minimal look.

"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const testimonials = [
  {
    name: "Aarav",
    role: "JEE Aspirant",
    text:
      "I finally had clarity. The guidance felt personal and actionable. My mock scores jumped in 3 weeks.",
  },
  {
    name: "Isha",
    role: "NEET Aspirant",
    text:
      "Short, sharp lessons and excellent exam strategies that actually work under pressure.",
  },
  {
    name: "Rohan",
    role: "Undergrad",
    text: "Application help was a game changer. Smooth, stress-free process with zero last-minute panic.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Success Stories</h2>
        <p className="mt-2 text-muted-foreground">Real results from focused guidance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-3">
                <Quote className="h-5 w-5" aria-hidden="true" />
                <div>
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/90">{t.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
