// src/app/admissions/page.js
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Building2, Landmark } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <motion.div
      className="mx-auto max-w-7xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Admissions</h1>
      <p className="text-muted-foreground mb-8">Guidance for applications to private and government colleges.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center gap-3">
            <Building2 className="h-5 w-5" aria-hidden="true" />
            <div>
              <CardTitle>Private Colleges</CardTitle>
              <CardDescription>Application timelines, scholarships, and interview prep.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button href="/admissions/private">Explore Private</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-3">
            <Landmark className="h-5 w-5" aria-hidden="true" />
            <div>
              <CardTitle>Government Colleges</CardTitle>
              <CardDescription>Counseling processes, quotas, and document verification.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button href="/admissions/government" variant="secondary">Explore Government</Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
