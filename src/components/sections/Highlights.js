// src/components/sections/Highlights.js
// Highlights: Latest Exam Notifications, Mentorship, Form Fill-up Guides.

"use client";

import { motion } from "framer-motion";
import { Bell, Users, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

function useItems(t) {
  return [
    {
      icon: Bell,
      title: t("home.highlights.notifications"),
      desc: t("home.highlights.notifications_desc"),
      href: "/exams",
    },
    {
      icon: Users,
      title: t("home.highlights.mentorship"),
      desc: t("home.highlights.mentorship_desc"),
      href: "/mentorship/book",
    },
    {
      icon: FileText,
      title: t("home.highlights.forms"),
      desc: t("home.highlights.forms_desc"),
      href: "/forms",
    },
  ];
}

export default function Highlights() {
  const { t } = useI18n();
  const items = useItems(t);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("home.highlights.title")}</h2>
        <p className="text-muted-foreground mt-2">{t("home.highlights.desc")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-3">
                <it.icon className="h-5 w-5" aria-hidden="true" />
                <CardTitle className="text-base">{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">{it.desc}</CardDescription>
                <Link href={it.href} className="text-sm hover:underline">{t("home.highlights.explore")}</Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
