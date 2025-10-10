// src/components/layout/LanguageToggle.js
"use client";

import { useLocale } from "../../lib/i18n";

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-2" aria-label="Language selector">
      <select
        className="rounded-md border bg-background px-2 py-1 text-sm"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label="Language"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}
