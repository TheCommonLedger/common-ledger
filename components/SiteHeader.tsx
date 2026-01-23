import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
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
        <Link className="text-neutral-700 hover:underline" href="/about">
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
  );
}
