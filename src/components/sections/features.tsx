import type { ReactNode } from "react";
import { pick, type Locale } from "@/lib/i18n";
import { copy } from "@/i18n/sections/features";
import { Container, Section, SectionHeading, StatusDot, cx } from "@/components/ui/primitives";

/* ------------------------------------------------------------------ */
/* Icons (lucide-style, 1.5 stroke, currentColor)                      */
/* ------------------------------------------------------------------ */

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const icons = {
  shield: (
    <Icon>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="M9.5 12.5a2.5 2.5 0 0 1 5 0V15h-5v-2.5Z" />
      <path d="M10.5 10.5V10a1.5 1.5 0 0 1 3 0v.5" />
    </Icon>
  ),
  layers: (
    <Icon>
      <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </Icon>
  ),
  vote: (
    <Icon>
      <circle cx="5" cy="6" r="2" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="19" cy="6" r="2" />
      <path d="M5 8v2.5L12 17l7-6.5V8M12 6v11" />
      <circle cx="12" cy="19" r="2" />
    </Icon>
  ),
  bars: (
    <Icon>
      <path d="M4 20V10M8 20V6M12 20v-8M16 20V4M20 20v-6" />
    </Icon>
  ),
  globe: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </Icon>
  ),
  mail: (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </Icon>
  ),
  key: (
    <Icon>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8-8M16 7l2.5 2.5M14 9l2 2" />
    </Icon>
  ),
  database: (
    <Icon>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </Icon>
  ),
  languages: (
    <Icon>
      <path d="M4 5h8M8 3v2M10.5 5c-.8 3.5-3 6.5-6.5 8M6 8.5c1 1.8 2.6 3.3 4.5 4.3" />
      <path d="m12 21 4-9 4 9M13.5 17.5h5" />
    </Icon>
  ),
  server: (
    <Icon>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
    </Icon>
  ),
  sparkle: (
    <Icon>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
      <path d="M10.5 7.5v6M7.5 10.5h6" />
    </Icon>
  ),
  braces: (
    <Icon>
      <path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2v0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1" />
      <path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2v0a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1" />
    </Icon>
  ),
  link: (
    <Icon>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </Icon>
  ),
  history: (
    <Icon>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
      <path d="M3 4v4h4M12 8v4l3 2" />
    </Icon>
  ),
  a11y: (
    <Icon>
      <circle cx="12" cy="4.5" r="1.5" />
      <path d="M5 8.5c2.3.7 4.6 1 7 1s4.7-.3 7-1M12 9.5V14M12 14l-3 6.5M12 14l3 6.5" />
    </Icon>
  ),
  helm: (
    <Icon>
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M5.3 18.7l2.8-2.8M15.9 8.1l2.8-2.8" />
    </Icon>
  ),
  gauge: (
    <Icon>
      <path d="M4 17a8.5 8.5 0 1 1 16 0" />
      <path d="m12 14 4-5" />
      <circle cx="12" cy="14.5" r="1" />
    </Icon>
  ),
  palette: (
    <Icon>
      <path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" />
      <circle cx="7.5" cy="11.5" r="1" />
      <circle cx="10" cy="7.5" r="1" />
      <circle cx="14.5" cy="7.5" r="1" />
    </Icon>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Card shell                                                          */
/* ------------------------------------------------------------------ */

function FeatureCard({
  icon,
  title,
  text,
  visual,
  className,
  children,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  visual?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <li
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 transition-colors duration-300 hover:border-line-strong hover:bg-surface",
        className,
      )}
    >
      {/* faint glow that appears on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {visual && <div className="relative mb-6">{visual}</div>}
      <div className="relative mt-auto">
        <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-accent">
          {icon}
        </div>
        <h3 className="text-base font-semibold tracking-tight text-fg">{title}</h3>
        <p className="mt-1.5 text-sm text-pretty text-muted">{text}</p>
        {children}
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals (decorative, described by the card text)                    */
/* ------------------------------------------------------------------ */

const internalChecks = [
  { source: "icinga", host: "web-03.int.example", check: "http" },
  { source: "icinga", host: "web-04.int.example", check: "http" },
  { source: "kuma", host: "lb-fra-01", check: "tcp/443" },
  { source: "webhook", host: "deploy-bot", check: "push" },
];

function PrivacyVisual({ t }: { t: (typeof copy)["en"]["privacy"] }) {
  return (
    <div aria-hidden className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-xl border border-line bg-bg/60 p-3">
        <p className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-subtle">
          {t.internal}
          <span className="rounded border border-line px-1.5 py-0.5 normal-case tracking-normal">{t.hidden}</span>
        </p>
        <ul className="space-y-1.5 font-mono text-[11px]">
          {internalChecks.map((c) => (
            <li key={c.host} className="flex items-center gap-2 rounded-md bg-surface-2/70 px-2 py-1.5">
              <StatusDot tone="ok" />
              <span className="text-muted">{c.source}:</span>
              <span className="truncate text-muted blur-[3px] select-none">{c.host}</span>
              <span className="ml-auto shrink-0 text-subtle">{c.check}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center text-subtle">
        <span className="rotate-90 sm:rotate-0">{icons.arrow}</span>
      </div>
      <div className="rounded-xl border border-accent/30 bg-accent-soft/40 p-3 shadow-[0_0_40px_-12px_rgb(59_130_246/0.5)]">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-accent">{t.public}</p>
        <div className="flex items-center gap-2 rounded-md border border-line bg-bg/70 px-3 py-2.5 text-sm">
          <StatusDot tone="ok" pulse />
          <span className="font-medium text-fg">{t.serviceName}</span>
          <span className="ml-auto text-xs text-ok">{t.operational}</span>
        </div>
      </div>
    </div>
  );
}

function CompositionVisual({ t }: { t: (typeof copy)["en"]["composition"] }) {
  const tones = ["ok", "ok", "warn"] as const;
  return (
    <div aria-hidden className="relative flex flex-col items-center gap-2 font-mono text-[11px]">
      <div className="flex gap-2">
        {tones.map((tone, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 rounded-md border border-line bg-bg/60 px-2 py-1 text-subtle"
          >
            <StatusDot tone={tone} />
            {t.check}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 120 20" className="h-5 w-32 text-line-strong" fill="none" stroke="currentColor">
        <path d="M15 0v6c0 4 4 6 10 6h70c6 0 10 2 10 6v2M60 0v20M105 0v6" strokeWidth={1} />
      </svg>
      <span className="rounded-md border border-dashed border-line-strong px-2 py-1 text-muted">{t.rule}</span>
      <span className="h-3 w-px bg-line-strong" />
      <span className="flex items-center gap-2 rounded-md border border-line-strong bg-surface-2 px-3 py-1.5 font-sans text-xs text-fg">
        <StatusDot tone="warn" />
        {t.service}
      </span>
    </div>
  );
}

function BundleVisual({ t }: { t: (typeof copy)["en"]["bundles"] }) {
  const votes = [
    { up: true, weight: 2 },
    { up: true, weight: 2 },
    { up: false, weight: 1 },
  ];
  const upWeight = votes.filter((v) => v.up).reduce((s, v) => s + v.weight, 0);
  const total = votes.reduce((s, v) => s + v.weight, 0);
  return (
    <div aria-hidden className="relative">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {votes.map((v, i) => (
          <div key={i} className="rounded-xl border border-line bg-bg/60 p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5">
              <StatusDot tone={v.up ? "ok" : "down"} />
              <span className="truncate text-[11px] font-medium text-fg sm:text-xs">{t.nodes[i]}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-subtle">
              <span className={v.up ? "text-ok" : "text-down"}>{v.up ? t.up : t.down}</span>
              <span>
                {t.weight} {v.weight}
              </span>
            </div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 300 36" preserveAspectRatio="none" className="h-9 w-full text-line-strong" fill="none" stroke="currentColor">
        <path d="M50 0c0 18 100 18 100 36M150 0v36M250 0c0 18-100 18-100 36" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeDasharray="3 3" />
      </svg>
      <div className="mx-auto flex max-w-xs flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-ok/30 bg-ok/5 px-4 py-2.5">
        <StatusDot tone="ok" pulse />
        <span className="font-mono text-xs text-fg">{t.target}</span>
        <span className="font-mono text-[11px] text-ok">
          {t.result}: {t.up} ({upWeight}/{total})
        </span>
      </div>
    </div>
  );
}

/** Deterministic mock history: mostly green, a few rough days. */
const uptimeDays = Array.from({ length: 90 }, (_, i) => {
  if (i === 23) return "down" as const;
  if (i === 22 || i === 61) return "partial" as const;
  if (i === 47 || i === 78) return "maint" as const;
  if (i === 70) return "warn" as const;
  return "ok" as const;
});

const toneBg = {
  ok: "bg-ok/80",
  warn: "bg-warn/80",
  partial: "bg-partial/80",
  down: "bg-down/80",
  maint: "bg-maint/80",
} as const;

function UptimeVisual({ t }: { t: (typeof copy)["en"]["uptime"] }) {
  return (
    <div aria-hidden className="rounded-xl border border-line bg-bg/60 p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-fg">
          <StatusDot tone="ok" />
          {t.serviceName}
        </span>
        <span className="font-mono text-xs text-subtle">
          99.8% {t.uptime}
        </span>
      </div>
      <div className="flex h-8 gap-px sm:gap-[2px]">
        {uptimeDays.map((tone, i) => (
          <span
            key={i}
            className={cx(
              "flex-1 rounded-[1px] transition-opacity group-hover:opacity-100",
              toneBg[tone],
              tone === "ok" && "opacity-80",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
        <span>{t.daysAgo}</span>
        <span>{t.today}</span>
      </div>
    </div>
  );
}

/** Rough dotted world: rows of [startCol, endCol] spans on a 32x14 grid. */
const landRows: [number, number][][] = [
  [[3, 9], [14, 16], [18, 28]],
  [[2, 10], [15, 17], [17, 29]],
  [[3, 9], [14, 18], [18, 27]],
  [[4, 8], [14, 17], [19, 26]],
  [[5, 8], [15, 19], [21, 25]],
  [[6, 8], [15, 20], [22, 24]],
  [[7, 9], [16, 19], [24, 25]],
  [[8, 10], [16, 19], [25, 27]],
  [[8, 11], [17, 19], [26, 28]],
  [[8, 10], [17, 18], [25, 29]],
  [[8, 10], [26, 29]],
  [[8, 9]],
];

const pins = [
  { x: 16.3, y: 2.2, tone: "ok" },
  { x: 18.3, y: 1.4, tone: "ok" },
  { x: 6.5, y: 3.3, tone: "ok" },
  { x: 25.5, y: 3.5, tone: "maint" },
  { x: 9, y: 9.5, tone: "warn" },
  { x: 27.5, y: 9.4, tone: "ok" },
] as const;

const pinFill = { ok: "#22c55e", warn: "#eab308", maint: "#60a5fa" } as const;

function MapVisual() {
  return (
    <svg aria-hidden viewBox="0 0 32 12.5" className="h-auto w-full">
      {landRows.flatMap((spans, y) =>
        spans.flatMap(([a, b], s) =>
          Array.from({ length: b - a + 1 }, (_, k) => (
            <circle key={`${y}-${s}-${k}`} cx={a + k + 0.5} cy={y + 0.5} r={0.18} fill="#343846" />
          )),
        ),
      )}
      {pins.map((p) => (
        <g key={`${p.x}-${p.y}`}>
          <circle cx={p.x} cy={p.y} r={0.75} fill={pinFill[p.tone]} opacity={0.18} />
          <circle cx={p.x} cy={p.y} r={0.32} fill={pinFill[p.tone]} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Features({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);

  return (
    <Section id="features">
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-x-0 top-0 h-96 opacity-60" />
      <Container className="relative">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            className="sm:col-span-2"
            icon={icons.shield}
            title={t.privacy.title}
            text={t.privacy.text}
            visual={<PrivacyVisual t={t.privacy} />}
          />
          <FeatureCard
            icon={icons.layers}
            title={t.composition.title}
            text={t.composition.text}
            visual={<CompositionVisual t={t.composition} />}
          />
          <FeatureCard
            icon={icons.globe}
            title={t.locations.title}
            text={t.locations.text}
            visual={<MapVisual />}
          />
          <FeatureCard
            className="sm:col-span-2"
            icon={icons.vote}
            title={t.bundles.title}
            text={t.bundles.text}
            visual={<BundleVisual t={t.bundles} />}
          />
          <FeatureCard
            className="sm:col-span-2"
            icon={icons.bars}
            title={t.uptime.title}
            text={t.uptime.text}
            visual={<UptimeVisual t={t.uptime} />}
          />
          <FeatureCard icon={icons.mail} title={t.email.title} text={t.email.text}>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              {t.email.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-ok">{icons.check}</span>
                  {p}
                </li>
              ))}
            </ul>
          </FeatureCard>
          <FeatureCard icon={icons.link} title={t.privatePages.title} text={t.privatePages.text} />
          <FeatureCard icon={icons.history} title={t.history.title} text={t.history.text} />
          <FeatureCard icon={icons.helm} title={t.kubernetes.title} text={t.kubernetes.text} />
          <FeatureCard icon={icons.key} title={t.sso.title} text={t.sso.text} />
          <FeatureCard icon={icons.database} title={t.database.title} text={t.database.text} />
          <FeatureCard icon={icons.languages} title={t.i18n.title} text={t.i18n.text} />
          <FeatureCard icon={icons.server} title={t.noJs.title} text={t.noJs.text} />
          <FeatureCard icon={icons.a11y} title={t.a11y.title} text={t.a11y.text} />
          <FeatureCard icon={icons.gauge} title={t.lightweight.title} text={t.lightweight.text} />
          <FeatureCard icon={icons.palette} title={t.branding.title} text={t.branding.text} />
          <FeatureCard icon={icons.sparkle} title={t.seo.title} text={t.seo.text} />
          <FeatureCard
            className="sm:col-span-2 lg:col-span-1"
            icon={icons.braces}
            title={t.api.title}
            text={t.api.text}
          />
        </ul>
      </Container>
    </Section>
  );
}
