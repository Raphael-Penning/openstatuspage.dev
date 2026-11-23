import Link from "next/link";
import { site } from "@/lib/site";
import { guidePath } from "@/lib/routes";
import { Code, H2, Table, type Guide } from "./shared";

const adapterDoc = `${site.github}/blob/main/docs/adapters/icinga2.md`;
const contrib = `${site.github}/tree/main/contrib/icinga2`;

const apiUser = `object ApiUser "openstatuspage" {
  password = "<long random password>"
  permissions = [
    { permission = "objects/query/Service", filter = {{ "statuspage" in service.groups }} },
    { permission = "objects/query/Host",    filter = {{ "statuspage" in host.groups }} },
  ]
}`;

const pushInstall = `install -m 755 openstatuspage-notify.sh /etc/icinga2/scripts/
install -m 640 -g icinga openstatuspage-notify.env.example /etc/icinga2/openstatuspage-notify.env
# set OSP_URL and OSP_TOKEN, then copy openstatuspage.conf to /etc/icinga2/conf.d/
icinga2 daemon -C && systemctl reload icinga2`;

export const icingaGuide: Guide = {
  en: {
    title: "A public status page for Icinga 2",
    metaTitle: "Icinga 2 status page: show customers your status without exposing hosts",
    description:
      "Turn Icinga 2 checks into a public status page with OpenStatusPage: REST API pull or notification push, hard states only, no host names or check output for visitors. Self-hosted, open source.",
    eyebrow: "Guide · Icinga 2",
    lead: "Icinga Web is made for your operations team, not for customers. OpenStatusPage reads the states Icinga 2 already knows and turns them into a calm public status page with services your customers understand. Host names, service names and check output stay internal.",
    Body: () => (
      <>
        <H2>Why not just share Icinga Web?</H2>
        <p>
          Icinga Web shows every host, every service and every plugin output. That is exactly what
          you need internally and exactly what customers should not see: internal host names, IP
          addresses and error messages give attackers a map of your infrastructure, and a single
          flapping disk check would look like an outage to a customer.
        </p>
        <p>
          A status page answers a simpler question: <em>is the service I use working?</em>{" "}
          OpenStatusPage lets you build those public services from any number of Icinga checks and
          decide how each check state affects them.
        </p>

        <H2>How OpenStatusPage connects to Icinga 2</H2>
        <p>OpenStatusPage does not run checks itself. It imports results from Icinga 2 in one of two ways, which can be combined on one source:</p>
        <Table
          caption="Pull and push compared"
          head={["", "Push (notification)", "Pull (REST API)"]}
          rows={[
            ["Connection", "Icinga → status page, outbound HTTPS", "Status page → Icinga API (port 5665)"],
            ["Credentials on the status page", "None, only a hashed ingest token", "Read-only API user, stored encrypted"],
            ["Speed", "Seconds after a state change", "Every 60 seconds by default"],
            ["Best for", "Status page in a DMZ or the cloud", "Status page in the same trusted network"],
          ]}
        />
        <p>
          If your status page is reachable from the internet, <strong>push is recommended</strong>:
          a compromised status page then cannot reach into your monitoring.
        </p>

        <h3>Push: notification script</h3>
        <p>
          The <a href={contrib}>notification script in contrib/icinga2</a> sends state changes to
          the status page. It needs only <code>sh</code>, <code>curl</code> and outbound HTTPS on
          the Icinga 2 host (and on every satellite that sends notifications).
        </p>
        <Code label="Install the Icinga 2 notification script">{pushInstall}</Code>

        <h3>Pull: read-only API user</h3>
        <p>
          For pull, create a dedicated API user that may only query the objects feeding the status
          page, for example everything in the group <code>statuspage</code>:
        </p>
        <Code label="Icinga 2 API user with filtered read-only permissions">{apiUser}</Code>
        <p>
          In OpenStatusPage, add a monitoring source of type <strong>Icinga 2</strong> with the base
          URL (for example <code>https://icinga.example.com:5665</code>) and these credentials. An
          optional filter such as <code>&quot;statuspage&quot; in service.groups</code> limits what
          is imported.
        </p>

        <H2>From checks to public services</H2>
        <p>
          Each public service is composed of one or more checks. For every linked check you decide
          which service status a check state causes:
        </p>
        <Table
          caption="Default mapping from Icinga state to service status"
          head={["Icinga 2 state", "Default service status"]}
          rows={[
            ["OK / UP", "no effect"],
            ["WARNING", "Degraded performance"],
            ["CRITICAL / DOWN", "Major outage"],
            ["UNKNOWN / pending", "ignored"],
          ]}
        />
        <p>
          Checks are combined either by <strong>worst check</strong> (every component is required)
          or by <strong>redundancy</strong>, for example several web servers behind a load balancer:
          as long as not all of them are critical, the service is at most a partial outage.
        </p>

        <H2>What makes this calm</H2>
        <ul>
          <li>
            <strong>Hard states only.</strong> Soft states and retries are ignored, so short flaps
            never reach the public page.
          </li>
          <li>
            <strong>Downtimes stay internal.</strong> Icinga downtimes and acknowledgements do not
            change the public status. Announce planned work as a maintenance in OpenStatusPage
            instead; customers then see a proper notice and can subscribe to it.
          </li>
          <li>
            <strong>Failures do not cause outages.</strong> If a poll fails, checks keep their last
            known state and the error is shown on the source in the admin area.
          </li>
          <li>
            <strong>History from day one.</strong> Past states can be imported from the Icinga DB
            database with a read-only user, so the 90-day uptime bars are not empty after go-live.
          </li>
        </ul>

        <H2>Setup in four steps</H2>
        <ol>
          <li>
            Install OpenStatusPage with Docker Compose (see the <Link href="/en#quickstart">quick start</Link>) or the <Link href={guidePath("kubernetes", "en")}>Helm chart</Link>
            and put your reverse proxy with HTTPS in front of it.
          </li>
          <li>
            In the admin area open <strong>Monitoring → Sources → New source</strong>, choose{" "}
            <strong>Icinga 2</strong> and copy the ingest URL and token (push) or enter the API URL
            and user (pull).
          </li>
          <li>
            Configure the Icinga side: notification script for push, API user for pull. Imported
            checks appear under <strong>Monitoring → Checks</strong>.
          </li>
          <li>
            Create public services under <strong>Catalog → Services &amp; sites</strong>, link the
            checks and check the preview before saving.
          </li>
        </ol>
        <p>
          The full reference with payloads, state mapping and history import is in the{" "}
          <a href={adapterDoc}>Icinga 2 adapter documentation</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Do customers see Icinga host names or check output?",
        a: "No. Customers only see the public services you create and their resulting status. Host names, service names and plugin output are visible only in the admin area.",
      },
      {
        q: "Does it work with Icinga 2 satellites and distributed setups?",
        a: "Yes. With push, install the notification script on every Icinga 2 node that sends notifications. With pull, OpenStatusPage queries the REST API of the master or another node that knows all objects.",
      },
      {
        q: "Does OpenStatusPage replace Icinga 2?",
        a: "No. OpenStatusPage does not run checks. It imports the results of the monitoring you already have and adds the public part: services, incidents, maintenance and email subscriptions.",
      },
      {
        q: "Can I combine Icinga 2 with other monitoring tools?",
        a: "Yes. A public service can be composed of checks from Icinga 2, Uptime Kuma, openITCockpit and generic webhooks at the same time.",
      },
    ],
  },
  de: {
    title: "Eine öffentliche Statusseite für Icinga 2",
    metaTitle: "Icinga-2-Statusseite: Status zeigen, ohne Hosts offenzulegen",
    description:
      "Mach aus Icinga-2-Checks eine öffentliche Statusseite mit OpenStatusPage: Pull über die REST-API oder Push per Notification, nur Hard States, keine Hostnamen oder Check-Ausgaben für Besucher. Selbst gehostet, Open Source.",
    eyebrow: "Guide · Icinga 2",
    lead: "Icinga Web ist für dein Betriebsteam gemacht, nicht für Kunden. OpenStatusPage liest die Zustände, die Icinga 2 ohnehin kennt, und macht daraus eine ruhige öffentliche Statusseite mit Diensten, die deine Kunden verstehen. Hostnamen, Service-Namen und Check-Ausgaben bleiben intern.",
    Body: () => (
      <>
        <H2>Warum nicht einfach Icinga Web teilen?</H2>
        <p>
          Icinga Web zeigt jeden Host, jeden Service und jede Plugin-Ausgabe. Genau das brauchst du
          intern, und genau das sollen Kunden nicht sehen: Interne Hostnamen, IP-Adressen und
          Fehlermeldungen sind eine Landkarte deiner Infrastruktur, und ein einzelner flatternder
          Festplatten-Check sähe für Kunden wie ein Ausfall aus.
        </p>
        <p>
          Eine Statusseite beantwortet eine einfachere Frage: <em>Funktioniert der Dienst, den ich
          nutze?</em> Mit OpenStatusPage setzt du diese öffentlichen Dienste aus beliebig vielen
          Icinga-Checks zusammen und legst fest, wie sich jeder Check-Zustand auswirkt.
        </p>

        <H2>So verbindet sich OpenStatusPage mit Icinga 2</H2>
        <p>OpenStatusPage führt selbst keine Checks aus. Es übernimmt die Ergebnisse aus Icinga 2 auf einem von zwei Wegen, die sich auf einer Quelle kombinieren lassen:</p>
        <Table
          caption="Push und Pull im Vergleich"
          head={["", "Push (Notification)", "Pull (REST-API)"]}
          rows={[
            ["Verbindung", "Icinga → Statusseite, ausgehendes HTTPS", "Statusseite → Icinga-API (Port 5665)"],
            ["Zugangsdaten auf der Statusseite", "Keine, nur ein gehashter Ingest-Token", "Lesender API-Benutzer, verschlüsselt gespeichert"],
            ["Tempo", "Sekunden nach einer Zustandsänderung", "Standardmäßig alle 60 Sekunden"],
            ["Passt für", "Statusseite in einer DMZ oder Cloud", "Statusseite im selben vertrauenswürdigen Netz"],
          ]}
        />
        <p>
          Ist deine Statusseite aus dem Internet erreichbar, ist <strong>Push die Empfehlung</strong>:
          Eine kompromittierte Statusseite kann dann nicht in dein Monitoring greifen.
        </p>

        <h3>Push: Notification-Skript</h3>
        <p>
          Das <a href={contrib}>Notification-Skript in contrib/icinga2</a> schickt
          Zustandsänderungen an die Statusseite. Es braucht nur <code>sh</code>, <code>curl</code>{" "}
          und ausgehendes HTTPS auf dem Icinga-2-Host (und auf jedem Satelliten, der
          Benachrichtigungen verschickt).
        </p>
        <Code label="Icinga-2-Notification-Skript installieren">{pushInstall}</Code>

        <h3>Pull: lesender API-Benutzer</h3>
        <p>
          Für Pull legst du einen eigenen API-Benutzer an, der nur die Objekte abfragen darf, die
          die Statusseite speisen, zum Beispiel alles in der Gruppe <code>statuspage</code>:
        </p>
        <Code label="Icinga-2-API-Benutzer mit gefilterten Leserechten">{apiUser}</Code>
        <p>
          In OpenStatusPage legst du eine Monitoring-Quelle vom Typ <strong>Icinga 2</strong> mit
          der Basis-URL (zum Beispiel <code>https://icinga.example.com:5665</code>) und diesen
          Zugangsdaten an. Ein optionaler Filter wie{" "}
          <code>&quot;statuspage&quot; in service.groups</code> begrenzt, was importiert wird.
        </p>

        <H2>Von Checks zu öffentlichen Diensten</H2>
        <p>
          Jeder öffentliche Dienst besteht aus einem oder mehreren Checks. Für jeden verknüpften
          Check legst du fest, welchen Service-Status ein Check-Zustand auslöst:
        </p>
        <Table
          caption="Standard-Zuordnung von Icinga-Zustand zu Service-Status"
          head={["Icinga-2-Zustand", "Standard-Service-Status"]}
          rows={[
            ["OK / UP", "keine Auswirkung"],
            ["WARNING", "Eingeschränkte Leistung"],
            ["CRITICAL / DOWN", "Schwerer Ausfall"],
            ["UNKNOWN / pending", "ignoriert"],
          ]}
        />
        <p>
          Kombiniert werden die Checks entweder nach dem <strong>schlechtesten Check</strong> (jede
          Komponente ist nötig) oder nach <strong>Redundanz</strong>, etwa bei mehreren Webservern
          hinter einem Load Balancer: Solange nicht alle kritisch sind, ist der Dienst höchstens
          teilweise ausgefallen.
        </p>

        <H2>Was für Ruhe sorgt</H2>
        <ul>
          <li>
            <strong>Nur Hard States.</strong> Soft States und Wiederholungen werden ignoriert, kurze
            Flaps erreichen die öffentliche Seite nie.
          </li>
          <li>
            <strong>Downtimes bleiben intern.</strong> Icinga-Downtimes und Acknowledgements ändern
            den öffentlichen Status nicht. Geplante Arbeiten kündigst du in OpenStatusPage als
            Wartung an; Kunden sehen dann einen richtigen Hinweis und können ihn abonnieren.
          </li>
          <li>
            <strong>Störungen der Anbindung lösen keine Ausfälle aus.</strong> Schlägt eine Abfrage
            fehl, behalten die Checks ihren letzten Zustand und der Fehler steht an der Quelle im
            Admin-Bereich.
          </li>
          <li>
            <strong>Verlauf ab dem ersten Tag.</strong> Frühere Zustände lassen sich mit einem
            lesenden Benutzer aus der Icinga-DB-Datenbank importieren, damit die 90-Tage-Balken nach
            dem Start nicht leer sind.
          </li>
        </ul>

        <H2>Einrichtung in vier Schritten</H2>
        <ol>
          <li>
            OpenStatusPage mit Docker Compose (siehe <Link href="/de#quickstart">Schnellstart</Link>)
            oder dem <Link href={guidePath("kubernetes", "de")}>Helm-Chart</Link> installieren und deinen Reverse Proxy mit HTTPS
            davorsetzen.
          </li>
          <li>
            Im Admin-Bereich <strong>Monitoring → Quellen → Neue Quelle</strong> öffnen,{" "}
            <strong>Icinga 2</strong> wählen und Ingest-URL und Token kopieren (Push) oder API-URL
            und Benutzer eintragen (Pull).
          </li>
          <li>
            Icinga-Seite einrichten: Notification-Skript für Push, API-Benutzer für Pull.
            Importierte Checks erscheinen unter <strong>Monitoring → Checks</strong>.
          </li>
          <li>
            Unter <strong>Katalog → Services &amp; Sites</strong> öffentliche Dienste anlegen,
            Checks verknüpfen und vor dem Speichern die Vorschau prüfen.
          </li>
        </ol>
        <p>
          Die vollständige Referenz mit Payloads, Zuordnung und Verlaufsimport steht in der{" "}
          <a href={adapterDoc} hrefLang="en">Icinga-2-Adapter-Dokumentation</a> (englisch).
        </p>
      </>
    ),
    faq: [
      {
        q: "Sehen Kunden Icinga-Hostnamen oder Check-Ausgaben?",
        a: "Nein. Kunden sehen nur die öffentlichen Dienste, die du anlegst, und deren Status. Hostnamen, Service-Namen und Plugin-Ausgaben sind nur im Admin-Bereich sichtbar.",
      },
      {
        q: "Funktioniert es mit Icinga-2-Satelliten und verteilten Setups?",
        a: "Ja. Bei Push installierst du das Notification-Skript auf jedem Icinga-2-Knoten, der Benachrichtigungen verschickt. Bei Pull fragt OpenStatusPage die REST-API des Masters oder eines anderen Knotens ab, der alle Objekte kennt.",
      },
      {
        q: "Ersetzt OpenStatusPage Icinga 2?",
        a: "Nein. OpenStatusPage führt keine Checks aus. Es übernimmt die Ergebnisse deines bestehenden Monitorings und ergänzt den öffentlichen Teil: Dienste, Vorfälle, Wartungen und E-Mail-Abos.",
      },
      {
        q: "Kann ich Icinga 2 mit anderen Monitoring-Werkzeugen kombinieren?",
        a: "Ja. Ein öffentlicher Dienst kann gleichzeitig aus Checks von Icinga 2, Uptime Kuma, openITCockpit und generischen Webhooks bestehen.",
      },
    ],
  },
};
