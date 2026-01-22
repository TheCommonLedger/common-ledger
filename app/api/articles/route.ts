import { NextResponse } from "next/server";
import matter from "gray-matter";

export const runtime = "nodejs";

const VERSION = "api-articles-v2";

type GitHubContentItem = {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
};

const repo = process.env.GITHUB_REPO;

if (!repo) {
  return NextResponse.json(
    {
      version: VERSION,
      error: "Missing GITHUB_REPO env var (e.g. corym/common-ledger)",
      probe: process.env.PROBE ?? null,
      nodeEnv: process.env.NODE_ENV ?? null,
    },
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
    // Always fresh so new pushes show up
    cache: "no-store",
  });

  if (!listRes.ok) {
    const text = await listRes.text();
    return NextResponse.json(
      { error: `GitHub list failed: ${listRes.status}`, detail: text },
      { status: 500 }
    );
  }

  const items = (await listRes.json()) as GitHubContentItem[];
  const mdxFiles = items
    .filter((x) => x.type === "file" && x.name.endsWith(".mdx") && x.download_url)
    .map((x) => ({ name: x.name, download_url: x.download_url! }));

  // Fetch and parse frontmatter for each file
  const articles = await Promise.all(
    mdxFiles.map(async (f) => {
      const rawRes = await fetch(f.download_url, { cache: "no-store" });
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

  // Sort newest first if dates are present
  articles.sort((a, b) => (String(a.date) < String(b.date) ? 1 : -1));

  return NextResponse.json({ articles });
}
