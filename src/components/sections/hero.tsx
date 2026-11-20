import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { screenshot, site } from "@/lib/site";
import { BrowserFrame, ButtonLink, Container, StatusDot } from "@/components/ui/primitives";
import { copy } from "@/i18n/sections/hero";
import { HeroUptime } from "./hero-uptime";

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8.5 5 3.5-5 3.5z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Hero({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);
  const shot = screenshot("overview", lang, "dark");

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-14 pb-0 sm:pt-20">
      {/* Background: grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="absolute top-[-10%] left-1/2 h-[520px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(59_130_246/0.28),transparent)] blur-2xl" />
      </div>

      <Container className="flex flex-col items-center text-center">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.badge} — ${t.badgeLinkLabel}`}
          className="animate-fade-up group inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3 pl-3.5 text-xs text-muted backdrop-blur transition-colors hover:border-line-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
        >
          <StatusDot tone="ok" pulse />
          <span className="truncate">{t.badge}</span>
          <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1
          id="hero-title"
          className="text-gradient animate-fade-up mt-8 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance [animation-delay:80ms] sm:text-6xl lg:text-7xl"
        >
          {t.title}
        </h1>

        <p className="animate-fade-up mt-6 max-w-2xl text-base text-pretty text-muted [animation-delay:160ms] sm:text-lg">
          {t.lead}
        </p>

        <div className="animate-fade-up mt-10 flex w-full flex-col items-stretch justify-center gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row sm:items-center">
          <ButtonLink href="#quickstart" variant="primary">
            {t.ctaPrimary}
            <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href={site.demo} variant="secondary">
            <PlayIcon className="size-4" />
            {t.ctaDemo}
          </ButtonLink>
          <ButtonLink href={site.github} variant="ghost">
            <GithubIcon className="size-4" />
            {t.ctaGithub}
          </ButtonLink>
        </div>

        <div className="animate-fade-up mt-6 [animation-delay:320ms]">
          <p className="sr-only">{t.snippetLabel}</p>
          <code className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/80 px-3.5 py-2 font-mono text-xs text-muted sm:text-sm">
            <span className="text-accent select-none" aria-hidden>
              $
            </span>
            <span className="text-fg">docker compose up -d</span>
          </code>
        </div>
      </Container>

      {/* Product screenshot */}
      <Container className="animate-fade-up relative mt-16 [animation-delay:400ms] sm:mt-20">
        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute inset-x-[8%] top-[6%] -z-10 h-3/4 rounded-full bg-accent/25 blur-[90px]"
            aria-hidden
          />

          <div className="mask-fade-b">
            <BrowserFrame url="status.example.com">
              <Image
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={t.screenshotAlt}
                preload
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="block h-auto w-full"
              />
            </BrowserFrame>
          </div>

          {/* Floating cards (decorative echo of the product, hidden on phones) */}
          <div
            className="absolute top-[18%] -left-6 hidden w-64 rounded-xl border border-line-strong bg-surface/90 p-4 text-left shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)] backdrop-blur md:block lg:-left-12"
            aria-hidden
          >
            <div className="flex items-center gap-2.5">
              <StatusDot tone="ok" pulse />
              <p className="text-sm font-medium text-fg">{t.cardStatusTitle}</p>
            </div>
            <p className="mt-1.5 pl-[18px] text-xs text-subtle">{t.cardStatusMeta}</p>
          </div>

          <div
            className="absolute top-[46%] -right-6 hidden w-72 rounded-xl border border-line-strong bg-surface/90 p-4 text-left shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)] backdrop-blur md:block lg:-right-12"
            aria-hidden
          >
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-medium text-fg">
                <StatusDot tone="ok" />
                {t.cardUptimeTitle}
              </p>
              <span className="font-mono text-[11px] text-subtle">{t.cardUptimeLegend}</span>
            </div>
            <HeroUptime className="mt-3" />
          </div>

          <div
            className="absolute bottom-[22%] left-[8%] hidden items-center gap-3 rounded-xl border border-line-strong bg-surface/90 px-4 py-3 text-left shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)] backdrop-blur lg:flex"
            aria-hidden
          >
            <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
              <ShieldIcon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-fg">{t.cardPrivateTitle}</p>
              <p className="text-xs text-subtle">{t.cardPrivateMeta}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
