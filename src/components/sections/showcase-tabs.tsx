"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
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

export function ShowcaseTabs({ items, labels }: { items: ShowcaseItem[]; labels: ShowcaseLabels }) {
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState<Theme>("dark");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  const select = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    const el = tabRefs.current[next];
    el?.focus();
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(items.length - 1),
    };
    const handler = keys[e.key];
    if (handler) {
      e.preventDefault();
      handler();
    }
  };

  return (
    <div>
      {/* Tabs scroll inside their own container on small screens. */}
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label={labels.tabs}
          className="mx-auto flex w-max gap-1 rounded-full border border-line bg-surface/80 p-1 backdrop-blur"
        >
          {items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId(i)}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={cx(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  selected
                    ? "bg-surface-2 text-fg shadow-[0_0_0_1px_var(--color-line-strong)_inset]"
                    : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
        <div
          role="group"
          aria-label={labels.theme}
          className="inline-flex gap-0.5 rounded-full border border-line bg-surface/60 p-0.5"
        >
          {(["dark", "light"] as const).map((value) => {
            const pressed = theme === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={pressed}
                onClick={() => setTheme(value)}
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  pressed ? "bg-surface-2 text-fg" : "text-subtle hover:text-fg",
                )}
              >
                {value === "dark" ? <MoonIcon /> : <SunIcon />}
                {value === "dark" ? labels.dark : labels.light}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-subtle">{labels.hint}</p>
      </div>

      {items.map((item, i) => {
        const shot = item.images[theme];
        return (
          <div
            key={item.id}
            id={panelId(i)}
            role="tabpanel"
            aria-labelledby={tabId(i)}
            tabIndex={0}
            hidden={i !== active}
            className="mt-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
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
                <Image
                  key={shot.src}
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={item.alt}
                  sizes="(min-width:1024px) 1000px, 100vw"
                  className="block h-auto w-full animate-fade-up"
                />
              </BrowserFrame>
            </div>
          </div>
        );
      })}
    </div>
  );
}
