import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { guideAlternates, guideKeys, guidePath, type GuidePage } from "@/lib/routes";
import { guideJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { guides, guideUi, guidesUpdated } from "@/content/guides";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

const formatDate = (iso: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

const focus =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Article layout for a guide: breadcrumb, lead, body, visible FAQ, call to action, related guides. */
export function GuideView({ page, lang }: { page: GuidePage; lang: Locale }) {
  const c = guides[page][lang];
  const ui = guideUi[lang];
  const alternates = guideAlternates(page);
  const url = guidePath(page, lang);
  const { Body } = c;
  const related = guideKeys.filter((g) => g !== page);

  return (
    <>
      <JsonLd
        nodes={guideJsonLd({
              lang,
              url,
              title: c.title,
              description: c.description,
              updated: guidesUpdated,
              homeLabel: ui.breadcrumbHome,
              faq: c.faq,
            })}
      />
      <Navbar lang={lang} alternates={alternates} />
      <main id="main" className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-grid mask-fade-b opacity-60"
        />
        <Container className="max-w-3xl py-16 sm:py-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li>
                <a href={`/${lang}`} className={`${focus} transition-colors hover:text-fg`}>
                  {ui.breadcrumbHome}
                </a>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-subtle">
                {c.title}
              </li>
            </ol>
          </nav>

          <article>
            <header>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {c.eyebrow}
              </p>
              <h1 className="text-gradient mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {c.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pretty text-muted">{c.lead}</p>
              <p className="mt-4 font-mono text-xs text-subtle">
                {ui.updated}: <time dateTime={guidesUpdated}>{formatDate(guidesUpdated, lang)}</time>
              </p>
            </header>

            <div className="legal prose-guide mt-12">
              <Body />
            </div>

            <section aria-labelledby="guide-faq" className="legal prose-guide mt-16">
              <h2 id="guide-faq">{ui.faq}</h2>
              {c.faq.map((item) => (
                <div key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </section>
          </article>

          <aside className="mt-16 rounded-2xl border border-line bg-surface/80 p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-fg">{ui.ctaTitle}</h2>
            <p className="mt-2 text-sm text-pretty text-muted">{ui.ctaBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/${lang}#quickstart`} variant="primary">
                {ui.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={site.demo} variant="secondary">
                {ui.ctaDemo}
              </ButtonLink>
              <ButtonLink href={site.github} variant="secondary">
                {ui.ctaGithub}
              </ButtonLink>
            </div>
          </aside>

          <nav aria-labelledby="related-guides" className="mt-12">
            <h2 id="related-guides" className="text-sm font-medium text-fg">
              {ui.related}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((g) => (
                <li key={g}>
                  <a
                    href={guidePath(g, lang)}
                    className={`${focus} block h-full rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-line-strong hover:bg-surface`}
                  >
                    <span className="block font-medium text-fg">{guides[g][lang].title}</span>
                    <span className="mt-1 block text-sm text-pretty text-muted">
                      {guides[g][lang].description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
      <Footer lang={lang} alternates={alternates} />
    </>
  );
}
