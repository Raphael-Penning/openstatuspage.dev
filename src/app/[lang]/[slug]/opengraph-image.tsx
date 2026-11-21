import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { allSlugs, pageFromSlug } from "@/lib/routes";
import { ogContentType, ogImage, ogSize, ogText } from "@/lib/og";
import { guides } from "@/content/guides";
import { legalContent } from "@/content/legal";

export const alt = "OpenStatusPage — self-hosted, open-source status page";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return locales.flatMap((lang) => allSlugs(lang).map((slug) => ({ lang, slug })));
}

const legalEyebrow = { en: "Legal", de: "Rechtliches" } satisfies Record<Locale, string>;

/** Per-page social card: guide or legal page title on the branded background. */
export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const page = pageFromSlug(slug, lang);
  if (page?.kind === "guide") {
    const g = guides[page.page][lang];
    return ogImage({ title: g.title, eyebrow: g.eyebrow, ...ogText[lang] });
  }
  const title = page ? legalContent[page.page][lang].title : "OpenStatusPage";
  return ogImage({ title, eyebrow: legalEyebrow[lang], ...ogText[lang] });
}
