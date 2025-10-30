// src/app/mentorship/strategies/page.js
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/Card";
import { useI18n } from "../../../lib/i18n";

const strategies = [
  {
    title: "Active Recall & Spaced Repetition",
    desc: "Turn notes into questions. Schedule reviews at 1d/3d/7d/14d intervals.",
  },
  {
    title: "PYQ-First Approach",
    desc: "Practice previous year questions to anchor patterns and avoid blind spots.",
  },
  {
    title: "Mock Sprint + Review",
    desc: "One mock ≠ one test. Spend more time analyzing mistakes and updating your playbook.",
  },
  {
    title: "Weekly Planning",
    desc: "Set outcomes, resources, and constraints. Protect time blocks for deep work.",
  },
];

export default function StrategiesPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{t("strategies.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("strategies.desc")}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {strategies.map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <CardTitle className="text-base">{s.title}</CardTitle>
              <CardDescription>{s.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>How-to steps</li>
                <li>Common pitfalls</li>
                <li>Tracking template</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
