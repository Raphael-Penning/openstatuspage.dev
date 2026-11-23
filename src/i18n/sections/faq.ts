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
        q: "Is OpenStatusPage the same as openstatus?",
        a: "No. openstatus (openstatus.dev) is a separate project that runs its own uptime checks and is also offered as a hosted service. OpenStatusPage does not monitor anything itself: it turns the monitoring you already run (Icinga 2, Uptime Kuma, openITCockpit, webhooks) into a public status page, on your own servers.",
      },
      {
        q: "What do I need to run it?",
        a: "Docker Compose 2.23.1 or newer, a Kubernetes cluster, or a Linux server with systemd (.deb and .rpm packages or an install script), plus a reverse proxy that terminates HTTPS. SQLite works with zero configuration; for larger setups switch to PostgreSQL. A send-only mail server with DKIM is bundled. One instance needs around 100 MB of RAM.",
      },
      {
        q: "Can I run it on Kubernetes?",
        a: "Yes. There is a Helm chart (oci://ghcr.io/raphael-penning/charts/openstatuspage) for Kubernetes 1.25 or newer, either as a single instance or split into public, admin and worker with NetworkPolicies, autoscaling and a PodDisruptionBudget. Kustomize manifests are included as well.",
      },
      {
        q: "Which monitoring tools are supported?",
        a: "Icinga 2, Uptime Kuma and openITCockpit out of the box, plus a generic webhook adapter that can pull or receive pushes from anything else. Several monitoring nodes can vote with weights on the state of one target.",
      },
      {
        q: "Can I import my existing uptime history?",
        a: "Yes. Administrators can import up to 731 days from the Icinga DB database, from Uptime Kuma, from openITCockpit or from a CSV file. Imports only fill gaps and never overwrite recorded history, and you see a preview before anything is applied.",
      },
      {
        q: "Will visitors see my hostnames or check outputs?",
        a: "No. Visitors only see the services, sites and locations you curate. Check names, hosts and outputs stay inside the management area: private by design.",
      },
      {
        q: "Can I show a status page to a single customer only?",
        a: "Yes, with private status pages. You pick the services, including hidden ones, and share a secret link with an optional expiry date. Private pages are never indexed or cached and have no analytics.",
      },
      {
        q: "Can my customers subscribe to updates?",
        a: "Yes. Email subscriptions use double opt-in and can cover all updates or only selected services, including maintenance reminders and one-click unsubscribe. If you allow it, visitors can also subscribe with a Slack, Teams or Discord webhook or by SMS, confirmed with a 6-digit code. RSS and Atom feeds are available too.",
      },
      {
        q: "Can it post to Slack, Microsoft Teams or Discord?",
        a: "Yes. Admins add webhooks for Slack, Microsoft Teams (Workflows), Discord or generic JSON signed with HMAC-SHA256, for all or selected services. SMS go out through Twilio, Vonage, seven.io, MessageBird or any HTTP provider, with on-call numbers and a monthly budget. Each webhook has a test button and a delivery log.",
      },
      {
        q: "Can I change how the status page looks?",
        a: "Yes. Pick one of four built-in themes (default, slate, forest, high contrast) or create your own from a JSON file with optional CSS. The editor checks every color pair against WCAG 2.2 AA in light and dark mode. Logo, favicon and images can be uploaded, and content pages are written in Markdown.",
      },
      {
        q: "Does it support single sign-on?",
        a: "Yes. Besides local users with admin and editor roles, you can add any number of OpenID Connect providers in the management UI, for example Keycloak, Microsoft Entra ID, Authentik, Okta, Zitadel or Dex. Each gets its own login button and role mapping from a claim, and password logins can be turned off.",
      },
      {
        q: "Is there an API?",
        a: "Yes, an HTTP API following JSON:API 1.1 with an OpenAPI 3.1 description at /api/openapi.json, plus interactive API docs with \"Try it\" in the management UI. Everything public is also available as RSS and Atom feeds.",
        link: { label: "Read the API docs", href: site.apiDocs },
      },
      {
        q: "Is it production ready?",
        a: `OpenStatusPage is at version ${site.version} and still young. Releases are versioned, and the changelog lists every change with upgrade notes.`,
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
        q: "Ist OpenStatusPage dasselbe wie openstatus?",
        a: "Nein. openstatus (openstatus.dev) ist ein eigenständiges Projekt, das selbst Verfügbarkeits-Checks ausführt und auch als gehosteter Dienst angeboten wird. OpenStatusPage überwacht nichts selbst: Es macht aus dem Monitoring, das du schon betreibst (Icinga 2, Uptime Kuma, openITCockpit, Webhooks), eine öffentliche Statusseite, auf deinen eigenen Servern.",
      },
      {
        q: "Was brauche ich für den Betrieb?",
        a: "Docker Compose ab 2.23.1, einen Kubernetes-Cluster oder einen Linux-Server mit systemd (.deb- und .rpm-Pakete oder ein Installationsskript) und dazu einen Reverse Proxy, der HTTPS bereitstellt. SQLite läuft ganz ohne Konfiguration, für größere Installationen wechselst du auf PostgreSQL. Ein Mailserver nur für den Versand mit DKIM ist dabei. Eine Instanz braucht rund 100 MB Arbeitsspeicher.",
      },
      {
        q: "Läuft es auf Kubernetes?",
        a: "Ja. Es gibt ein Helm-Chart (oci://ghcr.io/raphael-penning/charts/openstatuspage) für Kubernetes ab 1.25, wahlweise als einzelne Instanz oder getrennt in Public, Admin und Worker mit NetworkPolicies, Autoscaling und PodDisruptionBudget. Kustomize-Manifeste sind ebenfalls dabei.",
      },
      {
        q: "Welche Monitoring-Werkzeuge werden unterstützt?",
        a: "Icinga 2, Uptime Kuma und openITCockpit direkt, dazu ein allgemeiner Webhook-Adapter, der Daten abruft oder entgegennimmt. Mehrere Monitoring-Knoten können gewichtet über den Zustand eines Ziels abstimmen.",
      },
      {
        q: "Kann ich meine bisherige Verfügbarkeits-Historie übernehmen?",
        a: "Ja. Administratoren importieren bis zu 731 Tage aus der Icinga-DB-Datenbank, aus Uptime Kuma, aus openITCockpit oder aus einer CSV-Datei. Importe füllen nur Lücken und überschreiben nie die aufgezeichnete Historie, und vor dem Übernehmen siehst du eine Vorschau.",
      },
      {
        q: "Sehen Besucher meine Hostnamen oder Check-Ausgaben?",
        a: "Nein. Besucher sehen nur die Dienste, Sites und Standorte, die du freigibst. Check-Namen, Hosts und Ausgaben bleiben im Verwaltungsbereich – privat von Grund auf.",
      },
      {
        q: "Kann ich eine Statusseite nur für einen Kunden zeigen?",
        a: "Ja, mit privaten Statusseiten. Du wählst die Dienste aus, auch verborgene, und teilst einen geheimen Link mit optionalem Ablaufdatum. Private Seiten werden nie indexiert oder zwischengespeichert und haben keine Statistik.",
      },
      {
        q: "Können meine Kunden Updates abonnieren?",
        a: "Ja. E-Mail-Abos laufen mit Double-Opt-in, wahlweise für alle Meldungen oder nur ausgewählte Dienste, inklusive Wartungserinnerungen und Abmeldung mit einem Klick. Wenn du es erlaubst, abonnieren Besucher auch per Slack-, Teams- oder Discord-Webhook oder per SMS, bestätigt mit einem 6-stelligen Code. Außerdem gibt es RSS- und Atom-Feeds.",
      },
      {
        q: "Kann es nach Slack, Microsoft Teams oder Discord posten?",
        a: "Ja. Admins legen Webhooks für Slack, Microsoft Teams (Workflows), Discord oder allgemeines JSON mit HMAC-SHA256-Signatur an, für alle oder ausgewählte Dienste. SMS gehen über Twilio, Vonage, seven.io, MessageBird oder einen beliebigen HTTP-Anbieter raus, mit Bereitschaftsnummern und Monatsbudget. Jeder Webhook hat einen Test-Button und ein Zustellprotokoll.",
      },
      {
        q: "Kann ich das Aussehen der Statusseite anpassen?",
        a: "Ja. Wähl eins von vier eingebauten Themes (default, slate, forest, high contrast) oder erstell dein eigenes aus einer JSON-Datei mit optionalem CSS. Der Editor prüft jedes Farbpaar in Hell und Dunkel gegen WCAG 2.2 AA. Logo, Favicon und Bilder lassen sich hochladen, und Inhaltsseiten schreibst du in Markdown.",
      },
      {
        q: "Gibt es Single Sign-on?",
        a: "Ja. Neben lokalen Benutzern mit den Rollen Admin und Redakteur legst du in der Verwaltung beliebig viele OpenID-Connect-Anbieter an, etwa Keycloak, Microsoft Entra ID, Authentik, Okta, Zitadel oder Dex. Jeder bekommt einen eigenen Login-Button und eine Rollenzuordnung aus einem Claim, und die Anmeldung per Passwort lässt sich abschalten.",
      },
      {
        q: "Gibt es eine API?",
        a: "Ja, eine HTTP-API nach JSON:API 1.1 mit OpenAPI-3.1-Beschreibung unter /api/openapi.json und einer interaktiven API-Doku mit „Ausprobieren“ in der Verwaltung. Alle öffentlichen Inhalte gibt es zusätzlich als RSS- und Atom-Feed.",
        link: { label: "Zur API-Dokumentation", href: site.apiDocs },
      },
      {
        q: "Ist es bereit für den Produktivbetrieb?",
        a: `OpenStatusPage ist bei Version ${site.version} und noch jung. Releases sind versioniert, und das Changelog führt jede Änderung samt Hinweisen zum Update auf.`,
        link: { label: "Zum Changelog", href: site.changelog },
      },
      {
        q: "Welche Sprachen gibt es?",
        a: "Englisch und Deutsch – sowohl für die öffentliche Statusseite als auch für die Verwaltung.",
      },
    ],
  },
};
