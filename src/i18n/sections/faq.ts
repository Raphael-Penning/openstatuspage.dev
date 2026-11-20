import type { Localized } from "@/lib/i18n";
import { site } from "@/lib/site";

type FaqItem = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

export const copy: Localized<{
  eyebrow: string;
  title: string;
  lead: string;
  more: string;
  moreLink: string;
  items: FaqItem[];
}> = {
  en: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    lead: "The short version of what you probably want to know before you deploy.",
    more: "Something missing?",
    moreLink: "Ask on GitHub",
    items: [
      {
        q: "Is OpenStatusPage free?",
        a: "Yes. OpenStatusPage is open source under the AGPL-3.0 license and you host it yourself. No accounts, no seats, no paid tiers.",
      },
      {
        q: "What do I need to run it?",
        a: "Docker with Compose or a Kubernetes cluster, plus a reverse proxy that terminates HTTPS. SQLite works with zero configuration; for larger setups you can switch to PostgreSQL. Every release ships a compose.yaml with the app and PostgreSQL.",
      },
      {
        q: "Which monitoring tools are supported?",
        a: "Icinga 2, Uptime Kuma and openITCockpit out of the box, plus a generic webhook adapter that can pull or receive pushes from anything else. Several monitoring nodes can vote with weights on the state of one target.",
      },
      {
        q: "Will visitors see my hostnames or check outputs?",
        a: "No. Visitors only see the services, sites and locations you curate. Check names, hosts and outputs stay inside the management area: private by design.",
      },
      {
        q: "Can my customers subscribe to updates?",
        a: "Yes. Email subscriptions use double opt-in and can cover all updates or only selected services, including maintenance reminders and one-click unsubscribe. RSS and Atom feeds are available too.",
      },
      {
        q: "Does it support single sign-on?",
        a: "Yes. Besides local users with admin and editor roles, you can connect any OpenID Connect (OIDC) provider for single sign-on.",
      },
      {
        q: "Is there an API?",
        a: "Yes, an HTTP API following JSON:API 1.1. Everything public is also available as RSS and Atom feeds.",
        link: { label: "Read the API docs", href: site.apiDocs },
      },
      {
        q: "Is it production ready?",
        a: "Honestly: OpenStatusPage is in early development. Releases are versioned and every change is documented, so check the changelog and test an upgrade before you roll it out.",
        link: { label: "View the changelog", href: site.changelog },
      },
      {
        q: "Which languages are available?",
        a: "English and German, for both the public status page and the management UI.",
      },
    ],
  },
  de: {
    eyebrow: "FAQ",
    title: "Häufige Fragen",
    lead: "Das Wichtigste in Kürze, bevor du loslegst.",
    more: "Deine Frage fehlt?",
    moreLink: "Frag auf GitHub",
    items: [
      {
        q: "Ist OpenStatusPage kostenlos?",
        a: "Ja. OpenStatusPage ist Open Source unter der AGPL-3.0 und du betreibst es selbst. Keine Konten, keine Lizenzen pro Nutzer, keine Bezahlstufen.",
      },
      {
        q: "Was brauche ich für den Betrieb?",
        a: "Docker mit Compose oder einen Kubernetes-Cluster und dazu einen Reverse Proxy, der HTTPS bereitstellt. SQLite läuft ganz ohne Konfiguration, für größere Installationen kannst du auf PostgreSQL wechseln. Jedes Release enthält eine compose.yaml mit App und PostgreSQL.",
      },
      {
        q: "Welche Monitoring-Werkzeuge werden unterstützt?",
        a: "Icinga 2, Uptime Kuma und openITCockpit direkt, dazu ein allgemeiner Webhook-Adapter, der Daten abruft oder entgegennimmt. Mehrere Monitoring-Knoten können gewichtet über den Zustand eines Ziels abstimmen.",
      },
      {
        q: "Sehen Besucher meine Hostnamen oder Check-Ausgaben?",
        a: "Nein. Besucher sehen nur die Dienste, Sites und Standorte, die du freigibst. Check-Namen, Hosts und Ausgaben bleiben im Verwaltungsbereich – privat von Grund auf.",
      },
      {
        q: "Können meine Kunden Updates abonnieren?",
        a: "Ja. E-Mail-Abos laufen mit Double-Opt-in, wahlweise für alle Meldungen oder nur ausgewählte Dienste – inklusive Wartungserinnerungen und Abmeldung mit einem Klick. Außerdem gibt es RSS- und Atom-Feeds.",
      },
      {
        q: "Gibt es Single Sign-on?",
        a: "Ja. Neben lokalen Benutzern mit den Rollen Admin und Redakteur kannst du jeden OpenID-Connect-Anbieter (OIDC) für die Anmeldung anbinden.",
      },
      {
        q: "Gibt es eine API?",
        a: "Ja, eine HTTP-API nach JSON:API 1.1. Alle öffentlichen Inhalte gibt es zusätzlich als RSS- und Atom-Feed.",
        link: { label: "Zur API-Dokumentation", href: site.apiDocs },
      },
      {
        q: "Ist es bereit für den Produktivbetrieb?",
        a: "Ehrlich gesagt: OpenStatusPage steckt noch in einer frühen Entwicklungsphase. Releases sind versioniert und jede Änderung ist dokumentiert – lies das Changelog und teste ein Update, bevor du es ausrollst.",
        link: { label: "Zum Changelog", href: site.changelog },
      },
      {
        q: "Welche Sprachen gibt es?",
        a: "Englisch und Deutsch – sowohl für die öffentliche Statusseite als auch für die Verwaltung.",
      },
    ],
  },
};
