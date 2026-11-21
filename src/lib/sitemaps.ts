import { locales } from "./i18n";
import { absolute, indexablePages } from "./routes";
import { site } from "./site";

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Child sitemaps listed in the index. Add incident/monitor sitemaps here if they ever exist. */
export const childSitemaps = ["/sitemaps/pages.xml"];

export function sitemapIndexXml() {
  const entries = childSitemaps
    .map(
      (path) =>
        `  <sitemap>\n    <loc>${escape(absolute(path))}</loc>\n    <lastmod>${site.updated}</lastmod>\n  </sitemap>`,
    )
    .join("\n");
  return `${xmlHeader}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
}

/** Main sitemap: every navigable page in every language, with hreflang alternates. */
export function pagesSitemapXml() {
  const urls = indexablePages().flatMap(({ alternates, priority }) =>
    locales.map((lang) => {
      const links = [
        ...locales.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${escape(absolute(alternates[l]))}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(absolute(alternates.en))}"/>`,
      ].join("\n");
      return `  <url>\n    <loc>${escape(absolute(alternates[lang]))}</loc>\n    <lastmod>${site.updated}</lastmod>\n    <changefreq>${priority === 1 ? "weekly" : priority >= 0.5 ? "monthly" : "yearly"}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n${links}\n  </url>`;
    }),
  );
  return `${xmlHeader}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

export const xmlResponse = (body: string) =>
  new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
