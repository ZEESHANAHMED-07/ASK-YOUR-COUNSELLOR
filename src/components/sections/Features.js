// src/components/sections/Features.js
// Features/Highlights section with Lucide icons and hover animations.

"use client";

import { motion } from "framer-motion";
import { Users, FileText, Target, School } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const features = [
  {
    title: "Mentorship",
    desc: "1:1 guidance from experienced mentors to accelerate your growth.",
    icon: Users,
  },
  {
    title: "Form Help",
    desc: "SOPs, Letters, and applications—reviewed and refined for clarity.",
    icon: FileText,
  },
  {
    title: "Exam Guidance",
    desc: "Roadmaps, PYQ strategies, and practice plans tailored to your goals.",
    icon: Target,
  },
  {
    title: "College Admissions",
    desc: "End-to-end support for shortlisting, applications, and interviews.",
    icon: School,
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">What We Offer</h2>
        <p className="mt-2 text-muted-foreground">Premium guidance designed for outcomes.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <Card className="h-full">
                <CardHeader className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{f.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
