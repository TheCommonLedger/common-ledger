import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About · The Common Ledger",
  description: "Truth-first reporting. Rhetoric stripped away.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-10">
      
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
    </main>
  );
}
