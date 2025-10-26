"use client";

import { useMemo, useState } from "react";
import Button from "../ui/Button";
import FileUpload from "../uploads/FileUpload";
import { useAuthContext } from "../../app/config/providers/AuthProvider";

const EXAM_CONFIG = {
  upsc: {
    title: "UPSC Application",
    docs: [
      { key: "photo", label: "Passport Photo (JPEG/PNG)", accept: "image/*", multiple: false },
      { key: "signature", label: "Signature (JPEG/PNG)", accept: "image/*", multiple: false },
      { key: "id_proof", label: "ID Proof (PDF/Image)", accept: "image/*,application/pdf", multiple: false },
      { key: "category_cert", label: "Category Certificate (if applicable)", accept: "image/*,application/pdf", multiple: false },
    ],
  },
  ssc: {
    title: "SSC Application",
    docs: [
      { key: "photo", label: "Passport Photo", accept: "image/*", multiple: false },
      { key: "signature", label: "Signature", accept: "image/*", multiple: false },
      { key: "id_proof", label: "ID Proof (PDF/Image)", accept: "image/*,application/pdf", multiple: false },
    ],
  },
  bank: {
    title: "Bank Exam Application",
    docs: [
      { key: "photo", label: "Passport Photo", accept: "image/*", multiple: false },
      { key: "signature", label: "Signature", accept: "image/*", multiple: false },
      { key: "handwritten", label: "Handwritten Declaration (if required)", accept: "image/*,application/pdf", multiple: false },
      { key: "id_proof", label: "ID Proof (PDF/Image)", accept: "image/*,application/pdf", multiple: false },
    ],
  },
  "engineering-medical": {
    title: "JEE/NEET Application",
    docs: [
      { key: "photo", label: "Passport Photo", accept: "image/*", multiple: false },
      { key: "signature", label: "Signature", accept: "image/*", multiple: false },
      { key: "school_id", label: "School/College ID (optional)", accept: "image/*,application/pdf", multiple: false },
    ],
  },
};

export default function ExamApplicationForm({ category = "upsc" }) {
  const cfg = EXAM_CONFIG[category] || EXAM_CONFIG.upsc;
  const { user } = useAuthContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    state: "",
    documents: {}, // key -> array of URLs (filled after submit)
  });
  const [docFiles, setDocFiles] = useState({}); // key -> array<File>
  const [submitting, setSubmitting] = useState(false);

  function updateField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function onDocsFilesChange(key, files) {
    setDocFiles((prev) => ({ ...prev, [key]: files }));
  }

  const allDocKeys = useMemo(() => cfg.docs.map((d) => d.key), [cfg]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!user?.uid) {
        alert("Please sign in to submit your application.");
        return;
      }
      const data = new FormData();
      data.append("category", category);
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("age", form.age);
      data.append("city", form.city);
      data.append("state", form.state);
      data.append("folder", `askyourcounsellor/${category}`);
      data.append("userId", user.uid);

      // Append files under names like docs_photo, docs_signature
      for (const key of Object.keys(docFiles)) {
        const arr = docFiles[key] || [];
        for (const f of arr) {
          data.append(`docs_${key}`, f);
        }
      }

      const res = await fetch("/api/applications", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.error || "Failed to submit application");

      const uploaded = json.uploads || {};
      // Map back to documents URLs for UI continuity
      const docsUrls = Object.fromEntries(
        Object.entries(uploaded).map(([k, arr]) => [k.replace(/^docs_/, ''), (arr || []).map((x) => x.url)])
      );
      setForm((prev) => ({ ...prev, documents: { ...prev.documents, ...docsUrls } }));

      alert("Application submitted successfully.");
      // Reset minimal
      setForm((prev) => ({ ...prev, name: "", email: "", phone: "", age: "", city: "", state: "" }));
      setDocFiles({});
    } catch (err) {
      console.error(err);
      alert("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <header>
        <h2 className="text-2xl font-semibold">{cfg.title}</h2>
        <p className="text-sm text-muted-foreground">Fill your details and attach required documents. Files upload on submit.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
          <input id="name" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
          <input id="phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="age">Age</label>
          <input id="age" type="number" min="10" max="99" value={form.age} onChange={(e) => updateField("age", e.target.value)}
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
          <input id="city" value={form.city} onChange={(e) => updateField("city", e.target.value)}
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
          <input id="state" value={form.state} onChange={(e) => updateField("state", e.target.value)}
                 className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" />
        </div>
      </div>

      <div className="mt-2 grid gap-4">
        {cfg.docs.map((d) => (
          <FileUpload
            key={d.key}
            label={d.label}
            folder={`askyourcounsellor/${category}`}
            accept={d.accept}
            multiple={d.multiple}
            onFilesChange={(files) => onDocsFilesChange(d.key, files)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</Button>
        <Button href={`/exam/${category}`} variant="secondary">Back</Button>
      </div>
    </form>
  );
}
