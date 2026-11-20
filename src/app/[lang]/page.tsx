import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
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

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <Navbar lang={lang} />
      <main>
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
    </>
  );
}
