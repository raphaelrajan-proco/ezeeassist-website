/**
 * One-time setup: creates the custom contact properties the Workflow
 * Generator writes to HubSpot. Safe to re-run — properties that already
 * exist are reported and skipped.
 *
 * Usage:
 *   HUBSPOT_ACCESS_TOKEN=pat-... node scripts/setup-hubspot.mjs
 *
 * The private app token needs the crm.schemas.contacts.write scope for
 * this script, plus crm.objects.contacts.read/write for the site itself.
 */

const token = process.env.HUBSPOT_ACCESS_TOKEN;
if (!token) {
  console.error("Set HUBSPOT_ACCESS_TOKEN before running this script.");
  process.exit(1);
}

const PROPERTIES = [
  {
    name: "wfg_source",
    label: "Workflow Generator source",
    type: "string",
    fieldType: "text",
    description: "Where the Workflow Generator submission came from (?source= parameter).",
  },
  {
    name: "wfg_free_email",
    label: "Workflow Generator free email domain",
    type: "bool",
    fieldType: "booleancheckbox",
    description: "True when the lead used a free mailbox provider (gmail, yahoo, etc.).",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" },
    ],
  },
  {
    name: "wfg_tech_stack",
    label: "Workflow Generator tech stack",
    type: "string",
    fieldType: "textarea",
    description: "Tools the lead selected in the Workflow Generator, semicolon separated.",
  },
  {
    name: "wfg_scale",
    label: "Workflow Generator scale",
    type: "string",
    fieldType: "text",
    description: "Emerging, Established, or Global.",
  },
  {
    name: "wfg_departments",
    label: "Workflow Generator departments",
    type: "string",
    fieldType: "text",
    description: "Departments the lead selected, semicolon separated.",
  },
  {
    name: "wfg_top_of_mind",
    label: "Workflow Generator top of mind",
    type: "string",
    fieldType: "textarea",
    description: "Free-text answer to the what's-top-of-mind question.",
  },
];

for (const prop of PROPERTIES) {
  const res = await fetch("https://api.hubapi.com/crm/v3/properties/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...prop, groupName: "contactinformation" }),
  });
  if (res.ok) {
    console.log(`created  ${prop.name}`);
  } else if (res.status === 409) {
    console.log(`exists   ${prop.name}`);
  } else {
    console.error(`FAILED   ${prop.name}: ${res.status} ${await res.text()}`);
    process.exitCode = 1;
  }
}
