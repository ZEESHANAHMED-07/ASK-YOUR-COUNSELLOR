// src/app/courses/page.js
"use client";

import { motion } from "framer-motion";
import CourseCard from "../../components/courses/CourseCard";
import { useI18n } from "../../lib/i18n";

const courses = [
  { id: 1, title: "UPSC", level: "All Levels", length: "6 weeks", href: "/courses/upsc" },
  { id: 2, title: "SSC", level: "All Levels", length: "6 weeks", href: "/courses/ssc" },
  { id: 3, title: "Banking", level: "All Levels", length: "6 weeks", href: "/courses/banking" },
  { id: 4, title: "NEET", level: "All Levels", length: "6 weeks", href: "/courses/neet" },
  { id: 5, title: "JEE", level: "All Levels", length: "6 weeks", href: "/courses/jee" },
];

export default function CoursesPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{t("nav.courses")}</h1>
      <p className="text-muted-foreground mb-8">{t("courses.desc")}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </motion.div>
  );
}
