import type { ComponentProps, ReactNode } from "react";

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
export { cx };

/** Max-width page container with a 16px gutter on phones. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

/** Vertical rhythm for every top-level section. Pass an `id` for in-page anchors. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cx("relative py-20 sm:py-28", className)} {...props} />;
}

/** Small mono label above section titles. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-gradient text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-base text-pretty text-muted sm:text-lg">{lead}</p>}
    </div>
  );
}

type ButtonProps = ComponentProps<"a"> & { variant?: "primary" | "secondary" | "ghost" };

/** Anchor styled as a button. External links get rel/target automatically. */
export function ButtonLink({ variant = "primary", className, href = "#", ...props }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variant === "primary" &&
          "bg-accent text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset,0_8px_24px_-8px_rgb(59_130_246/0.6)] hover:bg-accent-strong",
        variant === "secondary" && "border border-line-strong bg-surface-2/60 text-fg hover:bg-surface-2",
        variant === "ghost" && "text-muted hover:text-fg",
        className,
      )}
      {...props}
    />
  );
}

/** Rounded card surface. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cx("rounded-2xl border border-line bg-surface/80 p-6", className)}
      {...props}
    />
  );
}

/** Browser chrome around product screenshots. `url` is shown in the address bar. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.03)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="mx-auto max-w-[60%] truncate rounded-md bg-bg/70 px-3 py-1 font-mono text-[11px] text-subtle">
          {url}
        </div>
        <div className="w-10" aria-hidden />
      </div>
      {children}
    </div>
  );
}

/** Status dot with optional pulse. */
export function StatusDot({
  tone = "ok",
  pulse,
}: {
  tone?: "ok" | "warn" | "partial" | "down" | "maint";
  pulse?: boolean;
}) {
  const color = {
    ok: "bg-ok",
    warn: "bg-warn",
    partial: "bg-partial",
    down: "bg-down",
    maint: "bg-maint",
  }[tone];
  return (
    <span
      className={cx("inline-block size-2 rounded-full", color, pulse && "animate-pulse-dot")}
      aria-hidden
    />
  );
}
