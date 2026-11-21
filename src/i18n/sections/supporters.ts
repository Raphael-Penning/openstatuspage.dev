import type { Localized } from "@/lib/i18n";

export const copy: Localized<{
  eyebrow: string;
  title: string;
  lead: string;
  sponsorsHeading: string;
  sponsorsLead: string;
  usersHeading: string;
  usersLead: string;
  roles: { sponsor: string; user: string };
  visit: string;
  newTab: string;
  logoAlt: string;
  emptySlot: string;
  sponsorCta: {
    title: string;
    body: string;
    points: string[];
    action: string;
  };
  userCta: {
    title: string;
    body: string;
    action: string;
  };
}> = {
  en: {
    eyebrow: "Sponsors & users",
    title: "Backed by people who run it in production",
    lead: "OpenStatusPage is independent and open source. These organisations support the project or run their own status pages with it.",
    sponsorsHeading: "Sponsors",
    sponsorsLead: "Organisations that support OpenStatusPage as sponsors.",
    usersHeading: "Used by",
    usersLead: "Teams that host their own status page with OpenStatusPage.",
    roles: { sponsor: "Sponsor", user: "User" },
    visit: "Visit website",
    newTab: "(opens in a new tab)",
    logoAlt: "{name} logo",
    emptySlot: "Your logo here",
    sponsorCta: {
      title: "Become a sponsor",
      body: "Sponsoring keeps OpenStatusPage moving and free for everyone.",
      points: [
        "Funds ongoing development and maintenance",
        "Pays for hosting the public demo",
        "Keeps the project fully open under AGPL-3.0",
      ],
      action: "Get in touch",
    },
    userCta: {
      title: "Using OpenStatusPage?",
      body: "Run it for your own status page? Let us know and we'll list you here.",
      action: "Get listed",
    },
  },
  de: {
    eyebrow: "Sponsoren & Nutzer",
    title: "Getragen von Leuten, die es selbst einsetzen",
    lead: "OpenStatusPage ist unabhängig und quelloffen. Diese Organisationen unterstützen das Projekt oder betreiben damit ihre eigene Statusseite.",
    sponsorsHeading: "Sponsoren",
    sponsorsLead: "Organisationen, die OpenStatusPage als Sponsor unterstützen.",
    usersHeading: "Im Einsatz bei",
    usersLead: "Teams, die ihre eigene Statusseite mit OpenStatusPage betreiben.",
    roles: { sponsor: "Sponsor", user: "Nutzer" },
    visit: "Website besuchen",
    newTab: "(öffnet in neuem Tab)",
    logoAlt: "Logo von {name}",
    emptySlot: "Hier könnte dein Logo stehen",
    sponsorCta: {
      title: "Werde Sponsor",
      body: "Mit deiner Unterstützung bleibt OpenStatusPage in Bewegung und für alle kostenlos.",
      points: [
        "Finanziert Weiterentwicklung und Pflege",
        "Bezahlt das Hosting der öffentlichen Demo",
        "Hält das Projekt vollständig offen unter AGPL-3.0",
      ],
      action: "Schreib uns",
    },
    userCta: {
      title: "Du nutzt OpenStatusPage?",
      body: "Betreibst du deine Statusseite damit? Sag Bescheid, dann nehmen wir dich hier auf.",
      action: "Eintragen lassen",
    },
  },
};
