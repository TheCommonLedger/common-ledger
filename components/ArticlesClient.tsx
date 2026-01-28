"use client";

import { useState } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import type { ArticleMeta } from "../lib/articles";

type Props = {
  articles: ArticleMeta[];
};

export default function ArticlesClient({ articles }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const tags = Array.from(
  new Set(
    articles.flatMap((a) => a.tags ?? [])
  )
).sort((a, b) => a.localeCompare(b));

const filteredArticles = articles.filter((a) => {
  const matchesQuery = `${a.title} ${a.subtitle ?? ""} ${a.excerpt ?? ""} ${(a.tags ?? []).join(" ")}`
    .toLowerCase()
    .includes(query.toLowerCase());

  const matchesTag =
    activeTag === "All" ? true : (a.tags ?? []).includes(activeTag);

  return matchesQuery && matchesTag;
});

  return (
    <>
      <input
        type="text"
        placeholder="Search articles…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-6 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400
"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("All")}
          className={
            activeTag === "All"
              ? "rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white"
              : "rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
    }
  >
    All
  </button>

  {tags.map((t) => (
    <button
      key={t}
      type="button"
      onClick={() => setActiveTag(t)}
      className={
        activeTag === t
          ? "rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white"
          : "rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
      }
    >
      {t}
    </button>
  ))}
</div>

      <section className="mt-8">
        {filteredArticles.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-700">
            No matching articles.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredArticles.map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
