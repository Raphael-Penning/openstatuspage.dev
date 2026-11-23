import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

export type GuideFaq = { q: string; a: string };

export type GuideCopy = {
  /** H1 and base of the page title. */
  title: string;
  /** Optional longer <title>; falls back to `title`. */
  metaTitle?: string;
  description: string;
  eyebrow: string;
  lead: string;
  Body: () => ReactNode;
  faq: GuideFaq[];
};

export type Guide = Record<Locale, GuideCopy>;

/** Date shown as "last updated" on the guides and used in their structured data. */
export const guidesUpdated = "2026-11-24";

export const H2 = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2 id={id}>{children}</h2>
);

export const H3 = ({ children }: { children: ReactNode }) => <h3>{children}</h3>;

/** Preformatted code block with a language label for screen readers and copy-paste. */
export const Code = ({ children, label }: { children: string; label?: string }) => (
  <pre aria-label={label} tabIndex={0}>
    <code>{children}</code>
  </pre>
);

/** Small table helper: first row is the header. */
export function Table({ head, rows, caption }: { head: string[]; rows: ReactNode[][]; caption?: string }) {
  return (
    <div className="table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
