// src/app/mentorship/plans/page.js
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const plans = [
  { exam: "UPSC", desc: "Foundational, Mains-focused, and Prelims sprint variations." },
  { exam: "SSC", desc: "Tier-wise plan with mock cadence and PYQ integration." },
  { exam: "Banking", desc: "Reasoning/Quant daily split + speed-building drills." },
  { exam: "NEET", desc: "High-yield bio mapping + physics formula retention." },
  { exam: "JEE", desc: "Concept-first approach with targeted problem ladders." },
];

export default function StudyPlansPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Study Plans</h1>
      <p className="text-muted-foreground mb-8">Customized plans for your exam and timeline.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.exam}>
            <CardHeader>
              <CardTitle className="text-base">{p.exam}</CardTitle>
              <CardDescription>{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Weekly sprints</li>
                <li>Mocks + revision slots</li>
                <li>Resource list</li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
