/**
 * Vendor mark for an integration, keyed by the domain the directory
 * already stores. Files are committed under
 * `public/logos/integrations/<category>/<slug>.png`.
 *
 * **Never hotlink these.** They were fetched once from a favicon service
 * and committed; that service is rate limited, unversioned, and returns a
 * generic mark often enough that it cannot back a production page.
 *
 * `generic: true` flags a mark that came back as the vendor's PARENT
 * brand rather than the product. SharePoint, OneDrive and Microsoft Teams
 * all resolved to the same four-square Microsoft logo, byte-identical, and
 * Google Drive resolved to the Google "G". Those four render the neutral
 * plate instead: three chips showing one logo reads as a bug, and a wrong
 * mark is worse than none.
 *
 * **To fix one:** drop the product mark from that vendor's brand page at
 * the path below and delete its `generic` flag. Nothing else changes.
 *
 * Trademark: each mark is used unmodified, at small size, beside the
 * vendor's own name, and implies no partnership. Microsoft, Google and
 * Salesforce publish specific usage rules; check them before publish.
 */
export type VendorLogo = { src: string; name: string; generic?: boolean };

export const VENDOR_LOGOS: Record<string, VendorLogo> = {
  "franconnect.com":               { src: "/logos/integrations/erp-fms/franconnect.png", name: "FranConnect" },
  "servicetitan.com":              { src: "/logos/integrations/erp-fms/servicetitan.png", name: "ServiceTitan" },
  "mindbodyonline.com":            { src: "/logos/integrations/erp-fms/mindbody.png", name: "Mindbody" },
  "zenoti.com":                    { src: "/logos/integrations/erp-fms/zenoti.png", name: "Zenoti" },
  "serviceminder.io":              { src: "/logos/integrations/erp-fms/serviceminder.png", name: "ServiceMinder" },
  "thryv.com":                     { src: "/logos/integrations/erp-fms/thryv.png", name: "Thryv" },
  "sharepoint.com":                { src: "/logos/integrations/drives-storage/sharepoint.png", name: "SharePoint", generic: true },
  "drive.google.com":              { src: "/logos/integrations/drives-storage/google-drive.png", name: "Google Drive", generic: true },
  "dropbox.com":                   { src: "/logos/integrations/drives-storage/dropbox.png", name: "Dropbox" },
  "box.com":                       { src: "/logos/integrations/drives-storage/box.png", name: "Box" },
  "onedrive.live.com":             { src: "/logos/integrations/drives-storage/onedrive.png", name: "OneDrive", generic: true },
  "notion.so":                     { src: "/logos/integrations/drives-storage/notion.png", name: "Notion" },
  "aws.amazon.com":                { src: "/logos/integrations/drives-storage/amazon-s3.png", name: "Amazon S3" },
  "talentlms.com":                 { src: "/logos/integrations/lms-training/talentlms.png", name: "TalentLMS" },
  "docebo.com":                    { src: "/logos/integrations/lms-training/docebo.png", name: "Docebo" },
  "trainual.com":                  { src: "/logos/integrations/lms-training/trainual.png", name: "Trainual" },
  "scribehow.com":                 { src: "/logos/integrations/lms-training/scribe.png", name: "Scribe" },
  "frontify.com":                  { src: "/logos/integrations/lms-training/frontify.png", name: "Frontify" },
  "learningzen.com":               { src: "/logos/integrations/lms-training/learningzen.png", name: "LearningZen" },
  "toasttab.com":                  { src: "/logos/integrations/pos-transactions/toast.png", name: "Toast" },
  "squareup.com":                  { src: "/logos/integrations/pos-transactions/square.png", name: "Square" },
  "lightspeedhq.com":              { src: "/logos/integrations/pos-transactions/lightspeed.png", name: "Lightspeed" },
  "touchbistro.com":               { src: "/logos/integrations/pos-transactions/touchbistro.png", name: "TouchBistro" },
  "clover.com":                    { src: "/logos/integrations/pos-transactions/clover.png", name: "Clover" },
  "quickbooks.intuit.com":         { src: "/logos/integrations/accounting/quickbooks.png", name: "QuickBooks" },
  "xero.com":                      { src: "/logos/integrations/accounting/xero.png", name: "Xero" },
  "stripe.com":                    { src: "/logos/integrations/accounting/stripe.png", name: "Stripe" },
  "qvinci.com":                    { src: "/logos/integrations/accounting/qvinci.png", name: "Qvinci" },
  "profitkeeper.com":              { src: "/logos/integrations/accounting/profitkeeper.png", name: "ProfitKeeper" },
  "salesforce.com":                { src: "/logos/integrations/crm/salesforce.png", name: "Salesforce" },
  "hubspot.com":                   { src: "/logos/integrations/crm/hubspot.png", name: "HubSpot" },
  "zoho.com":                      { src: "/logos/integrations/crm/zoho.png", name: "Zoho" },
  "gohighlevel.com":               { src: "/logos/integrations/crm/highlevel.png", name: "HighLevel" },
  "airtable.com":                  { src: "/logos/integrations/crm/airtable.png", name: "Airtable" },
  "monday.com":                    { src: "/logos/integrations/crm/monday.png", name: "Monday" },
  "microsoft.com":                 { src: "/logos/integrations/video-comms/microsoft-teams.png", name: "Microsoft Teams", generic: true },
  "slack.com":                     { src: "/logos/integrations/video-comms/slack.png", name: "Slack" },
  "zoom.us":                       { src: "/logos/integrations/video-comms/zoom.png", name: "Zoom" },
  "meet.google.com":               { src: "/logos/integrations/video-comms/google-meet.png", name: "Google Meet" },
  "loom.com":                      { src: "/logos/integrations/video-comms/loom.png", name: "Loom" },
  "vimeo.com":                     { src: "/logos/integrations/video-comms/vimeo.png", name: "Vimeo" },
  "youtube.com":                   { src: "/logos/integrations/video-comms/youtube.png", name: "YouTube" },
  "mailchimp.com":                 { src: "/logos/integrations/marketing/mailchimp.png", name: "Mailchimp" },
  "activecampaign.com":            { src: "/logos/integrations/marketing/activecampaign.png", name: "ActiveCampaign" },
  "constantcontact.com":           { src: "/logos/integrations/marketing/constant-contact.png", name: "Constant Contact" },
  "canva.com":                     { src: "/logos/integrations/marketing/canva.png", name: "Canva" },
  "mediavalet.com":                { src: "/logos/integrations/marketing/mediavalet.png", name: "MediaValet" },
};

/**
 * The mark to render for a domain, or null when there is none worth
 * showing. Callers draw their own neutral plate on null, which keeps the
 * chip the same width either way.
 */
export function vendorLogo(domain: string): VendorLogo | null {
  const v = VENDOR_LOGOS[domain];
  return v && !v.generic ? v : null;
}
