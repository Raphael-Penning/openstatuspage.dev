export type SupporterRole = "sponsor" | "user";

export type Supporter = {
  name: string;
  url: string;
  roles: SupporterRole[];
  /**
   * Path to a logo in /public/sponsors. `null` renders a text wordmark placeholder
   * until the official brand assets are available.
   */
  logo: string | null;
  /** Optional accent colour for the placeholder wordmark. */
  accent?: string;
};

// TODO: replace placeholder with official assets from https://id.pein.group/branding
export const supporters: Supporter[] = [
  {
    name: "Pein GbR",
    url: "https://pein.group",
    roles: ["sponsor", "user"],
    logo: null,
  },
];
