import { NextResponse } from "next/server";
import matter from "gray-matter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GitHubContentItem = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
};

export async function GET() {
  const repo = process.env.GITHUB_REPO; // e.g. "TheCommonLedger/common-ledger"
  if (!repo) {
    return NextResponse.json(
      { error: "Missing GITHUB_REPO env var (e.g. TheCommonLedger/common-ledger)" },
      { status: 500 }
    );
  }

  const token = process.env.GITHUB_TOKEN;

  const listUrl = `https://api.github.com/repos/${repo}/contents/content/articles`;

  const listRes = await fetch(listUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!listRes.ok) {
    // Keep the error response extremely simple for build/runtime compatibility
    return NextResponse.json(
      { error: "GitHub list failed", status: listRes.status },
      { status: 500 }
    );
  }

  const items = (await listRes.json()) as GitHubContentItem[];

  const mdxFiles = items.filter(
    (x) => x.type === "file" && x.name.endsWith(".mdx") && x.download_url
  );

  const articles = await Promise.all(
    mdxFiles.map(async (f) => {
      const rawRes = await fetch(f.download_url as string, { cache: "no-store" });
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
      };
    })
  );

  articles.sort((a, b) => (String(a.date) < String(b.date) ? 1 : -1));

  return NextResponse.json({ articles });
}
