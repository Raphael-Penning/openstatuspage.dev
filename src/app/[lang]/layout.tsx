import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Analytics } from "@/components/analytics";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const skipLabel = { en: "Skip to content", de: "Zum Inhalt springen" } as const;

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

/** Site-wide defaults; every page sets its own title, canonical and hreflang. */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  applicationName: site.name,
  creator: "Raphael Penning",
  authors: [{ name: "Raphael Penning", url: site.github }],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Search Console / Bing Webmaster Tools: set the tokens at build time to emit the meta tags.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link rel="ard" type="application/json" href="/.well-known/ard.json" />
      </head>
      <body className="min-h-dvh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-accent-strong px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {skipLabel[lang]}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
