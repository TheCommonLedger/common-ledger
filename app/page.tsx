"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);

        const res = await fetch("/api/articles", { cache: "no-store" });
        const json = await res.json();

        if (!res.ok) {
          setErr(json?.error ?? "Failed to load articles");
          setArticles([]);
          return;
        }

        setArticles(json?.articles ?? []);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load articles");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">The Common Ledger</h1>
        <p className="mt-3 text-lg text-gray-600">
          Truth-first reporting. Rhetoric stripped away.
        </p>
      </header>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 p-6 text-gray-700">
          Loading articles…
        </div>
      ) : err ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
          <div className="font-semibold">Could not load articles</div>
          <pre className="mt-2 whitespace-pre-wrap text-sm">{err}</pre>
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-6 text-gray-700">
          No articles yet.
        </div>
      ) : (
        <section className="grid gap-4">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="rounded-2xl border border-gray-200 p-6 hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold">
                <Link href={`/articles/${a.slug}`}>{a.title}</Link>
              </h2>

              {a.subtitle ? (
                <p className="mt-1 text-gray-600">{a.subtitle}</p>
              ) : null}

              {a.excerpt ? (
                <p className="mt-3 text-gray-700">{a.excerpt}</p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <span>{a.author ?? "The Common Ledger"}</span>
                {a.date ? (
                  <>
                    <span>•</span>
                    <span>{new Date(a.date).toLocaleDateString()}</span>
                  </>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      )}

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} The Common Ledger
      </footer>
    </main>
  );
}
