import type { Locale } from "./i18n";
import { absolute } from "./routes";
import { site } from "./site";
import { provider } from "@/data/legal";
import { supporters } from "@/data/supporters";
import { copy as faqCopy } from "@/i18n/sections/faq";

/**
 * schema.org entities shared by every page. Each page emits the full nodes in its own
 * graph (not only @id references), so Google can resolve them without visiting other pages.
 */
const ids = {
  website: `${site.url}/#website`,
  organization: `${site.url}/#organization`,
  person: `${site.url}/#author`,
  software: `${site.url}/#software`,
  source: `${site.url}/#source`,
  logo: `${site.url}/#logo`,
  sponsor: (name: string) =>
    `${site.url}/#sponsor-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`,
};

const githubProfile = site.github.replace(/\/[^/]+$/, "");

const descriptions = {
  en: "Self-hosted, open-source status page. Public services are composed from internal monitoring checks (Icinga 2, Uptime Kuma, openITCockpit, webhooks) without exposing check names, hosts or outputs.",
  de: "Selbst gehostete Open-Source-Statusseite. Öffentliche Dienste werden aus internen Monitoring-Checks (Icinga 2, Uptime Kuma, openITCockpit, Webhooks) zusammengesetzt, ohne Check-Namen, Hosts oder Ausgaben offenzulegen.",
} as const;

const sponsors = supporters.filter((s) => s.roles.includes("sponsor"));
const users = supporters.filter((s) => s.roles.includes("user"));
const sponsorRefs = sponsors.map((s) => ({ "@id": ids.sponsor(s.name) }));

/** You, the maintainer: author and copyright holder of the software. */
const personNode = () => ({
  "@type": "Person",
  "@id": ids.person,
  name: provider.name,
  url: githubProfile,
  sameAs: [githubProfile],
  knowsAbout: ["Status pages", "IT monitoring", "Incident communication", "Self-hosting"],
});

/** The project as an organisation: name, logo and links for knowledge panels. */
const organizationNode = () => ({
  "@type": "Organization",
  "@id": ids.organization,
  name: site.name,
  url: site.url,
  logo: { "@id": ids.logo },
  image: { "@id": ids.logo },
  founder: { "@id": ids.person },
  sameAs: [site.github],
  ...(sponsorRefs.length ? { sponsor: sponsorRefs } : {}),
});

const logoNode = () => ({
  "@type": "ImageObject",
  "@id": ids.logo,
  url: absolute("/logo.png"),
  contentUrl: absolute("/logo.png"),
  width: 512,
  height: 512,
  caption: site.name,
});

/** Social card of a page, referenced as its primary image. */
const pageImageNode = (url: string, path: string) => ({
  "@type": "ImageObject",
  "@id": `${url}#primaryimage`,
  url: ogImage(path),
  contentUrl: ogImage(path),
  width: 1200,
  height: 630,
});

/** Sponsors (and users) from src/data/supporters.ts. */
const supporterNodes = () =>
  supporters.map((s) => ({
    "@type": "Organization",
    "@id": ids.sponsor(s.name),
    name: s.name,
    url: s.url,
    sameAs: [s.url],
  }));

const softwareNode = (lang: Locale) => ({
  "@type": "SoftwareApplication",
  "@id": ids.software,
  name: site.name,
  url: site.url,
  description: descriptions[lang],
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Status page",
  operatingSystem: "Linux (Docker, Kubernetes)",
  softwareVersion: site.version,
  releaseNotes: site.changelog,
  softwareRequirements: "Docker or Kubernetes 1.25+; SQLite or PostgreSQL",
  memoryRequirements: "about 100 MB RAM per instance",
  softwareHelp: site.docs(lang),
  downloadUrl: site.releases,
  installUrl: absolute(`/${lang}#quickstart`),
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: { "@id": ids.person },
  maintainer: { "@id": ids.person },
  copyrightHolder: { "@id": ids.person },
  publisher: { "@id": ids.organization },
  ...(sponsorRefs.length ? { sponsor: sponsorRefs, funder: sponsorRefs } : {}),
  sameAs: [site.github],
  image: absolute(`/screenshots/overview-dark-${lang}.png`),
  screenshot: ["overview", "services", "locations", "history"].map((n) =>
    absolute(`/screenshots/${n}-dark-${lang}.png`),
  ),
  featureList: [
    "Overview with incidents and maintenance",
    "Services and sites with 90-day uptime bars",
    "Locations on a world map",
    "Filterable incident and maintenance history",
    "Monitoring adapters: Icinga 2, Uptime Kuma, openITCockpit, webhook",
    "History import from Icinga DB, Uptime Kuma, openITCockpit and CSV",
    "Private status pages via secret links",
    "Service composition with aggregation rules and weighted check bundles",
    "Email subscriptions with double opt-in",
    "OIDC single sign-on (Keycloak, Microsoft Entra ID, Authentik, Okta, Zitadel, Dex)",
    "SQLite or PostgreSQL",
    "Docker Compose, Helm chart and Kustomize manifests",
    "JSON:API 1.1 HTTP API, RSS and Atom feeds",
    "Works without JavaScript",
    "Accessible public page (WCAG 2.2 AA)",
    "Custom branding, accent color and light/dark theme",
  ],
});

