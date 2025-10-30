// src/app/contact/page.js
"use client";

import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import { useI18n } from "../../lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">{t("contact.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("contact.desc")}</p>

      {/* Contact Form & Support */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">{t("contact.form.title")}</h2>
          <form className="grid gap-4 max-w-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">{t("contact.form.name")}</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t("contact.form.name_ph")}
                className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">{t("contact.form.email")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contact.form.email_ph")}
                  className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50"
                />
              </div>
              <div>
                <label htmlFor="topic" className="block text-sm font-medium mb-1">{t("contact.form.topic")}</label>
                <select id="topic" name="topic" className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50">
                  <option>{t("contact.form.topic.mentorship")}</option>
                  <option>{t("contact.form.topic.exams")}</option>
                  <option>{t("contact.form.topic.admissions")}</option>
                  <option>{t("contact.form.topic.technical")}</option>
                  <option>{t("contact.form.topic.payments")}</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">{t("contact.form.message")}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t("contact.form.message_ph")}
                className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50"
              />
            </div>
            <div>
              <Button type="submit" className="w-full sm:w-auto">{t("contact.form.send")}</Button>
            </div>
          </form>
        </div>

        {/* Support & FAQ */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">{t("contact.support.title")}</h2>
          <div className="grid gap-3 text-sm">
            <div>
              <span className="font-medium">{t("contact.support.email")}</span>
              <a href="mailto:contact@askyourcounsellor.com" className="ml-2 hover:underline">contact@askyourcounsellor.com</a>
            </div>
            <div>
              <span className="font-medium">{t("contact.support.chat")}</span>
              <span className="ml-2 text-muted-foreground">{t("contact.support.chat_desc")}</span>
            </div>
            <div>
              <span className="font-medium">{t("contact.support.response_time")}</span>
              <span className="ml-2 text-muted-foreground">{t("contact.support.response_sla")}</span>
            </div>
          </div>

          <h3 className="text-base font-semibold mt-6 mb-3">{t("contact.faq.title")}</h3>
          <div className="space-y-2">
            <details className="rounded-md border px-4 py-3">
              <summary className="cursor-pointer font-medium">{t("contact.faq.payments")}</summary>
              <div className="mt-2 text-sm text-muted-foreground">{t("contact.faq.payments_desc")}</div>
            </details>
            <details className="rounded-md border px-4 py-3">
              <summary className="cursor-pointer font-medium">{t("contact.faq.sessions")}</summary>
              <div className="mt-2 text-sm text-muted-foreground">{t("contact.faq.sessions_desc")}</div>
            </details>
            <details className="rounded-md border px-4 py-3">
              <summary className="cursor-pointer font-medium">{t("contact.faq.tech")}</summary>
              <div className="mt-2 text-sm text-muted-foreground">{t("contact.faq.tech_desc")}</div>
            </details>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
