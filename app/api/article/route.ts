import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const articlesDir = path.join(process.cwd(), "content", "articles");
  const filePath = path.join(articlesDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  const data = parsed.data ?? {};
  const content = parsed.content ?? "";
  const html = marked.parse(content);

  return NextResponse.json({
    slug,
    meta: {
      title: data.title ?? "Untitled",
      subtitle: data.subtitle ?? "",
      author: data.author ?? "The Common Ledger",
      date: data.date ?? "1970-01-01",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
    },
    html,
  });
}
