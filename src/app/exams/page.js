// src/app/exams/page.js
"use client";

import { motion } from "framer-motion";
import CategoryCard from "../../components/exams/CategoryCard";
import { Landmark, Calendar, Banknote, GraduationCap } from "lucide-react";
import { useI18n } from "../../lib/i18n";

export default function ExamsPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{t("exams.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("exams.desc")}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CategoryCard
          title={t("exams.cat.upsc.title")}
          desc={t("exams.cat.upsc.desc")}
          icon={Landmark}
          links={[{ label: t("home.highlights.explore"), href: "/exam/upsc" }]}
        />

        <CategoryCard
          title={t("exams.cat.ssc.title")}
          desc={t("exams.cat.ssc.desc")}
          icon={Calendar}
          links={[{ label: t("home.highlights.explore"), href: "/exam/ssc" }]}
        />

        <CategoryCard
          title={t("exams.cat.bank.title")}
          desc={t("exams.cat.bank.desc")}
          icon={Banknote}
          links={[{ label: t("home.highlights.explore"), href: "/exam/bank" }]}
        />

        <CategoryCard
          title={t("exams.cat.engmed.title")}
          desc={t("exams.cat.engmed.desc")}
          icon={GraduationCap}
          links={[{ label: t("home.highlights.explore"), href: "/exam/engineering-medical" }]}
        />
      </div>
    </motion.div>
  );
}
