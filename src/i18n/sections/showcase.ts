import type { Localized } from "@/lib/i18n";

export type ShowcaseTabId = "overview" | "services" | "locations" | "history" | "incident";

export type ShowcaseTabCopy = {
  id: ShowcaseTabId;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  /** Path shown in the browser frame's address bar. */
  path: string;
  alt: string;
};

export type ShowcaseCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  tabsLabel: string;
  themeLabel: string;
  themeDark: string;
  themeLight: string;
  themeHint: string;
  tabs: ShowcaseTabCopy[];
};

export const copy: Localized<ShowcaseCopy> = {
  en: {
    eyebrow: "Product tour",
    title: "A status page your visitors actually understand",
    lead: "Clear pages for the public, built from the checks you already run. Take a look around.",
    tabsLabel: "Status page views",
    themeLabel: "Screenshot theme",
    themeDark: "Dark",
    themeLight: "Light",
    themeHint: "Every page ships in a light and a dark theme.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "Everything important at a glance",
        description:
          "The landing page of your status page shows the overall state, current incidents and active or upcoming maintenance in one place.",
        bullets: [
          "Overall status visible immediately",
          "Current incidents and maintenance up front",
          "Server-rendered, works without JavaScript",
        ],
        path: "/",
        alt: "OpenStatusPage overview with overall status, current incidents and upcoming maintenance",
      },
      {
        id: "services",
        label: "Services & Sites",
        title: "Services grouped the way your users think",
        description:
          "Services and sites are grouped and each comes with a 90-day uptime bar. Behind every public service sit as many monitoring checks as you like.",
        bullets: [
          "90-day uptime bars per service",
          "Groups for products, teams or regions",
          "Check names and hosts stay private",
        ],
        path: "/services",
        alt: "Grouped services and sites with 90-day uptime bars",
      },
      {
        id: "locations",
        label: "Locations",
        title: "Your locations on a world map",
        description:
          "Data centers, offices or edge sites appear on a world map with their live status, so affected regions stand out right away.",
        bullets: [
          "Live status per location",
          "Affected regions are easy to spot",
          "Curated: you decide what is public",
        ],
        path: "/locations",
        alt: "World map with locations and their live status",
      },
      {
        id: "history",
        label: "History",
        title: "A transparent archive",
        description:
          "Past incidents and maintenance windows live in a filterable history, so visitors can see how you handled things before.",
        bullets: [
          "Filter incidents and maintenance",
          "Also available as RSS/Atom feeds",
          "Indexable pages with clean SEO",
        ],
        path: "/history",
        alt: "Filterable history of past incidents and maintenance windows",
      },
      {
        id: "incident",
        label: "Incident detail",
        title: "Every update in a clear timeline",
        description:
          "Each incident gets its own page with all updates and the affected services. Subscribers hear about it by email.",
        bullets: [
          "Timeline of all updates",
          "Affected services clearly listed",
          "Email notifications with double opt-in",
        ],
        path: "/incidents/database-latency",
        alt: "Incident detail page with a timeline of updates and affected services",
      },
    ],
  },
  de: {
    eyebrow: "Produkttour",
    title: "Eine Statusseite, die deine Besucher wirklich verstehen",
    lead: "Klare Seiten für die Öffentlichkeit, gebaut aus den Checks, die du ohnehin schon hast. Schau dich um.",
    tabsLabel: "Ansichten der Statusseite",
    themeLabel: "Farbschema der Screenshots",
    themeDark: "Dunkel",
    themeLight: "Hell",
    themeHint: "Jede Seite gibt es in einem hellen und einem dunklen Design.",
    tabs: [
      {
        id: "overview",
        label: "Übersicht",
        title: "Alles Wichtige auf einen Blick",
        description:
          "Die Startseite deiner Statusseite zeigt den Gesamtstatus, aktuelle Störungen sowie laufende und geplante Wartungen an einem Ort.",
        bullets: [
          "Gesamtstatus sofort erkennbar",
          "Aktuelle Störungen und Wartungen ganz oben",
          "Serverseitig gerendert, funktioniert ohne JavaScript",
        ],
        path: "/",
        alt: "Übersicht von OpenStatusPage mit Gesamtstatus, aktuellen Störungen und geplanten Wartungen",
      },
      {
        id: "services",
        label: "Dienste & Standorte",
        title: "Dienste so gruppiert, wie deine Nutzer denken",
        description:
          "Dienste und Sites werden gruppiert und bekommen jeweils einen Verfügbarkeitsbalken über 90 Tage. Hinter jedem öffentlichen Dienst stehen beliebig viele Monitoring-Checks.",
        bullets: [
          "Verfügbarkeit der letzten 90 Tage pro Dienst",
          "Gruppen für Produkte, Teams oder Regionen",
          "Check-Namen und Hosts bleiben privat",
        ],
        path: "/services",
        alt: "Gruppierte Dienste und Sites mit Verfügbarkeitsbalken über 90 Tage",
      },
      {
        id: "locations",
        label: "Standorte",
        title: "Deine Standorte auf der Weltkarte",
        description:
          "Rechenzentren, Büros oder Edge-Standorte erscheinen mit ihrem Live-Status auf einer Weltkarte. Betroffene Regionen fallen sofort auf.",
        bullets: [
          "Live-Status pro Standort",
          "Betroffene Regionen sofort sichtbar",
          "Kuratiert: Du entscheidest, was öffentlich ist",
        ],
        path: "/locations",
        alt: "Weltkarte mit Standorten und ihrem Live-Status",
      },
      {
        id: "history",
        label: "Verlauf",
        title: "Ein transparentes Archiv",
        description:
          "Vergangene Störungen und Wartungen landen in einem filterbaren Verlauf. So sehen Besucher, wie du bisher damit umgegangen bist.",
        bullets: [
          "Störungen und Wartungen filtern",
          "Auch als RSS- und Atom-Feed",
          "Indexierbare Seiten mit sauberem SEO",
        ],
        path: "/history",
        alt: "Filterbarer Verlauf vergangener Störungen und Wartungen",
      },
      {
        id: "incident",
        label: "Störungsdetails",
        title: "Jedes Update in einer klaren Zeitleiste",
        description:
          "Jede Störung bekommt eine eigene Seite mit allen Updates und den betroffenen Diensten. Abonnenten erfahren per E-Mail davon.",
        bullets: [
          "Zeitleiste aller Updates",
          "Betroffene Dienste klar aufgeführt",
          "E-Mail-Benachrichtigungen mit Double-Opt-in",
        ],
        path: "/incidents/database-latency",
        alt: "Detailseite einer Störung mit Zeitleiste der Updates und betroffenen Diensten",
      },
    ],
  },
};
