# openstatuspage.dev

Landing page for [OpenStatusPage](https://github.com/Raphael-Penning/openstatuspage), the self-hosted, open-source status page. Built with Next.js (App Router, static prerendering), works without JavaScript, in English and German.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

## Configuration

All settings are optional environment variables, read at build time. Copy [`.env.example`](.env.example) to `.env.local` and fill in what you need.

| Variable | Purpose |
| --- | --- |
| `UMAMI_URL` | Base URL of the [Umami](https://umami.is) instance (default: `https://analytics.partlabs.de`) |
| `UMAMI_WEBSITE_ID` | Website ID from the Umami dashboard (default: the openstatuspage.dev website) |
| `UMAMI_DOMAINS` | Hostnames to count, comma-separated (default: `openstatuspage.dev`) |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools token (`msvalidate.01`); ChatGPT search and Copilot use the Bing index |

### Analytics

Umami tracking is always on, with the openstatuspage.dev instance as default (`src/lib/analytics.ts`). The tracker only counts the hostnames in `UMAMI_DOMAINS`, so local builds, previews and forks on other domains send nothing. Running your own copy? Set the three `UMAMI_*` variables to your instance. The tracker:

- loads from your Umami instance during browser idle time (`next/script`, `lazyOnload`),
- respects Do Not Track and only counts the hostnames in `UMAMI_DOMAINS`,
- sets no cookies; visitors can opt out on the privacy page, which stores `umami.disabled` in local storage.

If you run your own copy of this site, adapt the legal pages (`src/content/legal.tsx`, `src/data/legal.ts`) to your own setup.

## Search engines and AI assistants

- `robots.txt`, a sitemap index (`/sitemap.xml`) with hreflang alternates, `llms.txt` and `llms-full.txt`, and an ARD manifest at `/.well-known/ard.json`.
- JSON-LD on every content page: `SoftwareApplication` and `FAQPage` on the home page; `TechArticle`, `BreadcrumbList` and `FAQPage` on the guides (`src/content/guides/`).
- **IndexNow:** after a deploy that adds or changes pages, run `npm run indexnow`. It reads the live sitemap and submits every URL to Bing and the other IndexNow engines. The key file lives in `public/` (IndexNow keys are public by design).

## License

The OpenStatusPage software is licensed under AGPL-3.0.
