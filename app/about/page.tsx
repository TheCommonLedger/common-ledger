import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About · The Common Ledger",
  description: "Truth-first reporting. Rhetoric stripped away.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      {/* Top bar (simple, matches homepage) */}
      <header className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-neutral-200 bg-white">
            <Image
              src="/brand/logo.png"
              alt="The Common Ledger"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-xs tracking-[0.22em] text-neutral-500">THE COMMON LEDGER</div>
            <div className="text-base font-semibold text-neutral-900">Truth-first reporting</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-700 hover:underline" href="/articles">
            Articles
          </Link>
          <Link className="text-neutral-900 font-semibold hover:underline" href="/about">
            About
          </Link>
          <Link
            className="rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white"
            href="/articles"
          >
            Read
          </Link>
        </nav>
      </header>

      {/* Page header */}
      <section className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">About</h1>
        <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
          The Common Ledger is a truth-first news and explainer platform. We aim to present facts clearly,
          separate confirmed information from claims, and strip away partisan rhetoric so readers can think
          and decide for themselves.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-600">
          <span className="rounded-full bg-neutral-100 px-3 py-1">Evidence-driven</span>
          <span className="rounded-full bg-neutral-100 px-3 py-1">Plain language</span>
          <span className="rounded-full bg-neutral-100 px-3 py-1">Respectful tone</span>
          <span className="rounded-full bg-neutral-100 px-3 py-1">No theatrics</span>
        </div>
      </section>

      {/* Standards */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Receipts-first",
            body: "We prioritize primary sources and verifiable reporting. When something can’t be confirmed, we label it clearly.",
          },
          {
            title: "Context matters",
            body: "We add essential background so readers understand what led up to an event and what the real stakes are.",
          },
          {
            title: "Clarity over clicks",
            body: "We write for real people. If a first-time reader can’t follow it, we rewrite it until they can.",
          },
        ].map((x) => (
          <div key={x.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
            <div className="text-base font-semibold text-neutral-900">{x.title}</div>
            <div className="mt-2 text-sm text-neutral-700">{x.body}</div>
          </div>
        ))}
      </section>

      {/* What you can expect */}
      <section className="mt-8 rounded-3xl border border-neutral-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-neutral-900">What you can expect</h2>

        <ul className="mt-4 space-y-3 text-neutral-700">
          <li>
            <span className="font-semibold text-neutral-900">Straight facts:</span> We separate what’s known,
            what’s alleged, and what’s unknown.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">Plain explanations:</span> We break down processes
            (elections, courts, legislation, policy) step-by-step.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">Neutral tone:</span> We avoid demonizing language and
            focus on actions, outcomes, and documentation.
          </li>
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/articles"
            className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Browse Articles
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-14 border-t border-neutral-200 pt-8 text-sm text-neutral-600">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
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
    </main>
  );
}
