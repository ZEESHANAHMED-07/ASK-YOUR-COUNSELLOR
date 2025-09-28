// src/components/sections/CTA.js
// Call-to-Action: Join Mentorship, Subscribe for Updates.

"use client";

import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function CTA() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t("home.cta.title")}</h2>
        <p className="mt-2 text-muted-foreground">{t("home.cta.desc")}</p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/mentorship/book" className="min-w-[200px]">{t("home.cta.join")}</Button>
          <Button href="/blog" variant="secondary" className="min-w-[200px]">{t("home.cta.subscribe")}</Button>
        </div>
      </div>
    </section>
  );
}
