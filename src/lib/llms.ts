import { absolute, guidePath, legalPath } from "./routes";
import { site } from "./site";
import { copy as faq } from "@/i18n/sections/faq";
import { copy as features } from "@/i18n/sections/features";

export const install = [
  "mkdir openstatuspage && cd openstatuspage",
  "curl -fsSLO https://github.com/Raphael-Penning/openstatuspage/releases/latest/download/compose.yaml",
  "curl -fsSL -o .env https://github.com/Raphael-Penning/openstatuspage/releases/latest/download/env.example",
  `printf 'SECRET_KEY=%s\\nPOSTGRES_PASSWORD=%s\\n' "$(openssl rand -base64 48)" "$(openssl rand -hex 16)" >> .env`,
  "chmod 600 .env",
  "# edit .env: BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, MAIL_DOMAIN",
  "docker compose up -d",
].join("\n");

const summary = `> OpenStatusPage is a self-hosted, open-source (AGPL-3.0) status page for companies that want to keep their customers informed about incidents and maintenance without exposing their internal infrastructure. Public services are composed from internal monitoring checks (Icinga 2, Uptime Kuma, openITCockpit, generic webhooks); check names, hosts and outputs never leave the management area. Status: early development.`;

/** Short llms.txt (https://llmstxt.org): what the project is and where to read more. */
export function llmsTxt() {
  return `# ${site.name}

${summary}

This site (${site.domain}) is the project's landing page, available in English and German. The software itself is distributed as Docker images (${site.image}, amd64 and arm64) and runs on your own infrastructure.

## Pages

- [Landing page (English)](${absolute("/en")}): overview, product tour, features, quickstart, FAQ
- [Landing page (German)](${absolute("/de")}): the same in German
- [Full text for LLMs](${absolute("/llms-full.txt")}): features, installation and FAQ as plain Markdown

## Guides

- [Open-source alternatives to Atlassian Statuspage](${absolute(guidePath("alternatives", "en"))}): neutral comparison of OpenStatusPage, Cachet, Upptime, Gatus, Uptime Kuma, cState and Kener
- [A public status page for Icinga 2](${absolute(guidePath("icinga", "en"))}): REST API pull or notification push, hard states only, no host names for visitors
- [A customer-facing status page for Uptime Kuma](${absolute(guidePath("uptimeKuma", "en"))}): services instead of monitors, check bundles across several Kuma nodes, email subscriptions
- [A public status page for openITCockpit](${absolute(guidePath("openitcockpit", "en"))}): JSON API pull or Naemon notification push; adapter not yet verified against a real installation
- [A status page on Kubernetes with Helm](${absolute(guidePath("kubernetes", "en"))}): OCI Helm chart, single instance or split public/admin/worker, NetworkPolicies, HPA, hardened pods
- [Notifications in Slack, Teams, Discord and by SMS](${absolute(guidePath("notifications", "en"))}): team webhooks, signed JSON, SMS providers, visitor subscriptions, SSRF guard

## Docs

- [Setup and operations guide](${site.docs("en")}): installation (Docker Compose, Kubernetes), reverse proxy, monitoring integration, backups, upgrades
- [HTTP API reference](${site.apiDocs}): JSON:API 1.1 with examples for every endpoint
- [Changelog](${site.changelog})
- [Source code on GitHub](${site.github})
- [Releases](${site.releases})
- [Live demo](${site.demo}): a public status page running OpenStatusPage

## Optional

- [Legal notice](${absolute(legalPath("imprint", "en"))})
- [Privacy policy](${absolute(legalPath("privacy", "en"))})
- [Contributing](${site.contributing})
`;
}

/** Long form for agents that want the whole picture in one request. */
export function llmsFullTxt() {
  const f = features.en;
  const items = [
    f.privacy, f.composition, f.bundles, f.uptime, f.locations, f.email,
    f.privatePages, f.history, f.notifications, f.kubernetes, f.noContainers, f.sso,
    f.database, f.i18n, f.noJs, f.a11y, f.lightweight, f.branding, f.contentPages, f.seo, f.api,
  ];
  return `# ${site.name}

${summary}

- Website: ${site.url}
- Source: ${site.github}
- License: ${site.license}
- Live demo: ${site.demo}
- Docker image: ${site.image}

## Features

${items.map((i) => `- **${i.title}**: ${i.text}`).join("\n")}

Monitoring adapters: Icinga 2, Uptime Kuma, openITCockpit and a generic webhook (pull and push). Check bundles let several monitoring nodes (for example Uptime Kuma instances in different places) vote with weights on the state of one target. The management UI covers incidents, maintenance, services, groups, locations, monitoring sources, users and branding. Public pages: overview, services and sites with 90-day uptime bars, locations on a map, and a filterable history of incidents and maintenance.

## Quick start (Docker Compose)

\`\`\`bash
${install}
\`\`\`

Docker Compose 2.23.1 or newer is required. With MAIL_DOMAIN set, the bundled send-only Postfix signs mails with DKIM; the admin shows the SPF, DKIM and DMARC records to publish. No reverse proxy is included: put your own proxy with HTTPS in front of the app (Caddy and nginx templates are in deploy/proxy), then open BASE_URL/admin and log in. Without Docker, use the .deb/.rpm packages or install.sh with systemd. SQLite works for zero-config setups, PostgreSQL for production. A Helm chart (oci://ghcr.io/raphael-penning/charts/openstatuspage), Kustomize manifests and a split deployment (public page and admin on separate domains, a dedicated worker and a read-only database role) are documented in the guide: ${site.docs("en")}

## FAQ

${faq.en.items.map((i) => `### ${i.q}\n\n${i.a}`).join("\n\n")}
`;
}

export const textResponse = (body: string) =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });

/** Install instructions as returned by the WebMCP tool. */
export const installText = () =>
  `${install}\n\nThen put your own reverse proxy with HTTPS in front of the app, open BASE_URL/admin and log in. Guide: ${site.docs("en")}`;
