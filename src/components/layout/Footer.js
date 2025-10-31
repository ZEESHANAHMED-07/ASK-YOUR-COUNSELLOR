// src/components/layout/Footer.js
// Minimal, responsive footer with nav links and copyright.

"use client";

import Link from "next/link";
import { useI18n } from "../../lib/i18n";

const LINKS = [
  { key: "home", href: "/" },
  { key: "mentorship", href: "/mentorship" },
  { key: "exams", href: "/exams" },
  { key: "courses", href: "/courses" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
  { key: "forum", href: "/forum" },
  { key: "forms", href: "/forms" },
  { key: "admissions", href: "/admissions" },
  { key: "blog", href: "/blog" },
];

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 items-center">
        <p className="text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left md:col-span-1">
          {year} AskYourCounsellor. All rights reserved.
        </p>
        <nav
          className="order-1 sm:order-2 w-full md:col-span-2 flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2"
          aria-label="Footer Navigation"
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
