import Link from "next/link";
import { getAllArticles } from "../../lib/articles";
import ArticlesClient from "../../components/ArticlesClient";

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <main className="mx-auto max-w-6xl px-5 pb-10">
      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Articles
        </h1>
        <p className="mt-3 text-lg text-neutral-700">
          Browse all posts from The Common Ledger.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-600">
          <span className="rounded-full bg-neutral-100 px-3 py-1">
            Evidence → Context → Clarity
          </span>
          <span className="rounded-full bg-neutral-100 px-3 py-1">
            Truth-first
          </span>
          <span className="rounded-full bg-neutral-100 px-3 py-1">
            Plain language
          </span>
        </div>

        {/* CLIENT SEARCH + FILTER */}
        <ArticlesClient articles={articles} />
      </section>

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm font-semibold text-neutral-700 hover:underline"
        >
          Back to Home →
        </Link>
      </div>
    </main>
  );
}
