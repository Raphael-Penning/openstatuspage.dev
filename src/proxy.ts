import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "de"];

function preferredLocale(request: NextRequest) {
  const header = request.headers.get("accept-language") ?? "";
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase().slice(0, 2), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return tags.find((t) => locales.includes(t.tag))?.tag ?? "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;
  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and anything with a file extension (screenshots, icons, …)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
