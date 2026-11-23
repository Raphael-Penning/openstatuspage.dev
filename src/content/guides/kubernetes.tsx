import Link from "next/link";
import { site } from "@/lib/site";
import { Code, H2, Table, type Guide } from "./shared";

const chartDoc = `${site.github}/blob/main/deploy/helm/openstatuspage/README.md`;
const kustomize = `${site.github}/tree/main/deploy/kubernetes`;
const rolesSql = `${site.github}/blob/main/deploy/postgres/roles.sql`;
const chart = "oci://ghcr.io/raphael-penning/charts/openstatuspage";

const install = `kubectl create namespace openstatuspage
kubectl -n openstatuspage create secret generic openstatuspage \\
  --from-literal=SECRET_KEY="$(openssl rand -base64 48)" \\
  --from-literal=ADMIN_EMAIL=admin@example.com \\
  --from-literal=ADMIN_PASSWORD='a-long-password'
kubectl -n openstatuspage create secret generic openstatuspage-db \\
  --from-literal=DATABASE_URL='postgres://openstatuspage:<password>@postgres.example.com:5432/openstatuspage'

helm install openstatuspage ${chart} \\
  --version ${site.version} --namespace openstatuspage \\
  --set baseUrl=https://status.example.com \\
  --set secrets.existingSecret=openstatuspage \\
  --set database.existingSecret=openstatuspage-db \\
  --set ingress.enabled=true --set ingress.className=nginx`;

const splitValues = `# my-values.yaml
baseUrl: https://status.example.com
secrets:
  existingSecret: openstatuspage
  publicExistingSecret: openstatuspage-public
database:
  existingSecret: openstatuspage-db
  public:
    existingSecret: openstatuspage-db-public
split:
  enabled: true
  admin:
    baseUrl: https://status.admin.example.com
autoscaling:
  enabled: true
networkPolicy:
  enabled: true
ingress:
  enabled: true
  className: nginx`;

