import type { ReactNode } from "react";
import { type Locale, pick } from "@/lib/i18n";
import { copy } from "@/i18n/sections/how-it-works";
import { Card, Container, Section, SectionHeading, StatusDot, cx } from "@/components/ui/primitives";

/* ---------- icons (lucide-style, 1.5 stroke) ---------- */

function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-5 shrink-0", className)}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const PlugIcon = () => (
  <Icon>
    <path d="M12 22v-5" />
    <path d="M9 8V2" />
    <path d="M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
  </Icon>
);

const LayersIcon = () => (
  <Icon>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </Icon>
);

const BroadcastIcon = () => (
  <Icon>
    <path d="M4.9 19.1a10 10 0 0 1 0-14.2" />
    <path d="M7.8 16.2a6 6 0 0 1 0-8.4" />
    <circle cx="12" cy="12" r="2" />
    <path d="M16.2 7.8a6 6 0 0 1 0 8.4" />
    <path d="M19.1 4.9a10 10 0 0 1 0 14.2" />
  </Icon>
);

const outputIcons = {
  page: (
    <Icon className="size-4">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 14h4" />
      <path d="M7 17h7" />
    </Icon>
  ),
  mail: (
    <Icon className="size-4">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </Icon>
  ),
  feed: (
    <Icon className="size-4">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </Icon>
  ),
  api: (
    <Icon className="size-4">
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </Icon>
  ),
} as const;

