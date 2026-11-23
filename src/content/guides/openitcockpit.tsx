import Link from "next/link";
import { site } from "@/lib/site";
import { guidePath } from "@/lib/routes";
import { Code, H2, Table, type Guide } from "./shared";

const adapterDoc = `${site.github}/blob/main/docs/adapters/openitcockpit.md`;
const contrib = `${site.github}/tree/main/contrib/openitcockpit`;
const issues = `${site.github}/issues`;

const pushInstall = `install -m 755 openstatuspage-notify.sh /opt/openitc/nagios/libexec/openstatuspage-notify.sh
install -m 640 -g nagios openstatuspage-notify.env.example /etc/openitcockpit/openstatuspage-notify.env
# set OSP_URL and OSP_TOKEN (ingest URL and token of the source)`;

const serviceCommand = `/opt/openitc/nagios/libexec/openstatuspage-notify.sh -c /etc/openitcockpit/openstatuspage-notify.env \\
  -t service -H "$HOSTNAME$" -N "$HOSTDISPLAYNAME$" -S "$SERVICEDESC$" -D "$SERVICEDISPLAYNAME$" \\
  -s "$SERVICESTATEID$" -o "$SERVICEOUTPUT$" -T "$TIMET$"`;

const dryRun = `/opt/openitc/nagios/libexec/openstatuspage-notify.sh -n -t service -H host-uuid -S service-uuid -s 2 -o "test"`;

