import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const meta = {
  en: {
    title: "OpenStatusPage — the self-hosted, open-source status page",
    description:
      "Keep your customers informed without exposing your infrastructure. Compose public services from Icinga 2, Uptime Kuma, openITCockpit or webhooks. Self-hosted, AGPL-3.0.",
  },
  de: {
    title: "OpenStatusPage — die selbst gehostete Open-Source-Statusseite",
    description:
      "Informiere deine Kunden, ohne deine Infrastruktur offenzulegen. Öffentliche Dienste aus Icinga 2, Uptime Kuma, openITCockpit oder Webhooks zusammensetzen. Selbst gehostet, AGPL-3.0.",
  },
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const m = hasLocale(lang) ? meta[lang] : meta.en;
  return {
    metadataBase: new URL(site.url),
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", de: "/de", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: site.name,
      title: m.title,
      description: m.description,
      images: [{ url: `/screenshots/overview-dark-${lang}.png`, width: 2880, height: 1800 }],
      locale: lang === "de" ? "de_DE" : "en_US",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-bg text-fg">{children}</body>
    </html>
  );
}
