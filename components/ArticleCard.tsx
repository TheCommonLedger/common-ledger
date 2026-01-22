import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ArticleCard({ a }: { a: ArticleMeta }) {
  const date = formatDate(a.date);

  return (
    <Link
      href={`/articles/${a.slug}`}
      className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs text-neutral-500">
          <span>{a.author ?? "The Common Ledger"}</span>
          {date ? <span> · {date}</span> : null}
        </div>

        <h3 className="text-lg font-semibold text-neutral-900">{a.title}</h3>

        {a.subtitle ? <p className="text-sm text-neutral-700">{a.subtitle}</p> : null}

        {a.excerpt ? <p className="mt-2 text-sm text-neutral-600">{a.excerpt}</p> : null}

        {a.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
