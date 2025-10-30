// src/app/exam/[category]/apply/page.js
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import ExamApplicationForm from "../../../../components/forms/ExamApplicationForm";
import Button from "../../../../components/ui/Button";
import UpscForm from "../../../../components/exams/UpscForm";
import SscForm from "../../../../components/exams/SscForm";
import BankForm from "../../../../components/exams/BankForm";
import EngMedForm from "../../../../components/exams/EngMedForm";

export default function ApplyPage() {
  const { category: categoryParam } = useParams();
  const category = (categoryParam || "").toLowerCase();

  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/exams" className="hover:underline">Exams</Link>
        <span className="mx-1">/</span>
        <Link href={`/exam/${category}`} className="hover:underline">{category?.toUpperCase() || "Exam"}</Link>
        <span className="mx-1">/</span>
        Apply
      </div>

      <h1 className="text-3xl font-semibold tracking-tight mb-4">Apply for {category?.toUpperCase() || "Exam"}</h1>

      {category === "upsc" && <UpscForm />}
      {category === "ssc" && <SscForm />}
      {category === "bank" && <BankForm />}
      {(category === "engineering-medical" || category === "jee" || category === "neet") && <EngMedForm />}
      {!["upsc","ssc","bank","engineering-medical","jee","neet"].includes(category) && (
        <ExamApplicationForm category={category || "upsc"} />
      )}

      <div className="mt-6">
        <Button href={`/exam/${category}`} variant="secondary">Back</Button>
      </div>
    </motion.div>
  );
}
