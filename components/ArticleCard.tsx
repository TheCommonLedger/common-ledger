import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "../lib/articles";

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ArticleCard({ a }: { a: ArticleMeta }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 hover:bg-neutral-50">
      {/* Cover image (only shows if the article has image: ... in front matter) */}
      {a.image ? (
        <div className="relative mb-5 h-72 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <Image
          src={a.image}
          alt={a.title}
          fill
          className="object-contain"
          quality={95}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    ) : null}

      <h3 className="text-xl font-semibold text-neutral-900">
        <Link href={`/articles/${a.slug}`} className="hover:underline">
          {a.title}
        </Link>
      </h3>

      {a.subtitle ? <p className="mt-1 text-neutral-600">{a.subtitle}</p> : null}

      {a.excerpt ? <p className="mt-3 text-neutral-700">{a.excerpt}</p> : null}

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <span>{a.author ?? "The Common Ledger"}</span>
        {a.date ? (
          <>
            <span>•</span>
            <span>{formatDate(a.date)}</span>
          </>
        ) : null}
      </div>
    </article>
  );
}
