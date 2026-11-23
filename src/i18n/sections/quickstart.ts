import type { Localized } from "@/lib/i18n";

type QuickstartCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  checklistLabel: string;
  checklist: { title: string; detail: string }[];
  docsCta: string;
  releasesCta: string;
  terminalTitle: string;
  terminalLabel: string;
  /** Shell comment line inside the install snippet (copied verbatim). */
  editComment: string;
  copy: string;
  copied: string;
  copyFailed: string;
  copyAria: string;
  copiedAnnouncement: string;
  afterNoteBefore: string;
  afterNoteAfter: string;
  apiTitle: string;
  apiLabel: string;
  apiCaption: string;
  apiCopyAria: string;
};

export const copy: Localized<QuickstartCopy> = {
  en: {
    eyebrow: "Quickstart",
    title: "Up and running in minutes",
    lead: "Download the compose file of the latest release, generate secrets, set three variables and start the stack. No build step, no external services.",
    checklistLabel: "What you get",
    checklist: [
      { title: "Multi-arch Docker images", detail: "amd64 and arm64, published on ghcr.io." },
      { title: "Compose file per release", detail: "App and PostgreSQL, ready to start." },
      { title: "SQLite for zero config", detail: "Skip the database server for small setups." },
      { title: "Helm chart for Kubernetes", detail: "Published on ghcr.io as an OCI chart, with split mode, NetworkPolicies and autoscaling. Kustomize manifests too." },
      { title: "Your own reverse proxy", detail: "Put it behind Caddy, nginx, Traefik or an ingress with HTTPS. Examples are in the guide." },
    ],
    docsCta: "Read the docs",
    releasesCta: "All releases",
    terminalTitle: "bash — openstatuspage",
    terminalLabel: "Install commands",
    editComment: "# edit .env: BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    copyAria: "Copy install commands",
    copiedAnnouncement: "Commands copied to clipboard",
    afterNoteBefore: "Then open",
    afterNoteAfter: "and log in.",
    apiTitle: "JSON:API",
    apiLabel: "API example",
    apiCaption: "Active incidents via the JSON:API 1.1 HTTP API.",
    apiCopyAria: "Copy API example",
  },
  de: {
    eyebrow: "Schnellstart",
    title: "In wenigen Minuten startklar",
    lead: "Lade die Compose-Datei des neuesten Releases herunter, erzeuge Secrets, setze drei Variablen und starte den Stack. Kein Build-Schritt, keine externen Dienste.",
    checklistLabel: "Was du bekommst",
    checklist: [
      { title: "Docker-Images für mehrere Architekturen", detail: "amd64 und arm64, veröffentlicht auf ghcr.io." },
      { title: "Compose-Datei zu jedem Release", detail: "App und PostgreSQL, sofort startbereit." },
      { title: "SQLite ganz ohne Konfiguration", detail: "Für kleine Setups brauchst du keinen Datenbankserver." },
      { title: "Helm-Chart für Kubernetes", detail: "Als OCI-Chart auf ghcr.io, mit getrenntem Betrieb, NetworkPolicies und Autoscaling. Dazu Kustomize-Manifeste." },
      { title: "Dein eigener Reverse Proxy", detail: "Betreib es hinter Caddy, nginx, Traefik oder einem Ingress mit HTTPS. Beispiele stehen im Handbuch." },
    ],
    docsCta: "Zur Dokumentation",
    releasesCta: "Alle Releases",
    terminalTitle: "bash — openstatuspage",
    terminalLabel: "Installationsbefehle",
    editComment: "# .env anpassen: BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD",
    copy: "Kopieren",
    copied: "Kopiert",
    copyFailed: "Fehlgeschlagen",
    copyAria: "Installationsbefehle kopieren",
    copiedAnnouncement: "Befehle in die Zwischenablage kopiert",
    afterNoteBefore: "Danach öffnest du",
    afterNoteAfter: "und meldest dich an.",
    apiTitle: "JSON:API",
    apiLabel: "API-Beispiel",
    apiCaption: "Aktive Störungen über die JSON:API-1.1-Schnittstelle.",
    apiCopyAria: "API-Beispiel kopieren",
  },
};
