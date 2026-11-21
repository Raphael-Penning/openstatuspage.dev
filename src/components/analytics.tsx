import Script from "next/script";
import { umami } from "@/lib/analytics";

/**
 * Cookieless Umami tracker, loaded during browser idle time so it never competes
 * with page rendering.
 */
export function Analytics() {
  return (
    <Script
      src={umami.src}
      strategy="lazyOnload"
      data-website-id={umami.websiteId}
      data-domains={umami.domains}
      data-do-not-track="true"
    />
  );
}