export const kubernetesGuide: Guide = {
  en: {
    title: "A status page on Kubernetes with Helm",
    metaTitle: "Kubernetes status page with Helm: self-hosted, split mode, autoscaling",
    description:
      "Run a self-hosted status page on Kubernetes with the OpenStatusPage Helm chart: PostgreSQL or SQLite, split public/admin/worker mode, NetworkPolicies, HPA and hardened pods.",
    eyebrow: "Guide · Kubernetes",
    lead: "A status page has to stay up when other things fail, so it belongs on infrastructure you trust. The OpenStatusPage Helm chart installs it on any Kubernetes 1.25+ cluster, from a single pod with SQLite to a split setup with a public tier that scales on its own and never sees your secrets.",
    Body: () => (
      <>
        <H2>What the chart deploys</H2>
        <p>
          The chart is published as an OCI artifact with every release at{" "}
          <code>{chart}</code>. It deploys the application only; the database is yours.
        </p>
        <Table
          caption="Single instance and split mode compared"
          head={["", "Single instance (default)", "Split mode"]}
          rows={[
            ["Deployments", "One, serving everything", "Public, admin and worker"],
            ["Database", "PostgreSQL, or SQLite on a PersistentVolumeClaim", "PostgreSQL with a restricted public role"],
            ["Scaling", "Several replicas and HPA with PostgreSQL; one replica with SQLite", "Public tier with 2 replicas by default, HPA 2–6"],
            ["Host names", "One", "Separate hosts for public page and admin"],
          ]}
        />

        <H2>Install with PostgreSQL</H2>
        <p>
          Create the secrets first; the chart never generates them. Back up{" "}
          <code>SECRET_KEY</code> outside the cluster, because a new key makes stored monitoring
          credentials unreadable.
        </p>
        <Code label="Install OpenStatusPage with Helm">{install}</Code>
        <p>
          Leave out <code>database.existingSecret</code> to run SQLite on a volume instead. Migrations
          run when the app starts, so no migration job is needed. Upgrades are a{" "}
          <code>helm upgrade</code> with a new <code>--version</code> after a backup.
        </p>

        <H2>Split mode: keep the public tier blind</H2>
        <p>
          In split mode the public pages run in their own pods with a restricted PostgreSQL role,{" "}
          <code>osp_public</code>, that can only read views. The public instance answers the admin
          UI, login, admin API and ingest webhooks with 404, and it never sees{" "}
          <code>SECRET_KEY</code> or the SMTP and OIDC secrets. The chart enforces this by giving the
          public pods their own Secret.
        </p>
        <Code label="Values for split mode with autoscaling and NetworkPolicies">{splitValues}</Code>
        <p>
          Create the database roles with <a href={rolesSql}>deploy/postgres/roles.sql</a> and
          restrict the admin host, for example with an IP allowlist on the ingress. Monitoring
          systems that push results use the ingest URLs of the admin host.
        </p>

        <H2>Secure defaults</H2>
        <ul>
          <li>Non-root user, read-only root filesystem, no privilege escalation, all capabilities dropped, seccomp <code>RuntimeDefault</code>.</li>
          <li>A dedicated ServiceAccount without a mounted token.</li>
          <li>Probes on <code>/api/health</code>; 128 MiB request and 256 MiB limit per pod.</li>
          <li>PodDisruptionBudget for the public-facing instance, enabled by default.</li>
          <li>
            Optional NetworkPolicies that deny by default. Egress for SMTP, OIDC and Umami opens
            automatically when configured; egress to polled monitoring systems stays closed until
            you list it.
          </li>
          <li>A values schema that rejects invalid combinations, such as split mode with SQLite.</li>
        </ul>

        <H2>Prefer plain manifests?</H2>
        <p>
          The repository also ships <a href={kustomize}>Kustomize manifests</a>, including a split
          overlay with a NetworkPolicy. And if you do not run Kubernetes at all, the{" "}
          <Link href="/en#quickstart">Docker Compose quick start</Link> gets you there in a few
          minutes.
        </p>
        <p>
          All values are documented in the <a href={chartDoc}>Helm chart README</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Which Kubernetes version do I need?",
        a: "Kubernetes 1.25 or newer. The chart is tested with kubeconform for single-instance, SQLite, PostgreSQL and split configurations.",
      },
      {
        q: "Does the chart include a database?",
        a: "No. It deploys only OpenStatusPage. Use an external PostgreSQL (recommended) or SQLite on a PersistentVolumeClaim; SQLite is limited to one replica.",
      },
      {
        q: "Can the status page scale horizontally?",
        a: "Yes, with PostgreSQL. Set autoscaling.enabled=true; in split mode the HPA scales the public tier between 2 and 6 replicas at 75 % CPU by default. Background tasks are coordinated with leases, so several workers can run safely.",
      },
      {
        q: "Where is the chart published?",
        a: "As an OCI artifact on GitHub Container Registry: oci://ghcr.io/raphael-penning/charts/openstatuspage, with a new version for every release.",
      },
    ],
  },
  de: {
    title: "Eine Statusseite auf Kubernetes mit Helm",
    metaTitle: "Kubernetes-Statusseite mit Helm: selbst gehostet, getrennter Betrieb, Autoscaling",
    description:
      "Betreib eine selbst gehostete Statusseite auf Kubernetes mit dem Helm-Chart von OpenStatusPage: PostgreSQL oder SQLite, getrennt in Public, Admin und Worker, NetworkPolicies, HPA und gehärtete Pods.",
    eyebrow: "Guide · Kubernetes",
    lead: "Eine Statusseite muss erreichbar bleiben, wenn anderes ausfällt, und gehört deshalb auf Infrastruktur, der du vertraust. Das Helm-Chart von OpenStatusPage installiert sie auf jedem Cluster ab Kubernetes 1.25, vom einzelnen Pod mit SQLite bis zum getrennten Betrieb, bei dem die öffentliche Seite eigenständig skaliert und deine Secrets nie sieht.",
    Body: () => (
      <>
        <H2>Was das Chart installiert</H2>
        <p>
          Das Chart erscheint mit jedem Release als OCI-Artefakt unter <code>{chart}</code>. Es
          installiert nur die Anwendung; die Datenbank stellst du.
        </p>
        <Table
          caption="Einzelne Instanz und getrennter Betrieb im Vergleich"
          head={["", "Einzelne Instanz (Standard)", "Getrennter Betrieb"]}
          rows={[
            ["Deployments", "Eins für alles", "Public, Admin und Worker"],
            ["Datenbank", "PostgreSQL oder SQLite auf einem PersistentVolumeClaim", "PostgreSQL mit eingeschränkter Public-Rolle"],
            ["Skalierung", "Mehrere Replikas und HPA mit PostgreSQL; ein Replika mit SQLite", "Public-Teil standardmäßig mit 2 Replikas, HPA 2–6"],
            ["Hostnamen", "Einer", "Getrennte Hosts für öffentliche Seite und Verwaltung"],
          ]}
        />

        <H2>Installation mit PostgreSQL</H2>
        <p>
          Leg zuerst die Secrets an; das Chart erzeugt keine. Sichere <code>SECRET_KEY</code>{" "}
          außerhalb des Clusters, denn mit einem neuen Key sind gespeicherte Monitoring-Zugangsdaten
          nicht mehr lesbar.
        </p>
        <Code label="OpenStatusPage mit Helm installieren">{install}</Code>
        <p>
          Ohne <code>database.existingSecret</code> läuft SQLite auf einem Volume. Migrationen
          laufen beim Start der App, ein Migrations-Job ist nicht nötig. Updates sind ein{" "}
          <code>helm upgrade</code> mit neuer <code>--version</code> nach einem Backup.
        </p>

        <H2>Getrennter Betrieb: Der öffentliche Teil sieht nichts</H2>
        <p>
          Im getrennten Betrieb laufen die öffentlichen Seiten in eigenen Pods mit einer
          eingeschränkten PostgreSQL-Rolle (<code>osp_public</code>), die nur Views lesen darf. Die
          öffentliche Instanz beantwortet Verwaltung, Login, Admin-API und Ingest-Webhooks mit 404
          und sieht weder <code>SECRET_KEY</code> noch SMTP- oder OIDC-Secrets. Das Chart setzt das
          durch, indem die öffentlichen Pods ein eigenes Secret bekommen.
        </p>
        <Code label="Values für getrennten Betrieb mit Autoscaling und NetworkPolicies">{splitValues}</Code>
        <p>
          Die Datenbankrollen legst du mit <a href={rolesSql}>deploy/postgres/roles.sql</a> an.
          Schränk den Admin-Host ein, etwa mit einer IP-Allowlist am Ingress. Monitoring-Systeme,
          die Ergebnisse pushen, nutzen die Ingest-URLs des Admin-Hosts.
        </p>

        <H2>Sichere Voreinstellungen</H2>
        <ul>
          <li>Kein Root-Benutzer, schreibgeschütztes Root-Dateisystem, keine Rechteausweitung, alle Capabilities entfernt, seccomp <code>RuntimeDefault</code>.</li>
          <li>Ein eigener ServiceAccount ohne eingebundenes Token.</li>
          <li>Probes auf <code>/api/health</code>; 128 MiB Request und 256 MiB Limit pro Pod.</li>
          <li>PodDisruptionBudget für die öffentlich erreichbare Instanz, standardmäßig aktiv.</li>
          <li>
            Optionale NetworkPolicies, die standardmäßig alles sperren. Ausgehende Verbindungen zu
            SMTP, OIDC und Umami öffnen sich automatisch, wenn sie konfiguriert sind; Verbindungen zu
            abgefragten Monitoring-Systemen bleiben zu, bis du sie freigibst.
          </li>
          <li>Ein Values-Schema, das ungültige Kombinationen wie getrennten Betrieb mit SQLite ablehnt.</li>
        </ul>

        <H2>Lieber einfache Manifeste?</H2>
        <p>
          Im Repository liegen auch <a href={kustomize}>Kustomize-Manifeste</a>, inklusive eines
          Overlays für den getrennten Betrieb mit NetworkPolicy. Und ohne Kubernetes bringt dich der{" "}
          <Link href="/de#quickstart">Schnellstart mit Docker Compose</Link> in wenigen Minuten ans
          Ziel.
        </p>
        <p>
          Alle Values stehen in der <a href={chartDoc}>README des Helm-Charts</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Welche Kubernetes-Version brauche ich?",
        a: "Kubernetes 1.25 oder neuer. Das Chart wird mit kubeconform für einzelne Instanz, SQLite, PostgreSQL und getrennten Betrieb geprüft.",
      },
      {
        q: "Enthält das Chart eine Datenbank?",
        a: "Nein. Es installiert nur OpenStatusPage. Nutze ein externes PostgreSQL (empfohlen) oder SQLite auf einem PersistentVolumeClaim; mit SQLite gibt es genau ein Replika.",
      },
      {
        q: "Skaliert die Statusseite horizontal?",
        a: "Ja, mit PostgreSQL. Setz autoscaling.enabled=true; im getrennten Betrieb skaliert der HPA den öffentlichen Teil standardmäßig zwischen 2 und 6 Replikas bei 75 % CPU. Hintergrundaufgaben werden über Leases koordiniert, mehrere Worker sind also kein Problem.",
      },
      {
        q: "Wo wird das Chart veröffentlicht?",
        a: "Als OCI-Artefakt in der GitHub Container Registry: oci://ghcr.io/raphael-penning/charts/openstatuspage, mit einer neuen Version zu jedem Release.",
      },
    ],
  },
};
