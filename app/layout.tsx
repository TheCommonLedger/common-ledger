import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Common Ledger",
  description: "Truth-first reporting. Rhetoric stripped away.",
  openGraph: {
    title: "The Common Ledger",
    description: "Truth-first reporting. Rhetoric stripped away.",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Common Ledger",
    description: "Truth-first reporting. Rhetoric stripped away.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-6xl px-5 py-10">
          <SiteHeader />
        </div>

        {children}
        <div className="mx-auto max-w-6xl px-5 pb-10">
    <SiteFooter />
  </div>
      </body>
    </html>
  );
}