export const openitcockpitGuide: Guide = {
  en: {
    title: "A public status page for openITCockpit",
    metaTitle: "openITCockpit status page: a public page for customers, hosts stay internal",
    description:
      "Build a customer-facing status page on top of openITCockpit with OpenStatusPage: JSON API pull with an API key or a Naemon notification command for push. Self-hosted, open source.",
    eyebrow: "Guide · openITCockpit",
    lead: "openITCockpit gives your team a detailed view of hosts and services. Your customers need something else: a short answer to whether the service they pay for is working. OpenStatusPage reads the states from openITCockpit and publishes only the services you choose, without host names, UUIDs or plugin output.",
    Body: () => (
      <>
        <aside className="callout" aria-label="Project status">
          <p>
            <strong>Honest status:</strong> the openITCockpit adapter is implemented against the
            public API documentation and example responses. It has not yet been verified against a
            real installation. Use <em>Test connection</em> first, and please report differences
            (with anonymized responses) in the <a href={issues}>GitHub issues</a>.
          </p>
        </aside>

        <H2>Why a separate status page?</H2>
        <p>
          openITCockpit is a management interface for Naemon: it shows every host, every service
          and every check output to people with an account. A status page is public and should show
          as little as possible about your setup. OpenStatusPage keeps the two apart. Each public
          service is built from any number of openITCockpit checks, and visitors only see its
          resulting status, incidents and maintenance.
        </p>

        <H2>Pull or push</H2>
        <p>Both modes are supported and can be combined on one source:</p>
        <Table
          caption="Pull and push for openITCockpit compared"
          head={["", "Push (notification command)", "Pull (JSON API)"]}
          rows={[
            ["Connection", "openITCockpit → status page, outbound HTTPS", "Status page → openITCockpit API"],
            ["Credentials on the status page", "None, only a hashed ingest token", "API key of a read-only user, stored encrypted"],
            ["Speed", "Right after a hard state change", "Every 60 seconds by default"],
            ["Best for", "Status page in a DMZ or the cloud", "Status page in the same trusted network"],
          ]}
        />

        <h3>Pull: API key of a read-only user</h3>
        <p>
          In openITCockpit, create a dedicated user with read-only permissions for hosts and
          services, limited to the containers that feed the status page. Under{" "}
          <strong>Edit profile → API keys</strong> create a key. In OpenStatusPage, add a source of
          type <strong>openITCockpit</strong> with the base URL (for example{" "}
          <code>https://oitc.example.com</code>) and the key. Host checks can be included as well.
        </p>
        <p>
          The adapter reads <code>services/index.json</code> and <code>hosts/index.json</code> page
          by page with the <code>X-OITC-API</code> header. A redirect to the login page usually
          means a wrong key or base URL.
        </p>

        <h3>Push: notification command</h3>
        <p>
          The <a href={contrib}>script in contrib/openitcockpit</a> sends state changes to the
          status page. It needs only <code>sh</code> and <code>curl</code> on the openITCockpit
          server and on satellites that send notifications. It also works with other Naemon or
          Nagios based systems.
        </p>
        <Code label="Install the openITCockpit notification script">{pushInstall}</Code>
        <p>
          Then create two notification commands under <strong>Objects → Commands</strong>, one for
          services and one for hosts, for example:
        </p>
        <Code label="Notification command for services">{serviceCommand}</Code>
        <p>
          Add a contact that uses these commands for all states including recovery, assign it to the
          hosts and services that feed the status page and refresh the monitoring configuration. A
          dry run prints the payload without sending it:
        </p>
        <Code label="Test the notification script without sending">{dryRun}</Code>

        <H2>State mapping</H2>
        <Table
          caption="Default mapping from openITCockpit state to check state"
          head={["openITCockpit / Naemon", "Check state"]}
          rows={[
            ["Service OK, host UP", "ok"],
            ["Service WARNING", "warning"],
            ["Service CRITICAL, host DOWN or UNREACHABLE", "critical"],
            ["Service UNKNOWN", "unknown"],
          ]}
        />
        <p>
          On the public side, warning becomes <em>Degraded performance</em> and critical a{" "}
          <em>Major outage</em> by default; you can change this per linked check. Downtimes and
          acknowledgements do not change the public status. Announce planned work as a maintenance
          in OpenStatusPage instead, so subscribers get a notice and a reminder.
        </p>

        <H2>Good to know</H2>
        <ul>
          <li>
            <strong>UUIDs as IDs.</strong> openITCockpit passes host and service UUIDs to Naemon, so
            pull and push match the same checks. Display names are kept for the admin area only.
          </li>
          <li>
            <strong>Hard states for push.</strong> Naemon only notifies on hard state changes.
            Combine push with pull if you want regular reconciliation.
          </li>
          <li>
            <strong>History import.</strong> Past hard states can be imported through the{" "}
            <code>statehistories</code> API with the same key. Set the API user&apos;s time zone to
            UTC first. Like the adapter itself, this is not yet verified against a real installation.
          </li>
          <li>
            <strong>Mix sources.</strong> A public service can combine checks from openITCockpit,
            Icinga 2, Uptime Kuma and webhooks.
          </li>
        </ul>

        <H2>Setup in four steps</H2>
        <ol>
          <li>
            Install OpenStatusPage with Docker Compose or the <Link href={guidePath("kubernetes", "en")}>Helm chart</Link> (see the{" "}
            <Link href="/en#quickstart">quick start</Link>) behind your reverse proxy with HTTPS.
          </li>
          <li>
            In the admin area add a monitoring source of type <strong>openITCockpit</strong>, then
            enter the API key (pull) or copy the ingest URL and token (push).
          </li>
          <li>Configure the openITCockpit side and use <em>Test connection</em>.</li>
          <li>Create public services, link the checks and check the preview before saving.</li>
        </ol>
        <p>
          The full reference with all fields, requests and payloads is in the{" "}
          <a href={adapterDoc}>openITCockpit adapter documentation</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Is the openITCockpit integration production ready?",
        a: "It is implemented against the public openITCockpit API documentation but not yet verified against a real installation. Test it with your instance first and report differences on GitHub so the mapping can be adjusted.",
      },
      {
        q: "Do visitors see openITCockpit host names or UUIDs?",
        a: "No. Visitors see only the public services you create and their status. Host names, UUIDs and check output stay in the admin area.",
      },
      {
        q: "Does it work with plain Naemon or Nagios?",
        a: "The push script uses standard Nagios macros and also works with other Naemon or Nagios based systems. There is no separate Nagios source type; use an openITCockpit or webhook source for push.",
      },
      {
        q: "Does OpenStatusPage replace openITCockpit?",
        a: "No. OpenStatusPage runs no checks. It adds the public part on top of your monitoring: services, incidents, maintenance, email subscriptions and feeds.",
      },
    ],
  },
  de: {
    title: "Eine öffentliche Statusseite für openITCockpit",
    metaTitle: "openITCockpit-Statusseite: öffentlich für Kunden, Hosts bleiben intern",
    description:
      "Bau mit OpenStatusPage eine Statusseite für Kunden auf openITCockpit auf: Pull über die JSON-API mit API-Key oder Push per Naemon-Notification-Command. Selbst gehostet, Open Source.",
    eyebrow: "Guide · openITCockpit",
    lead: "openITCockpit gibt deinem Team einen detaillierten Blick auf Hosts und Services. Deine Kunden brauchen etwas anderes: eine kurze Antwort, ob der Dienst funktioniert, für den sie zahlen. OpenStatusPage liest die Zustände aus openITCockpit und veröffentlicht nur die Dienste, die du auswählst, ohne Hostnamen, UUIDs oder Plugin-Ausgaben.",
    Body: () => (
      <>
        <aside className="callout" aria-label="Projektstatus">
          <p>
            <strong>Ehrlicher Stand:</strong> Der openITCockpit-Adapter ist anhand der öffentlichen
            API-Dokumentation und Beispielantworten umgesetzt. Gegen eine echte Installation wurde er
            noch nicht geprüft. Nutze zuerst <em>Verbindung testen</em> und melde Abweichungen (mit
            anonymisierten Antworten) gern in den <a href={issues}>GitHub-Issues</a>.
          </p>
        </aside>

        <H2>Warum eine eigene Statusseite?</H2>
        <p>
          openITCockpit ist eine Verwaltungsoberfläche für Naemon: Es zeigt jedem mit Konto jeden
          Host, jeden Service und jede Check-Ausgabe. Eine Statusseite ist öffentlich und sollte so
          wenig wie möglich über deinen Aufbau verraten. OpenStatusPage trennt beides. Jeder
          öffentliche Dienst besteht aus beliebig vielen openITCockpit-Checks, und Besucher sehen nur
          seinen Status, Störungen und Wartungen.
        </p>

        <H2>Pull oder Push</H2>
        <p>Beide Wege werden unterstützt und lassen sich auf einer Quelle kombinieren:</p>
        <Table
          caption="Pull und Push für openITCockpit im Vergleich"
          head={["", "Push (Notification-Command)", "Pull (JSON-API)"]}
          rows={[
            ["Verbindung", "openITCockpit → Statusseite, ausgehendes HTTPS", "Statusseite → openITCockpit-API"],
            ["Zugangsdaten auf der Statusseite", "Keine, nur ein gehashter Ingest-Token", "API-Key eines lesenden Benutzers, verschlüsselt gespeichert"],
            ["Tempo", "Direkt nach einer Hard-State-Änderung", "Standardmäßig alle 60 Sekunden"],
            ["Passt für", "Statusseite in einer DMZ oder Cloud", "Statusseite im selben vertrauenswürdigen Netz"],
          ]}
        />

        <h3>Pull: API-Key eines lesenden Benutzers</h3>
        <p>
          Leg in openITCockpit einen eigenen Benutzer mit reinen Leserechten für Hosts und Services
          an, beschränkt auf die Container, die die Statusseite speisen. Unter{" "}
          <strong>Profil bearbeiten → API-Keys</strong> erzeugst du einen Key. In OpenStatusPage
          legst du eine Quelle vom Typ <strong>openITCockpit</strong> mit der Basis-URL (etwa{" "}
          <code>https://oitc.example.com</code>) und dem Key an. Host-Checks lassen sich mit
          übernehmen.
        </p>
        <p>
          Der Adapter liest <code>services/index.json</code> und <code>hosts/index.json</code> Seite
          für Seite mit dem Header <code>X-OITC-API</code>. Eine Weiterleitung auf die Login-Seite
          bedeutet meist einen falschen Key oder eine falsche Basis-URL.
        </p>

        <h3>Push: Notification-Command</h3>
        <p>
          Das <a href={contrib}>Skript in contrib/openitcockpit</a> schickt Zustandsänderungen an
          die Statusseite. Es braucht nur <code>sh</code> und <code>curl</code> auf dem
          openITCockpit-Server und auf Satelliten, die Benachrichtigungen versenden. Es funktioniert
          auch mit anderen Systemen auf Basis von Naemon oder Nagios.
        </p>
        <Code label="Notification-Skript für openITCockpit installieren">{pushInstall}</Code>
        <p>
          Leg danach unter <strong>Objekte → Kommandos</strong> zwei Notification-Commands an, eins
          für Services und eins für Hosts, zum Beispiel:
        </p>
        <Code label="Notification-Command für Services">{serviceCommand}</Code>
        <p>
          Leg einen Kontakt an, der diese Commands für alle Zustände inklusive Recovery nutzt, weise
          ihn den Hosts und Services der Statusseite zu und aktualisiere die
          Monitoring-Konfiguration. Ein Probelauf gibt die Daten aus, ohne sie zu senden:
        </p>
        <Code label="Notification-Skript ohne Senden testen">{dryRun}</Code>

        <H2>Zuordnung der Zustände</H2>
        <Table
          caption="Standardzuordnung von openITCockpit-Zustand zu Check-Zustand"
          head={["openITCockpit / Naemon", "Check-Zustand"]}
          rows={[
            ["Service OK, Host UP", "ok"],
            ["Service WARNING", "warning"],
            ["Service CRITICAL, Host DOWN oder UNREACHABLE", "critical"],
            ["Service UNKNOWN", "unknown"],
          ]}
        />
        <p>
          Öffentlich wird aus warning standardmäßig <em>Eingeschränkte Leistung</em> und aus
          critical ein <em>Schwerer Ausfall</em>; das lässt sich pro verknüpftem Check ändern.
          Downtimes und Acknowledgements ändern den öffentlichen Status nicht. Kündige geplante
          Arbeiten stattdessen als Wartung in OpenStatusPage an, dann bekommen Abonnenten eine
          Meldung und eine Erinnerung.
        </p>

        <H2>Gut zu wissen</H2>
        <ul>
          <li>
            <strong>UUIDs als Kennung.</strong> openITCockpit übergibt Host- und Service-UUIDs an
            Naemon, deshalb treffen Pull und Push dieselben Checks. Anzeigenamen gibt es nur im
            Verwaltungsbereich.
          </li>
          <li>
            <strong>Hard States beim Push.</strong> Naemon benachrichtigt nur bei Hard-State-Wechseln.
            Kombiniere Push mit Pull, wenn du einen regelmäßigen Abgleich willst.
          </li>
          <li>
            <strong>Historie importieren.</strong> Vergangene Hard States lassen sich über die
            API <code>statehistories</code> mit demselben Key übernehmen. Stell die Zeitzone des
            API-Benutzers vorher auf UTC. Wie der Adapter ist auch das noch nicht an einer echten
            Installation geprüft.
          </li>
          <li>
            <strong>Quellen mischen.</strong> Ein öffentlicher Dienst kann Checks aus openITCockpit,
            Icinga 2, Uptime Kuma und Webhooks kombinieren.
          </li>
        </ul>

        <H2>Einrichtung in vier Schritten</H2>
        <ol>
          <li>
            Installiere OpenStatusPage mit Docker Compose oder dem <Link href={guidePath("kubernetes", "de")}>Helm-Chart</Link> (siehe{" "}
            <Link href="/de#quickstart">Schnellstart</Link>) hinter deinem Reverse Proxy mit HTTPS.
          </li>
          <li>
            Leg im Verwaltungsbereich eine Monitoring-Quelle vom Typ <strong>openITCockpit</strong>{" "}
            an und trag den API-Key ein (Pull) oder kopiere Ingest-URL und Token (Push).
          </li>
          <li>Richte die openITCockpit-Seite ein und nutze <em>Verbindung testen</em>.</li>
          <li>Leg öffentliche Dienste an, verknüpfe die Checks und prüf die Vorschau vor dem Speichern.</li>
        </ol>
        <p>
          Die vollständige Referenz mit allen Feldern, Anfragen und Payloads steht in der{" "}
          <a href={adapterDoc}>Dokumentation des openITCockpit-Adapters</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Ist die openITCockpit-Anbindung produktionsreif?",
        a: "Sie ist anhand der öffentlichen API-Dokumentation von openITCockpit umgesetzt, aber noch nicht an einer echten Installation geprüft. Teste sie zuerst mit deiner Instanz und melde Abweichungen auf GitHub, damit die Zuordnung angepasst werden kann.",
      },
      {
        q: "Sehen Besucher Hostnamen oder UUIDs aus openITCockpit?",
        a: "Nein. Besucher sehen nur die öffentlichen Dienste, die du anlegst, und ihren Status. Hostnamen, UUIDs und Check-Ausgaben bleiben im Verwaltungsbereich.",
      },
      {
        q: "Funktioniert es mit reinem Naemon oder Nagios?",
        a: "Das Push-Skript nutzt die üblichen Nagios-Makros und funktioniert auch mit anderen Systemen auf Basis von Naemon oder Nagios. Einen eigenen Quelltyp für Nagios gibt es nicht; nutze für Push eine openITCockpit- oder Webhook-Quelle.",
      },
      {
        q: "Ersetzt OpenStatusPage openITCockpit?",
        a: "Nein. OpenStatusPage führt keine Checks aus. Es ergänzt dein Monitoring um den öffentlichen Teil: Dienste, Störungen, Wartungen, E-Mail-Abos und Feeds.",
      },
    ],
  },
};
