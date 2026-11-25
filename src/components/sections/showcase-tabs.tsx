import Image from "next/image";
import { BrowserFrame, cx } from "@/components/ui/primitives";
import type { ShowcaseTabCopy } from "@/i18n/sections/showcase";

type Shot = { src: string; width: number; height: number };
type Theme = "dark" | "light";

export type ShowcaseItem = ShowcaseTabCopy & {
  url: string;
  images: Record<Theme, Shot>;
};

export type ShowcaseLabels = {
  tabs: string;
  theme: string;
  dark: string;
  light: string;
  hint: string;
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-4 shrink-0 text-ok"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

const viewId = (id: string) => `showcase-view-${id}`;
const themeId = (t: Theme) => `showcase-theme-${t}`;

/**
 * Product tour without JavaScript: native radio groups pick the view and the
 * theme, CSS `:has()` shows the matching panel and screenshot. Arrow keys move
 * between radios natively. Browsers without `:has()` simply show every panel.
 * Images of hidden panels are lazy and only load once their panel is shown.
 */
export function ShowcaseTabs({ items, labels }: { items: ShowcaseItem[]; labels: ShowcaseLabels }) {
  const css = `@supports selector(:has(*)) {
  .showcase [data-view] { display: none; }
  ${items.map((it) => `.showcase:has(#${viewId(it.id)}:checked) [data-view="${it.id}"]`).join(",\n  ")} { display: block; }
  .showcase [data-shot="light"] { display: none; }
  .showcase:has(#${themeId("light")}:checked) [data-shot="light"] { display: block; }
  .showcase:has(#${themeId("light")}:checked) [data-shot="dark"] { display: none; }
}`;

  const pill =
    "relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-full transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";

  return (
    <div className="showcase">
      <style>{css}</style>

      {/* Views scroll inside their own container on small screens. A fieldset is never
          narrower than its content by default (min-inline-size: min-content), so min-w-0
          is what makes it scroll instead of being clipped by the section. */}
      <fieldset className="-mx-4 min-w-0 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <legend className="sr-only">{labels.tabs}</legend>
        <div className="mx-auto flex w-max gap-1 rounded-full border border-line bg-surface/80 p-1 backdrop-blur">
          {items.map((item, i) => (
            <label
              key={item.id}
              className={cx(
                pill,
                "px-4 py-2 text-sm font-medium text-muted hover:text-fg has-[:checked]:bg-surface-2 has-[:checked]:text-fg has-[:checked]:shadow-[0_0_0_1px_var(--color-line-strong)_inset]",
              )}
            >
              <input
                type="radio"
                name="showcase-view"
                id={viewId(item.id)}
                value={item.id}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
        <fieldset className="inline-flex gap-0.5 rounded-full border border-line bg-surface/60 p-0.5">
          <legend className="sr-only">{labels.theme}</legend>
          {(["dark", "light"] as const).map((value) => (
            <label
              key={value}
              className={cx(
                pill,
                "gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-fg has-[:checked]:bg-surface-2 has-[:checked]:text-fg",
              )}
            >
              <input
                type="radio"
                name="showcase-theme"
                id={themeId(value)}
                value={value}
                defaultChecked={value === "dark"}
                className="sr-only"
              />
              {value === "dark" ? <MoonIcon /> : <SunIcon />}
              {value === "dark" ? labels.dark : labels.light}
            </label>
          ))}
        </fieldset>
        <p className="text-xs text-muted">{labels.hint}</p>
      </div>

      {items.map((item) => (
        <section key={item.id} data-view={item.id} aria-label={item.label} className="mt-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-pretty text-muted">{item.description}</p>
            </div>
            <ul className="grid gap-2.5 text-sm text-muted sm:grid-cols-3 sm:gap-4 lg:grid-cols-1 lg:gap-2.5">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <CheckIcon />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative isolate mt-8">
            <div
              className="pointer-events-none absolute -inset-x-8 -top-8 bottom-1/3 -z-10 rounded-[3rem] bg-accent/15 blur-3xl"
              aria-hidden
            />
            <BrowserFrame url={item.url}>
              {(["dark", "light"] as const).map((theme) => {
                const shot = item.images[theme];
                return (
                  <Image
                    key={theme}
                    data-shot={theme}
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt={item.alt}
                    loading="lazy"
                    sizes="(min-width: 1152px) 1088px, calc(100vw - 2rem)"
                    className="h-auto w-full"
                  />
                );
              })}
            </BrowserFrame>
          </div>
        </section>
      ))}
    </div>
  );
}
