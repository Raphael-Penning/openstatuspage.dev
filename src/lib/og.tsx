import { ImageResponse } from "next/og";
import { site } from "./site";

/** Open Graph / Twitter card size. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const colors = {
  bg: "#08090b",
  fg: "#eceef3",
  muted: "#9097a6",
  line: "#23262f",
  surface: "#0f1115",
  accent: "#3b82f6",
  ok: "#22c55e",
  warn: "#eab308",
};

/** The OpenStatusPage mark (blue tile with a pulse line), as used in the navbar. */
export function LogoSvg({ size, rounded = true }: { size: number; rounded?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect width="32" height="32" rx={rounded ? 8 : 0} fill={colors.accent} />
      <path
        d="M6 17h5l2.5-6 4.5 11 2.5-5H26"
        fill="none"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Branded social card: logo row, optional eyebrow, title, subline and the uptime strip.
 * The title shrinks for long page titles so it always fits in three lines.
 */
export function ogImage({
  title,
  sub,
  eyebrow,
  status,
}: {
  title: string;
  sub: string;
  eyebrow?: string;
  status: string;
}) {
  const bars = Array.from({ length: 45 }, (_, i) => (i === 31 ? colors.warn : colors.ok));
  const titleSize = title.length > 70 ? 54 : title.length > 48 ? 60 : 68;

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
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.28), transparent 70%), ${colors.bg}`,
          color: colors.fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <LogoSvg size={56} />
          <div style={{ fontSize: 34, fontWeight: 600 }}>{site.name}</div>
          <div style={{ marginLeft: "auto", fontSize: 24, color: colors.muted }}>{site.domain}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {eyebrow && (
            <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#60a5fa" }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: titleSize, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, color: colors.muted }}>{sub}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: 24,
            borderRadius: 16,
            border: `1px solid ${colors.line}`,
            background: colors.surface,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: colors.ok }} />
            {status}
          </div>
          <div style={{ display: "flex", gap: 6, height: 36 }}>
            {bars.map((c, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 3, background: c }} />
            ))}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

/** Shared card texts per language. */
export const ogText = {
  en: { sub: "Self-hosted · Open source · AGPL-3.0", status: "All systems operational" },
  de: { sub: "Selbst gehostet · Open Source · AGPL-3.0", status: "Alle Systeme laufen" },
} as const;
