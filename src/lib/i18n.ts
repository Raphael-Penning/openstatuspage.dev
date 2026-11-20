export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Every section ships its own `{ en, de }` copy object. Both must share one shape. */
export type Localized<T> = Record<Locale, T>;

/** Pick the copy for the current locale. */
export const pick = <T,>(copy: Localized<T>, lang: Locale): T => copy[lang];
