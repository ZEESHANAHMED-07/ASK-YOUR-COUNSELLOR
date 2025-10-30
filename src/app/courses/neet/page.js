// src/app/courses/neet/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "../../../lib/i18n";

export default function NEETCoursePage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">NEET {t("courses.course_label")}</h1>
      <p className="text-muted-foreground mb-8">{t("courses.detail_placeholder")}</p>
      <Link href="/courses" className="text-sm text-muted-foreground hover:underline">{t("common.back_to_courses")}</Link>
    </motion.div>
  );
}
