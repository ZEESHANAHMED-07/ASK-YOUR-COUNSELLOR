// src/app/forms/page.js
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "../../components/ui/Button";

export default function FormsPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Form Fill-up Help</h1>
      <p className="text-muted-foreground mb-8">
        Step-by-step guides, checklists, and official links to make applications effortless.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Step-by-step Guides</CardTitle>
            <CardDescription>Clear walkthroughs for common exam and admission forms.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>UPSC Application – draft to submission</li>
              <li>SSC Registration – document upload tips</li>
              <li>Bank Exams Online Form – payment & photo/sign sizing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Checklists (PDF)</CardTitle>
            <CardDescription>Download and keep offline while filling forms.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" title="Coming soon" className="hover:underline">Generic Form Checklist (PDF)</a>
              </li>
              <li>
                <a href="#" title="Coming soon" className="hover:underline">UPSC Required Documents (PDF)</a>
              </li>
              <li>
                <a href="#" title="Coming soon" className="hover:underline">SSC Photo & Signature Specs (PDF)</a>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Mistakes & Solutions</CardTitle>
            <CardDescription>Save time and avoid rejections.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Wrong category/reservation selection</li>
              <li>Incorrect photo/signature dimensions</li>
              <li>Name mismatch with ID proof</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Official Links</CardTitle>
            <CardDescription>Direct portals for reliable and up-to-date information.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <a href="https://upsconline.nic.in" target="_blank" rel="noopener noreferrer" className="hover:underline">UPSC Online Application</a>
              <a href="https://www.upsc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">UPSC Official Website</a>
              <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">SSC Official Portal</a>
              <a href="https://www.ibps.in" target="_blank" rel="noopener noreferrer" className="hover:underline">IBPS Official Portal</a>
              <a href="https://jeemain.nta.ac.in" target="_blank" rel="noopener noreferrer" className="hover:underline">JEE Main (NTA)</a>
              <a href="https://exams.nta.ac.in/NEET" target="_blank" rel="noopener noreferrer" className="hover:underline">NEET (NTA)</a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button href="/mentorship">Need help? Get 1:1 mentorship</Button>
      </div>
    </motion.div>
  );
}
