// Single source of truth for integrations used on the Integrations page and Platform page scrolling bar.
// TODO: Drop SVG files into /public/logos/integrations/ and update cards to use <Image>.

export type IntegrationCategory =
  | "Knowledge Sources"
  | "Communication Channels"
  | "File Storage"
  | "Collaboration Tools"
  | "Learning & Training"
  | "CRM & Support"
  | "Automation"
  | "Other";

export interface Integration {
  name: string;
  src: string;
  category: IntegrationCategory;
  description: string;
}

export const integrations: Integration[] = [
  // ── Knowledge Sources (11) ───────────────────────────────────
  { name: "Google Drive",   src: "/logos/integrations/google-drive.svg",   category: "Knowledge Sources",     description: "Documents, spreadsheets, and slides" },
  { name: "SharePoint",     src: "/logos/integrations/sharepoint.svg",     category: "Knowledge Sources",     description: "Enterprise document management" },
  { name: "Dropbox",        src: "/logos/integrations/dropbox.svg",        category: "Knowledge Sources",     description: "Cloud file storage and sharing" },
  { name: "YouTube",        src: "/logos/integrations/youtube.svg",        category: "Knowledge Sources",     description: "Training and instructional videos" },
  { name: "WordPress",      src: "/logos/integrations/wordpress.svg",      category: "Knowledge Sources",     description: "Published knowledge base articles" },
  { name: "Confluence",     src: "/logos/integrations/confluence.svg",     category: "Knowledge Sources",     description: "Wiki and documentation" },
  { name: "Notion",         src: "/logos/integrations/notion.svg",         category: "Knowledge Sources",     description: "Workspace documents and databases" },
  { name: "OneDrive",       src: "/logos/integrations/onedrive.svg",       category: "Knowledge Sources",     description: "Personal and shared Microsoft files" },
  { name: "Box",            src: "/logos/integrations/box.svg",            category: "Knowledge Sources",     description: "Enterprise cloud storage" },
  { name: "Google Docs",    src: "/logos/integrations/google-docs.svg",    category: "Knowledge Sources",     description: "Collaborative document editing" },
  { name: "Airtable",       src: "/logos/integrations/airtable.svg",       category: "Knowledge Sources",     description: "Databases and structured content" },

  // ── Communication Channels (7) ──────────────────────────────
  { name: "Slack",          src: "/logos/integrations/slack.svg",          category: "Communication Channels", description: "Ask questions directly inside your Slack workspace" },
  { name: "Microsoft Teams",src: "/logos/integrations/teams.svg",          category: "Communication Channels", description: "Native integration with your Teams environment" },
  { name: "Email / Outlook",src: "/logos/integrations/outlook.svg",        category: "Communication Channels", description: "Support via any email client, no setup required" },
  { name: "SMS / Text",     src: "/logos/integrations/sms.svg",            category: "Communication Channels", description: "The most-used channel across franchise networks" },
  { name: "WhatsApp",       src: "/logos/integrations/whatsapp.svg",       category: "Communication Channels", description: "Mobile-first support for on-the-go operators" },
  { name: "Gmail",          src: "/logos/integrations/gmail.svg",          category: "Communication Channels", description: "Google Workspace email integration" },
  { name: "Web Portal",     src: "/logos/integrations/web-portal.svg",     category: "Communication Channels", description: "Embeddable chat widget for your franchise intranet" },

  // ── File Storage (3) ────────────────────────────────────────
  { name: "AWS S3",                src: "/logos/integrations/aws-s3.svg",         category: "File Storage", description: "Amazon cloud object storage" },
  { name: "Google Cloud Storage",  src: "/logos/integrations/gcs.svg",            category: "File Storage", description: "Google Cloud object storage" },
  { name: "Azure Blob Storage",    src: "/logos/integrations/azure-blob.svg",     category: "File Storage", description: "Microsoft Azure cloud storage" },

  // ── Collaboration Tools (7) ─────────────────────────────────
  { name: "Asana",      src: "/logos/integrations/asana.svg",      category: "Collaboration Tools", description: "Project and task management" },
  { name: "Monday.com", src: "/logos/integrations/monday.svg",     category: "Collaboration Tools", description: "Work OS for teams" },
  { name: "Jira",       src: "/logos/integrations/jira.svg",       category: "Collaboration Tools", description: "Issue and project tracking" },
  { name: "Trello",     src: "/logos/integrations/trello.svg",     category: "Collaboration Tools", description: "Visual board-based task management" },
  { name: "ClickUp",    src: "/logos/integrations/clickup.svg",    category: "Collaboration Tools", description: "All-in-one project management" },
  { name: "Notion",     src: "/logos/integrations/notion-2.svg",   category: "Collaboration Tools", description: "Team wikis and project docs" },
  { name: "Basecamp",   src: "/logos/integrations/basecamp.svg",   category: "Collaboration Tools", description: "Team communication and projects" },

  // ── Learning & Training (5) ─────────────────────────────────
  { name: "Trainual",    src: "/logos/integrations/trainual.svg",   category: "Learning & Training", description: "Franchise training documentation" },
  { name: "TalentLMS",  src: "/logos/integrations/talentlms.svg",  category: "Learning & Training", description: "Online learning management system" },
  { name: "Lessonly",   src: "/logos/integrations/lessonly.svg",   category: "Learning & Training", description: "Team learning and enablement" },
  { name: "Docebo",     src: "/logos/integrations/docebo.svg",     category: "Learning & Training", description: "Enterprise LMS platform" },
  { name: "LearnUpon",  src: "/logos/integrations/learnupon.svg",  category: "Learning & Training", description: "LMS for partners and franchisees" },

  // ── CRM & Support (8) ───────────────────────────────────────
  { name: "HubSpot",     src: "/logos/integrations/hubspot.svg",    category: "CRM & Support", description: "CRM, marketing, and service hub" },
  { name: "Salesforce",  src: "/logos/integrations/salesforce.svg", category: "CRM & Support", description: "Enterprise CRM platform" },
  { name: "Zendesk",     src: "/logos/integrations/zendesk.svg",    category: "CRM & Support", description: "Customer support ticketing" },
  { name: "Freshdesk",   src: "/logos/integrations/freshdesk.svg",  category: "CRM & Support", description: "Cloud-based help desk software" },
  { name: "ServiceNow",  src: "/logos/integrations/servicenow.svg", category: "CRM & Support", description: "IT service management" },
  { name: "Intercom",    src: "/logos/integrations/intercom.svg",   category: "CRM & Support", description: "Customer messaging platform" },
  { name: "Guru",        src: "/logos/integrations/guru.svg",       category: "CRM & Support", description: "Knowledge management for teams" },
  { name: "Slab",        src: "/logos/integrations/slab.svg",       category: "CRM & Support", description: "Team knowledge base" },

  // ── Automation (2) ──────────────────────────────────────────
  { name: "Zapier",  src: "/logos/integrations/zapier.svg",  category: "Automation", description: "Connect apps and automate workflows" },
  { name: "Make",    src: "/logos/integrations/make.svg",    category: "Automation", description: "Visual automation platform" },

  // ── Other / Placeholders (7) ────────────────────────────────
  { name: "Integration 44", src: "/logos/integrations/integration-44.svg", category: "Other", description: "Coming soon" },
  { name: "Integration 45", src: "/logos/integrations/integration-45.svg", category: "Other", description: "Coming soon" },
  { name: "Integration 46", src: "/logos/integrations/integration-46.svg", category: "Other", description: "Coming soon" },
  { name: "Integration 47", src: "/logos/integrations/integration-47.svg", category: "Other", description: "Coming soon" },
  { name: "Integration 48", src: "/logos/integrations/integration-48.svg", category: "Other", description: "Coming soon" },
  { name: "Integration 49", src: "/logos/integrations/integration-49.svg", category: "Other", description: "Coming soon" },
  { name: "Integration 50", src: "/logos/integrations/integration-50.svg", category: "Other", description: "Coming soon" },
];

