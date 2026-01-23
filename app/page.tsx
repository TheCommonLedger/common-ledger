import Image from "next/image";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import { getAllArticles } from "../lib/articles";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles[0] ?? null;
  const latest = articles.slice(1, 7);

  return (
    <main className="mx-auto max-w-6xl px-5 pb-10">
                                                                                                                                  
      {/* Hero */}
      <section className="mt-10 grid gap-6 rounded-3xl border border-neutral-200 bg-white p-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Truth. Without the noise.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            The Common Ledger breaks down what happened, what’s verifiable, and what it means —
            without partisan spin.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Browse Articles
            </Link>

            {featured?.slug ? (
              <Link
                href={`/articles/${featured.slug}`}
                className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900"
              >
                Read Featured
              </Link>
            ) : (
              <span className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-400">
                Featured (coming soon)
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-600">
            <span className="rounded-full bg-neutral-100 px-3 py-1">Plain language</span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">Receipts first</span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">No theatrics</span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">Respectful tone</span>
          </div>
        </div>

        {/* Badge / standard panel */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="text-xs tracking-[0.22em] text-neutral-500">OUR STANDARD</div>
          <div className="mt-2 text-2xl font-semibold text-neutral-900">
            Evidence → Context → Clarity
          </div>
          <p className="mt-3 text-sm text-neutral-700">
            If we can’t verify it, we don’t present it as fact.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <Image
                src="/brand/badge.png"
                alt="The Common Ledger Badge"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="text-sm text-neutral-700">
              <div className="font-semibold text-neutral-900">Truth-first</div>
              <div className="text-neutral-600">Rhetoric stripped away</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-neutral-900">Featured</h2>
          <Link href="/articles" className="text-sm font-semibold text-neutral-700 hover:underline">
            View all →
          </Link>
        </div>

        {featured ? (
          <div className="mt-4">
            <ArticleCard a={featured} />
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-700">
            No articles yet.
          </div>
        )}
      </section>

      {/* Latest */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-900">Latest</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {latest.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </section>

      {/* Trust principles */}
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Receipts-first",
            body: "We separate confirmed facts from claims and clearly label uncertainty.",
          },
          {
            title: "Plain language",
            body: "No insider jargon. If a first-time reader can’t follow it, we rewrite it.",
          },
          {
            title: "No partisan theater",
            body: "We criticize actions and ideas without demonizing people.",
          },
        ].map((x) => (
          <div key={x.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="text-base font-semibold text-neutral-900">{x.title}</div>
            <div className="mt-2 text-sm text-neutral-700">{x.body}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-14 border-t border-neutral-200 pt-8 text-sm text-neutral-600">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} The Common Ledger</div>
          <div className="flex gap-4">
            <Link className="hover:underline" href="/articles">
              Articles
            </Link>
            <Link className="hover:underline" href="/about">
              About
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