const EyeIcon = () => (
  <Icon>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

const LockIcon = () => (
  <Icon>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);

const CheckIcon = () => (
  <Icon className="size-4 text-ok">
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

const MinusIcon = () => (
  <Icon className="size-4 text-subtle">
    <path d="M5 12h14" />
  </Icon>
);

/* ---------- animated connectors (CSS only) ---------- */

const connectorCss = `
@keyframes hiw-dash-x { to { background-position: 16px 0; } }
@keyframes hiw-dash-y { to { background-position: 0 16px; } }
.hiw-dash-x {
  background-image: repeating-linear-gradient(to right, rgb(59 130 246 / 0.7) 0 8px, transparent 8px 16px);
  animation: hiw-dash-x 0.9s linear infinite;
}
.hiw-dash-y {
  background-image: repeating-linear-gradient(to bottom, rgb(59 130 246 / 0.7) 0 8px, transparent 8px 16px);
  animation: hiw-dash-y 0.9s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .hiw-dash-x, .hiw-dash-y { animation: none; }
}
`;

function Connector() {
  return (
    <div aria-hidden>
      {/* mobile: vertical, between stacked cards */}
      <div className="flex flex-col items-center py-2 md:hidden">
        <span className="hiw-dash-y h-8 w-px" />
        <svg viewBox="0 0 12 8" className="size-3 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="m1 1.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* desktop: horizontal, sits in the grid gap */}
      <div className="absolute top-14 -right-10 hidden w-10 items-center md:flex">
        <span className="hiw-dash-x h-px flex-1" />
        <svg viewBox="0 0 8 12" className="-ml-1 h-3 w-2 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="m1.5 1 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- step card ---------- */

function Step({
  n,
  label,
  icon,
  title,
  body,
  last,
  children,
}: {
  n: number;
  label: string;
  icon: ReactNode;
  title: string;
  body: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <li className="relative flex flex-col">
      <Card className="relative flex flex-1 flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute -top-16 -left-16 size-40 rounded-full bg-accent/10 blur-3xl"
          aria-hidden
        />
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-surface-2 text-accent">
            {icon}
          </span>
          <span className="font-mono text-xs tracking-[0.18em] text-subtle uppercase">
            {label} {String(n).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
        <p className="mt-2 text-sm text-pretty text-muted">{body}</p>
        <div className="mt-6 flex-1">{children}</div>
      </Card>
      {!last && <Connector />}
    </li>
  );
}

/* ---------- section ---------- */

export function HowItWorks({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);
  const c = t.compose;
  const weights = [2, 1, 1];
  const nodeStates: ("ok" | "down")[] = ["ok", "ok", "down"];

  return (
    <Section id="how-it-works" aria-labelledby="how-it-works-title">
      <style href="hiw-connectors" precedence="default">
        {connectorCss}
      </style>

      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-40" aria-hidden />

      <Container className="relative">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={<span id="how-it-works-title">{t.title}</span>}
          lead={t.lead}
        />

        <ol className="mt-14 grid grid-cols-1 md:mt-16 md:grid-cols-3 md:gap-10">
          {/* 1 — Connect */}
          <Step n={1} label={t.stepLabel} icon={<PlugIcon />} title={t.connect.title} body={t.connect.body}>
            <ul className="flex flex-wrap gap-2">
              {t.connect.adapters.map((a) => (
                <li
                  key={a.name}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-fg"
                >
                  <StatusDot tone="ok" />
                  {a.name}
                  {a.note && <span className="text-subtle">· {a.note}</span>}
                </li>
              ))}
            </ul>
          </Step>

          {/* 2 — Compose */}
          <Step n={2} label={t.stepLabel} icon={<LayersIcon />} title={c.title} body={c.body}>
            <div className="space-y-3 font-mono text-xs">
              {/* Rule: worst of */}
              <div className="rounded-lg border border-line bg-bg/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-subtle">{c.serviceLabel}</span>
                  <span className="inline-flex items-center gap-1.5 text-fg">
                    <StatusDot tone="partial" />
                    {c.serviceName}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded border border-accent/40 bg-accent-soft px-1.5 py-0.5 text-accent">
                    {c.ruleLabel}: {c.ruleWorst}
                  </span>
                </div>
                <ul className="mt-2 grid grid-cols-3 gap-1.5">
                  {c.checks.map((name, i) => (
                    <li
                      key={name}
                      className="flex items-center gap-1.5 truncate rounded border border-line bg-surface-2 px-1.5 py-1 text-muted"
                    >
                      <StatusDot tone={i === 1 ? "partial" : "ok"} />
                      <span className="truncate">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bundle: weighted majority */}
              <div className="rounded-lg border border-line bg-bg/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-subtle">{c.bundleLabel}</span>
                  <span className="rounded border border-accent/40 bg-accent-soft px-1.5 py-0.5 text-accent">
                    {c.bundleRule} · 2·1·1
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {c.nodes.map((node, i) => (
                    <li key={node} className="flex items-center gap-2 text-muted">
                      <StatusDot tone={nodeStates[i]} />
                      <span className="w-16 shrink-0 truncate">{node}</span>
                      <span className="flex h-1.5 flex-1 gap-0.5" aria-hidden>
                        {Array.from({ length: 2 }, (_, k) => (
                          <span
                            key={k}
                            className={cx(
                              "flex-1 rounded-sm",
                              k < weights[i] ? (nodeStates[i] === "ok" ? "bg-ok/70" : "bg-down/70") : "bg-line",
                            )}
                          />
                        ))}
                      </span>
                      <span className="shrink-0 text-subtle">
                        {c.weightLabel} {weights[i]}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-center justify-end gap-1.5 text-fg">
                  <span className="text-subtle">3 : 1 →</span>
                  <StatusDot tone="ok" />
                </div>
              </div>
              <p className="font-sans text-[11px] text-subtle">{c.exampleNote}</p>
            </div>
          </Step>

          {/* 3 — Publish */}
          <Step
            n={3}
            last
            label={t.stepLabel}
            icon={<BroadcastIcon />}
            title={t.publish.title}
            body={t.publish.body}
          >
            <ul className="space-y-2">
              {t.publish.outputs.map((o) => (
                <li
                  key={o.key}
                  className="flex items-center gap-3 rounded-lg border border-line bg-bg/60 px-3 py-2.5"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                    {outputIcons[o.key]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-fg">{o.name}</span>
                    <span className="block truncate text-xs text-subtle">{o.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Step>
        </ol>

        {/* Privacy band */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-line bg-surface/60 p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">{t.privacy.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance text-fg sm:text-3xl">
                {t.privacy.title}
              </h3>
              <p className="mt-3 text-sm text-pretty text-muted sm:text-base">{t.privacy.lead}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line-strong bg-surface-2/70 p-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <span className="text-ok">
                    <EyeIcon />
                  </span>
                  {t.privacy.publicTitle}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {t.privacy.publicItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-dashed border-line-strong bg-bg/60 p-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-fg">
                  <span className="text-subtle">
                    <LockIcon />
                  </span>
                  {t.privacy.internalTitle}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {t.privacy.internalItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 font-mono text-xs text-subtle">
                      <MinusIcon />
                      <span className="rounded bg-line/60 px-1.5 py-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-1 border-t border-line pt-6 sm:flex-row sm:gap-3">
            <p className="shrink-0 text-sm font-medium text-fg">{t.privacy.splitTitle}</p>
            <p className="text-sm text-pretty text-muted">{t.privacy.splitBody}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
