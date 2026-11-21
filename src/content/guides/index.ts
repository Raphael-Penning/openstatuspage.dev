import type { GuidePage } from "@/lib/routes";
import { alternativesGuide } from "./alternatives";
import { icingaGuide } from "./icinga";
import { uptimeKumaGuide } from "./uptime-kuma";
import type { Guide } from "./shared";

export const guides: Record<GuidePage, Guide> = {
  alternatives: alternativesGuide,
  icinga: icingaGuide,
  uptimeKuma: uptimeKumaGuide,
};

/** og:article tags per guide (language-neutral terms). */
export const guideTags: Record<GuidePage, string[]> = {
  alternatives: ["status page", "Statuspage alternative", "self-hosted", "open source", "Cachet", "Upptime", "Gatus", "Uptime Kuma", "cState", "Kener"],
  icinga: ["Icinga 2", "status page", "monitoring", "self-hosted", "open source"],
  uptimeKuma: ["Uptime Kuma", "status page", "check bundles", "self-hosted", "open source"],
};

export const guideUi = {
  en: {
    updated: "Last updated",
    back: "Back to home",
    faq: "Frequently asked questions",
    related: "More guides",
    ctaTitle: "Try OpenStatusPage",
    ctaBody: "Self-hosted with Docker Compose in a few minutes. Open source under AGPL-3.0.",
    ctaPrimary: "Quick start",
    ctaDemo: "Live demo",
    ctaGithub: "Source on GitHub",
    breadcrumbHome: "Home",
  },
  de: {
    updated: "Stand",
    back: "Zurück zur Startseite",
    faq: "Häufige Fragen",
    related: "Weitere Guides",
    ctaTitle: "OpenStatusPage ausprobieren",
    ctaBody: "In wenigen Minuten selbst gehostet mit Docker Compose. Open Source unter AGPL-3.0.",
    ctaPrimary: "Schnellstart",
    ctaDemo: "Live-Demo",
    ctaGithub: "Quellcode auf GitHub",
    breadcrumbHome: "Startseite",
  },
} as const;

export { guidesUpdated } from "./shared";
