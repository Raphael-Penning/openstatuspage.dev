import type { Localized } from "@/lib/i18n";

export const copy: Localized<{
  eyebrow: string;
  title: string;
  lead: string;
  primary: string;
  demo: string;
  github: string;
  domainLabel: string;
}> = {
  en: {
    eyebrow: "Self-hosted · Open source",
    title: "Give your customers a status page they can trust",
    lead: "Connect the monitoring you already run, decide what the public sees and keep your infrastructure private. Up and running with a single compose file.",
    primary: "Get started",
    demo: "Live demo",
    github: "GitHub",
    domainLabel: "Find us at",
  },
  de: {
    eyebrow: "Selbst gehostet · Open Source",
    title: "Gib deinen Kunden eine Statusseite, der sie vertrauen können",
    lead: "Binde dein bestehendes Monitoring an, entscheide, was öffentlich sichtbar ist, und halte deine Infrastruktur privat. Startklar mit einer einzigen Compose-Datei.",
    primary: "Jetzt starten",
    demo: "Live-Demo",
    github: "GitHub",
    domainLabel: "Du findest uns unter",
  },
};
