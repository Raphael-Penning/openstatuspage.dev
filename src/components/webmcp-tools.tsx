"use client";

import { useEffect } from "react";

type ToolText = { content: { type: "text"; text: string }[] };

type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolText> | ToolText;
};

type ModelContext = {
  registerTool?: (tool: Tool, options?: { signal?: AbortSignal }) => unknown;
  unregisterTool?: (name: string) => void;
  provideContext?: (ctx: { tools: Tool[] }) => void;
};

const text = (t: string): ToolText => ({ content: [{ type: "text", text: t }] });

/**
 * Registers read-only WebMCP tools (https://developer.chrome.com/docs/ai/webmcp)
 * so browser agents can query the page reliably. Pure progressive enhancement:
 * renders nothing and does nothing in browsers without `navigator.modelContext`.
 */
export function WebMcpTools({
  sections,
  overview,
  install,
  faq,
}: {
  sections: { id: string; label: string }[];
  overview: string;
  install: string;
  faq: { q: string; a: string }[];
}) {
  useEffect(() => {
    const mc = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!mc) return;

    const tools: Tool[] = [
      {
        name: "get_project_overview",
        description:
          "Returns a short description of OpenStatusPage (self-hosted, open-source status page) with links to docs, source code, license and live demo.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        execute: () => text(overview),
      },
      {
        name: "get_install_instructions",
        description:
          "Returns the shell commands to install OpenStatusPage with Docker Compose, plus the next steps after starting it.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        execute: () => text(install),
      },
      {
        name: "search_faq",
        description:
          "Searches the OpenStatusPage FAQ on this page and returns matching questions with answers. Without a query, returns all entries.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Words to look for in questions and answers, e.g. 'SSO' or 'database'.",
            },
          },
        },
        annotations: { readOnlyHint: true },
        execute: ({ query }) => {
          const q = typeof query === "string" ? query.toLowerCase().trim() : "";
          const hits = faq.filter(
            (f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q),
          );
          return text(
            hits.length
              ? hits.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")
              : "No matching FAQ entry.",
          );
        },
      },
      {
        name: "scroll_to_section",
        description: "Scrolls the page to one of its sections so the user can see it.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: sections.map((s) => s.id),
              description: `Section to show: ${sections.map((s) => `${s.id} (${s.label})`).join(", ")}.`,
            },
          },
          required: ["section"],
        },
        execute: ({ section }) => {
          const el = typeof section === "string" ? document.getElementById(section) : null;
          if (!el) return text(`Unknown section: ${String(section)}`);
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${el.id}`);
          return text(`Scrolled to ${el.id}.`);
        },
      },
    ];

    const controller = new AbortController();
    if (mc.registerTool) {
      for (const tool of tools) mc.registerTool(tool, { signal: controller.signal });
    } else {
      mc.provideContext?.({ tools });
    }
    return () => {
      controller.abort();
      if (mc.registerTool && mc.unregisterTool) {
        for (const tool of tools) {
          try {
            mc.unregisterTool(tool.name);
          } catch {
            /* already removed via signal */
          }
        }
      }
    };
  }, [sections, overview, install, faq]);

  return null;
}
