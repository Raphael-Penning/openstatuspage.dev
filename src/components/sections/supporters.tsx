import Image from "next/image";
import type { CSSProperties } from "react";
import { pick, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { supporters, type Supporter, type SupporterRole } from "@/data/supporters";
import { copy } from "@/i18n/sections/supporters";
import { ButtonLink, Container, Section, SectionHeading, cx } from "@/components/ui/primitives";

type Copy = (typeof copy)["en"];

/** Minimum number of tiles in the "Used by" strip; the rest are open slots. */
const USER_SLOTS = 4;

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-4", className)}
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-4", className)}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-5", className)}
      aria-hidden
    >
      <path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-4", className)}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-4", className)}
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Gradient monogram square used while no official logo is available. */
function Monogram({ name, accent, size }: { name: string; accent?: string; size: "lg" | "sm" }) {
  const style: CSSProperties | undefined = accent
    ? { backgroundImage: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 35%, #08090b))` }
    : undefined;
  return (
    <span
      aria-hidden
      style={style}
      className={cx(
        "grid shrink-0 place-items-center font-semibold text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)]",
        !accent && "bg-linear-to-br from-accent via-accent-strong to-[#1e1b4b]",
        size === "lg" ? "size-12 rounded-xl text-xl" : "size-8 rounded-lg text-sm",
      )}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

/** Logo if available, otherwise a text wordmark placeholder. */
function SupporterMark({
  supporter,
  t,
  size,
}: {
  supporter: Supporter;
  t: Copy;
  size: "lg" | "sm";
}) {
  if (supporter.logo) {
    return (
      <span className={cx("relative block w-full", size === "lg" ? "h-12 max-w-56" : "h-8 max-w-36")}>
        <Image
          src={supporter.logo}
          alt={t.logoAlt.replace("{name}", supporter.name)}
          fill
          sizes={size === "lg" ? "224px" : "144px"}
          unoptimized={supporter.logo.endsWith(".svg")}
          className={cx("object-contain", size === "lg" ? "object-left" : "object-center")}
        />
      </span>
    );
  }
  return (
    <span className="flex min-w-0 items-center gap-3">
      <Monogram name={supporter.name} accent={supporter.accent} size={size} />
      <span
        className={cx(
          "truncate font-semibold tracking-tight text-fg",
          size === "lg" ? "text-xl" : "text-base",
        )}
      >
        {supporter.name}
      </span>
    </span>
  );
}

function RoleBadges({ roles, t }: { roles: SupporterRole[]; t: Copy }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {roles.map((role) => (
        <li
          key={role}
          className={cx(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider",
            role === "sponsor"
              ? "border-accent/30 bg-accent-soft text-accent"
              : "border-line-strong bg-surface-2 text-muted",
          )}
        >
          <span
            aria-hidden
            className={cx("size-1.5 rounded-full", role === "sponsor" ? "bg-accent" : "bg-ok")}
          />
          {t.roles[role]}
        </li>
      ))}
    </ul>
  );
}

function SponsorCard({ supporter, t }: { supporter: Supporter; t: Copy }) {
  const host = supporter.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <li className="h-full">
      <a
        href={supporter.url}
        {...external}
        className={cx(
          "group relative flex h-full min-h-56 flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-line bg-surface/80 p-6 transition-colors hover:border-line-strong hover:bg-surface sm:p-8",
          focusRing,
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent/15 blur-3xl transition-colors group-hover:bg-accent/25"
        />
        <span className="relative flex flex-col gap-5">
          <SupporterMark supporter={supporter} t={t} size="lg" />
          <RoleBadges roles={supporter.roles} t={t} />
        </span>
        <span className="relative flex items-center justify-between gap-4 border-t border-line pt-4 text-sm">
          <span className="truncate font-mono text-xs text-subtle">{host}</span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-muted transition-colors group-hover:text-fg">
            {t.visit}
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">
              {supporter.name} {t.newTab}
            </span>
          </span>
        </span>
      </a>
    </li>
  );
}

function SponsorCta({ t }: { t: Copy }) {
  return (
    <li className="h-full">
      <div className="relative flex h-full min-h-56 flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-dashed border-line-strong bg-bg/40 p-6 sm:p-8">
        <div
          aria-hidden
          className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-50"
        />
        <div className="relative">
          <span className="mb-4 grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
            <HeartIcon />
          </span>
          <h4 className="text-lg font-semibold tracking-tight text-fg">{t.sponsorCta.title}</h4>
          <p className="mt-2 text-sm text-pretty text-muted">{t.sponsorCta.body}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {t.sponsorCta.points.map((point) => (
              <li key={point} className="flex gap-2">
                <CheckIcon className="mt-0.5 shrink-0 text-ok" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <ButtonLink href={site.sponsorMail} variant="primary" className="relative self-start">
          {t.sponsorCta.action}
          <ArrowRight />
        </ButtonLink>
      </div>
    </li>
  );
}

function UserTile({ supporter, t }: { supporter: Supporter; t: Copy }) {
  return (
    <li>
      <a
        href={supporter.url}
        {...external}
        title={supporter.name}
        className={cx(
          "flex h-20 items-center justify-center rounded-xl border border-line bg-surface/60 px-4 opacity-80 grayscale transition hover:border-line-strong hover:bg-surface hover:opacity-100 hover:grayscale-0",
          focusRing,
        )}
      >
        <SupporterMark supporter={supporter} t={t} size="sm" />
        <span className="sr-only">{t.newTab}</span>
      </a>
    </li>
  );
}

function EmptyTile({ t }: { t: Copy }) {
  return (
    <li
      aria-hidden
      className="flex h-20 items-center justify-center gap-2 rounded-xl border border-dashed border-line px-4 text-xs text-subtle"
    >
      <PlusIcon className="size-3.5" />
      <span className="truncate">{t.emptySlot}</span>
    </li>
  );
}

export function Supporters({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);
  const sponsors = supporters.filter((s) => s.roles.includes("sponsor"));
  const users = supporters.filter((s) => s.roles.includes("user"));
  const openUserSlots = Math.max(0, USER_SLOTS - users.length);

  return (
    <Section id="supporters" aria-label={t.eyebrow}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line-strong to-transparent"
      />
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        {/* Sponsors */}
        <div className="mt-14 sm:mt-16">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-sm font-medium text-fg">{t.sponsorsHeading}</h3>
            <p className="text-sm text-subtle">{t.sponsorsLead}</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {sponsors.map((s) => (
              <SponsorCard key={s.name} supporter={s} t={t} />
            ))}
            <SponsorCta t={t} />
          </ul>
        </div>

        {/* Used by */}
        <div className="mt-16">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-sm font-medium text-fg">{t.usersHeading}</h3>
            <p className="text-sm text-subtle">{t.usersLead}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {users.map((s) => (
              <UserTile key={s.name} supporter={s} t={t} />
            ))}
            {Array.from({ length: openUserSlots }, (_, i) => (
              <EmptyTile key={`slot-${i}`} t={t} />
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-medium text-fg">{t.userCta.title}</p>
              <p className="mt-1 text-sm text-pretty text-muted">{t.userCta.body}</p>
            </div>
            <ButtonLink href={site.sponsorMail} variant="secondary" className="shrink-0">
              {t.userCta.action}
              <ArrowRight />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
