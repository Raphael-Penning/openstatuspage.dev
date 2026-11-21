import type { Metadata } from "next";
import type { Locale } from "./i18n";
import type { Alternates } from "./routes";
import { site } from "./site";

export const ogLocale = (lang: Locale) => (lang === "de" ? "de_DE" : "en_US");

/** Page-level metadata with canonical, hreflang alternates and Open Graph. */
export function pageMetadata({
  lang,
  title,
  description,
  alternates,
  absoluteTitle = false,
  article,
}: {
  lang: Locale;
  title: string;
  description: string;
  alternates: Alternates;
  absoluteTitle?: boolean;
  /** Emit og:type=article with dates, author and tags. */
  article?: { published: string; modified: string; section: string; tags: string[] };
}): Metadata {
  const url = alternates[lang];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { en: alternates.en, de: alternates.de, "x-default": alternates.en },
    },
    openGraph: {
      ...(article
        ? {
            type: "article",
            publishedTime: `${article.published}T00:00:00Z`,
            modifiedTime: `${article.modified}T00:00:00Z`,
            authors: [site.github.replace(/\/[^/]+$/, "")],
            section: article.section,
            tags: article.tags,
          }
        : { type: "website" }),
      url,
      siteName: site.name,
      title,
      description,
      locale: ogLocale(lang),
      alternateLocale: [ogLocale(lang === "de" ? "en" : "de")],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
