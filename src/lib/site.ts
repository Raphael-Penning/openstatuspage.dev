import type { Locale } from "./i18n";

export const site = {
  name: "OpenStatusPage",
  domain: "openstatuspage.dev",
  url: "https://openstatuspage.dev",
  github: "https://github.com/Raphael-Penning/openstatuspage",
  releases: "https://github.com/Raphael-Penning/openstatuspage/releases",
  demo: "https://openstatus.partlabs.de",
  license: "AGPL-3.0",
  /** Latest release of the software (keep in sync with the main repo's CHANGELOG). */
  version: "0.4.1",
  versionDate: "2026-11-23",
  image: "ghcr.io/raphael-penning/openstatuspage",
  docs: (lang: Locale) =>
    `https://github.com/Raphael-Penning/openstatuspage/blob/main/docs/guide/${lang}/01-overview.md`,
  apiDocs: "https://github.com/Raphael-Penning/openstatuspage/blob/main/docs/api.md",
  changelog: "https://github.com/Raphael-Penning/openstatuspage/blob/main/CHANGELOG.md",
  contributing: "https://github.com/Raphael-Penning/openstatuspage/blob/main/CONTRIBUTING.md",
  /** Last content update, used as <lastmod> in the sitemaps. */
  updated: "2026-11-23",
  email: "penning@partlabs.de",
  sponsorMail: "mailto:penning@partlabs.de",
} as const;

export type ScreenshotName =
  | "overview"
  | "services"
  | "locations"
  | "history"
  | "service-detail"
  | "incident";

/**
 * Product screenshots captured from the live demo (2880×1800, 2x of 1440×900).
 * Available for every name × theme × locale.
 */
export const screenshot = (
  name: ScreenshotName,
  lang: Locale,
  theme: "dark" | "light" = "dark",
) => ({
  src: `/screenshots/${name}-${theme}-${lang}.png`,
  width: 2880,
  height: 1800,
});
