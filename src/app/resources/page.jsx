"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

export default function ResourcesPage() {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Read folder from the URL on the client; default to 'resources'
  const folder = useMemo(() => {
    if (typeof window === "undefined") return "resources";
    const qp = new URLSearchParams(window.location.search);
    return qp.get("folder") || "resources";
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  const load = useCallback(
    async (cursor = null) => {
      setLoading(true);
      setError("");
      try {
        const url = new URL("/api/resources", window.location.origin);
        url.searchParams.set("folder", folder);
        url.searchParams.set("max", "24");
        if (cursor) url.searchParams.set("next", cursor);

        const res = await fetch(url.toString(), { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load");

        const newItems = Array.isArray(json.items) ? json.items : [];
        setItems((prev) => (cursor ? [...prev, ...newItems] : newItems));
        setNext(json.next_cursor || null);
      } catch (e) {
        setError(e?.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    },
    [folder]
  );

  // Reset list when folder changes and load first page
  useEffect(() => {
    setItems([]);
    setNext(null);
    load(null);
  }, [folder, load]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Resources</h1>
        <p className="text-sm text-gray-500">
          Listing from folder: <span className="font-mono">{folder}</span>
        </p>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {loading && items.length === 0 ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => {
            const name = (it.filename || it.public_id?.split("/").pop() || "file").toString();
            const sizeKb = Math.max(1, Math.round((it.bytes || 0) / 1024));
            const created =
              it.created_at ? new Date(it.created_at).toLocaleString() : "";

            return (
              <div
                key={it.public_id}
                className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500">{created}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-md bg-gray-50 border text-gray-700">
                    {sizeKb} KB
                  </span>
                </div>

                <div className="mt-3 flex gap-3">
                  <a
                    href={it.secure_url || it.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    View
                  </a>
                  <a
                    href={it.download_url || it.secure_url || it.url}
                    className="text-blue-600 text-sm underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </div>

                <div className="mt-2 text-[11px] text-gray-500">
                  <span className="mr-2">type: {it.resource_type}</span>
                  {it.format && <span>format: {it.format}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-2">
        {next && (
          <button
            onClick={() => load(next)}
            disabled={loading}
            className="px-4 py-2 rounded-lg border text-sm disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}