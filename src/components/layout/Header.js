// src/components/layout/Header.js
// Responsive header with logo, nav links, login button, and mobile hamburger menu.

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "../../lib/i18n";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "mentorship", href: "/mentorship" },
  { key: "exams", href: "/exams" },
  { key: "courses", href: "/courses" },
  { key: "resources", href: "/resources" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
  { key: "forum", href: "/forum" },
];

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const links = NAV_LINKS.map((l) => ({ ...l, label: t(`nav.${l.key}`) }));

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="AskYourCounsellor Home">
            {/* Note: Place your logo file at /public/images/logo.png */}
            {logoOk ? (
              <Image
                src="/images/logo.png"
                alt="AskYourCounsellor logo"
                width={140}
                height={32}
                className="h-8 w-auto"
                priority
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span className="text-base font-semibold tracking-tight">AskYourCounsellor</span>
            )}
            <span className="sr-only">AskYourCounsellor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageToggle />
            <ThemeToggle />
            <Button href="/login" size="sm" className="min-w-[88px]" aria-label={t("nav.login")}>{t("nav.login")}</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md border p-2 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3" role="dialog" aria-label="Mobile Navigation">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("common.language")}</span>
              <LanguageToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/90"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/login" className="w-full" onClick={() => setOpen(false)}>{t("nav.login")}</Button>
          </div>
        </div>
      )}
    </header>
  );
}
