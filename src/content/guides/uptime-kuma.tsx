import Link from "next/link";
import { site } from "@/lib/site";
import { guidePath } from "@/lib/routes";
import { H2, Table, type Guide } from "./shared";

const adapterDoc = `${site.github}/blob/main/docs/adapters/uptime-kuma.md`;

export const uptimeKumaGuide: Guide = {
  en: {
    title: "A customer-facing status page for Uptime Kuma",
    metaTitle: "Uptime Kuma status page with services, incidents and subscriptions",
    description:
      "Use Uptime Kuma as the monitoring behind a customer-facing status page: OpenStatusPage turns monitors into public services, lets several Kuma nodes vote on outages and adds incidents, maintenance and email subscriptions.",
    eyebrow: "Guide · Uptime Kuma",
    lead: "Uptime Kuma is a great monitor, and its built-in status pages show your monitors directly. When customers should see services instead of monitors, get incident updates by email, or when one monitoring node must not be able to declare an outage on its own, put OpenStatusPage in front of it.",
    Body: () => (
      <>
        <H2>Uptime Kuma status pages or OpenStatusPage?</H2>
        <p>
          Uptime Kuma&apos;s status pages are the quickest way to publish uptime: they list the
          monitors you pick, can show a pinned incident and announce maintenance. For many
          projects that is all you need.
        </p>
        <p>OpenStatusPage fits when you need more structure between monitoring and customers:</p>
        <Table
          caption="Uptime Kuma status pages and OpenStatusPage compared"
          head={["", "Uptime Kuma status page", "OpenStatusPage with Uptime Kuma"]}
          rows={[
            ["What visitors see", "Your monitors", "Services you compose from any number of monitors"],
            ["Monitoring sources", "Uptime Kuma itself", "Uptime Kuma plus Icinga 2, openITCockpit and webhooks"],
            ["Several monitoring nodes", "One instance", "Check bundles: nodes in different places vote with weights"],
            ["Incidents", "Pinned incident banner", "Incidents with updates and a filterable history"],
            ["Customer notifications", "Not built in", "Email subscriptions with double opt-in"],
            ["Team access", "Uptime Kuma login", "Admin and editor roles, optional OIDC single sign-on"],
          ]}
        />

        <H2>Connecting Uptime Kuma</H2>
        <p>Both directions are supported and can be combined on one source:</p>
        <ul>
          <li>
            <strong>Pull</strong> from Uptime Kuma&apos;s Prometheus endpoint <code>/metrics</code>{" "}
            with an API key (<strong>Settings → API Keys</strong> in Uptime Kuma). New monitors appear
            automatically; paused monitors disappear.
          </li>
          <li>
            <strong>Push</strong> with Uptime Kuma&apos;s built-in <strong>Webhook</strong>{" "}
            notification. State changes arrive within seconds, and the status page needs no
            credentials for your Uptime Kuma.
          </li>
        </ul>
        <p>
          Uptime Kuma only sends notifications on state changes, so pull every few minutes plus push
          for speed is a good combination. The monitor name is the check ID, so keep monitor names
          unique.
        </p>
        <Table
          caption="How Uptime Kuma states are imported"
          head={["Uptime Kuma", "Check state"]}
          rows={[
            ["up", "ok"],
            ["down", "critical"],
            ["pending (retrying)", "warning"],
            ["maintenance", "ok (announce maintenance in OpenStatusPage)"],
          ]}
        />

        <H2>Several Uptime Kuma nodes: let them vote</H2>
        <p>
          A single monitoring node sees the internet through its own network. If that network has a
          problem, every monitor turns red, and a status page fed by it shows an outage that
          customers never had.
        </p>
        <p>
          With <strong>check bundles</strong> you run Uptime Kuma in two or three places (for
          example Frankfurt, Amsterdam and New York), add each instance as its own source and
          combine the monitors that watch the same target. Each node gets a number of votes:
        </p>
        <ul>
          <li>more than half of the reporting votes say <em>down</em>: the bundle is critical,</li>
          <li>otherwise more than half say down or pending: warning,</li>
          <li>otherwise: OK. Exactly half is not a majority.</li>
        </ul>
        <p>
          Nodes that stop reporting are left out of the vote instead of counting as down. The public
          service links the bundle, never the single node monitors.
        </p>

        <H2>History and maintenance</H2>
        <ul>
          <li>
            <strong>History import:</strong> OpenStatusPage can read the heartbeats Uptime Kuma
            already stored (versions 1.23 and 2.x) and fill the 90-day uptime bars from before
            go-live. Only gaps are filled; recorded history is never changed.
          </li>
          <li>
            <strong>Maintenance:</strong> announce planned work in OpenStatusPage. It takes
            precedence over the monitors of the affected services, and subscribers get a reminder.
          </li>
        </ul>

        <H2>Setup in four steps</H2>
        <ol>
          <li>
            Install OpenStatusPage with Docker Compose (see the <Link href="/en#quickstart">quick start</Link>) or the <Link href={guidePath("kubernetes", "en")}>Helm chart</Link>.
          </li>
          <li>
            Create an API key in Uptime Kuma and add a monitoring source of type{" "}
            <strong>Uptime Kuma</strong> with the base URL and the key. Optionally copy the ingest URL
            into a Webhook notification in Uptime Kuma for push.
          </li>
          <li>
            For several Kuma instances, add each as a source and create bundles under{" "}
            <strong>Monitoring → Bundles</strong>.
          </li>
          <li>
            Create public services, link monitors or bundles and publish.
          </li>
        </ol>
        <p>
          Details, payloads and the history import are described in the{" "}
          <a href={adapterDoc}>Uptime Kuma adapter documentation</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Do I still need Uptime Kuma if I use OpenStatusPage?",
        a: "Yes. OpenStatusPage does not monitor anything itself. Uptime Kuma (or Icinga 2, openITCockpit, or your own scripts via webhook) does the checking; OpenStatusPage turns the results into a public status page.",
      },
      {
        q: "Can visitors see my Uptime Kuma monitor names or URLs?",
        a: "No. Visitors only see the services you create. Monitor names, hosts and check output stay in the admin area.",
      },
      {
        q: "How do I avoid false outages from one monitoring location?",
        a: "Run Uptime Kuma in several places and combine their monitors in a check bundle. The service only goes down when more than half of the votes of the reporting nodes say so.",
      },
      {
        q: "Which Uptime Kuma versions are supported?",
        a: "Pull uses the /metrics endpoint with an API key, available in current releases. Push uses the standard Webhook notification. The history import works with Uptime Kuma 1.23 and 2.x.",
      },
    ],
  },
  de: {
    title: "Eine Statusseite für Kunden mit Uptime Kuma",
    metaTitle: "Uptime-Kuma-Statusseite mit Diensten, Vorfällen und Abos",
    description:
      "Nutze Uptime Kuma als Monitoring hinter einer Statusseite für Kunden: OpenStatusPage macht aus Monitoren öffentliche Dienste, lässt mehrere Kuma-Knoten über Ausfälle abstimmen und ergänzt Vorfälle, Wartungen und E-Mail-Abos.",
    eyebrow: "Guide · Uptime Kuma",
    lead: "Uptime Kuma ist ein großartiges Monitoring, und seine eingebauten Statusseiten zeigen deine Monitore direkt. Sollen Kunden Dienste statt Monitore sehen, Vorfälle per E-Mail bekommen, oder darf ein einzelner Monitoring-Knoten keinen Ausfall allein ausrufen, setzt du OpenStatusPage davor.",
    Body: () => (
      <>
        <H2>Statusseite von Uptime Kuma oder OpenStatusPage?</H2>
        <p>
          Die Statusseiten von Uptime Kuma sind der schnellste Weg, Verfügbarkeit zu
          veröffentlichen: Sie zeigen die gewählten Monitore, können einen angehefteten Vorfall
          anzeigen und Wartungen ankündigen. Für viele Projekte reicht das.
        </p>
        <p>OpenStatusPage passt, wenn du mehr Struktur zwischen Monitoring und Kunden brauchst:</p>
        <Table
          caption="Statusseiten von Uptime Kuma und OpenStatusPage im Vergleich"
          head={["", "Statusseite von Uptime Kuma", "OpenStatusPage mit Uptime Kuma"]}
          rows={[
            ["Was Besucher sehen", "Deine Monitore", "Dienste, zusammengesetzt aus beliebig vielen Monitoren"],
            ["Monitoring-Quellen", "Uptime Kuma selbst", "Uptime Kuma plus Icinga 2, openITCockpit und Webhooks"],
            ["Mehrere Monitoring-Knoten", "Eine Instanz", "Check-Bündel: Knoten an verschiedenen Orten stimmen gewichtet ab"],
            ["Vorfälle", "Angehefteter Vorfall-Hinweis", "Vorfälle mit Updates und filterbarem Verlauf"],
            ["Benachrichtigung von Kunden", "Nicht eingebaut", "E-Mail-Abos mit Double-Opt-in"],
            ["Zugang fürs Team", "Uptime-Kuma-Login", "Rollen Admin und Redakteur, optional OIDC-Single-Sign-on"],
          ]}
        />

        <H2>Uptime Kuma anbinden</H2>
        <p>Beide Richtungen werden unterstützt und lassen sich auf einer Quelle kombinieren:</p>
        <ul>
          <li>
            <strong>Pull</strong> über den Prometheus-Endpunkt <code>/metrics</code> von Uptime Kuma
            mit einem API-Schlüssel (<strong>Settings → API Keys</strong> in Uptime Kuma). Neue
            Monitore erscheinen automatisch, pausierte verschwinden.
          </li>
          <li>
            <strong>Push</strong> über die eingebaute <strong>Webhook</strong>-Benachrichtigung von
            Uptime Kuma. Zustandsänderungen kommen in Sekunden an, und die Statusseite braucht keine
            Zugangsdaten zu deinem Uptime Kuma.
          </li>
        </ul>
        <p>
          Uptime Kuma benachrichtigt nur bei Zustandsänderungen. Pull alle paar Minuten plus Push
          für Tempo ist deshalb eine gute Kombination. Der Monitor-Name ist die Check-ID, halte
          Monitor-Namen also eindeutig.
        </p>
        <Table
          caption="So werden Zustände aus Uptime Kuma übernommen"
          head={["Uptime Kuma", "Check-Zustand"]}
          rows={[
            ["up", "ok"],
            ["down", "kritisch"],
            ["pending (Wiederholung)", "Warnung"],
            ["maintenance", "ok (Wartung in OpenStatusPage ankündigen)"],
          ]}
        />

        <H2>Mehrere Uptime-Kuma-Knoten: abstimmen lassen</H2>
        <p>
          Ein einzelner Monitoring-Knoten sieht das Internet durch sein eigenes Netz. Hat dieses
          Netz ein Problem, wird jeder Monitor rot, und eine Statusseite zeigt einen Ausfall, den
          Kunden nie hatten.
        </p>
        <p>
          Mit <strong>Check-Bündeln</strong> betreibst du Uptime Kuma an zwei oder drei Orten (zum
          Beispiel Frankfurt, Amsterdam und New York), legst jede Instanz als eigene Quelle an und
          fasst die Monitore zusammen, die dasselbe Ziel prüfen. Jeder Knoten bekommt Stimmen:
        </p>
        <ul>
          <li>mehr als die Hälfte der meldenden Stimmen sagt <em>down</em>: das Bündel ist kritisch,</li>
          <li>sonst sagt mehr als die Hälfte down oder pending: Warnung,</li>
          <li>sonst: OK. Genau die Hälfte ist keine Mehrheit.</li>
        </ul>
        <p>
          Knoten, die nicht mehr melden, fallen aus der Abstimmung heraus, statt als down zu zählen.
          Der öffentliche Dienst verknüpft das Bündel, nie die einzelnen Monitore der Knoten.
        </p>

        <H2>Verlauf und Wartungen</H2>
        <ul>
          <li>
            <strong>Verlaufsimport:</strong> OpenStatusPage kann die Heartbeats lesen, die Uptime
            Kuma schon gespeichert hat (Versionen 1.23 und 2.x), und so die 90-Tage-Balken vor dem
            Start füllen. Es werden nur Lücken gefüllt; aufgezeichneter Verlauf bleibt unverändert.
          </li>
          <li>
            <strong>Wartungen:</strong> Geplante Arbeiten kündigst du in OpenStatusPage an. Sie
            haben Vorrang vor den Monitoren der betroffenen Dienste, und Abonnenten bekommen eine
            Erinnerung.
          </li>
        </ul>

        <H2>Einrichtung in vier Schritten</H2>
        <ol>
          <li>
            OpenStatusPage mit Docker Compose (siehe <Link href="/de#quickstart">Schnellstart</Link>)
            oder dem <Link href={guidePath("kubernetes", "de")}>Helm-Chart</Link> installieren.
          </li>
          <li>
            In Uptime Kuma einen API-Schlüssel anlegen und in OpenStatusPage eine Monitoring-Quelle
            vom Typ <strong>Uptime Kuma</strong> mit Basis-URL und Schlüssel anlegen. Optional die
            Ingest-URL für Push in eine Webhook-Benachrichtigung in Uptime Kuma eintragen.
          </li>
          <li>
            Bei mehreren Kuma-Instanzen jede als Quelle anlegen und unter{" "}
            <strong>Monitoring → Bündel</strong> Bündel erstellen.
          </li>
          <li>Öffentliche Dienste anlegen, Monitore oder Bündel verknüpfen und veröffentlichen.</li>
        </ol>
        <p>
          Details, Payloads und der Verlaufsimport stehen in der{" "}
          <a href={adapterDoc} hrefLang="en">Uptime-Kuma-Adapter-Dokumentation</a> (englisch).
        </p>
      </>
    ),
    faq: [
      {
        q: "Brauche ich Uptime Kuma noch, wenn ich OpenStatusPage nutze?",
        a: "Ja. OpenStatusPage überwacht selbst nichts. Uptime Kuma (oder Icinga 2, openITCockpit oder eigene Skripte per Webhook) prüft; OpenStatusPage macht aus den Ergebnissen eine öffentliche Statusseite.",
      },
      {
        q: "Sehen Besucher meine Uptime-Kuma-Monitor-Namen oder URLs?",
        a: "Nein. Besucher sehen nur die Dienste, die du anlegst. Monitor-Namen, Hosts und Check-Ausgaben bleiben im Admin-Bereich.",
      },
      {
        q: "Wie vermeide ich falsche Ausfälle durch einen einzelnen Monitoring-Standort?",
        a: "Betreib Uptime Kuma an mehreren Orten und fasse die Monitore in einem Check-Bündel zusammen. Der Dienst fällt nur aus, wenn mehr als die Hälfte der Stimmen der meldenden Knoten das sagt.",
      },
      {
        q: "Welche Uptime-Kuma-Versionen werden unterstützt?",
        a: "Pull nutzt den Endpunkt /metrics mit API-Schlüssel, verfügbar in aktuellen Versionen. Push nutzt die normale Webhook-Benachrichtigung. Der Verlaufsimport funktioniert mit Uptime Kuma 1.23 und 2.x.",
      },
    ],
  },
};
