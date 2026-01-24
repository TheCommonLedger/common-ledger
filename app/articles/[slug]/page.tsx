import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import matter from "gray-matter";
import { marked } from "marked";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ARTICLES_DIR = path.join(process.cwd(), "Content", "Articles");

function readArticleRaw(slug: string): string | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const raw = readArticleRaw(slug);
  if (!raw) return { title: "Article not found · The Common Ledger" };

  const parsed = matter(raw);
  const data = (parsed.data ?? {}) as any;

  const title = data.title ?? "The Common Ledger";
  const description =
    data.excerpt ?? data.subtitle ?? "Truth-first reporting. Rhetoric stripped away.";

  return {
    title: `${title} · The Common Ledger`,
    description,
  };
}

export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const raw = readArticleRaw(slug);
  if (!raw) return notFound();

  const parsed = matter(raw);
  const data = (parsed.data ?? {}) as any;
  const html = marked.parse(parsed.content ?? "");

  return (
    <main className="bg-[#f6f7f9] text-neutral-900">
      <div className="mx-auto max-w-3xl px-5 pb-10">
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
        <Link
          href="/articles"
          className="text-sm font-semibold text-neutral-700 hover:underline"
        >
          ← Back to Articles
        </Link>

        <header className="mt-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            {data.title ?? "Untitled"}
          </h1>

          {data.subtitle ? (
            <p className="mt-2 text-lg text-neutral-600">{data.subtitle}</p>
          ) : null}

          <div className="mt-4 text-sm text-neutral-500">
            <span>{data.author ?? "The Common Ledger"}</span>
            <span className="mx-2">•</span>
            <span>
              {new Date(data.date ?? "1970-01-01").toLocaleDateString()}
            </span>
          </div>
        </header>

        {/* Cover image */}
        {data.image ? (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
            <Image
              src={data.image}
              alt={data.title ?? "Article image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <article
          className="prose prose-neutral max-w-none prose-headings:tracking-tight prose-a:font-semibold prose-a:text-neutral-900"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        </div>
      </div>
    </main>
  );
}