// ── Helpers ──────────────────────────────────────────────────────

/** All distinct categories in display order */
export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  "Knowledge Sources",
  "Communication Channels",
  "File Storage",
  "Collaboration Tools",
  "Learning & Training",
  "CRM & Support",
  "Automation",
  "Other",
];

/** Returns integrations grouped by category */
export function groupedIntegrations(): Record<IntegrationCategory, Integration[]> {
  const map = {} as Record<IntegrationCategory, Integration[]>;
  for (const cat of INTEGRATION_CATEGORIES) map[cat] = [];
  for (const item of integrations) map[item.category].push(item);
  return map;
}

/** Subset used for the Platform page scrolling marquee bar (first 20 unique names) */
export const platformMarqueeIntegrations = integrations.slice(0, 20);

/**
 * The scrolling strip's names, shared by the Integrations hero marquee
 * and the Reporting "Reads live from" row so the two read as the same
 * object rather than two takes on it.
 *
 * Forty, not the full fifty: these are the systems a franchise operator
 * recognises, and a strip is texture rather than a catalogue. The
 * categorised list lives on the Integrations page.
 *
 * Names, not logos. Only four of the fifty SVGs this file declares are
 * committed, and the house rule is that a logo is a committed local file
 * or it is not shown; four real marks among twenty text chips reads as
 * broken rather than deliberate.
 */
export const INTEGRATION_STRIP = [
  "Mindbody", "ServiceTitan", "Toast", "Square", "QuickBooks", "Xero", "SharePoint",
  "Google Drive", "Trainual", "Docebo", "Salesforce", "HubSpot", "Microsoft Teams",
  "Slack", "Mailchimp", "Notion", "Zenoti", "Lightspeed", "FranConnect", "Dropbox",
  "Box", "OneDrive", "Stripe", "ADP", "Zoom", "Google Meet", "Airtable", "Monday",
  "Canva", "Constant Contact", "TouchBistro", "Thryv", "HighLevel", "Zoho",
  "TalentLMS", "Loom", "Vimeo", "Amazon S3", "ProfitKeeper", "Qvinci",
];
