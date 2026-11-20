import type { Locale } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { copy } from "@/i18n/sections/faq";

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-200 group-open:rotate-45"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Faq({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);

  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div id="faq-title">
            <SectionHeading align="left" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          </div>
          <p className="mt-6 text-sm text-muted">
            {t.more}{" "}
            <a
              href={`${site.github}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.moreLink}
              <ArrowIcon />
            </a>
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {t.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-md py-5 text-left text-base font-medium text-fg transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span className="text-pretty">{item.q}</span>
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors group-open:border-accent/50 group-open:bg-accent-soft group-open:text-accent">
                  <PlusIcon />
                </span>
              </summary>
              <div className="pr-10 pb-6 text-sm leading-relaxed text-pretty text-muted sm:text-[15px]">
                <p>{item.a}</p>
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 rounded-sm font-medium text-accent transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.link.label}
                    <ArrowIcon />
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
