import type { GuidePage } from "@/lib/routes";
import type { Localized } from "@/lib/i18n";

type FooterCopy = {
  tagline: string;
  columns: {
    product: { title: string; links: { href: string; label: string }[]; demo: string };
    resources: {
      title: string;
      docs: string;
      api: string;
      changelog: string;
      releases: string;
      contributing: string;
    };
    project: { title: string; github: string; license: string; sponsor: string };
    guides: { title: string } & Record<GuidePage, string>;
  };
  builtWith: string;
  builtWithCta: string;
  copyright: string;
  openSource: string;
  languageLabel: string;
  imprint: string;
  privacy: string;
};

export const copy: Localized<FooterCopy> = {
  en: {
    tagline:
      "The self-hosted, open-source status page. Clear for your visitors, private by design.",
    columns: {
      product: {
        title: "Product",
        links: [
          { href: "#product", label: "Product tour" },
          { href: "#features", label: "Features" },
          { href: "#how-it-works", label: "How it works" },
          { href: "#quickstart", label: "Quickstart" },
          { href: "#faq", label: "FAQ" },
        ],
        demo: "Live demo",
      },
      resources: {
        title: "Resources",
        docs: "Documentation",
        api: "HTTP API",
        changelog: "Changelog",
        releases: "Releases",
        contributing: "Contributing",
      },
      project: {
        title: "Project",
        github: "GitHub",
        license: "License (AGPL-3.0)",
        sponsor: "Become a sponsor",
      },
      guides: {
        title: "Guides",
        alternatives: "Statuspage alternatives",
        icinga: "Icinga 2 status page",
        uptimeKuma: "Uptime Kuma status page",
        openitcockpit: "openITCockpit status page",
        kubernetes: "Kubernetes & Helm",
        notifications: "Slack, Teams & SMS",
        withoutDocker: "Without Docker",
        themes: "Themes & branding",
      },
    },
    builtWith: "Built something with OpenStatusPage?",
    builtWithCta: "Tell us",
    copyright: "© 2026 OpenStatusPage contributors",
    openSource: "Open source under AGPL-3.0",
    languageLabel: "Language",
    imprint: "Legal notice",
    privacy: "Privacy policy",
  },
  de: {
    tagline:
      "Die selbst gehostete Open-Source-Statusseite. Klar für deine Besucher, privat von Grund auf.",
    columns: {
      product: {
        title: "Produkt",
        links: [
          { href: "#product", label: "Rundgang" },
          { href: "#features", label: "Funktionen" },
          { href: "#how-it-works", label: "So funktioniert’s" },
          { href: "#quickstart", label: "Schnellstart" },
          { href: "#faq", label: "FAQ" },
        ],
        demo: "Live-Demo",
      },
      resources: {
        title: "Ressourcen",
        docs: "Dokumentation",
        api: "HTTP-API",
        changelog: "Änderungsprotokoll",
        releases: "Releases",
        contributing: "Mitmachen",
      },
      project: {
        title: "Projekt",
        github: "GitHub",
        license: "Lizenz (AGPL-3.0)",
        sponsor: "Sponsor werden",
      },
      guides: {
        title: "Guides",
        alternatives: "Statuspage-Alternativen",
        icinga: "Icinga-2-Statusseite",
        uptimeKuma: "Uptime-Kuma-Statusseite",
        openitcockpit: "openITCockpit-Statusseite",
        kubernetes: "Kubernetes & Helm",
        notifications: "Slack, Teams & SMS",
        withoutDocker: "Ohne Docker",
        themes: "Themes & Branding",
      },
    },
    builtWith: "Du setzt OpenStatusPage ein?",
    builtWithCta: "Erzähl es uns",
    copyright: "© 2026 OpenStatusPage-Mitwirkende",
    openSource: "Open Source unter AGPL-3.0",
    languageLabel: "Sprache",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
};
