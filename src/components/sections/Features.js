// src/components/sections/Features.js
// Features/Highlights section with Lucide icons and hover animations.

"use client";

import { motion } from "framer-motion";
import { Users, FileText, Target, School } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { useI18n } from "../../lib/i18n";

export default function Features() {
  const { t } = useI18n();
  const features = [
    {
      title: t("features.items.mentorship.title"),
      desc: t("features.items.mentorship.desc"),
      icon: Users,
    },
    {
      title: t("features.items.form_help.title"),
      desc: t("features.items.form_help.desc"),
      icon: FileText,
    },
    {
      title: t("features.items.exam_guidance.title"),
      desc: t("features.items.exam_guidance.desc"),
      icon: Target,
    },
    {
      title: t("features.items.college_admissions.title"),
      desc: t("features.items.college_admissions.desc"),
      icon: School,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("features.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("features.subtitle")}</p>
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
