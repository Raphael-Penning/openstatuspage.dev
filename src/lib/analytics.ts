import { site } from "./site";

/**
 * Umami web analytics (https://umami.is) for openstatuspage.dev.
 *
 * Tracking is always on with the defaults below. The tracker only counts page views
 * on the hostnames in `domains`, so forks, local builds and previews running on other
 * hosts send nothing. Forks can point it at their own instance via the environment
 * (read at build time):
 *
 *   UMAMI_URL=https://analytics.example.com   # base URL of the Umami instance
 *   UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-...        # website ID from the Umami dashboard
 *   UMAMI_DOMAINS=example.com                 # comma-separated hostnames to count
 */
const defaults = {
  url: "https://analytics.partlabs.de",
  websiteId: "585291a3-7a54-48be-bc22-650898b8752d",
  domains: site.domain,
};

const env = (name: string) => process.env[name]?.trim() || undefined;

const url = (env("UMAMI_URL") ?? defaults.url).replace(/\/+$/, "");

export const umami = {
  src: `${url}/script.js`,
  websiteId: env("UMAMI_WEBSITE_ID") ?? defaults.websiteId,
  host: new URL(url).host,
  domains: env("UMAMI_DOMAINS") ?? defaults.domains,
};
