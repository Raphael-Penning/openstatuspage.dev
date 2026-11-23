import Link from "next/link";
import { site } from "@/lib/site";
import { Code, H2, Table, type Guide } from "./shared";

const guideDoc = (lang: "en" | "de") =>
  `${site.github}/blob/main/docs/guide/${lang}/14-webhooks-and-sms.md`;
const referenceDoc = `${site.github}/blob/main/docs/webhooks-and-sms.md`;

const payload = `{
  "version": 1,
  "event": "incident.created",
  "occurredAt": "2026-11-20T10:00:00.000Z",
  "site": { "name": "Example Status", "url": "https://status.example.com" },
  "headline": "Incident: API errors",
  "incident": { "title": "API errors", "status": "investigating", "impact": "major" }
}`;

const verify = `X-OSP-Timestamp: 1763632800
X-OSP-Signature: v1=<hex HMAC-SHA256 of "<timestamp>.<raw body>">`;

export const notificationsGuide: Guide = {
  en: {
    title: "Status page notifications in Slack, Teams, Discord and by SMS",
    metaTitle: "Status page with Slack, Microsoft Teams, Discord and SMS notifications",
    description:
      "Send incidents and maintenance from a self-hosted status page to Slack, Microsoft Teams, Discord, signed JSON webhooks and SMS (Twilio, Vonage, seven.io, MessageBird), for your team and for subscribers.",
    eyebrow: "Guide · Notifications",
    lead: "A status page only helps if people notice it. OpenStatusPage posts every public incident and maintenance to the channels your team and your customers already read: Slack, Microsoft Teams, Discord, your own endpoints and text messages, in addition to email.",
    Body: () => (
      <>
        <H2>What gets sent</H2>
        <p>
          Webhooks and SMS get exactly the events of the email subscribers: a new or updated public
          incident or maintenance (when the editor leaves <em>Notify subscribers</em> on), the
          automatic start and end of a maintenance window and the reminder before it. Private
          incidents and hidden services are never sent, so the same privacy rules apply as on the
          public page.
        </p>

        <H2>Team webhooks</H2>
        <p>
          Under <strong>Administration → Webhooks &amp; SMS</strong> an admin adds a webhook, picks
          all services or a selection and sends a test message. No environment variable is needed;
          URLs and secrets are stored encrypted.
        </p>
        <Table
          caption="Supported webhook types"
          head={["Type", "Format", "Where the URL comes from"]}
          rows={[
            ["Slack", "Block Kit with a button to the event", "An app with Incoming Webhooks"],
            ["Microsoft Teams", "Adaptive Card", "Channel → Workflows → post when a webhook request is received"],
            ["Discord", "Embed, colored by impact", "Server settings → Integrations → Webhooks"],
            ["Generic JSON", "Versioned payload, HMAC-SHA256 signature", "Any https endpoint of your own"],
          ]}
        />
        <p>
          Failed deliveries are retried after 1, 5, 15 and 60 minutes. Each webhook has a delivery
          log, and after 10 failures in a row it is disabled and the admins get an email.
        </p>

        <h3>Generic JSON webhooks</h3>
        <p>
          Generic webhooks send a stable, versioned payload. Fields are only ever added, never
          renamed, so integrations with ticket systems or chat bots keep working:
        </p>
        <Code label="Example payload of a generic webhook">{payload}</Code>
        <p>Every request is signed; verify it over the raw body and reject old timestamps:</p>
        <Code label="Signature headers of a generic webhook">{verify}</Code>

        <H2>SMS</H2>
        <p>
          SMS go out with one HTTP request built from a template. Presets fill it for{" "}
          <strong>Twilio, Vonage, seven.io and MessageBird</strong>; with <em>Custom</em> you
          describe any other provider&apos;s API. Credentials are stored encrypted. Texts are kept to
          one segment (160 GSM-7 characters), so costs stay predictable.
        </p>
        <ul>
          <li>
            <strong>On-call numbers</strong> of your team get every event of their services, also
            after the monthly budget is used up.
          </li>
          <li>
            <strong>A monthly SMS budget</strong> pauses SMS to visitors when it is reached and
            notifies the admins.
          </li>
        </ul>

        <H2>Subscriptions for visitors</H2>
        <p>
          If you allow it, visitors subscribe on the public page with a Slack, Teams or Discord
          webhook or with a phone number, for all services or a selection, just like email. A
          6-digit code in the first message confirms the subscription, and every message carries a
          link to manage or cancel it. Everything works without JavaScript.
        </p>
        <Table
          caption="Visitor subscription switches"
          head={["Channel", "Default", "What you control"]}
          rows={[
            ["Slack, Teams, Discord", "Off", "Official webhook hosts only"],
            ["Generic webhooks", "Off", "A separate switch for any https endpoint"],
            ["SMS", "Off", "Allowed country calling codes and a monthly budget"],
          ]}
        />

        <H2>Safe outbound requests</H2>
        <p>
          A status page that sends requests to URLs entered by visitors must not become a door into
          your network. Every webhook and SMS request goes through one guard: https only, the host
          is resolved once and pinned, private, loopback, link-local, CGNAT and cloud metadata
          addresses are refused, redirects are not followed, and every request has a 10-second
          deadline. Rate limits apply per destination, and your own webhooks never wait behind
          visitors&apos; messages.
        </p>

        <H2>Set it up</H2>
        <ol>
          <li>
            Install OpenStatusPage (see the <Link href="/en#quickstart">quick start</Link>).
          </li>
          <li>
            Open <strong>Administration → Webhooks &amp; SMS</strong>, add a webhook or an SMS
            provider and send a test.
          </li>
          <li>
            Optionally allow visitor subscriptions per channel; the subscribe page then shows{" "}
            <strong>Webhook</strong> and <strong>SMS</strong>.
          </li>
        </ol>
        <p>
          Step-by-step instructions are in the <a href={guideDoc("en")}>Webhooks and SMS guide</a>,
          formats and limits in the <a href={referenceDoc}>reference</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Does OpenStatusPage support Microsoft Teams?",
        a: "Yes, through the Teams Workflows webhook (\"post to a channel when a webhook request is received\"). Messages are Adaptive Cards. The retired Office 365 connectors are not supported.",
      },
      {
        q: "Which SMS providers work?",
        a: "Twilio, Vonage, seven.io and MessageBird have presets. Any other provider with an HTTP API works with a custom request template using placeholders for number, sender and text.",
      },
      {
        q: "Can customers get notifications in their own Slack?",
        a: "Yes, if the admin allows visitor webhook subscriptions. The customer enters their Slack, Teams or Discord webhook URL on the subscribe page and confirms it with a code.",
      },
      {
        q: "Do notifications reveal internal hosts?",
        a: "No. Webhooks and SMS carry only public incidents and maintenance with public service names, exactly like the email notifications.",
      },
    ],
  },
  de: {
    title: "Statusseiten-Meldungen in Slack, Teams, Discord und per SMS",
    metaTitle: "Statusseite mit Benachrichtigungen in Slack, Microsoft Teams, Discord und per SMS",
    description:
      "Schick Störungen und Wartungen von einer selbst gehosteten Statusseite an Slack, Microsoft Teams, Discord, signierte JSON-Webhooks und per SMS (Twilio, Vonage, seven.io, MessageBird), ans Team und an Abonnenten.",
    eyebrow: "Guide · Benachrichtigungen",
    lead: "Eine Statusseite hilft nur, wenn sie bemerkt wird. OpenStatusPage schickt jede öffentliche Störung und Wartung in die Kanäle, die dein Team und deine Kunden ohnehin lesen: Slack, Microsoft Teams, Discord, eigene Endpunkte und SMS, zusätzlich zur E-Mail.",
    Body: () => (
      <>
        <H2>Was verschickt wird</H2>
        <p>
          Webhooks und SMS bekommen genau die Ereignisse der E-Mail-Abonnenten: eine neue oder
          aktualisierte öffentliche Störung oder Wartung (wenn <em>Abonnenten benachrichtigen</em>{" "}
          an bleibt), den automatischen Beginn und das Ende einer Wartung und die Erinnerung davor.
          Private Störungen und verborgene Dienste werden nie verschickt; es gelten also dieselben
          Regeln wie auf der öffentlichen Seite.
        </p>

        <H2>Webhooks fürs Team</H2>
        <p>
          Unter <strong>Administration → Webhooks &amp; SMS</strong> legt ein Admin einen Webhook an,
          wählt alle oder ausgewählte Dienste und schickt eine Testnachricht. Umgebungsvariablen
          braucht es nicht; URLs und Secrets werden verschlüsselt gespeichert.
        </p>
        <Table
          caption="Unterstützte Webhook-Typen"
          head={["Typ", "Format", "Woher die URL kommt"]}
          rows={[
            ["Slack", "Block Kit mit Button zum Ereignis", "Eine App mit Incoming Webhooks"],
            ["Microsoft Teams", "Adaptive Card", "Kanal → Workflows → bei Webhook-Anfrage posten"],
            ["Discord", "Embed, gefärbt nach Auswirkung", "Servereinstellungen → Integrationen → Webhooks"],
            ["Allgemeines JSON", "Versionierte Nutzlast, HMAC-SHA256-Signatur", "Ein beliebiger eigener https-Endpunkt"],
          ]}
        />
        <p>
          Fehlgeschlagene Zustellungen werden nach 1, 5, 15 und 60 Minuten wiederholt. Jeder Webhook
          hat ein Zustellprotokoll, und nach 10 Fehlern in Folge wird er abgeschaltet und die Admins
          bekommen eine E-Mail.
        </p>

        <h3>Allgemeine JSON-Webhooks</h3>
        <p>
          Allgemeine Webhooks schicken eine stabile, versionierte Nutzlast. Felder kommen nur hinzu,
          sie werden nie umbenannt; Anbindungen an Ticketsysteme oder Chatbots laufen also weiter:
        </p>
        <Code label="Beispiel-Nutzlast eines allgemeinen Webhooks">{payload}</Code>
        <p>Jede Anfrage ist signiert; prüf sie über den rohen Body und lehn alte Zeitstempel ab:</p>
        <Code label="Signatur-Header eines allgemeinen Webhooks">{verify}</Code>

        <H2>SMS</H2>
        <p>
          SMS gehen mit einer HTTP-Anfrage aus einer Vorlage raus. Voreinstellungen füllen sie für{" "}
          <strong>Twilio, Vonage, seven.io und MessageBird</strong>; mit <em>Eigene</em> beschreibst
          du die API jedes anderen Anbieters. Zugangsdaten werden verschlüsselt gespeichert. Texte
          bleiben bei einem Segment (160 GSM-7-Zeichen), die Kosten also planbar.
        </p>
        <ul>
          <li>
            <strong>Bereitschaftsnummern</strong> deines Teams bekommen jedes Ereignis ihrer Dienste,
            auch wenn das Monatsbudget aufgebraucht ist.
          </li>
          <li>
            <strong>Ein monatliches SMS-Budget</strong> pausiert SMS an Besucher, sobald es erreicht
            ist, und benachrichtigt die Admins.
          </li>
        </ul>

        <H2>Abos für Besucher</H2>
        <p>
          Wenn du es erlaubst, abonnieren Besucher auf der öffentlichen Seite mit einem Slack-,
          Teams- oder Discord-Webhook oder mit einer Telefonnummer, für alle oder ausgewählte
          Dienste, genau wie per E-Mail. Ein 6-stelliger Code in der ersten Nachricht bestätigt das
          Abo, und jede Nachricht enthält einen Link zum Verwalten oder Kündigen. Alles funktioniert
          ohne JavaScript.
        </p>
        <Table
          caption="Schalter für Abos von Besuchern"
          head={["Kanal", "Standard", "Was du steuerst"]}
          rows={[
            ["Slack, Teams, Discord", "Aus", "Nur offizielle Webhook-Hosts"],
            ["Allgemeine Webhooks", "Aus", "Ein eigener Schalter für beliebige https-Endpunkte"],
            ["SMS", "Aus", "Erlaubte Ländervorwahlen und ein Monatsbudget"],
          ]}
        />

        <H2>Sichere ausgehende Anfragen</H2>
        <p>
          Eine Statusseite, die Anfragen an von Besuchern eingegebene URLs schickt, darf keine Tür
          in dein Netz werden. Jede Webhook- und SMS-Anfrage läuft durch einen Schutz: nur https,
          der Host wird einmal aufgelöst und festgehalten, private, Loopback-, Link-Local-, CGNAT-
          und Cloud-Metadaten-Adressen werden abgelehnt, Weiterleitungen nicht verfolgt, und jede
          Anfrage hat 10 Sekunden Zeit. Ratenlimits gelten pro Ziel, und deine eigenen Webhooks
          warten nie hinter Nachrichten von Besuchern.
        </p>

        <H2>Einrichten</H2>
        <ol>
          <li>
            Installiere OpenStatusPage (siehe <Link href="/de#quickstart">Schnellstart</Link>).
          </li>
          <li>
            Öffne <strong>Administration → Webhooks &amp; SMS</strong>, leg einen Webhook oder einen
            SMS-Anbieter an und schick einen Test.
          </li>
          <li>
            Erlaube optional Abos pro Kanal; die Abo-Seite zeigt dann <strong>Webhook</strong> und{" "}
            <strong>SMS</strong>.
          </li>
        </ol>
        <p>
          Die Schritt-für-Schritt-Anleitung steht im <a href={guideDoc("de")}>Handbuch zu Webhooks
          und SMS</a>, Formate und Limits in der <a href={referenceDoc}>Referenz</a>.
        </p>
      </>
    ),
    faq: [
      {
        q: "Unterstützt OpenStatusPage Microsoft Teams?",
        a: "Ja, über den Workflows-Webhook von Teams („In einem Kanal posten, wenn eine Webhook-Anfrage empfangen wird“). Nachrichten sind Adaptive Cards. Die eingestellten Office-365-Connectors werden nicht unterstützt.",
      },
      {
        q: "Welche SMS-Anbieter funktionieren?",
        a: "Für Twilio, Vonage, seven.io und MessageBird gibt es Voreinstellungen. Jeder andere Anbieter mit HTTP-API funktioniert mit einer eigenen Vorlage mit Platzhaltern für Nummer, Absender und Text.",
      },
      {
        q: "Können Kunden Meldungen in ihrem eigenen Slack bekommen?",
        a: "Ja, wenn der Admin Webhook-Abos für Besucher erlaubt. Der Kunde trägt seine Slack-, Teams- oder Discord-Webhook-URL auf der Abo-Seite ein und bestätigt sie mit einem Code.",
      },
      {
        q: "Verraten Benachrichtigungen interne Hosts?",
        a: "Nein. Webhooks und SMS enthalten nur öffentliche Störungen und Wartungen mit öffentlichen Dienstnamen, genau wie die E-Mails.",
      },
    ],
  },
};
