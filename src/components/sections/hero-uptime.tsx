import { cx } from "@/components/ui/primitives";

/** Static mini uptime row echoing the product's 90-day bars. Decorative. */
const BARS = 30;
const WARN_AT = 21;

export function HeroUptime({ className }: { className?: string }) {
  return (
    <div className={cx("flex h-6 items-end gap-[3px]", className)} aria-hidden>
      {Array.from({ length: BARS }, (_, i) => (
        <span
          key={i}
          className={cx(
            "h-full w-1 flex-1 rounded-[2px]",
            i === WARN_AT ? "bg-warn" : "bg-ok/80",
          )}
        />
      ))}
    </div>
  );
}
