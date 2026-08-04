/**
 * Minimal HubSpot CRM v3 client for the Workflow Generator. Native fetch,
 * no SDK: two calls (patch-by-email, create) cover everything the lead
 * route needs. A missing token degrades gracefully — the lead is still
 * captured in Postgres, HubSpot sync is just skipped with a log line.
 *
 * Custom contact properties (wfg_*) must exist in the portal before they
 * can be written; `scripts/setup-hubspot.mjs` creates them once.
 */

const HUBSPOT_BASE = "https://api.hubapi.com";

/* Free mailbox providers are accepted (per spec) but flagged in HubSpot so
   sales can triage. Domains only — no MX lookups, no third-party calls. */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.ca", "ymail.com",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com",
  "aol.com", "icloud.com", "me.com", "mac.com",
  "proton.me", "protonmail.com", "gmx.com", "gmx.net", "mail.com",
  "yandex.com", "yandex.ru", "zoho.com",
  "comcast.net", "verizon.net", "att.net", "sbcglobal.net",
]);

export function isFreeEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return FREE_EMAIL_DOMAINS.has(domain);
}

export interface ContactUpsert {
  email: string;
  firstName: string;
  lastName: string;
  brand: string;
  source: string;
}

async function hubspotFetch(path: string, init: RequestInit): Promise<Response> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) throw new Error("HUBSPOT_ACCESS_TOKEN is not set");
  return fetch(`${HUBSPOT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

/**
 * Create-or-update a contact keyed by email. Returns the HubSpot contact id,
 * or null when sync was skipped or failed (never throws — lead capture in
 * Postgres must not depend on HubSpot availability).
 */
export async function upsertContact(contact: ContactUpsert): Promise<string | null> {
  if (!process.env.HUBSPOT_ACCESS_TOKEN) {
    console.warn("[workflow-generator] HUBSPOT_ACCESS_TOKEN missing; skipping HubSpot sync");
    return null;
  }

  const properties = {
    email: contact.email,
    firstname: contact.firstName,
    lastname: contact.lastName,
    company: contact.brand,
    wfg_source: contact.source,
    wfg_free_email: isFreeEmailDomain(contact.email) ? "true" : "false",
  };

  try {
    /* Update path first: most repeat visitors already exist as contacts. */
    const patch = await hubspotFetch(
      `/crm/v3/objects/contacts/${encodeURIComponent(contact.email)}?idProperty=email`,
      { method: "PATCH", body: JSON.stringify({ properties }) },
    );
    if (patch.ok) {
      const body = await patch.json();
      return body.id as string;
    }
    if (patch.status === 404) {
      const create = await hubspotFetch("/crm/v3/objects/contacts", {
        method: "POST",
        body: JSON.stringify({ properties }),
      });
      if (create.ok) {
        const body = await create.json();
        return body.id as string;
      }
      console.error("[workflow-generator] HubSpot create failed:", create.status, await create.text());
      return null;
    }
    console.error("[workflow-generator] HubSpot patch failed:", patch.status, await patch.text());
    return null;
  } catch (err) {
    console.error("[workflow-generator] HubSpot sync error:", err);
    return null;
  }
}
