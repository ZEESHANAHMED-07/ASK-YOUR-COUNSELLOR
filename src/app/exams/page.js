// src/app/exams/page.js
"use client";

import { motion } from "framer-motion";
import CategoryCard from "../../components/exams/CategoryCard";
import { Landmark, Calendar, Banknote, GraduationCap } from "lucide-react";

export default function ExamsPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Competitive Exams</h1>
      <p className="text-muted-foreground mb-8">Quick links to everything you need—syllabus, dates, PYQs, resources, and more.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CategoryCard
          title="UPSC"
          desc="CSE and other major exams"
          icon={Landmark}
          links={[{ label: "Explore", href: "/exam/upsc" }]}
        />

        <CategoryCard
          title="SSC"
          desc="CGL, CHSL, and more"
          icon={Calendar}
          links={[{ label: "Explore", href: "/exam/ssc" }]}
        />

        <CategoryCard
          title="Bank Exams"
          desc="IBPS • SBI • RBI"
          icon={Banknote}
          links={[{ label: "Explore", href: "/exam/bank" }]}
        />

        <CategoryCard
          title="Engineering/Medical"
          desc="JEE • NEET • Others"
          icon={GraduationCap}
          links={[{ label: "Explore", href: "/exam/engineering-medical" }]}
        />
      </div>
    </motion.div>
  );
}
