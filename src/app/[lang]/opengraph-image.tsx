import { ImageResponse } from "next/og";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const alt = "OpenStatusPage — self-hosted, open-source status page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const text = {
  en: {
    title: "The status page that keeps your infrastructure private.",
    sub: "Self-hosted · Open source · AGPL-3.0",
    status: "All systems operational",
  },
  de: {
    title: "Die Statusseite, die deine Infrastruktur privat hält.",
    sub: "Selbst gehostet · Open Source · AGPL-3.0",
    status: "Alle Systeme laufen",
  },
} satisfies Record<Locale, { title: string; sub: string; status: string }>;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const t = text[lang];
  const bars = Array.from({ length: 45 }, (_, i) => (i === 31 ? "#eab308" : "#22c55e"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.28), transparent 70%), #08090b",
          color: "#eceef3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#3b82f6" />
            <path
              d="M6 17h5l2.5-6 4.5 11 2.5-5H26"
              fill="none"
              stroke="white"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{site.name}</div>
          <div style={{ marginLeft: "auto", fontSize: 24, color: "#9097a6" }}>{site.domain}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            {t.title}
          </div>
          <div style={{ fontSize: 28, color: "#9097a6" }}>{t.sub}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: 24,
            borderRadius: 16,
            border: "1px solid #23262f",
            background: "#0f1115",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#22c55e" }} />
            {t.status}
          </div>
          <div style={{ display: "flex", gap: 6, height: 36 }}>
            {bars.map((c, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 3, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
