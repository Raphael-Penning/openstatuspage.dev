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
  privatePages: Item;
  history: Item;
  a11y: Item;
  kubernetes: Item;
  lightweight: Item;
  branding: Item;
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
      text: "Services and sites grouped the way your users think about them, each with a 90-day history (7 to 180 days configurable). Every day links to its own page with the incidents of that day.",
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
      text: "Local users with admin and editor roles, plus single sign-on via OpenID Connect: Keycloak, Microsoft Entra ID, Authentik, Okta, Zitadel or Dex, with group-to-role mapping.",
    },
    database: {
      title: "SQLite or PostgreSQL",
      text: "Start with zero-config SQLite, switch to PostgreSQL for production, several instances and the split deployment.",
    },
    i18n: {
      title: "English & German",
      text: "Public page and management UI speak both languages.",
    },
    noJs: {
      title: "Works without JavaScript",
      text: "Every public page is rendered on the server; filters, search and subscription forms work without scripts too.",
    },
    seo: {
      title: "Ready for search and AI agents",
      text: "Unique titles, canonical and language links, JSON-LD, robots.txt, sitemaps and llms.txt.",
    },
    api: {
      title: "JSON:API and feeds",
      text: "A JSON:API 1.1 HTTP API with role-based API tokens, plus RSS and Atom feeds for incidents and maintenance.",
    },
    privatePages: {
      title: "Private status pages",
      text: "Share a secret link with selected services, even hidden ones, for a customer or partner. Optional expiry, never indexed, no analytics.",
    },
    history: {
      title: "History import and corrections",
      text: "Fill up to two years of history from Icinga DB, Uptime Kuma, openITCockpit or CSV. Mark false alarms afterwards without touching the recorded data.",
    },
    a11y: {
      title: "Accessible (WCAG 2.2 AA)",
      text: "Public page and emails target WCAG 2.2 AA, checked with axe-core. Status is never shown by color alone, and there is no CAPTCHA.",
    },
    kubernetes: {
      title: "Docker Compose, Helm or Kustomize",
      text: "A compose file per release, a Helm chart with split mode, NetworkPolicies, autoscaling and PodDisruptionBudget, plus Kustomize manifests.",
    },
    lightweight: {
      title: "Light and fast",
      text: "Around 100 MB of RAM per instance and Lighthouse 100 in every category on mobile and desktop.",
    },
    branding: {
      title: "Your brand",
      text: "Logo, favicon, any accent color (contrast is adjusted automatically), light or dark theme, footer and legal links.",
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
      text: "Dienste und Standorte so gruppiert, wie deine Nutzer an sie denken, jeweils mit 90 Tagen Verlauf (7 bis 180 Tage einstellbar). Jeder Tag führt auf eine eigene Seite mit den Störungen dieses Tages.",
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
      text: "Lokale Benutzer mit den Rollen Admin und Redakteur, dazu Single Sign-on per OpenID Connect: Keycloak, Microsoft Entra ID, Authentik, Okta, Zitadel oder Dex, mit Zuordnung von Gruppen zu Rollen.",
    },
    database: {
      title: "SQLite oder PostgreSQL",
      text: "Starte ohne Einrichtung mit SQLite und wechsle zu PostgreSQL für den Produktivbetrieb, mehrere Instanzen und das getrennte Deployment.",
    },
    i18n: {
      title: "Deutsch & Englisch",
      text: "Öffentliche Seite und Verwaltung sprechen beide Sprachen.",
    },
    noJs: {
      title: "Läuft ohne JavaScript",
      text: "Jede öffentliche Seite wird auf dem Server gerendert, auch Filter, Suche und Abo-Formulare funktionieren ohne Skript.",
    },
    seo: {
      title: "Bereit für Suchmaschinen und KI-Agenten",
      text: "Eindeutige Titel, Canonical- und Sprachlinks, JSON-LD, robots.txt, Sitemaps und llms.txt.",
    },
    api: {
      title: "JSON:API und Feeds",
      text: "Eine HTTP-API nach JSON:API 1.1 mit API-Tokens pro Rolle sowie RSS- und Atom-Feeds für Störungen und Wartungen.",
    },
    privatePages: {
      title: "Private Statusseiten",
      text: "Teile einen geheimen Link mit ausgewählten Diensten, auch verborgenen, für einen Kunden oder Partner. Optional mit Ablaufdatum, nie indexiert, ohne Statistik.",
    },
    history: {
      title: "Historie importieren und korrigieren",
      text: "Übernimm bis zu zwei Jahre Verlauf aus Icinga DB, Uptime Kuma, openITCockpit oder CSV. Markiere Fehlalarme nachträglich, ohne die aufgezeichneten Daten zu verändern.",
    },
    a11y: {
      title: "Barrierefrei (WCAG 2.2 AA)",
      text: "Öffentliche Seite und E-Mails zielen auf WCAG 2.2 AA, geprüft mit axe-core. Status wird nie nur über Farbe gezeigt, und es gibt kein CAPTCHA.",
    },
    kubernetes: {
      title: "Docker Compose, Helm oder Kustomize",
      text: "Eine Compose-Datei pro Release, ein Helm-Chart mit getrenntem Betrieb, NetworkPolicies, Autoscaling und PodDisruptionBudget sowie Kustomize-Manifeste.",
    },
    lightweight: {
      title: "Schlank und schnell",
      text: "Rund 100 MB Arbeitsspeicher pro Instanz und Lighthouse 100 in allen Kategorien, mobil und am Desktop.",
    },
    branding: {
      title: "Dein Branding",
      text: "Logo, Favicon, beliebige Akzentfarbe (der Kontrast wird automatisch angepasst), helles oder dunkles Design, Footer- und Rechtslinks.",
    },
  },
};
