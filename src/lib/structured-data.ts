import type { Locale } from "./i18n";
import { absolute } from "./routes";
import { site } from "./site";
import { provider } from "@/data/legal";
import { copy as faqCopy } from "@/i18n/sections/faq";

const descriptions = {
  en: "Self-hosted, open-source status page. Public services are composed from internal monitoring checks (Icinga 2, Uptime Kuma, openITCockpit, webhooks) without exposing check names, hosts or outputs.",
  de: "Selbst gehostete Open-Source-Statusseite. Öffentliche Dienste werden aus internen Monitoring-Checks (Icinga 2, Uptime Kuma, openITCockpit, Webhooks) zusammengesetzt, ohne Check-Namen, Hosts oder Ausgaben offenzulegen.",
} as const;

/** schema.org graph for the home page: WebSite, Person, SoftwareApplication, FAQPage. */
export function homeJsonLd(lang: Locale) {
  const url = absolute(`/${lang}`);
  const personId = `${site.url}/#author`;
  const appId = `${site.url}/#software`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["en", "de"],
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: provider.name,
        url: site.github.replace(/\/openstatuspage$/, ""),
      },
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: site.name,
        url: site.url,
        description: descriptions[lang],
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Status page",
        operatingSystem: "Linux (Docker, Kubernetes)",
        softwareHelp: site.docs(lang),
        downloadUrl: site.releases,
        license: "https://www.gnu.org/licenses/agpl-3.0.html",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        author: { "@id": personId },
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
          "Service composition with aggregation rules and weighted check bundles",
          "Email subscriptions with double opt-in",
          "OIDC single sign-on",
          "SQLite or PostgreSQL",
          "JSON:API 1.1 HTTP API, RSS and Atom feeds",
          "Works without JavaScript",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: site.name,
        inLanguage: lang,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": appId },
        primaryImageOfPage: absolute(`/screenshots/overview-dark-${lang}.png`),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: faqCopy[lang].items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

/** Serialize for a <script type="application/ld+json">, escaping `<` against injection. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const author = () => ({
  "@type": "Person",
  "@id": `${site.url}/#author`,
  name: provider.name,
  url: site.github.replace(/\/openstatuspage$/, ""),
});

/** schema.org graph for a guide: TechArticle, BreadcrumbList and its FAQPage. */
export function guideJsonLd({
  lang,
  url,
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
  const abs = absolute(url);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${abs}#article`,
        headline: title,
        description,
        inLanguage: lang,
        url: abs,
        mainEntityOfPage: abs,
        datePublished: updated,
        dateModified: updated,
        author: author(),
        publisher: author(),
        isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: site.url },
        about: {
          "@type": "SoftwareApplication",
          "@id": `${site.url}/#software`,
          name: site.name,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Linux (Docker, Kubernetes)",
          url: site.url,
          sameAs: [site.github],
        },
        image: absolute(`/screenshots/overview-dark-${lang}.png`),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${abs}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: absolute(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: title, item: abs },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${abs}#faq`,
        inLanguage: lang,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
