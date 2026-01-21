"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type ArticleResponse = {
  slug: string;
  meta: {
    title: string;
    subtitle?: string;
    author?: string;
    date: string;
    excerpt?: string;
    tags?: string[];
  };
  html: string;
  error?: string;
};

export default function Page() {
  const pathname = usePathname();

  const slug = useMemo(() => {
    // pathname like "/articles/sample-article"
    const parts = (pathname ?? "").split("/").filter(Boolean);
    return parts.length >= 2 ? parts[1] : "";
  }, [pathname]);

  const [data, setData] = useState<ArticleResponse | null>(null);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    (async () => {
      setErr("");
      setData(null);

      const res = await fetch(`/api/article?slug=${encodeURIComponent(slug)}`);
      const json = (await res.json()) as ArticleResponse;

      if (!res.ok) {
        setErr(json?.error ?? "Failed to load article");
        return;
      }

      setData(json);
    })();
  }, [slug]);

  if (!slug) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Could not read article slug from URL.</h1>
      </main>
    );
  }

  if (err) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-2xl font-bold">Article could not load</h1>
        <p className="mt-3 text-gray-700">Slug: {slug}</p>
        <pre className="mt-4 rounded-lg border p-4 text-sm">{err}</pre>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-gray-600">Loading article…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{data.meta.title}</h1>

        {data.meta.subtitle ? (
          <p className="mt-2 text-lg text-gray-600">{data.meta.subtitle}</p>
        ) : null}

        <div className="mt-4 text-sm text-gray-500">
          <span>{data.meta.author ?? "The Common Ledger"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(data.meta.date).toLocaleDateString()}</span>
        </div>
      </header>

      <article
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </main>
  );
}
