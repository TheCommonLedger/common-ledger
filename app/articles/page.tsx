import Link from "next/link";
import ArticleCard from "../../components/ArticleCard";
import { getAllArticles } from "../../lib/articles";

export const metadata = {
  title: "Articles · The Common Ledger",
  description: "Browse all articles from The Common Ledger.",
};

function safeTime(dateStr?: string) {
  if (!dateStr) return 0;
  const t = Date.parse(dateStr);
  return Number.isNaN(t) ? 0 : t;
}

export default function ArticlesIndexPage() {
  const articles = getAllArticles()
    .slice()
    .sort((a, b) => safeTime(b.date) - safeTime(a.date));

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
      </section>

      <section className="mt-8">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-neutral-700">
            No articles yet. Add an MDX file in <code>Content/Articles</code>.
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                All Articles
              </h2>
              <Link
                href="/"
                className="text-sm font-semibold text-neutral-700 hover:underline"
              >
                Back to Home →
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {articles.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
