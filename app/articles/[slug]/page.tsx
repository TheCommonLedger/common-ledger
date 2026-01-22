import { notFound } from "next/navigation";
import type { Metadata } from "next";
import matter from "gray-matter";
import { marked } from "marked";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ARTICLES_PATH = process.env.GITHUB_ARTICLES_PATH ?? "Content/Articles";

async function fetchArticleRaw(slug: string): Promise<string | null> {
const repo = process.env.GITHUB_REPO;

if (!repo) {
  console.log("[fetchArticleRaw] Missing env GITHUB_REPO");
  return null;
}

  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${repo}/contents/${ARTICLES_PATH}/${slug}.mdx`;
  console.log("[fetchArticleRaw] URL:", url);

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.raw",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
  const text = await res.text().catch(() => "");
  console.log("[fetchArticleRaw] GitHub fetch failed:", res.status, text.slice(0, 200));
  return null;
}
  return await res.text();
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const raw = await fetchArticleRaw(slug);
  if (!raw) return { title: "Article not found | The Common Ledger" };

  const parsed = matter(raw);
  const data = (parsed.data ?? {}) as any;

  const title = data.title ?? "The Common Ledger";
  const description =
    data.excerpt ?? data.subtitle ?? "Truth-first reporting. Rhetoric stripped away.";

  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(
    description
  )}`;

  return {
    title: `${title} | The Common Ledger`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const raw = await fetchArticleRaw(slug);
  if (!raw) return notFound();

  const parsed = matter(raw);
  const data = (parsed.data ?? {}) as any;
  const html = marked.parse(parsed.content ?? "");

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {data.title ?? "Untitled"}
        </h1>

        {data.subtitle ? (
          <p className="mt-2 text-lg text-gray-600">{data.subtitle}</p>
        ) : null}

        <div className="mt-4 text-sm text-gray-500">
          <span>{data.author ?? "The Common Ledger"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(data.date ?? "1970-01-01").toLocaleDateString()}</span>
        </div>
      </header>

      <article
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
