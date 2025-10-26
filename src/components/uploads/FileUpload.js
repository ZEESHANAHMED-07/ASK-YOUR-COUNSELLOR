"use client";

import { useState } from "react";

export default function FileUpload({ label = "Upload", folder = "askyourcounsellor/uploads", onChange, onFilesChange, accept = "*/*", multiple = false, maxFiles = 5 }) {
  const [items, setItems] = useState([]); // { name, file }

  async function handleFilesSelected(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const toUpload = multiple ? files.slice(0, maxFiles) : files.slice(0, 1);

    const results = toUpload.map((f) => ({ name: f.name, file: f }));
    const next = multiple ? [...items, ...results] : results;
    setItems(next);
    if (onFilesChange) onFilesChange(next.map((r) => r.file));
    if (onChange) onChange([]);
    e.target.value = "";
  }

  function removeAt(i) {
    const next = items.filter((_, idx) => idx !== i);
    setItems(next);
    if (onFilesChange) onFilesChange(next.map((r) => r.file));
    if (onChange) onChange([]);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <input type="file" accept={accept} multiple={multiple} onChange={handleFilesSelected} disabled={false} className="w-full rounded-md border bg-background px-3 py-2 outline-ring/50" />
      {items.length > 0 && (
        <ul className="space-y-1 text-sm">
          {items.map((it, i) => (
            <li key={i} className="flex items-center justify-between gap-3">
              <span className="truncate">{it.name}</span>
              <button type="button" className="text-xs text-muted-foreground hover:underline" onClick={() => removeAt(i)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted-foreground">Files will be uploaded when you submit the form.</p>
    </div>
  );
}
