// src/app/mentorship/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "../../lib/i18n";
import BookingWidget from "../../components/mentorship/BookingWidget";

// Removed mentors and categories per new design
 
export default function MentorshipPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{t("mentorship.title")}</h1>
      <p className="text-muted-foreground mb-6">{t("mentorship.desc")}</p>

      {/* Sub-navigation (enlarged) */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <Link href="/mentorship/guidance" className="text-base sm:text-lg text-muted-foreground hover:text-foreground font-medium">
          {t("mentorship.guidance_articles")}
        </Link>
        <Link href="/mentorship/success-stories" className="text-base sm:text-lg text-muted-foreground hover:text-foreground font-medium">
          {t("mentorship.success_stories")}
        </Link>
        <Link href="/mentorship/strategies" className="text-base sm:text-lg text-muted-foreground hover:text-foreground font-medium">
          {t("mentorship.exam_strategies")}
        </Link>
      </div>

      {/* Embedded booking widget */}
      <div className="max-w-3xl">
        <BookingWidget showToaster />
      </div>
    </motion.div>
  );
}
