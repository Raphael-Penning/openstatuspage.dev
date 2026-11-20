import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { copy } from "@/i18n/sections/final-cta";

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 5 3.5-5 3.5z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** Decorative uptime-bar strip: mostly healthy with a couple of blips. */
const bars = Array.from({ length: 48 }, (_, i) =>
  i === 17 ? "bg-partial" : i === 31 ? "bg-maint" : i === 40 ? "bg-warn" : "bg-ok",
);

export function FinalCta({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);

  return (
    <Section aria-labelledby="final-cta-title" className="pt-8 sm:pt-12">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-line-strong bg-surface px-5 py-16 text-center sm:px-12 sm:py-24">
          <div className="bg-grid mask-radial pointer-events-none absolute inset-0 -z-10" aria-hidden />
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[min(48rem,140%)] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            aria-hidden
          />

          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="final-cta-title"
            className="text-gradient mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-muted sm:text-lg">{t.lead}</p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#quickstart">
              {t.primary}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href={site.demo} variant="secondary">
              <PlayIcon />
              {t.demo}
            </ButtonLink>
            <ButtonLink href={site.github} variant="secondary">
              <GithubIcon />
              {t.github}
            </ButtonLink>
          </div>

          <div className="mx-auto mt-14 flex max-w-md items-end justify-center gap-[3px]" aria-hidden>
            {bars.map((tone, i) => (
              <span key={i} className={`h-6 flex-1 rounded-[2px] ${tone} opacity-80`} />
            ))}
          </div>

          <p className="mt-6 font-mono text-xs text-subtle">
            {t.domainLabel}{" "}
            <a
              href={site.url}
              className="rounded-sm text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {site.domain}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
