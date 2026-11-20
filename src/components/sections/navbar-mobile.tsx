"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Mobile disclosure for the navbar. Server-rendered links come in as children.
 * Closes on link click, Escape and when the viewport grows past `lg`.
 */
export function NavbarMobile({
  openLabel,
  closeLabel,
  children,
}: {
  openLabel: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden
          className="size-6"
        >
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full border-b border-line bg-bg/95 px-4 pt-2 pb-6 shadow-[0_24px_48px_-16px_rgb(0_0_0/0.8)] backdrop-blur-xl sm:px-6"
      >
        {children}
      </div>
    </div>
  );
}
