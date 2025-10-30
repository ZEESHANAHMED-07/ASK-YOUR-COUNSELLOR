// src/app/about/page.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { useI18n } from "../../lib/i18n";

const team = [
  { name: "Anika Sharma", role: "Founder • Mentor", img: "/images/team-anika.jpg" },
  { name: "Rahul Verma", role: "Exam Strategist", img: "/images/team-rahul.jpg" },
  { name: "Meera N.", role: "Admissions Coach", img: "/images/team-meera.jpg" },
];

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">{t("about.title")}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">{t("about.intro")}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>{t("about.story.title")}</CardTitle>
            <CardDescription>{t("about.story.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/90">{t("about.story.body")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("about.mission.title")}</CardTitle>
            <CardDescription>{t("about.mission.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>{t("about.mission.list.1")}</li>
              <li>{t("about.mission.list.2")}</li>
              <li>{t("about.mission.list.3")}</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">{t("about.team.title")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                    <Image src={m.img} alt={m.name} width={40} height={40} className="h-10 w-10 object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{m.name}</CardTitle>
                    <CardDescription>{m.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t("about.team.card_desc")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
