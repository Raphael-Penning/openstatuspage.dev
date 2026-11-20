import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "@/lib/i18n";
import {
  legalAlternates,
  legalPageFromSlug,
  legalPages,
  legalPath,
  type LegalPage,
} from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { legalContent, legalUi } from "@/content/legal";
import { legalUpdated } from "@/data/legal";
import { Container } from "@/components/ui/primitives";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    (Object.keys(legalPages) as LegalPage[]).map((page) => ({
      lang,
      slug: legalPages[page][lang],
    })),
  );
}

async function resolve(params: PageProps<"/[lang]/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const page = legalPageFromSlug(slug, lang);
  if (!page) notFound();
  return { lang, page };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, page } = await resolve(params);
  const c = legalContent[page][lang];
  return pageMetadata({
    lang,
    title: c.title,
    description: c.description,
    alternates: legalAlternates(page),
  });
}

const formatDate = (iso: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

export default async function LegalPageRoute({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, page } = await resolve(params);
  const c = legalContent[page][lang];
  const ui = legalUi[lang];
  const alternates = legalAlternates(page);
  const { Body } = c;

  return (
    <>
      <Navbar lang={lang} alternates={alternates} />
      <main id="main" className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-grid mask-fade-b opacity-60"
        />
        <Container className="max-w-3xl py-16 sm:py-24">
          <a
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span aria-hidden>←</span> {ui.back}
          </a>
          <h1 className="text-gradient mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-4 font-mono text-xs text-subtle">
            {ui.updated}: <time dateTime={legalUpdated}>{formatDate(legalUpdated, lang)}</time>
          </p>
          {ui.translationNote && (
            <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
              {ui.translationNote}{" "}
              <a
                href={legalPath(page, "de")}
                hrefLang="de"
                lang="de"
                className="text-accent underline underline-offset-4"
              >
                {legalContent[page].de.title}
              </a>
            </p>
          )}
          <div className="legal mt-12">
            <Body />
          </div>
        </Container>
      </main>
      <Footer lang={lang} alternates={alternates} />
    </>
  );
}
