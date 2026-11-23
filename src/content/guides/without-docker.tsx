import Link from "next/link";
import { site } from "@/lib/site";
import { guidePath } from "@/lib/routes";
import { Code, H2, Table, type Guide } from "./shared";

const guideDoc = (lang: "en" | "de") =>
  `${site.github}/blob/main/docs/guide/${lang}/13-installation-without-containers.md`;
const proxyDir = `${site.github}/tree/main/deploy/proxy`;

const script = `curl -fsSLO https://github.com/Raphael-Penning/openstatuspage/releases/latest/download/install.sh
less install.sh   # read what it does
sudo bash install.sh install --base-url https://status.example.com --with-postgres`;

const packages = `# Debian, Ubuntu
sudo apt install ./openstatuspage_${site.version}_amd64.deb
# RHEL, Rocky Linux, AlmaLinux, Fedora
sudo dnf install ./openstatuspage-${site.version}-1.x86_64.rpm`;

const lifecycle = `sudo bash /opt/openstatuspage/app/scripts/install.sh update     # latest release
sudo bash /opt/openstatuspage/app/scripts/install.sh rollback   # previous release
sudo bash /opt/openstatuspage/app/scripts/install.sh uninstall  # keeps settings and data`;

export const withoutDockerGuide: Guide = {
  en: {
    title: "Install a status page without Docker",
    metaTitle: "Self-hosted status page without Docker: .deb, .rpm and systemd",
    description:
      "Install OpenStatusPage directly on Debian, Ubuntu, RHEL, Rocky, AlmaLinux or Fedora: install script, .deb and .rpm packages, hardened systemd units, optional PostgreSQL and a send-only mail server with DKIM.",
    eyebrow: "Guide · Installation",
    lead: "Not every server runs containers, and a status page should not depend on a Docker daemon. Every OpenStatusPage release ships packages and an install script that set it up as a normal systemd service on Debian, Ubuntu and the RHEL family, with the same program and the same memory settings as the container image.",
    Body: () => (
      <>
        <H2>Pick a way</H2>
        <Table
          caption="Ways to install without containers"
          head={["Option", "Good for"]}
          rows={[
            ["Install script", "Most servers: one command, sets up Node.js, PostgreSQL and a mail server on request, updates with checksum check"],
            [".deb / .rpm packages", "Hosts managed with apt or dnf and configuration management"],
            ["Release tarball", "Full control over every step"],
            ["From source", "Development and own changes"],
          ]}
        />
        <p>
          Supported: Debian 11+, Ubuntu 22.04+, RHEL, Rocky Linux and AlmaLinux 9+ and Fedora, on{" "}
          <code>x86_64</code> and <code>aarch64</code>. Every way needs Node.js 22; the install
          script can bring a private, checksum-verified copy. Alpine Linux is not covered: use the
          container image there.
        </p>

        <H2>The install script</H2>
        <p>
          The script downloads a release, checks its SHA-256 against the release&apos;s{" "}
          <code>SHA256SUMS</code>, generates <code>SECRET_KEY</code> on the first install and never
          overwrites existing settings or data. You can run it again at any time, for example to add
          PostgreSQL or the mail server later.
        </p>
        <Code label="Install OpenStatusPage with the install script">{script}</Code>
        <p>
          Without <code>--with-postgres</code> SQLite is used. Then set the first administrator in{" "}
          <code>/etc/openstatuspage/openstatuspage.env</code> and restart the service. The app
          listens on <code>127.0.0.1:3000</code> behind your reverse proxy.
        </p>
        <ul>
          <li>
            <code>--with-postgres</code> installs PostgreSQL from the distribution and creates the
            database roles, including the restricted role for the public page.
          </li>
          <li>
            <code>--with-postfix --mail-domain example.com</code> adds a local send-only Postfix
            with OpenDKIM; the admin then shows the SPF, DKIM and DMARC records to publish.
          </li>
          <li>
            <code>--mode split</code> runs public page, admin and worker as three services; the
            public one runs as its own user and cannot read the secrets.
          </li>
        </ul>

        <h3>Update, rollback, uninstall</h3>
        <Code label="Update, roll back or remove OpenStatusPage">{lifecycle}</Code>
        <p>
          <code>update</code> keeps the previous release next to the new one and waits for the
          health check. The database migrates on start, so take a backup before updating.
        </p>

        <H2>Packages</H2>
        <p>
          The <code>.deb</code> and <code>.rpm</code> packages contain the same files and units.
          They create the users, directories and a settings file with a generated{" "}
          <code>SECRET_KEY</code>, but never start a service on a new install and never overwrite
          your settings. Updates come through <code>apt</code> or <code>dnf</code>.
        </p>
        <Code label="Install the OpenStatusPage packages">{packages}</Code>

        <H2>Hardened systemd units</H2>
        <p>The services run as an unprivileged user without login and with strict sandboxing:</p>
        <ul>
          <li>
            <code>ProtectSystem=strict</code>: only <code>/var/lib/openstatuspage</code> is
            writable.
          </li>
          <li>
            <code>NoNewPrivileges</code>, <code>PrivateTmp</code>, <code>PrivateDevices</code>, an
            empty capability set and a system call filter.
          </li>
          <li>
            <code>MemoryMax=256M</code> per service; one instance needs around 100 MB.
          </li>
        </ul>

        <H2>Reverse proxy</H2>
        <p>
          The release includes <a href={proxyDir}>templates for Caddy and nginx</a>, for one domain
          and for the split deployment with two domains. Prefer containers after all? See the{" "}
          <Link href="/en#quickstart">Docker Compose quick start</Link> or the{" "}
          <Link href={guidePath("kubernetes", "en")}>Helm guide</Link>.
        </p>
        <p>
          All options are in the <a href={guideDoc("en")}>installation guide without containers</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Which Linux distributions are supported?",
        a: "Debian 11 or newer, Ubuntu 22.04 or newer, RHEL, Rocky Linux and AlmaLinux 9 or newer and Fedora, on x86_64 and aarch64. Alpine Linux is not supported by the packages; use the container image there.",
      },
      {
        q: "Do I need Node.js?",
        a: "Yes, Node.js 22 exactly. The install script uses a suitable system Node.js or installs a private, checksum-verified copy. The packages recommend Node.js 22 but do not bring it.",
      },
      {
        q: "Can I use PostgreSQL and a mail server without Docker?",
        a: "Yes. With --with-postgres the install script sets up a local PostgreSQL with the right roles, and with --with-postfix a send-only Postfix with DKIM signing.",
      },
      {
        q: "Is the split deployment possible without containers?",
        a: "Yes. --mode split runs public page, admin and worker as three systemd services. The public service runs as its own user and never sees SECRET_KEY, SMTP credentials or the owner database login.",
      },
    ],
  },
  de: {
    title: "Eine Statusseite ohne Docker installieren",
    metaTitle: "Selbst gehostete Statusseite ohne Docker: .deb, .rpm und systemd",
    description:
      "Installier OpenStatusPage direkt auf Debian, Ubuntu, RHEL, Rocky, AlmaLinux oder Fedora: Installationsskript, .deb- und .rpm-Pakete, gehärtete systemd-Units, optional PostgreSQL und ein Mailserver mit DKIM.",
    eyebrow: "Guide · Installation",
    lead: "Nicht jeder Server betreibt Container, und eine Statusseite sollte nicht von einem Docker-Daemon abhängen. Jedes Release von OpenStatusPage enthält Pakete und ein Installationsskript, die es als normalen systemd-Dienst auf Debian, Ubuntu und der RHEL-Familie einrichten, mit demselben Programm und denselben Speichereinstellungen wie das Container-Image.",
    Body: () => (
      <>
        <H2>Wähl einen Weg</H2>
        <Table
          caption="Wege zur Installation ohne Container"
          head={["Option", "Passt für"]}
          rows={[
            ["Installationsskript", "Die meisten Server: ein Befehl, richtet auf Wunsch Node.js, PostgreSQL und einen Mailserver ein, Updates mit Prüfsumme"],
            [".deb- / .rpm-Pakete", "Hosts, die mit apt oder dnf und Konfigurationsmanagement verwaltet werden"],
            ["Release-Tarball", "Volle Kontrolle über jeden Schritt"],
            ["Aus dem Quellcode", "Entwicklung und eigene Änderungen"],
          ]}
        />
        <p>
          Unterstützt: Debian ab 11, Ubuntu ab 22.04, RHEL, Rocky Linux und AlmaLinux ab 9 sowie
          Fedora, auf <code>x86_64</code> und <code>aarch64</code>. Jeder Weg braucht Node.js 22; das
          Skript kann eine eigene, per Prüfsumme geprüfte Kopie mitbringen. Alpine Linux ist nicht
          abgedeckt: Nutz dort das Container-Image.
        </p>

        <H2>Das Installationsskript</H2>
        <p>
          Das Skript lädt ein Release, prüft dessen SHA-256 gegen die <code>SHA256SUMS</code> des
          Releases, erzeugt bei der ersten Installation <code>SECRET_KEY</code> und überschreibt nie
          vorhandene Einstellungen oder Daten. Du kannst es jederzeit erneut ausführen, etwa um
          später PostgreSQL oder den Mailserver hinzuzufügen.
        </p>
        <Code label="OpenStatusPage mit dem Installationsskript installieren">{script}</Code>
        <p>
          Ohne <code>--with-postgres</code> wird SQLite verwendet. Danach trägst du den ersten
          Administrator in <code>/etc/openstatuspage/openstatuspage.env</code> ein und startest den
          Dienst neu. Die App lauscht auf <code>127.0.0.1:3000</code> hinter deinem Reverse Proxy.
        </p>
        <ul>
          <li>
            <code>--with-postgres</code> installiert PostgreSQL aus der Distribution und legt die
            Datenbankrollen an, auch die eingeschränkte Rolle für die öffentliche Seite.
          </li>
          <li>
            <code>--with-postfix --mail-domain example.com</code> ergänzt ein lokales Postfix nur
            für den Versand mit OpenDKIM; die Verwaltung zeigt dann die SPF-, DKIM- und
            DMARC-Einträge an.
          </li>
          <li>
            <code>--mode split</code> betreibt öffentliche Seite, Verwaltung und Worker als drei
            Dienste; der öffentliche läuft als eigener Benutzer und kann die Secrets nicht lesen.
          </li>
        </ul>

        <h3>Update, Rollback, Deinstallation</h3>
        <Code label="OpenStatusPage aktualisieren, zurückrollen oder entfernen">{lifecycle}</Code>
        <p>
          <code>update</code> behält das vorherige Release neben dem neuen und wartet auf den
          Health-Check. Die Datenbank migriert beim Start, mach also vorher ein Backup.
        </p>

        <H2>Pakete</H2>
        <p>
          Die <code>.deb</code>- und <code>.rpm</code>-Pakete enthalten dieselben Dateien und Units.
          Sie legen Benutzer, Verzeichnisse und eine Einstellungsdatei mit erzeugtem{" "}
          <code>SECRET_KEY</code> an, starten bei einer Neuinstallation aber keinen Dienst und
          überschreiben nie deine Einstellungen. Updates kommen über <code>apt</code> oder{" "}
          <code>dnf</code>.
        </p>
        <Code label="OpenStatusPage-Pakete installieren">{packages}</Code>

        <H2>Gehärtete systemd-Units</H2>
        <p>Die Dienste laufen als unprivilegierter Benutzer ohne Login und streng abgeschottet:</p>
        <ul>
          <li>
            <code>ProtectSystem=strict</code>: Nur <code>/var/lib/openstatuspage</code> ist
            beschreibbar.
          </li>
          <li>
            <code>NoNewPrivileges</code>, <code>PrivateTmp</code>, <code>PrivateDevices</code>, keine
            Capabilities und ein Systemaufruf-Filter.
          </li>
          <li>
            <code>MemoryMax=256M</code> pro Dienst; eine Instanz braucht rund 100 MB.
          </li>
        </ul>

        <H2>Reverse Proxy</H2>
        <p>
          Das Release enthält <a href={proxyDir}>Vorlagen für Caddy und nginx</a>, für eine Domain
          und für den getrennten Betrieb mit zwei Domains. Doch lieber Container? Dann hilft der{" "}
          <Link href="/de#quickstart">Schnellstart mit Docker Compose</Link> oder der{" "}
          <Link href={guidePath("kubernetes", "de")}>Helm-Guide</Link>.
        </p>
        <p>
          Alle Optionen stehen im <a href={guideDoc("de")}>Handbuch zur Installation ohne
          Container</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Welche Linux-Distributionen werden unterstützt?",
        a: "Debian ab 11, Ubuntu ab 22.04, RHEL, Rocky Linux und AlmaLinux ab 9 sowie Fedora, auf x86_64 und aarch64. Alpine Linux unterstützen die Pakete nicht; nutz dort das Container-Image.",
      },
      {
        q: "Brauche ich Node.js?",
        a: "Ja, genau Node.js 22. Das Installationsskript nutzt ein passendes Node.js des Systems oder installiert eine eigene, per Prüfsumme geprüfte Kopie. Die Pakete empfehlen Node.js 22, bringen es aber nicht mit.",
      },
      {
        q: "Kann ich PostgreSQL und einen Mailserver ohne Docker nutzen?",
        a: "Ja. Mit --with-postgres richtet das Installationsskript ein lokales PostgreSQL mit den passenden Rollen ein, mit --with-postfix ein Postfix nur für den Versand mit DKIM-Signatur.",
      },
      {
        q: "Geht der getrennte Betrieb auch ohne Container?",
        a: "Ja. --mode split betreibt öffentliche Seite, Verwaltung und Worker als drei systemd-Dienste. Der öffentliche Dienst läuft als eigener Benutzer und sieht nie SECRET_KEY, SMTP-Zugangsdaten oder den Datenbank-Login des Eigentümers.",
      },
    ],
  },
};
