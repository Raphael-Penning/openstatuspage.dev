import Link from "next/link";
import { site } from "@/lib/site";
import { Code, H2, Table, type Guide } from "./shared";

const themesDoc = `${site.github}/blob/main/docs/themes.md`;
const creatingDoc = (lang: "en" | "de") =>
  `${site.github}/blob/main/docs/guide/${lang}/15-creating-a-theme.md`;
const starter = `${site.github}/tree/main/contrib/themes`;

const theme = `{
  "id": "my-brand",
  "name": "My brand",
  "version": 1,
  "light": {
    "background": "#f5f8fa", "surface": "#ffffff", "surfaceAlt": "#eaf0f4",
    "border": "#d9e2e8", "borderStrong": "#6b7c88",
    "text": "#102a37", "muted": "#4a5d69", "accent": "#0e7490",
    "status": {
      "operational": "#15803d", "maintenance": "#2563eb", "degraded": "#a16207",
      "partialOutage": "#c2410c", "majorOutage": "#dc2626", "noData": "#6b7c88"
    }
  },
  "dark": { "...": "the same tokens" },
  "radius": "0.625rem",
  "density": "comfortable"
}`;

export const themesGuide: Guide = {
  en: {
    title: "Customize your status page: themes and branding",
    metaTitle: "Custom status page design: themes, branding and WCAG contrast check",
    description:
      "Match your self-hosted status page to your brand: built-in themes, your own theme as JSON with optional CSS, a live WCAG 2.2 AA contrast check, logo and image uploads and Markdown content pages.",
    eyebrow: "Guide · Design",
    lead: "Your status page should look like part of your product, not like a generic tool, and it must stay readable for everyone when things go wrong. OpenStatusPage themes change colors, corners, fonts and spacing of the public page, and every color pair is checked against WCAG 2.2 AA before a theme goes live.",
    Body: () => (
      <>
        <H2>Four built-in themes</H2>
        <p>
          <strong>default</strong>, <strong>slate</strong>, <strong>forest</strong> and{" "}
          <strong>high-contrast</strong> ship with every release. Each passes WCAG 2.2 AA in light
          and dark mode, and visitors can switch between light, dark and the system setting. Pick one
          under <strong>Administration → Appearance</strong>, or copy it as the start of your own.
        </p>

        <H2>Your own theme</H2>
        <p>
          A theme is a small JSON file: colors for light and dark mode, status colors, a corner
          radius, system font stacks and a density. You do not need to know CSS. Start from the{" "}
          <a href={starter}>starter template</a>, where every token is set, or use{" "}
          <em>Customize a copy</em> in the admin.
        </p>
        <Code label="Shortened example of a theme file">{theme}</Code>
        <Table
          caption="Where themes come from"
          head={["Source", "How", "Editable in the admin"]}
          rows={[
            ["Built-in", "Shipped with the release", "No, copy it"],
            ["Themes folder", "<id>.json and optional <id>.css, read on start (Compose mount, Helm values, /etc/openstatuspage/themes)", "No, copy it"],
            ["Upload", "Import theme in the admin, stored in the database", "Yes, with a live editor"],
          ]}
        />
        <p>
          Fonts are installed system fonts only: nothing is downloaded from a font CDN, which keeps
          the page fast and free of third-party requests. Optional extra CSS is filtered (no{" "}
          <code>@import</code>, no external URLs) and served as its own same-origin stylesheet.
        </p>

        <H2>Contrast checked before it goes live</H2>
        <p>
          The editor checks every text, control and status color on every background in both modes:
          4.5:1 for text and status text, 3:1 for controls and status fills. Failing pairs are shown
          live, for example <code>Light: muted on surface 2.40:1 (needs 4.5:1)</code>. A theme that
          fails is only activated after an explicit confirmation, which is written to the audit log.
          Links and buttons derived from your accent color are adjusted automatically to stay
          readable.
        </p>
        <p>
          Before switching, <strong>Preview the public page</strong> shows your status page with the
          new theme to signed-in admins only.
        </p>

        <H2>Logo, images and content pages</H2>
        <ul>
          <li>
            <strong>Uploads:</strong> logo, favicon and images for pages as PNG, JPEG, WebP or ICO
            (up to 1 MiB, SVG is refused), served from your own domain with long-term caching.
          </li>
          <li>
            <strong>Content pages:</strong> the about page, legal notice, privacy policy,
            accessibility statement and any number of your own pages, written in Markdown per
            language with a preview. They appear in navigation, footer, sitemap and{" "}
            <code>llms.txt</code>.
          </li>
          <li>
            <strong>Footer and links:</strong> support URL, up to 10 footer links, legal links and an
            optional &quot;Powered by&quot; note.
          </li>
        </ul>

        <H2>Get started</H2>
        <ol>
          <li>
            Install OpenStatusPage (see the <Link href="/en#quickstart">quick start</Link>).
          </li>
          <li>
            Open <strong>Administration → Appearance</strong>, copy a built-in theme or import the
            starter template.
          </li>
          <li>Change the colors until the contrast check passes, preview, activate.</li>
          <li>Export the theme as JSON to reuse it on other installations.</li>
        </ol>
        <p>
          Step by step: <a href={creatingDoc("en")}>Creating a theme</a>. All tokens and limits:{" "}
          <a href={themesDoc}>theme reference</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Do I need to write CSS for a custom status page design?",
        a: "No. A theme is a JSON file with colors, radius, fonts and density. Extra CSS is optional and filtered for safety.",
      },
      {
        q: "Can I use my own web font?",
        a: "Themes use installed system font stacks only, so no font is downloaded from a CDN. This keeps the page fast and free of third-party requests.",
      },
      {
        q: "What happens if my brand colors fail the contrast check?",
        a: "The editor shows each failing pair. You can adjust the colors, or activate the theme anyway with an explicit confirmation that is recorded in the audit log.",
      },
      {
        q: "Can I reuse a theme on several installations?",
        a: "Yes. Every theme can be exported as JSON and imported elsewhere, or dropped into the themes folder that Docker Compose, the Helm chart and the packages can mount.",
      },
    ],
  },
  de: {
    title: "Statusseite anpassen: Themes und Branding",
    metaTitle: "Eigenes Statusseiten-Design: Themes, Branding und WCAG-Kontrastprüfung",
    description:
      "Pass deine selbst gehostete Statusseite an deine Marke an: eingebaute Themes, eigenes Theme als JSON mit optionalem CSS, Live-Kontrastprüfung nach WCAG 2.2 AA, Logo- und Bild-Uploads und Inhaltsseiten in Markdown.",
    eyebrow: "Guide · Design",
    lead: "Deine Statusseite soll wie ein Teil deines Produkts aussehen, nicht wie ein beliebiges Werkzeug, und sie muss für alle lesbar bleiben, wenn etwas schiefgeht. Themes von OpenStatusPage ändern Farben, Ecken, Schriften und Abstände der öffentlichen Seite, und jedes Farbpaar wird gegen WCAG 2.2 AA geprüft, bevor ein Theme live geht.",
    Body: () => (
      <>
        <H2>Vier eingebaute Themes</H2>
        <p>
          <strong>default</strong>, <strong>slate</strong>, <strong>forest</strong> und{" "}
          <strong>high-contrast</strong> sind in jedem Release enthalten. Jedes erfüllt WCAG 2.2 AA in
          Hell und Dunkel, und Besucher wechseln zwischen hell, dunkel und Systemeinstellung. Wähl
          eins unter <strong>Administration → Darstellung</strong> oder kopier es als Grundlage für
          dein eigenes.
        </p>

        <H2>Dein eigenes Theme</H2>
        <p>
          Ein Theme ist eine kleine JSON-Datei: Farben für Hell und Dunkel, Statusfarben, ein
          Eckenradius, System-Schriftarten und eine Dichte. CSS-Kenntnisse brauchst du nicht. Starte
          mit der <a href={starter}>Startvorlage</a>, in der jedes Token gesetzt ist, oder nutz{" "}
          <em>Kopie anpassen</em> in der Verwaltung.
        </p>
        <Code label="Gekürztes Beispiel einer Theme-Datei">{theme}</Code>
        <Table
          caption="Woher Themes kommen"
          head={["Quelle", "Wie", "In der Verwaltung bearbeitbar"]}
          rows={[
            ["Eingebaut", "Im Release enthalten", "Nein, kopieren"],
            ["Themes-Ordner", "<id>.json und optional <id>.css, beim Start gelesen (Compose-Mount, Helm-Values, /etc/openstatuspage/themes)", "Nein, kopieren"],
            ["Upload", "Theme importieren in der Verwaltung, in der Datenbank gespeichert", "Ja, mit Live-Editor"],
          ]}
        />
        <p>
          Schriften sind nur installierte Systemschriften: Nichts wird von einem Font-CDN geladen,
          die Seite bleibt also schnell und ohne Anfragen an Dritte. Optionales Zusatz-CSS wird
          gefiltert (kein <code>@import</code>, keine externen URLs) und als eigenes Stylesheet von
          derselben Domain ausgeliefert.
        </p>

        <H2>Kontrast geprüft, bevor es live geht</H2>
        <p>
          Der Editor prüft jede Text-, Bedienelement- und Statusfarbe auf jedem Hintergrund in beiden
          Modi: 4,5:1 für Text und Statustext, 3:1 für Bedienelemente und Statusflächen.
          Fehlschlagende Paare erscheinen live, etwa{" "}
          <code>Light: muted on surface 2.40:1 (needs 4.5:1)</code>. Ein Theme, das durchfällt, wird
          nur nach ausdrücklicher Bestätigung aktiviert, die im Audit-Log landet. Links und Buttons
          aus deiner Akzentfarbe werden automatisch angepasst, damit sie lesbar bleiben.
        </p>
        <p>
          Vor dem Umschalten zeigt <strong>Öffentliche Seite mit „…“ ansehen</strong> deine
          Statusseite mit dem neuen Theme, nur für angemeldete Admins.
        </p>

        <H2>Logo, Bilder und Inhaltsseiten</H2>
        <ul>
          <li>
            <strong>Uploads:</strong> Logo, Favicon und Bilder für Seiten als PNG, JPEG, WebP oder
            ICO (bis 1 MiB, SVG wird abgelehnt), ausgeliefert von deiner eigenen Domain mit langem
            Caching.
          </li>
          <li>
            <strong>Inhaltsseiten:</strong> Über-uns-Seite, Impressum, Datenschutzerklärung, Erklärung
            zur Barrierefreiheit und beliebig viele eigene Seiten, in Markdown pro Sprache mit
            Vorschau. Sie erscheinen in Navigation, Footer, Sitemap und <code>llms.txt</code>.
          </li>
          <li>
            <strong>Footer und Links:</strong> Support-URL, bis zu 10 Footer-Links, Rechtslinks und
            ein optionaler Hinweis „Powered by“.
          </li>
        </ul>

        <H2>Loslegen</H2>
        <ol>
          <li>
            Installiere OpenStatusPage (siehe <Link href="/de#quickstart">Schnellstart</Link>).
          </li>
          <li>
            Öffne <strong>Administration → Darstellung</strong>, kopier ein eingebautes Theme oder
            importier die Startvorlage.
          </li>
          <li>Pass die Farben an, bis die Kontrastprüfung besteht, sieh dir die Vorschau an, aktiviere.</li>
          <li>Exportier das Theme als JSON, um es in anderen Installationen zu nutzen.</li>
        </ol>
        <p>
          Schritt für Schritt: <a href={creatingDoc("de")}>Ein Theme erstellen</a>. Alle Tokens und
          Limits: <a href={themesDoc}>Theme-Referenz</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Muss ich für ein eigenes Statusseiten-Design CSS schreiben?",
        a: "Nein. Ein Theme ist eine JSON-Datei mit Farben, Radius, Schriften und Dichte. Zusatz-CSS ist optional und wird aus Sicherheitsgründen gefiltert.",
      },
      {
        q: "Kann ich meine eigene Webfont nutzen?",
        a: "Themes nutzen nur installierte Systemschriften, es wird also keine Schrift von einem CDN geladen. So bleibt die Seite schnell und ohne Anfragen an Dritte.",
      },
      {
        q: "Was passiert, wenn meine Markenfarben die Kontrastprüfung nicht bestehen?",
        a: "Der Editor zeigt jedes fehlschlagende Paar. Du kannst die Farben anpassen oder das Theme trotzdem aktivieren, mit einer ausdrücklichen Bestätigung, die im Audit-Log festgehalten wird.",
      },
      {
        q: "Kann ich ein Theme in mehreren Installationen nutzen?",
        a: "Ja. Jedes Theme lässt sich als JSON exportieren und anderswo importieren oder in den Themes-Ordner legen, den Docker Compose, das Helm-Chart und die Pakete einbinden können.",
      },
    ],
  },
};
