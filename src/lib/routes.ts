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

/** Guides: content pages that answer concrete questions, with a localized slug per language. */
export const guidePages = {
  alternatives: { en: "statuspage-alternatives", de: "statuspage-alternativen" },
  icinga: { en: "icinga-status-page", de: "icinga-statusseite" },
  uptimeKuma: { en: "uptime-kuma-status-page", de: "uptime-kuma-statusseite" },
} as const satisfies Record<string, Record<Locale, string>>;

export type GuidePage = keyof typeof guidePages;

export const guidePath = (page: GuidePage, lang: Locale) => `/${lang}/${guidePages[page][lang]}`;

export const guideKeys = Object.keys(guidePages) as GuidePage[];

/** Resolve a slug under /[lang]/ to a legal page or a guide. */
export function pageFromSlug(
  slug: string,
  lang: Locale,
): { kind: "legal"; page: LegalPage } | { kind: "guide"; page: GuidePage } | undefined {
  const legal = legalPageFromSlug(slug, lang);
  if (legal) return { kind: "legal", page: legal };
  const guide = guideKeys.find((g) => guidePages[g][lang] === slug);
  return guide ? { kind: "guide", page: guide } : undefined;
}

/** Every slug under /[lang]/, for static params and the proxy's list of known paths. */
export const allSlugs = (lang: Locale) => [
  ...Object.values(legalPages).map((s) => s[lang]),
  ...Object.values(guidePages).map((s) => s[lang]),
];

/** Same page in every language, used for the language switch and hreflang. */
export type Alternates = Record<Locale, string>;

export const homeAlternates: Alternates = { en: "/en", de: "/de" };

export const legalAlternates = (page: LegalPage): Alternates =>
  Object.fromEntries(locales.map((l) => [l, legalPath(page, l)])) as Alternates;

export const guideAlternates = (page: GuidePage): Alternates =>
  Object.fromEntries(locales.map((l) => [l, guidePath(page, l)])) as Alternates;

/** Turns an in-page anchor (#features) into a link that works from any page. */
export const anchor = (href: string, lang: Locale) =>
  href.startsWith("#") ? `/${lang}${href}` : href;

export const absolute = (path: string) => `${site.url}${path}`;

/** All indexable pages, for the main sitemap. */
export const indexablePages = (): { alternates: Alternates; priority: number }[] => [
  { alternates: homeAlternates, priority: 1 },
  ...guideKeys.map((g) => ({ alternates: guideAlternates(g), priority: 0.8 })),
  { alternates: legalAlternates("imprint"), priority: 0.2 },
  { alternates: legalAlternates("privacy"), priority: 0.2 },
];
