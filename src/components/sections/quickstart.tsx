import { type Locale, pick } from "@/lib/i18n";
import { site } from "@/lib/site";
import { copy } from "@/i18n/sections/quickstart";
import { ButtonLink, Container, Section, SectionHeading } from "@/components/ui/primitives";
import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

/** Token kinds for the hand-rolled shell highlighting. */
type Kind = "cmd" | "flag" | "str" | "url" | "op" | "var" | "plain" | "comment";
type Token = [Kind, string];
type Line = Token[];

const RELEASE = `${site.releases}/latest/download`;

const tone: Record<Kind, string> = {
  cmd: "text-fg font-medium",
  flag: "text-sky-300/90",
  str: "text-emerald-300/90",
  url: "text-accent",
  op: "text-subtle",
  var: "text-amber-300/90",
  plain: "text-muted",
  comment: "text-subtle italic",
};

const installLines = (comment: string): Line[] => [
  [["cmd", "mkdir"], ["plain", " openstatuspage "], ["op", "&&"], ["cmd", " cd"], ["plain", " openstatuspage"]],
  [["cmd", "curl"], ["flag", " -fsSLO"], ["url", ` ${RELEASE}/compose.yaml`]],
  [["cmd", "curl"], ["flag", " -fsSL -o"], ["plain", " .env"], ["url", ` ${RELEASE}/env.example`]],
  [
    ["cmd", "printf"],
    ["str", " 'SECRET_KEY=%s\\nPOSTGRES_PASSWORD=%s\\n'"],
    ["var", ' "$(openssl rand -base64 48)"'],
    ["var", ' "$(openssl rand -hex 16)"'],
    ["op", " >>"],
    ["plain", " .env"],
  ],
  [["cmd", "chmod"], ["plain", " 600 .env"]],
  [["comment", comment]],
  [["cmd", "docker"], ["plain", " compose up"], ["flag", " -d"]],
];

const API_URL =
  "https://status.example.com/api/admin/incidents?filter[status]=active&page[size]=10";

const apiLine: Line = [
  ["cmd", "curl"],
  ["flag", " -g -H"],
  ["str", ' "Authorization: Bearer '],
  ["var", "$OSP_TOKEN"],
  ["str", '"'],
  ["url", ` "${API_URL}"`],
];

const toText = (lines: Line[]) => lines.map((l) => l.map(([, t]) => t).join("")).join("\n");

function CodeLines({ lines }: { lines: Line[] }) {
  return (
    <code className="block min-w-max">
      {lines.map((line, i) => {
        const isComment = line[0]?.[0] === "comment";
        return (
          <span key={i} className="block whitespace-pre">
            <span className="mr-3 select-none text-subtle/70" aria-hidden>
              {isComment ? " " : "$"}
            </span>
            {line.map(([kind, text], j) => (
              <span key={j} className={tone[kind]}>
                {text}
              </span>
            ))}
          </span>
        );
      })}
    </code>
  );
}

function TerminalChrome({ title, action }: { title: string; action: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-surface-2/80 px-4 py-2.5">
      <div className="flex gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
      </div>
      <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-subtle">{title}</p>
      {action}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Quickstart({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);
  const lines = installLines(t.editComment);
  const labels = {
    copy: t.copy,
    copied: t.copied,
    failed: t.copyFailed,
    announcement: t.copiedAnnouncement,
  };

  return (
    <Section id="quickstart" className="overflow-hidden">
      <div
        className="pointer-events-none absolute top-1/3 right-0 -z-10 size-[520px] translate-x-1/3 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="left" />


          <h3 className="sr-only">{t.checklistLabel}</h3>
          <ul className="mt-8 space-y-4">
            {t.checklist.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent-soft text-accent">
                  <CheckIcon />
                </span>
                <p className="text-sm">
                  <span className="font-medium text-fg">{item.title}</span>{" "}
                  <span className="text-muted">{item.detail}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={site.docs(lang)} variant="secondary">
              {t.docsCta}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href={site.releases} variant="ghost">
              {t.releasesCta}
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <figure
            aria-label={t.terminalLabel}
            className="overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.03)]"
          >
            <TerminalChrome
              title={t.terminalTitle}
              action={<CopyButton text={toText(lines)} labels={{ ...labels, aria: t.copyAria }} />}
            />
            <pre
              tabIndex={0}
              className="overflow-x-auto bg-bg/40 p-4 font-mono text-[12.5px] leading-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:p-5 sm:text-[13px]"
            >
              <CodeLines lines={lines} />
            </pre>
          </figure>

          <p className="px-1 text-sm text-muted">
            {t.afterNoteBefore}{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[12px] text-fg">
              BASE_URL/admin
            </code>{" "}
            {t.afterNoteAfter}
          </p>

          <figure
            aria-label={t.apiLabel}
            className="overflow-hidden rounded-xl border border-line bg-surface/80"
          >
            <TerminalChrome
              title={t.apiTitle}
              action={
                <CopyButton text={toText([apiLine])} labels={{ ...labels, aria: t.apiCopyAria }} />
              }
            />
            <pre
              tabIndex={0}
              className="overflow-x-auto p-4 font-mono text-[12px] leading-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <CodeLines lines={[apiLine]} />
            </pre>
            <figcaption className="border-t border-line px-4 py-2.5 text-xs text-subtle">
              {t.apiCaption}
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
