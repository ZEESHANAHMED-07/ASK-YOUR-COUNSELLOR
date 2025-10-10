// src/lib/i18n.js
"use client";

import { createContext, useContext } from "react";

// Minimal i18n: small EN dictionary + humanizer fallback so keys don't leak to UI
const EN_DICT = {
  // Nav
  "nav.home": "Home",
  "nav.mentorship": "Mentorship",
  "nav.exams": "Exams",
  "nav.courses": "Courses",
  "nav.contact": "Contact",
  "nav.about": "About",
  "nav.forum": "Forum",
  "nav.forms": "Forms",
  "nav.admissions": "Admissions",
  "nav.blog": "Blog",
  "nav.login": "Login",

  // Home: CTA
  "home.cta.title": "Ready to accelerate your learning?",
  "home.cta.desc": "Join mentorship or subscribe for updates and resources.",
  "home.cta.join": "Join Mentorship",
  "home.cta.subscribe": "Subscribe",

  // Home: Highlights
  "home.highlights.title": "Highlights",
  "home.highlights.desc": "What you can do here",
  "home.highlights.notifications": "Exam Notifications",
  "home.highlights.notifications_desc": "Latest updates and important dates.",
  "home.highlights.mentorship": "Mentorship",
  "home.highlights.mentorship_desc": "1:1 guidance from experts.",
  "home.highlights.forms": "Form Fill-up Guides",
  "home.highlights.forms_desc": "SOPs, letters, and applications.",
  "home.highlights.explore": "Explore",

  // Home: Intro
  "home.intro.title": "Your path to success starts here",
  "home.intro.desc": "Mentorship, exam guidance, and free resources.",
};

function humanizeFromKey(key) {
  if (!key) return "";
  const last = key.split(".").pop() || key;
  const words = last.replace(/[_-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const I18nContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key) => EN_DICT[key] ?? humanizeFromKey(key),
});

export function I18nProvider({ children }) {
  return (
    <I18nContext.Provider value={{ locale: "en", setLocale: () => {}, t: (k) => EN_DICT[k] ?? humanizeFromKey(k) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
