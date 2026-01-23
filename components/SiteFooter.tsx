import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-neutral-200 pt-10">
      {/* Follow / Newsletter box */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-8">
        <div className="text-xs tracking-[0.22em] text-neutral-500">STAY CONNECTED</div>
        <h3 className="mt-2 text-2xl font-semibold text-neutral-900">
          Follow The Common Ledger
        </h3>
        <p className="mt-2 text-neutral-700 max-w-2xl">
          Truth-first reporting and plain-language explainers. Follow for new posts and updates.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
        <a
          className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white"
          href="https://www.tiktok.com/@the.common.ledger"
          target="_blank"
          rel="noreferrer"
        >
          TikTok
        </a>
        <a
          className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900"
          href="https://x.com/TheCommonLedger"
          target="_blank"
          rel="noreferrer"
        >
          X
        </a>
        <a
          className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900"
          href="https://www.facebook.com/TheCommonLedger"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
        </div>

        {/* Simple “newsletter” placeholder without backend */}
        <div className="mt-7 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="text-sm font-semibold text-neutral-900">Newsletter (coming soon)</div>
          <div className="mt-1 text-sm text-neutral-700">
            Want email updates? We’ll add this once the signup provider is chosen.
          </div>
        </div>
      </section>

      {/* Bottom links */}
      <div className="mt-10 flex flex-col gap-2 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} The Common Ledger</div>
        <div className="flex gap-4">
          <Link className="hover:underline" href="/articles">
            Articles
          </Link>
          <Link className="hover:underline" href="/about">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
