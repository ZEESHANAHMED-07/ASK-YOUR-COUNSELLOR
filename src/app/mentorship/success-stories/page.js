// src/app/mentorship/success-stories/page.js
"use client";

import { motion } from "framer-motion";
import Testimonials from "../../../components/sections/Testimonials";
import { useI18n } from "../../../lib/i18n";

export default function SuccessStoriesPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight">{t("mentorship.success_stories")}</h1>
        <p className="text-muted-foreground">{t("success_stories.desc")}</p>
      </header>

      <Testimonials />
    </motion.div>
  );
}
