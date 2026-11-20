import { pick, type Locale } from "@/lib/i18n";
import { screenshot } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { copy } from "@/i18n/sections/showcase";
import { ShowcaseTabs, type ShowcaseItem } from "./showcase-tabs";

const host = "status.example.com";

export function Showcase({ lang }: { lang: Locale }) {
  const t = pick(copy, lang);

  const items: ShowcaseItem[] = t.tabs.map((tab) => ({
    ...tab,
    url: `${host}${tab.path === "/" ? "" : tab.path}`,
    images: {
      dark: screenshot(tab.id, lang, "dark"),
      light: screenshot(tab.id, lang, "light"),
    },
  }));

  return (
    <Section id="product" className="isolate overflow-hidden pt-8 sm:pt-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-grid mask-radial opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-40 -z-10 h-80 w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="mt-12 sm:mt-16">
          <ShowcaseTabs
            items={items}
            labels={{
              tabs: t.tabsLabel,
              theme: t.themeLabel,
              dark: t.themeDark,
              light: t.themeLight,
              hint: t.themeHint,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
