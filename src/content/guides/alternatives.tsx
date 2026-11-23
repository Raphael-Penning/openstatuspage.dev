import Link from "next/link";
import { site } from "@/lib/site";
import { H2, H3, Table, type Guide } from "./shared";

const links = {
  statuspage: "https://www.atlassian.com/software/statuspage/pricing",
  cachet: "https://github.com/cachethq/cachet",
  upptime: "https://github.com/upptime/upptime",
  gatus: "https://github.com/TwiN/gatus",
  kuma: "https://github.com/louislam/uptime-kuma",
  cstate: "https://github.com/cstate/cstate",
  kener: "https://github.com/rajnandan1/kener",
};

const P = ({ href, children }: { href: string; children: string }) => <a href={href}>{children}</a>;

export const alternativesGuide: Guide = {
  en: {
    title: "Open-source alternatives to Atlassian Statuspage",
    metaTitle: "Open-source Statuspage alternatives compared (2026): self-hosted status pages",
    description:
      "A neutral comparison of self-hosted, open-source status pages: OpenStatusPage, Cachet, Upptime, Gatus, Uptime Kuma, cState and Kener. Licence, hosting, how status is determined and when each one fits.",
    eyebrow: "Comparison · November 2026",
    lead: "Atlassian Statuspage is the best-known hosted status page. If you would rather run your own, there are several open-source options, and they solve different problems. This page compares them honestly, including when OpenStatusPage is not the right choice.",
    Body: () => (
      <>
        <H2>Why teams look for an alternative</H2>
        <p>
          <P href={links.statuspage}>Atlassian Statuspage</P> is a hosted service. Its free plan
          allows 100 subscribers, 2 team members and 25 components; paid public pages start at
          $29 per month (as of November 2026). Typical reasons to self-host instead:
        </p>
        <ul>
          <li>visitor and subscriber data should stay on your own servers,</li>
          <li>the status should follow your existing monitoring automatically,</li>
          <li>limits on subscribers, team members or components,</li>
          <li>you want to own the software, its look and its availability.</li>
        </ul>

        <H2>The options at a glance</H2>
        <p>
          The biggest difference is <strong>where the status comes from</strong>: some tools run
          their own checks, some are edited by hand, and OpenStatusPage takes it from the monitoring
          you already run.
        </p>
        <Table
          caption="Open-source status pages compared"
          head={["Project", "Licence", "Runs on", "Where the status comes from", "Notifications"]}
          rows={[
            ["OpenStatusPage", "AGPL-3.0", "Docker Compose, Helm chart or .deb/.rpm", "Your monitoring: Icinga 2, Uptime Kuma, openITCockpit, webhooks; composed into services", "Email, webhook (Slack, Teams, Discord) and SMS subscriptions for visitors"],
            ["Cachet", "v2: BSD-3-Clause; 3.x: source-available", "PHP / Laravel", "Manual or via API", "Email subscribers"],
            ["Upptime", "MIT", "GitHub Actions + GitHub Pages", "Own checks, at most every 5 minutes", "Alerts for the team"],
            ["Gatus", "Apache-2.0", "Go, Docker", "Own checks (HTTP, ICMP, TCP, DNS) defined in YAML", "Alerts for the team"],
            ["Uptime Kuma", "MIT", "Node.js, Docker", "Own monitors, shown directly on the status page", "Alerts for the team"],
            ["cState", "MIT", "Hugo static site", "Manual (Markdown files via Git or CMS)", "None built in"],
            ["Kener", "MIT", "SvelteKit, Docker + Redis", "Own checks (API, ping, TCP, DNS, SSL and more)", "Email, webhook, Slack, Discord"],
          ]}
        />

        <H2>The projects in short</H2>

        <H3>OpenStatusPage</H3>
        <p>
          Built for companies that already monitor their systems and want to tell customers about
          incidents without exposing internal infrastructure. Public services are composed from any
          number of internal checks with aggregation rules; several monitoring nodes can vote on a
          state. Incidents, maintenance, notifications by email, Slack, Teams, Discord and SMS,
          private status pages per customer, history import, themes, OIDC single sign-on, a
          JSON:API with OpenAPI description and accessible pages that work without JavaScript are
          included; it runs on Docker Compose, Kubernetes via a Helm chart or as .deb/.rpm package. <strong>Not a fit</strong> if you have
          no monitoring yet (it runs no checks itself) or need a mature, long-established product:
          the project is young (version {site.version}).
        </p>

        <H3>Cachet</H3>
        <p>
          One of the oldest open-source status pages, with components, incidents, metrics and
          email subscribers. The current 3.x branch uses a source-available licence and is not yet
          released for production; the latest stable release is v2.4.1 from November 2023
          (BSD-3-Clause). <strong>Fits</strong> if you want a classic, manually maintained status
          page in a PHP stack.
        </p>

        <H3>Upptime</H3>
        <p>
          Runs entirely on GitHub: Actions check your endpoints, GitHub Pages hosts the status
          page and an outage opens a GitHub issue whose comments become incident updates.{" "}
          <strong>Fits</strong> for public endpoints and teams who live on GitHub and do not want to
          run a server. Checks run at most every 5 minutes and cannot see internal systems.
        </p>

        <H3>Gatus</H3>
        <p>
          A developer-oriented health dashboard in Go: endpoints and conditions (status code,
          response time, body, certificate expiry) are defined in YAML, with maintenance windows
          and announcements. <strong>Fits</strong> if you want monitoring and status page in one
          config-as-code tool.
        </p>

        <H3>Uptime Kuma</H3>
        <p>
          A very popular self-hosted monitoring tool with built-in status pages that show monitors
          directly, plus incident banners and maintenance. <strong>Fits</strong> if a list of
          monitors is the right public view. It also works as the monitoring behind OpenStatusPage
          (see the <Link href="/en/uptime-kuma-status-page">Uptime Kuma guide</Link>).
        </p>

        <H3>cState</H3>
        <p>
          A static status page built with Hugo: incidents are Markdown files edited via Git or a
          Git-based CMS and the site can be hosted on any static host. It does no automatic
          monitoring. <strong>Fits</strong> if you want a fast, nearly free page and maintain the
          status by hand.
        </p>

        <H3>Kener</H3>
        <p>
          A modern status page with its own checks, incidents with timelines, maintenance windows
          and several status pages, built with SvelteKit. <strong>Fits</strong> if you want checks
          and status page in one app with a polished look.
        </p>

        <H2>How to choose</H2>
        <ul>
          <li>
            <strong>You already run Icinga 2, Uptime Kuma or openITCockpit</strong> and want
            customers to see services instead of checks: OpenStatusPage.
          </li>
          <li>
            <strong>You want checks and status page in one tool</strong>: Gatus, Kener or Uptime
            Kuma.
          </li>
          <li>
            <strong>No server at all</strong>: Upptime (automatic) or cState (manual).
          </li>
          <li>
            <strong>Purely manual, classic status page in PHP</strong>: Cachet; check the licence
            of the version you use.
          </li>
        </ul>
        <p>
          Facts as of November 2026, taken from each project&apos;s repository, licence and
          documentation. Spotted something outdated? Please{" "}
          <a href="https://github.com/Raphael-Penning/openstatuspage.dev/issues">open an issue</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "What is the best free alternative to Atlassian Statuspage?",
        a: "It depends on where your status should come from. If you already run monitoring such as Icinga 2 or Uptime Kuma, OpenStatusPage builds a public page from it. For checks and status page in one tool, Gatus, Kener or Uptime Kuma fit; without any server, Upptime or cState.",
      },
      {
        q: "Is Cachet still open source?",
        a: "Cachet 2.x is BSD-3-Clause licensed; its latest stable release is v2.4.1 from November 2023. The 3.x branch uses a custom source-available licence and was not released for production as of November 2026.",
      },
      {
        q: "Can a self-hosted status page send email updates to customers?",
        a: "Some can. OpenStatusPage includes email subscriptions with double opt-in for all updates or selected services and, if the admin allows it, webhook and SMS subscriptions; Cachet has email subscribers. Upptime, Gatus and Uptime Kuma send alerts to your team but have no built-in subscriptions for visitors.",
      },
      {
        q: "Does OpenStatusPage monitor my services?",
        a: "No. It imports results from existing monitoring (Icinga 2, Uptime Kuma, openITCockpit or any script via webhook) and turns them into public services, incidents and maintenance notices.",
      },
    ],
  },
  de: {
    title: "Open-Source-Alternativen zu Atlassian Statuspage",
    metaTitle: "Open-Source-Alternativen zu Statuspage im Vergleich (2026): selbst gehostete Statusseiten",
    description:
      "Ein neutraler Vergleich selbst gehosteter Open-Source-Statusseiten: OpenStatusPage, Cachet, Upptime, Gatus, Uptime Kuma, cState und Kener. Lizenz, Betrieb, Herkunft des Status und wofür sich welches Projekt eignet.",
    eyebrow: "Vergleich · November 2026",
    lead: "Atlassian Statuspage ist die bekannteste gehostete Statusseite. Wer lieber selbst betreibt, hat mehrere Open-Source-Optionen, und sie lösen unterschiedliche Probleme. Diese Seite vergleicht sie ehrlich, auch dort, wo OpenStatusPage nicht die richtige Wahl ist.",
    Body: () => (
      <>
        <H2>Warum Teams eine Alternative suchen</H2>
        <p>
          <P href={links.statuspage}>Atlassian Statuspage</P> ist ein gehosteter Dienst. Der
          kostenlose Tarif erlaubt 100 Abonnenten, 2 Teammitglieder und 25 Komponenten; bezahlte
          öffentliche Seiten beginnen bei 29 US-Dollar im Monat (Stand November 2026). Typische
          Gründe, selbst zu hosten:
        </p>
        <ul>
          <li>Besucher- und Abonnentendaten sollen auf eigenen Servern bleiben,</li>
          <li>der Status soll automatisch dem bestehenden Monitoring folgen,</li>
          <li>Grenzen bei Abonnenten, Teammitgliedern oder Komponenten,</li>
          <li>du willst die Software, ihr Aussehen und ihre Verfügbarkeit selbst in der Hand haben.</li>
        </ul>

        <H2>Die Optionen im Überblick</H2>
        <p>
          Der größte Unterschied ist, <strong>woher der Status kommt</strong>: Manche Werkzeuge
          prüfen selbst, manche werden von Hand gepflegt, und OpenStatusPage übernimmt ihn aus dem
          Monitoring, das du schon betreibst.
        </p>
        <Table
          caption="Open-Source-Statusseiten im Vergleich"
          head={["Projekt", "Lizenz", "Läuft auf", "Woher der Status kommt", "Benachrichtigungen"]}
          rows={[
            ["OpenStatusPage", "AGPL-3.0", "Docker Compose, Helm-Chart oder .deb/.rpm", "Dein Monitoring: Icinga 2, Uptime Kuma, openITCockpit, Webhooks; zu Diensten zusammengesetzt", "Abos für Besucher per E-Mail, Webhook (Slack, Teams, Discord) und SMS"],
            ["Cachet", "v2: BSD-3-Clause; 3.x: Source-available", "PHP / Laravel", "Von Hand oder per API", "E-Mail-Abonnenten"],
            ["Upptime", "MIT", "GitHub Actions + GitHub Pages", "Eigene Checks, höchstens alle 5 Minuten", "Alarme fürs Team"],
            ["Gatus", "Apache-2.0", "Go, Docker", "Eigene Checks (HTTP, ICMP, TCP, DNS) in YAML", "Alarme fürs Team"],
            ["Uptime Kuma", "MIT", "Node.js, Docker", "Eigene Monitore, direkt auf der Statusseite", "Alarme fürs Team"],
            ["cState", "MIT", "Hugo, statische Seite", "Von Hand (Markdown-Dateien über Git oder CMS)", "Keine eingebaut"],
            ["Kener", "MIT", "SvelteKit, Docker + Redis", "Eigene Checks (API, Ping, TCP, DNS, SSL u. a.)", "E-Mail, Webhook, Slack, Discord"],
          ]}
        />

        <H2>Die Projekte kurz vorgestellt</H2>

        <H3>OpenStatusPage</H3>
        <p>
          Gebaut für Unternehmen, die ihre Systeme schon überwachen und Kunden über Störungen
          informieren wollen, ohne interne Infrastruktur offenzulegen. Öffentliche Dienste werden
          aus beliebig vielen internen Checks mit Regeln zusammengesetzt; mehrere Monitoring-Knoten
          können über einen Zustand abstimmen. Vorfälle, Wartungen, Benachrichtigungen per E-Mail,
          Slack, Teams, Discord und SMS, private Statusseiten pro Kunde, Import der Historie,
          Themes, OIDC-Single-Sign-on, eine JSON:API mit OpenAPI-Beschreibung und barrierefreie
          Seiten, die ohne JavaScript funktionieren, sind dabei; es läuft mit Docker Compose, per
          Helm-Chart auf Kubernetes oder als .deb-/.rpm-Paket.{" "}
          <strong>Passt nicht</strong>, wenn du noch kein Monitoring hast (es prüft selbst nichts)
          oder ein lange etabliertes Produkt brauchst: Das Projekt ist noch jung (Version {site.version}).
        </p>

        <H3>Cachet</H3>
        <p>
          Eine der ältesten Open-Source-Statusseiten, mit Komponenten, Vorfällen, Metriken und
          E-Mail-Abonnenten. Der aktuelle 3.x-Zweig steht unter einer Source-available-Lizenz und
          ist noch nicht für den Produktivbetrieb freigegeben; die letzte stabile Version ist
          v2.4.1 vom November 2023 (BSD-3-Clause). <strong>Passt</strong>, wenn du eine klassische,
          von Hand gepflegte Statusseite in einem PHP-Stack willst.
        </p>

        <H3>Upptime</H3>
        <p>
          Läuft komplett auf GitHub: Actions prüfen deine Endpunkte, GitHub Pages hostet die
          Statusseite, und ein Ausfall öffnet ein GitHub-Issue, dessen Kommentare zu
          Vorfall-Updates werden. <strong>Passt</strong> für öffentliche Endpunkte und Teams, die
          auf GitHub zu Hause sind und keinen Server betreiben wollen. Geprüft wird höchstens alle 5
          Minuten, interne Systeme sind nicht erreichbar.
        </p>

        <H3>Gatus</H3>
        <p>
          Ein Health-Dashboard für Entwickler in Go: Endpunkte und Bedingungen (Statuscode,
          Antwortzeit, Inhalt, Zertifikatsablauf) stehen in YAML, dazu Wartungsfenster und
          Ankündigungen. <strong>Passt</strong>, wenn du Monitoring und Statusseite in einem
          Config-as-Code-Werkzeug willst.
        </p>

        <H3>Uptime Kuma</H3>
        <p>
          Ein sehr verbreitetes selbst gehostetes Monitoring mit eingebauten Statusseiten, die
          Monitore direkt zeigen, dazu Vorfall-Hinweise und Wartungen. <strong>Passt</strong>, wenn
          eine Liste von Monitoren die richtige öffentliche Sicht ist. Es eignet sich auch als
          Monitoring hinter OpenStatusPage (siehe{" "}
          <Link href="/de/uptime-kuma-statusseite">Guide zu Uptime Kuma</Link>).
        </p>

        <H3>cState</H3>
        <p>
          Eine statische Statusseite mit Hugo: Vorfälle sind Markdown-Dateien, gepflegt über Git
          oder ein Git-basiertes CMS, gehostet auf jedem statischen Host. Automatisches Monitoring
          gibt es nicht. <strong>Passt</strong>, wenn du eine schnelle, fast kostenlose Seite willst
          und den Status von Hand pflegst.
        </p>

        <H3>Kener</H3>
        <p>
          Eine moderne Statusseite mit eigenen Checks, Vorfällen mit Zeitleiste, Wartungsfenstern
          und mehreren Statusseiten, gebaut mit SvelteKit. <strong>Passt</strong>, wenn du Checks und
          Statusseite in einer App mit poliertem Auftritt willst.
        </p>

        <H2>So entscheidest du</H2>
        <ul>
          <li>
            <strong>Du betreibst schon Icinga 2, Uptime Kuma oder openITCockpit</strong> und Kunden
            sollen Dienste statt Checks sehen: OpenStatusPage.
          </li>
          <li>
            <strong>Checks und Statusseite in einem Werkzeug</strong>: Gatus, Kener oder Uptime
            Kuma.
          </li>
          <li>
            <strong>Ganz ohne Server</strong>: Upptime (automatisch) oder cState (von Hand).
          </li>
          <li>
            <strong>Rein manuelle, klassische Statusseite in PHP</strong>: Cachet; prüf die Lizenz
            der Version, die du nutzt.
          </li>
        </ul>
        <p>
          Stand November 2026, entnommen aus Repository, Lizenz und Dokumentation des jeweiligen
          Projekts. Etwas ist veraltet? Bitte{" "}
          <a href="https://github.com/Raphael-Penning/openstatuspage.dev/issues">eröffne ein Issue</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Was ist die beste kostenlose Alternative zu Atlassian Statuspage?",
        a: "Das hängt davon ab, woher dein Status kommen soll. Betreibst du schon Monitoring wie Icinga 2 oder Uptime Kuma, baut OpenStatusPage daraus eine öffentliche Seite. Für Checks und Statusseite in einem Werkzeug passen Gatus, Kener oder Uptime Kuma; ganz ohne Server Upptime oder cState.",
      },
      {
        q: "Ist Cachet noch Open Source?",
        a: "Cachet 2.x steht unter BSD-3-Clause; die letzte stabile Version ist v2.4.1 vom November 2023. Der 3.x-Zweig nutzt eine eigene Source-available-Lizenz und war im November 2026 nicht für den Produktivbetrieb freigegeben.",
      },
      {
        q: "Kann eine selbst gehostete Statusseite Kunden per E-Mail informieren?",
        a: "Manche schon. OpenStatusPage bietet E-Mail-Abos mit Double-Opt-in für alle Updates oder ausgewählte Dienste und, wenn der Admin es erlaubt, Abos per Webhook und SMS; Cachet hat E-Mail-Abonnenten. Upptime, Gatus und Uptime Kuma alarmieren dein Team, haben aber keine eingebauten Abos für Besucher.",
      },
      {
        q: "Überwacht OpenStatusPage meine Dienste?",
        a: "Nein. Es übernimmt Ergebnisse aus bestehendem Monitoring (Icinga 2, Uptime Kuma, openITCockpit oder beliebige Skripte per Webhook) und macht daraus öffentliche Dienste, Vorfälle und Wartungshinweise.",
      },
    ],
  },
};
