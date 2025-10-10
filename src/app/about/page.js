// src/app/about/page.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";

const team = [
  { name: "Anika Sharma", role: "Founder • Mentor", img: "/images/team-anika.jpg" },
  { name: "Rahul Verma", role: "Exam Strategist", img: "/images/team-rahul.jpg" },
  { name: "Meera N.", role: "Admissions Coach", img: "/images/team-meera.jpg" },
];

export default function AboutPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">About Us</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          We started AskYourCounsellor to give students practical, premium guidance—without the noise.
          Clear mentorship, proven exam strategies, and honest admissions help.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>Why we started this</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/90">
              We saw ambitious students wasting time on scattered advice. We decided to build a place that brings
              clarity—expert mentorship, structured plans, and trusted resources to help you move faster.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission & Vision</CardTitle>
            <CardDescription>What drives us</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Make top-tier guidance accessible.</li>
              <li>Turn confusion into clear action.</li>
              <li>Build confident, independent learners.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Team & Mentors</h2>
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
                <p className="text-sm text-muted-foreground">Experienced, empathetic mentors focused on real outcomes.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
