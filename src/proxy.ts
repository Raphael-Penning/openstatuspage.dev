import { NextResponse, type NextRequest } from "next/server";
import { allSlugs } from "@/lib/routes";

const locales = ["en", "de"] as const;

/** Every page that exists, per locale: home plus the localized legal and guide slugs. */
const knownPaths = new Set(
  locales.flatMap((l) => [`/${l}`, ...allSlugs(l).map((slug) => `/${l}/${slug}`)]),
);

function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return tags.find((t) => (locales as readonly string[]).includes(t.tag))?.tag ?? "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const locale = locales.find((l) => path === `/${l}` || path.startsWith(`/${l}/`));

  if (!locale) {
    request.nextUrl.pathname = `/${preferredLocale(request)}${path === "/" ? "" : path}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Unknown pages under a locale: answer with a real 404 instead of the
  // prerendered fallback shell (which would be a soft 404 for crawlers).
  if (!knownPaths.has(path) && !path.endsWith("/opengraph-image")) {
    request.nextUrl.pathname = "/_/not/found";
    return NextResponse.rewrite(request.nextUrl, { status: 404 });
  }
}

export const config = {
  // Skip Next internals and anything with a file extension (screenshots, icons, …)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
