import type { Localized } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  stepLabel: string;
  connect: {
    title: string;
    body: string;
    adapters: { name: string; note?: string }[];
  };
  compose: {
    title: string;
    body: string;
    serviceLabel: string;
    serviceName: string;
    ruleLabel: string;
    ruleWorst: string;
    checks: string[];
    bundleLabel: string;
    bundleRule: string;
    nodes: string[];
    weightLabel: string;
    exampleNote: string;
  };
  publish: {
    title: string;
    body: string;
    outputs: { key: "page" | "mail" | "feed" | "api"; name: string; note: string }[];
  };
  privacy: {
    eyebrow: string;
    title: string;
    lead: string;
    publicTitle: string;
    publicItems: string[];
    internalTitle: string;
    internalItems: string[];
    splitTitle: string;
    splitBody: string;
  };
};

export const copy: Localized<Copy> = {
  en: {
    eyebrow: "How it works",
    title: "From internal checks to a public status page",
    lead: "Connect the monitoring you already run, decide what each public service is made of, and publish. Three steps, no data leaks.",
    stepLabel: "Step",
    connect: {
      title: "Connect monitoring",
      body: "Plug in the tools you already use. Adapters pull states automatically or accept pushes from anything that can send HTTP.",
      adapters: [
        { name: "Icinga 2" },
        { name: "Uptime Kuma" },
        { name: "openITCockpit" },
        { name: "Webhook", note: "pull & push" },
      ],
    },
    compose: {
      title: "Compose services",
      body: "Map any number of internal checks to one public service. Aggregation rules decide the result; check bundles let several monitoring nodes vote with weights.",
      serviceLabel: "Public service",
      serviceName: "Customer portal",
      ruleLabel: "Rule",
      ruleWorst: "worst of",
      checks: ["check A", "check B", "check C"],
      bundleLabel: "Check bundle",
      bundleRule: "majority",
      nodes: ["node 1", "node 2", "node 3"],
      weightLabel: "weight",
      exampleNote: "Example rules — aggregation is configurable per service.",
    },
    publish: {
      title: "Publish",
      body: "Your visitors get a fast, server-rendered status page. Everyone else gets the same data where they need it.",
      outputs: [
        { key: "page", name: "Public status page", note: "Overview, services, locations, history" },
        { key: "mail", name: "Email subscribers", note: "Double opt-in, per-service" },
        { key: "feed", name: "RSS / Atom", note: "Incidents and maintenance" },
        { key: "api", name: "JSON:API 1.1", note: "Read status over HTTP" },
      ],
    },
    privacy: {
      eyebrow: "Private by design",
      title: "Your infrastructure stays internal",
      lead: "The public page only knows what you curate. Everything that describes your actual setup stays in the management area.",
      publicTitle: "Public sees",
      publicItems: ["Service and site names", "Current status", "Incidents and updates", "Maintenance windows"],
      internalTitle: "Internal only",
      internalItems: ["Check names", "Hostnames", "Check outputs", "Monitoring sources"],
      splitTitle: "Want an even harder boundary?",
      splitBody: "Run a split deployment: public page and admin on separate domains, a dedicated worker, and a read-only database role for the public side.",
    },
  },
  de: {
    eyebrow: "So funktioniert’s",
    title: "Von internen Checks zur öffentlichen Statusseite",
    lead: "Bind dein bestehendes Monitoring an, leg fest, woraus jeder öffentliche Dienst besteht, und veröffentliche. Drei Schritte, ohne dass interne Daten nach außen gelangen.",
    stepLabel: "Schritt",
    connect: {
      title: "Monitoring anbinden",
      body: "Nutze die Werkzeuge, die du schon hast. Adapter holen Zustände automatisch ab oder nehmen sie per HTTP von beliebigen Quellen entgegen.",
      adapters: [
        { name: "Icinga 2" },
        { name: "Uptime Kuma" },
        { name: "openITCockpit" },
        { name: "Webhook", note: "Pull & Push" },
      ],
    },
    compose: {
      title: "Dienste zusammenstellen",
      body: "Ordne einem öffentlichen Dienst beliebig viele interne Checks zu. Regeln bestimmen das Ergebnis; mit Check-Bündeln stimmen mehrere Monitoring-Knoten gewichtet ab.",
      serviceLabel: "Öffentlicher Dienst",
      serviceName: "Kundenportal",
      ruleLabel: "Regel",
      ruleWorst: "schlechtester Wert",
      checks: ["Check A", "Check B", "Check C"],
      bundleLabel: "Check-Bündel",
      bundleRule: "Mehrheit",
      nodes: ["Knoten 1", "Knoten 2", "Knoten 3"],
      weightLabel: "Gewicht",
      exampleNote: "Beispielregeln – die Zusammenfassung ist pro Dienst einstellbar.",
    },
    publish: {
      title: "Veröffentlichen",
      body: "Deine Besucher bekommen eine schnelle, serverseitig gerenderte Statusseite. Alle anderen bekommen dieselben Daten dort, wo sie sie brauchen.",
      outputs: [
        { key: "page", name: "Öffentliche Statusseite", note: "Übersicht, Dienste, Standorte, Verlauf" },
        { key: "mail", name: "E-Mail-Abos", note: "Double-Opt-in, auch pro Dienst" },
        { key: "feed", name: "RSS / Atom", note: "Störungen und Wartungen" },
        { key: "api", name: "JSON:API 1.1", note: "Status per HTTP abfragen" },
      ],
    },
    privacy: {
      eyebrow: "Privat von Grund auf",
      title: "Deine Infrastruktur bleibt intern",
      lead: "Die öffentliche Seite kennt nur, was du freigibst. Alles, was deinen tatsächlichen Aufbau beschreibt, bleibt im Verwaltungsbereich.",
      publicTitle: "Öffentlich sichtbar",
      publicItems: ["Namen von Diensten und Sites", "Aktueller Status", "Störungen und Updates", "Wartungsfenster"],
      internalTitle: "Nur intern",
      internalItems: ["Namen der Checks", "Hostnamen", "Check-Ausgaben", "Monitoring-Quellen"],
      splitTitle: "Noch strengere Trennung gewünscht?",
      splitBody: "Setz auf ein geteiltes Deployment: öffentliche Seite und Verwaltung auf getrennten Domains, ein eigener Worker und eine Datenbankrolle mit reinem Lesezugriff für die öffentliche Seite.",
    },
  },
};