const sourceNode = () => ({
  "@type": "SoftwareSourceCode",
  "@id": ids.source,
  name: `${site.name} source code`,
  codeRepository: site.github,
  programmingLanguage: "TypeScript",
  runtimePlatform: "Node.js",
  license: "https://www.gnu.org/licenses/agpl-3.0.html",
  author: { "@id": ids.person },
  targetProduct: { "@id": ids.software },
});

const websiteNode = () => ({
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  inLanguage: ["en", "de"],
  publisher: { "@id": ids.organization },
  author: { "@id": ids.person },
  about: { "@id": ids.software },
});

/** Entities every page carries: website, project, maintainer, sponsors, software, source. */
const entities = (lang: Locale) => [
  websiteNode(),
  organizationNode(),
  logoNode(),
  personNode(),
  ...supporterNodes(),
  softwareNode(lang),
  sourceNode(),
];

const breadcrumb = (url: string, items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumb`,
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absolute(item.url),
  })),
});

const faqPage = (url: string, lang: Locale, faq: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  inLanguage: lang,
  isPartOf: { "@id": `${url}#webpage` },
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const ogImage = (path: string) => absolute(`${path}/opengraph-image`);

/** Home page: entities, WebPage, list of supporters and the FAQ. */
export function homeJsonLd(lang: Locale) {
  const path = `/${lang}`;
  const url = absolute(path);
  return [
      ...entities(lang),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: site.name,
        description: descriptions[lang],
        inLanguage: lang,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.software },
        author: { "@id": ids.person },
        publisher: { "@id": ids.organization },
        primaryImageOfPage: { "@id": `${url}#primaryimage` },
        image: [{ "@id": `${url}#primaryimage` }, absolute(`/screenshots/overview-dark-${lang}.png`)],
        dateModified: site.updated,
        ...(supporters.length
          ? {
              mentions: supporters.map((s) => ({ "@id": ids.sponsor(s.name) })),
            }
          : {}),
      },
      pageImageNode(url, path),
      ...(supporters.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#supporters`,
              name: lang === "de" ? "Sponsoren und Nutzer" : "Sponsors and users",
              itemListElement: [...sponsors, ...users.filter((u) => !sponsors.includes(u))].map(
                (s, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  item: { "@id": ids.sponsor(s.name) },
                }),
              ),
            },
          ]
        : []),
      faqPage(url, lang, faqCopy[lang].items),
  ];
}

/** Guide: entities, TechArticle, BreadcrumbList and its FAQPage. */
export function guideJsonLd({
  lang,
  url: path,
  title,
  description,
  updated,
  homeLabel,
  faq,
}: {
  lang: Locale;
  url: string;
  title: string;
  description: string;
  updated: string;
  homeLabel: string;
  faq: { q: string; a: string }[];
}) {
  const url = absolute(path);
  return [
      ...entities(lang),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { "@id": ids.website },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: { "@id": `${url}#primaryimage` },
      },
      pageImageNode(url, path),
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: title,
        description,
        inLanguage: lang,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        datePublished: updated,
        dateModified: updated,
        author: { "@id": ids.person },
        publisher: { "@id": ids.organization },
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.software },
        image: [{ "@id": `${url}#primaryimage` }, absolute(`/screenshots/overview-dark-${lang}.png`)],
      },
      breadcrumb(url, [
        { name: homeLabel, url: `/${lang}` },
        { name: title, url: path },
      ]),
      faqPage(url, lang, faq),
  ];
}

/** Legal page: entities, WebPage and breadcrumb. */
export function legalJsonLd({
  lang,
  url: path,
  title,
  description,
  updated,
  homeLabel,
}: {
  lang: Locale;
  url: string;
  title: string;
  description: string;
  updated: string;
  homeLabel: string;
}) {
  const url = absolute(path);
  return [
      ...entities(lang),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { "@id": ids.website },
        author: { "@id": ids.person },
        publisher: { "@id": ids.organization },
        dateModified: updated,
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      breadcrumb(url, [
        { name: homeLabel, url: `/${lang}` },
        { name: title, url: path },
      ]),
  ];
}

export type JsonLdNode = Record<string, unknown> & { "@type": string; "@id"?: string };

/**
 * One standalone JSON-LD document per entity, each with its own @context. Entities refer
 * to each other only by @id, so every node shows up as its own item in Google's tools.
 */
export const jsonLdDocuments = (nodes: JsonLdNode[]) =>
  nodes.map((node) => ({ "@context": "https://schema.org", ...node }));

/** Serialize for a <script type="application/ld+json">, escaping `<` against injection. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
