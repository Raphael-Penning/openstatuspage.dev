import { pick, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { anchor, guidePath, legalPath, type Alternates } from "@/lib/routes";
import { Container } from "@/components/ui/primitives";
import { copy } from "@/i18n/sections/footer";
import { copy as navCopy } from "@/i18n/sections/navbar";
import { GitHubIcon, LanguageSwitch, LogoMark } from "./navbar";

type FooterLink = { href: string; label: string };

const linkClass =
  "rounded-sm text-sm text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function FooterLinkItem({ href, label }: FooterLink) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        className={linkClass}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    </li>
  );
}

function Column({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <FooterLinkItem key={l.href + l.label} {...l} />
        ))}
      </ul>
    </div>
  );
}

export function Footer({ lang, alternates }: { lang: Locale; alternates?: Alternates }) {
  const t = pick(copy, lang);
  const nav = pick(navCopy, lang);
  const { product, resources, project, guides } = t.columns;

  return (
    <footer className="relative border-t border-line bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          <div className="max-w-sm">
            <a
              href={`/${lang}`}
              aria-label={nav.homeLabel}
              className="inline-flex items-center gap-2.5 rounded-md font-semibold tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <LogoMark />
              <span>{site.name}</span>
            </a>
            <p className="mt-4 text-sm text-pretty text-muted">{t.tagline}</p>
            <p className="mt-6 text-sm text-muted">
              {t.builtWith}{" "}
              <a
                href={site.sponsorMail}
                className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t.builtWithCta}
                <span aria-hidden> →</span>
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Column
              title={product.title}
              links={[
                ...product.links.map((l) => ({ ...l, href: anchor(l.href, lang) })),
                { href: site.demo, label: product.demo },
              ]}
            />
            <Column
              title={guides.title}
              links={[
                { href: guidePath("alternatives", lang), label: guides.alternatives },
                { href: guidePath("icinga", lang), label: guides.icinga },
                { href: guidePath("uptimeKuma", lang), label: guides.uptimeKuma },
              ]}
            />
            <Column
              title={resources.title}
              links={[
                { href: site.docs(lang), label: resources.docs },
                { href: site.apiDocs, label: resources.api },
                { href: site.changelog, label: resources.changelog },
                { href: site.releases, label: resources.releases },
                { href: site.contributing, label: resources.contributing },
              ]}
            />
            <Column
              title={project.title}
              links={[
                { href: site.github, label: project.github },
                { href: `${site.github}/blob/main/LICENSE`, label: project.license },
                { href: site.sponsorMail, label: project.sponsor },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <p>{t.copyright}</p>
            <p>{t.openSource}</p>
            <a href={legalPath("imprint", lang)} className={linkClass + " inline-flex min-h-6 items-center text-xs"}>
              {t.imprint}
            </a>
            <a href={legalPath("privacy", lang)} className={linkClass + " inline-flex min-h-6 items-center text-xs"}>
              {t.privacy}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nav.github}
              className="rounded-md p-1.5 text-subtle transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <GitHubIcon className="size-4" />
            </a>
            <LanguageSwitch lang={lang} label={t.languageLabel} names={nav.languages} hrefs={alternates} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
