import { site } from "./site";

/**
 * Umami web analytics (https://umami.is), read from the environment at build time.
 *
 * Analytics stay off unless both variables are set, so forks, local builds and
 * previews never report to someone else's Umami instance:
 *
 *   UMAMI_URL=https://analytics.example.com   # base URL of your Umami instance
 *   UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-...        # website ID from the Umami dashboard
 *   UMAMI_DOMAINS=example.com                 # optional, defaults to the site domain
 *
 * The privacy policy only mentions Umami when it is configured.
 */
function readUmami() {
  const url = process.env.UMAMI_URL?.trim().replace(/\/+$/, "");
  const websiteId = process.env.UMAMI_WEBSITE_ID?.trim();
  if (!url || !websiteId) return null;
  return {
    src: `${url}/script.js`,
    websiteId,
    host: new URL(url).host,
    domains: process.env.UMAMI_DOMAINS?.trim() || site.domain,
  };
}

export const umami = readUmami();
