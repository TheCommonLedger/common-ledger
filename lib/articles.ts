import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "Content", "Articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  author?: string;
  date: string;
  tags?: string[];
  excerpt?: string;
};

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: (data as any).title ?? slug,
      subtitle: (data as any).subtitle ?? "",
      author: (data as any).author ?? "The Common Ledger",
      date: (data as any).date ?? "1970-01-01",
      tags: (data as any).tags ?? [],
      excerpt: (data as any).excerpt ?? "",
    } as ArticleMeta;
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}
