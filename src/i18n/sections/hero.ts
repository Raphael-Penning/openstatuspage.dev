import type { Localized } from "@/lib/i18n";

type HeroCopy = {
  badge: string;
  badgeLinkLabel: string;
  title: string;
  lead: string;
  ctaPrimary: string;
  ctaDemo: string;
  ctaGithub: string;
  snippetLabel: string;
  screenshotAlt: string;
  cardStatusTitle: string;
  cardStatusMeta: string;
  cardUptimeTitle: string;
  cardUptimeLegend: string;
  cardPrivateTitle: string;
  cardPrivateMeta: string;
};

export const copy: Localized<HeroCopy> = {
  en: {
    badge: "Open source · Self-hosted · AGPL-3.0",
    badgeLinkLabel: "View the latest release on GitHub",
    title: "The status page that keeps your infrastructure private.",
    lead: "Keep your customers informed about incidents and maintenance. Compose public services from Icinga 2, Uptime Kuma, openITCockpit or webhooks — without ever exposing check names or hosts.",
    ctaPrimary: "Get started",
    ctaDemo: "Live demo",
    ctaGithub: "Star on GitHub",
    snippetLabel: "Start with Docker Compose",
    screenshotAlt:
      "OpenStatusPage overview page showing the overall status, current incidents and maintenance windows",
    cardStatusTitle: "All systems operational",
    cardStatusMeta: "Server-rendered · no JavaScript needed",
    cardUptimeTitle: "API Gateway",
    cardUptimeLegend: "Last 90 days",
    cardPrivateTitle: "Private by design",
    cardPrivateMeta: "Check names and hosts stay internal",
  },
  de: {
    badge: "Open Source · Selbst gehostet · AGPL-3.0",
    badgeLinkLabel: "Neueste Version auf GitHub ansehen",
    title: "Die Statusseite, die deine Infrastruktur für sich behält.",
    lead: "Halte deine Kunden über Störungen und Wartungen auf dem Laufenden. Stell öffentliche Dienste aus Icinga 2, Uptime Kuma, openITCockpit oder Webhooks zusammen — ohne dass Check-Namen oder Hosts nach außen dringen.",
    ctaPrimary: "Jetzt loslegen",
    ctaDemo: "Live-Demo",
    ctaGithub: "Auf GitHub ansehen",
    snippetLabel: "Mit Docker Compose starten",
    screenshotAlt:
      "Übersichtsseite von OpenStatusPage mit Gesamtstatus, aktuellen Störungen und Wartungsfenstern",
    cardStatusTitle: "Alle Systeme laufen",
    cardStatusMeta: "Serverseitig gerendert · ohne JavaScript",
    cardUptimeTitle: "API-Gateway",
    cardUptimeLegend: "Letzte 90 Tage",
    cardPrivateTitle: "Privat von Grund auf",
    cardPrivateMeta: "Check-Namen und Hosts bleiben intern",
  },
};
