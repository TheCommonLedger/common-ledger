import Link from "next/link";
import matter from "gray-matter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
};

type GitHubContentItem = {
  name: string;
  type: "file" | "dir";
  download_url: string | null;
};

async function getArticlesFromGitHub(): Promise<Article[]> {
  const repo = process.env.GITHUB_REPO; // e.g. "TheCommonLedger/common-ledger"
  if (!repo) return [];

  const token = process.env.GITHUB_TOKEN;

  const listUrl = `https://api.github.com/repos/${repo}/contents/content/articles`;
  const listRes = await fetch(listUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!listRes.ok) return [];

  const items = (await listRes.json()) as GitHubContentItem[];

  const mdxFiles = items.filter(
    (x) => x.type === "file" && x.name.endsWith(".mdx") && x.download_url
  );

  const articles = await Promise.all(
    mdxFiles.map(async (f) => {
      const rawRes = await fetch(f.download_url!, { cache: "no-store" });
      const raw = await rawRes.text();
      const parsed = matter(raw);
      const data = (parsed.data ?? {}) as any;

      return {
        slug: f.name.replace(/\.mdx$/, ""),
        title: data.title ?? f.name.replace(/\.mdx$/, ""),
        subtitle: data.subtitle ?? "",
        author: data.author ?? "The Common Ledger",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
      } as Article;
    })
  );

  articles.sort((a, b) => (String(a.date) < String(b.date) ? 1 : -1));
  return articles;
}

export default async function Home() {
  const repoMissing = !process.env.GITHUB_REPO;
  const articles = await getArticlesFromGitHub();

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">The Common Ledger</h1>
        <p className="mt-3 text-lg text-gray-600">
          Truth-first reporting. Rhetoric stripped away.
        </p>
      </header>

      {repoMissing ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
          <div className="font-semibold">Missing GITHUB_REPO</div>
          <p className="mt-2">
            Add <code>GITHUB_REPO</code> in Vercel → Project → Settings →
            Environment Variables.
          </p>
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
