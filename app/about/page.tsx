import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export const runtime = "nodejs";

const ABOUT_PATH = path.join(process.cwd(), "contents", "pages", "about.mdx");

export default function AboutPage() {
  if (!fs.existsSync(ABOUT_PATH)) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-bold tracking-tight">About</h1>
        <p className="mt-3 text-neutral-600">
          About page content not found. Create: <code>contents/pages/about.mdx</code>
        </p>
      </main>
    );
  }

  const raw = fs.readFileSync(ABOUT_PATH, "utf8");
  const parsed = matter(raw);
  const data = (parsed.data ?? {}) as any;

  const title = data.title ?? "About";
  const subtitle = data.subtitle ?? "";
  const html = marked.parse(parsed.content ?? "");

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-lg text-neutral-600">{subtitle}</p>
        ) : null}
      </header>

      <article
        className="tcl-article prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
