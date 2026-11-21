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
| `UMAMI_URL` | Base URL of your [Umami](https://umami.is) instance, e.g. `https://analytics.example.com` |
| `UMAMI_WEBSITE_ID` | Website ID from the Umami dashboard |
| `UMAMI_DOMAINS` | Hostnames to count, comma-separated (default: `openstatuspage.dev`) |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |

### Analytics

Umami is loaded only when both `UMAMI_URL` and `UMAMI_WEBSITE_ID` are set. Forks, local builds and previews therefore send nothing anywhere. When enabled, the tracker:

- loads from your Umami instance during browser idle time (`next/script`, `lazyOnload`),
- respects Do Not Track and only counts the hostnames in `UMAMI_DOMAINS`,
- sets no cookies; visitors can opt out on the privacy page, which stores `umami.disabled` in local storage.

The privacy policy (`src/content/legal.tsx`) adds its Umami section only when analytics are configured. If you run your own copy of this site, adapt the legal pages to your own setup.

## License

The OpenStatusPage software is licensed under AGPL-3.0.
