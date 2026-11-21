import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { homeAlternates } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { homeJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Quickstart } from "@/components/sections/quickstart";
import { Supporters } from "@/components/sections/supporters";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { WebMcpTools } from "@/components/webmcp-tools";
import { installText, llmsTxt } from "@/lib/llms";
import { copy as navCopy } from "@/i18n/sections/navbar";
import { copy as faqCopy } from "@/i18n/sections/faq";

const meta = {
  en: {
    title: "OpenStatusPage — the self-hosted, open-source status page",
    description:
      "Keep your customers informed without exposing your infrastructure. Compose public services from Icinga 2, Uptime Kuma, openITCockpit or webhooks. Self-hosted, AGPL-3.0.",
  },
  de: {
    title: "OpenStatusPage — die selbst gehostete Open-Source-Statusseite",
    description:
      "Informiere deine Kunden, ohne deine Infrastruktur offenzulegen. Öffentliche Dienste aus Icinga 2, Uptime Kuma, openITCockpit oder Webhooks. Selbst gehostet, AGPL-3.0.",
  },
} as const;

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return pageMetadata({
    lang,
    ...meta[lang],
    alternates: homeAlternates,
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <JsonLd nodes={homeJsonLd(lang)} />
      <Navbar lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Showcase lang={lang} />
        <Features lang={lang} />
        <HowItWorks lang={lang} />
        <Quickstart lang={lang} />
        <Supporters lang={lang} />
        <Faq lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Footer lang={lang} />
      <WebMcpTools
        sections={navCopy[lang].links.map((l) => ({ id: l.href.slice(1), label: l.label }))}
        overview={llmsTxt()}
        install={installText()}
        faq={faqCopy[lang].items.map(({ q, a }) => ({ q, a }))}
      />
    </>
  );
}
