// src/app/mentorship/book/page.js
"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";

export default function BookMentorPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Book a Mentor</h1>
      <p className="text-muted-foreground mb-8">Choose a session type and get personalized guidance.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Free Discovery Call</CardTitle>
            <CardDescription>10–15 min • Understand your needs and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Quick orientation—figure out your next steps.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book Slot</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">1:1 Strategy Session</CardTitle>
            <CardDescription>45–60 min • Deep dive, plan & resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Get a personalized plan and clear action items.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="secondary">Book Slot</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Check-ins</CardTitle>
            <CardDescription>Accountability • Progress tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Stay consistent with short weekly syncs.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <Button href="/mentorship">Browse Mentors</Button>
      </div>
    </motion.div>
  );
}
