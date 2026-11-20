import type { Localized } from "@/lib/i18n";

type NavCopy = {
  homeLabel: string;
  mainNavLabel: string;
  links: { href: string; label: string }[];
  languageLabel: string;
  languages: { en: string; de: string };
  github: string;
  demo: string;
  openMenu: string;
  closeMenu: string;
};

export const copy: Localized<NavCopy> = {
  en: {
    homeLabel: "OpenStatusPage home",
    mainNavLabel: "Main",
    links: [
      { href: "#product", label: "Product" },
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#quickstart", label: "Quickstart" },
      { href: "#supporters", label: "Supporters" },
      { href: "#faq", label: "FAQ" },
    ],
    languageLabel: "Language",
    languages: { en: "English", de: "Deutsch" },
    github: "OpenStatusPage on GitHub",
    demo: "Live demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  de: {
    homeLabel: "OpenStatusPage Startseite",
    mainNavLabel: "Hauptnavigation",
    links: [
      { href: "#product", label: "Produkt" },
      { href: "#features", label: "Funktionen" },
      { href: "#how-it-works", label: "So funktioniert’s" },
      { href: "#quickstart", label: "Schnellstart" },
      { href: "#supporters", label: "Unterstützer" },
      { href: "#faq", label: "FAQ" },
    ],
    languageLabel: "Sprache",
    languages: { en: "English", de: "Deutsch" },
    github: "OpenStatusPage auf GitHub",
    demo: "Live-Demo",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
  },
};
