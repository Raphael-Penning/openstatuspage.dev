import type { Localized } from "@/lib/i18n";

type Item = { title: string; text: string };

type FeaturesCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  privacy: Item & { internal: string; public: string; serviceName: string; operational: string; hidden: string };
  composition: Item & { check: string; rule: string; service: string };
  bundles: Item & { weight: string; result: string; nodes: [string, string, string]; up: string; down: string; target: string };
  uptime: Item & { daysAgo: string; today: string; uptime: string; serviceName: string };
  locations: Item;
  email: Item & { points: [string, string, string] };
  sso: Item;
  database: Item;
  i18n: Item;
  noJs: Item;
  seo: Item;
  api: Item;
};

export const copy: Localized<FeaturesCopy> = {
  en: {
    eyebrow: "Features",
    title: "Everything a status page needs. Nothing it shouldn't show.",
    lead: "Built for teams that run their own monitoring and want a clean, honest public page on top of it.",
    privacy: {
      title: "Private by design",
      text: "Visitors see curated services. Check names, hosts and outputs never leave the management area.",
      internal: "Internal checks",
      public: "Public page",
      serviceName: "Website",
      operational: "Operational",
      hidden: "hidden",
    },
    composition: {
      title: "Service composition",
      text: "Build each public service from any number of checks and decide how their states add up with aggregation rules.",
      check: "check",
      rule: "rule: worst state",
      service: "Customer portal",
    },
    bundles: {
      title: "Check bundles with weighted voting",
      text: "Several monitoring nodes, for example Uptime Kuma instances in different places, vote with weights on the state of one target. One flaky node no longer raises a false alarm.",
      weight: "weight",
      result: "Result",
      nodes: ["Node Frankfurt", "Node Helsinki", "Node Virginia"],
      up: "up",
      down: "down",
      target: "api.example.com",
    },
    uptime: {
      title: "90-day uptime bars",
      text: "Services and sites grouped the way your users think about them, each with a 90-day history at a glance.",
      daysAgo: "90 days ago",
      today: "Today",
      uptime: "uptime",
      serviceName: "API",
    },
    locations: {
      title: "Locations on a world map",
      text: "Show data centers and sites on a map with their live status.",
    },
    email: {
      title: "Email subscriptions",
      text: "Visitors subscribe to all updates or just the services they care about.",
      points: ["Double opt-in", "Maintenance reminders", "One-click unsubscribe"],
    },
    sso: {
      title: "OIDC single sign-on",
      text: "Local users with admin and editor roles, plus optional single sign-on via OIDC.",
    },
    database: {
      title: "SQLite or PostgreSQL",
      text: "Start with zero-config SQLite, switch to PostgreSQL when you need it.",
    },
    i18n: {
      title: "English & German",
      text: "Public page and management UI speak both languages.",
    },
    noJs: {
      title: "Works without JavaScript",
      text: "Every public page is rendered on the server. Fast, robust and readable anywhere.",
    },
    seo: {
      title: "Ready for search and AI agents",
      text: "Unique titles, canonical and language links, JSON-LD, robots.txt, sitemaps and llms.txt.",
    },
    api: {
      title: "JSON:API and feeds",
      text: "A JSON:API 1.1 HTTP API plus RSS and Atom feeds for incidents and maintenance.",
    },
  },
  de: {
    eyebrow: "Funktionen",
    title: "Alles, was eine Statusseite braucht. Nichts, was sie nicht zeigen sollte.",
    lead: "Gebaut für Teams, die ihr eigenes Monitoring betreiben und darauf eine saubere, ehrliche öffentliche Seite wollen.",
    privacy: {
      title: "Privat von Grund auf",
      text: "Besucher sehen nur ausgewählte Dienste. Namen, Hosts und Ausgaben deiner Checks verlassen nie den Verwaltungsbereich.",
      internal: "Interne Checks",
      public: "Öffentliche Seite",
      serviceName: "Website",
      operational: "In Betrieb",
      hidden: "verborgen",
    },
    composition: {
      title: "Dienste zusammensetzen",
      text: "Setz jeden öffentlichen Dienst aus beliebig vielen Checks zusammen und leg mit Regeln fest, wie sich ihr Zustand ergibt.",
      check: "Check",
      rule: "Regel: schlechtester Zustand",
      service: "Kundenportal",
    },
    bundles: {
      title: "Check-Bündel mit gewichteter Abstimmung",
      text: "Mehrere Monitoring-Knoten, etwa Uptime-Kuma-Instanzen an verschiedenen Orten, stimmen gewichtet über den Zustand eines Ziels ab. Ein wackeliger Knoten löst so keinen Fehlalarm mehr aus.",
      weight: "Gewicht",
      result: "Ergebnis",
      nodes: ["Knoten Frankfurt", "Knoten Helsinki", "Knoten Virginia"],
      up: "erreichbar",
      down: "gestört",
      target: "api.example.com",
    },
    uptime: {
      title: "Verfügbarkeit über 90 Tage",
      text: "Dienste und Standorte so gruppiert, wie deine Nutzer an sie denken, jeweils mit 90 Tagen Verlauf auf einen Blick.",
      daysAgo: "vor 90 Tagen",
      today: "Heute",
      uptime: "Verfügbarkeit",
      serviceName: "API",
    },
    locations: {
      title: "Standorte auf der Weltkarte",
      text: "Zeig Rechenzentren und Standorte auf einer Karte mit ihrem aktuellen Status.",
    },
    email: {
      title: "E-Mail-Abos",
      text: "Besucher abonnieren alle Meldungen oder nur die Dienste, die sie wirklich interessieren.",
      points: ["Double-Opt-in", "Erinnerung vor Wartungen", "Abmelden mit einem Klick"],
    },
    sso: {
      title: "Single Sign-on per OIDC",
      text: "Lokale Benutzer mit den Rollen Admin und Redakteur, dazu optional Anmeldung per OIDC.",
    },
    database: {
      title: "SQLite oder PostgreSQL",
      text: "Starte ohne Einrichtung mit SQLite und wechsle zu PostgreSQL, wenn du es brauchst.",
    },
    i18n: {
      title: "Deutsch & Englisch",
      text: "Öffentliche Seite und Verwaltung sprechen beide Sprachen.",
    },
    noJs: {
      title: "Läuft ohne JavaScript",
      text: "Jede öffentliche Seite wird auf dem Server gerendert. Schnell, robust und überall lesbar.",
    },
    seo: {
      title: "Bereit für Suchmaschinen und KI-Agenten",
      text: "Eindeutige Titel, Canonical- und Sprachlinks, JSON-LD, robots.txt, Sitemaps und llms.txt.",
    },
    api: {
      title: "JSON:API und Feeds",
      text: "Eine HTTP-API nach JSON:API 1.1 sowie RSS- und Atom-Feeds für Störungen und Wartungen.",
    },
  },
};
