// src/app/courses/page.js
"use client";

import { motion } from "framer-motion";
import CourseCard from "../../components/courses/CourseCard";

const courses = [
  { id: 1, title: "Physics Foundations", level: "Beginner", length: "6 weeks" },
  { id: 2, title: "Biology High-Yield", level: "Intermediate", length: "4 weeks" },
  { id: 3, title: "Application Mastery", level: "All Levels", length: "2 weeks" },
];

export default function CoursesPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Courses</h1>
      <p className="text-muted-foreground mb-8">Structured, outcome-focused learning. New drops soon.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </motion.div>
  );
}
