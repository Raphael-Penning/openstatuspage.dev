import { locales, type Locale } from "./i18n";
import { site } from "./site";

/** Legal pages with a localized slug per language. */
export const legalPages = {
  imprint: { en: "imprint", de: "impressum" },
  privacy: { en: "privacy", de: "datenschutz" },
} as const satisfies Record<string, Record<Locale, string>>;

export type LegalPage = keyof typeof legalPages;

export const legalPath = (page: LegalPage, lang: Locale) => `/${lang}/${legalPages[page][lang]}`;

/** Find which legal page a slug belongs to, for the given language. */
export const legalPageFromSlug = (slug: string, lang: Locale): LegalPage | undefined =>
  (Object.keys(legalPages) as LegalPage[]).find((p) => legalPages[p][lang] === slug);

/** Same page in every language, used for the language switch and hreflang. */
export type Alternates = Record<Locale, string>;

export const homeAlternates: Alternates = { en: "/en", de: "/de" };

export const legalAlternates = (page: LegalPage): Alternates =>
  Object.fromEntries(locales.map((l) => [l, legalPath(page, l)])) as Alternates;

/** Turns an in-page anchor (#features) into a link that works from any page. */
export const anchor = (href: string, lang: Locale) =>
  href.startsWith("#") ? `/${lang}${href}` : href;

export const absolute = (path: string) => `${site.url}${path}`;

/** All indexable pages, for the main sitemap. */
export const indexablePages = (): { alternates: Alternates; priority: number }[] => [
  { alternates: homeAlternates, priority: 1 },
  { alternates: legalAlternates("imprint"), priority: 0.2 },
  { alternates: legalAlternates("privacy"), priority: 0.2 },
];
