export const runtime = "nodejs";

import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
};

function getArticles(): Article[] {
  const dir = path.join(process.cwd(), "content", "articles");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = matter(raw);
    const data = (parsed.data ?? {}) as any;

    return {
      slug,
      title: data.title ?? slug,
      subtitle: data.subtitle ?? "",
      author: data.author ?? "The Common Ledger",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function Home() {
  const articles = getArticles();

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">The Common Ledger</h1>
        <p className="mt-3 text-lg text-gray-600">
          Truth-first reporting. Rhetoric stripped away.
        </p>
      </header>

      <section className="grid gap-4">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 p-6 text-gray-700">
            No articles yet. Add a file to <code>content/articles</code>.
          </div>
        ) : (
          articles.map((a) => (
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
                {a.tags?.length ? (
                  <>
                    <span>•</span>
                    <span className="flex flex-wrap gap-2">
                      {a.tags.map((t: string) => (
                        <span
                          key={t}
                          className="rounded-full border border-gray-200 px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </>
                ) : null}
              </div>
            </article>
          ))
        )}
      </section>

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} The Common Ledger
      </footer>
    </main>
  );
}
