import { absolute } from "@/lib/routes";
import { site } from "@/lib/site";

const urn = (ns: string, name: string) => `urn:air:${site.domain}:${ns}:${name}`;
const updatedAt = `${site.updated}T00:00:00Z`;

/**
 * Agentic Resource Discovery manifest (https://agenticresourcediscovery.org/spec/).
 * Lists the machine-readable resources this site offers to AI agents.
 */
export function GET() {
  const manifest = {
    entries: [
      {
        identifier: urn("docs", "llms"),
        displayName: "OpenStatusPage overview for LLMs",
        type: "application/vnd.llms-txt+md",
        url: absolute("/llms.txt"),
        description:
          "Short llms.txt summary of OpenStatusPage, a self-hosted open-source status page, with links to docs, API reference, source and live demo.",
        representativeQueries: [
          "What is OpenStatusPage?",
          "Self-hosted open-source status page that hides internal monitoring",
          "Where is the OpenStatusPage documentation?",
        ],
        capabilities: ["Documentation"],
        tags: ["status-page", "self-hosted", "open-source", "monitoring", "AGPL-3.0"],
        updatedAt,
      },
      {
        identifier: urn("docs", "llms-full"),
        displayName: "OpenStatusPage full reference for LLMs",
        type: "application/vnd.llms-txt+md",
        url: absolute("/llms-full.txt"),
        description:
          "Features, Docker Compose quick start and FAQ of OpenStatusPage as a single Markdown document.",
        representativeQueries: [
          "How do I install OpenStatusPage with Docker Compose?",
          "Which monitoring tools does OpenStatusPage support?",
          "Does OpenStatusPage support single sign-on?",
        ],
        capabilities: ["Documentation", "InstallGuide", "FAQ"],
        tags: ["docker", "icinga", "uptime-kuma", "openitcockpit", "webhook", "oidc"],
        updatedAt,
      },
      {
        identifier: urn("site", "sitemap"),
        displayName: "openstatuspage.dev sitemap index",
        type: "application/xml",
        url: absolute("/sitemap.xml"),
        description: "Sitemap index listing every page of openstatuspage.dev in English and German.",
        representativeQueries: [
          "List all pages of openstatuspage.dev",
          "OpenStatusPage website in German",
        ],
        capabilities: ["Sitemap"],
        tags: ["sitemap"],
        updatedAt,
      },
    ],
  };

  return Response.json(manifest, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
