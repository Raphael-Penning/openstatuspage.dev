import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { ogContentType, ogImage, ogSize, ogText } from "@/lib/og";

export const alt = "OpenStatusPage — self-hosted, open-source status page";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const title = {
  en: "The status page that keeps your infrastructure private.",
  de: "Die Statusseite, die deine Infrastruktur privat hält.",
} satisfies Record<Locale, string>;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  return ogImage({ title: title[lang], ...ogText[lang] });
}
