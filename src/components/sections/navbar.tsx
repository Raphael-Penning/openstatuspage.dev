import { locales, pick, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { anchor, homeAlternates, type Alternates } from "@/lib/routes";
import { ButtonLink, Container, cx } from "@/components/ui/primitives";
import { copy } from "@/i18n/sections/navbar";
import { NavbarMobile } from "./navbar-mobile";

/** Product logo: rounded blue square with a white heartbeat line. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cx("size-7 shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" className="fill-accent-strong" />
      <path
        d="M6 17h5l2.5-6 4.5 11 2.5-5H26"
        fill="none"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cx("size-5", className)}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/** EN / DE switch as plain links. Shared by navbar and footer. */
export function LanguageSwitch({
  lang,
  label,
  names,
  hrefs = homeAlternates,
  className,
}: {
  lang: Locale;
  label: string;
  names: Record<Locale, string>;
  hrefs?: Alternates;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={cx("flex items-center gap-0.5 rounded-full border border-line p-0.5", className)}>
      {locales.map((l) => {
        const current = l === lang;
        return (
          <a
            key={l}
            href={hrefs[l]}
            hrefLang={l}
            lang={l}
            aria-current={current ? "page" : undefined}
            title={names[l]}
            className={cx(
              "rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              current ? "bg-surface-2 text-fg" : "text-subtle hover:text-fg",
            )}
          >
            <span aria-hidden>{l}</span>
            <span className="sr-only">{names[l]}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function Navbar({ lang, alternates }: { lang: Locale; alternates?: Alternates }) {
  const t = pick(copy, lang);
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/55">
      <Container className="flex h-16 items-center gap-4">
        <a
          href={`/${lang}`}
          aria-label={t.homeLabel}
          className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <LogoMark />
          <span>{site.name}</span>
        </a>

        <nav aria-label={t.mainNavLabel} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {t.links.map((link) => (
              <li key={link.href}>
                <a
                  href={anchor(link.href, lang)}
                  className="whitespace-nowrap rounded-md px-2 py-2 text-sm text-muted transition-colors hover:text-fg xl:px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:ml-2 lg:flex">
          <LanguageSwitch lang={lang} label={t.languageLabel} names={t.languages} hrefs={alternates} />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.github}
            className="rounded-md p-2 text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <GitHubIcon />
          </a>
          <ButtonLink href={site.demo} className="h-9 whitespace-nowrap px-4">
            {t.demo}
          </ButtonLink>
        </div>

        <NavbarMobile openLabel={t.openMenu} closeLabel={t.closeMenu}>
          <nav aria-label={t.mainNavLabel}>
            <ul className="flex flex-col">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={anchor(link.href, lang)}
                    className="block rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
            <LanguageSwitch lang={lang} label={t.languageLabel} names={t.languages} hrefs={alternates} />
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.github}
              className="rounded-md p-2 text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <GitHubIcon />
            </a>
          </div>
          <ButtonLink href={site.demo} className="mt-4 w-full">
            {t.demo}
          </ButtonLink>
        </NavbarMobile>
      </Container>
    </header>
  );
}
