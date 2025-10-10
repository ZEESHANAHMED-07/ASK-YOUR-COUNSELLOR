// src/app/contact/page.js
"use client";

import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

export default function ContactPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Contact & Support</h1>
      <p className="text-muted-foreground mb-8">We’re here to help with mentorship, exams, and admissions.</p>

      {/* Contact Form & Support */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Send us a message</h2>
          <form className="grid gap-4 max-w-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50"
                />
              </div>
              <div>
                <label htmlFor="topic" className="block text-sm font-medium mb-1">Topic</label>
                <select id="topic" name="topic" className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50">
                  <option>Mentorship</option>
                  <option>Exams</option>
                  <option>Admissions</option>
                  <option>Technical</option>
                  <option>Payments</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help?"
                className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50"
              />
            </div>
            <div>
              <Button type="submit" className="w-full sm:w-auto">Send</Button>
            </div>
          </form>
        </div>

        {/* Support & FAQ */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Support Options</h2>
          <div className="grid gap-3 text-sm">
            <div>
              <span className="font-medium">Email:</span>
              <a href="mailto:contact@askyourcounsellor.com" className="ml-2 hover:underline">contact@askyourcounsellor.com</a>
            </div>
            <div>
              <span className="font-medium">Chat:</span>
              <span className="ml-2 text-muted-foreground">Coming soon — WhatsApp/Intercom integration</span>
            </div>
            <div>
              <span className="font-medium">Response Time:</span>
              <span className="ml-2 text-muted-foreground">Within 24 hours</span>
            </div>
          </div>

          <h3 className="text-base font-semibold mt-6 mb-3">FAQ</h3>
          <div className="space-y-2">
            <details className="rounded-md border px-4 py-3">
              <summary className="cursor-pointer font-medium">Payments & Refunds</summary>
              <div className="mt-2 text-sm text-muted-foreground">
                Payments are processed securely. Refunds are considered for cancellations within 24 hours of booking.
              </div>
            </details>
            <details className="rounded-md border px-4 py-3">
              <summary className="cursor-pointer font-medium">Mentorship Sessions</summary>
              <div className="mt-2 text-sm text-muted-foreground">
                You can book paid/free sessions depending on mentor availability. Session links are shared via email.
              </div>
            </details>
            <details className="rounded-md border px-4 py-3">
              <summary className="cursor-pointer font-medium">Technical Issues</summary>
              <div className="mt-2 text-sm text-muted-foreground">
                Try refreshing the page or using a different browser. If issues persist, contact support with screenshots.
              </div>
            </details>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
