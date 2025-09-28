// src/components/sections/Intro.js
// Quick intro: who we are and what the site offers.
"use client";

import { useI18n } from "@/lib/i18n";

export default function Intro() {
  const { t } = useI18n();
  const bullets = t("home.intro.bullets");
  const list = Array.isArray(bullets) ? bullets : [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("home.intro.title")}</h2>
          <p className="mt-3 text-foreground/80">{t("home.intro.desc")}</p>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
