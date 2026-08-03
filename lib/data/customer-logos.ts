// Single source of truth for customer logos used in TrustBar and any page that shows customer logos.
// TODO: Drop the real SVG files into /public/logos/customers/ and the <Image> tags will pick them up automatically.

export interface CustomerLogo {
  name: string;
  src: string;
  alt: string;
}

// Order is the marquee's opening sequence, requested: it launches on a
// handful of brands from the back of the roster, the featured run lands
// from position six (UPS Store first), and the rest follow. Oasis Senior
// Advisors and QC Kinetix render as text pills until their SVGs land.
export const customerLogos: CustomerLogo[] = [
  // ── Openers, pulled from the back of the roster ──────────────
  { name: "Bumble Bee Blinds",       src: "/logos/customers/bumble-bee-blinds.svg",       alt: "Bumble Bee Blinds" },
  { name: "Wisdom Senior Care",      src: "/logos/customers/wisdom-senior-care.svg",      alt: "Wisdom Senior Care" },
  { name: "The Drip Bar",            src: "/logos/customers/the-drip-bar.svg",            alt: "The Drip Bar" },
  { name: "New Creations",           src: "/logos/customers/new-creations.svg",           alt: "New Creations" },
  { name: "Athletic Republic",       src: "/logos/customers/athletic-republic.svg",       alt: "Athletic Republic" },
  // ── Featured run, order requested ────────────────────────────
  { name: "UPS Store",               src: "/logos/customers/ups-store.svg",               alt: "The UPS Store" },
  { name: "Sport Clips",             src: "/logos/customers/sport-clips.svg",             alt: "Sport Clips" },
  { name: "Fastest Labs",            src: "/logos/customers/fastest-labs.svg",            alt: "Fastest Labs" },
  { name: "Aqua-Tots",               src: "/logos/customers/aqua-tots.svg",               alt: "Aqua-Tots Swim Schools" },
  { name: "DivaDance",               src: "/logos/customers/divadance.svg",               alt: "DivaDance" },
  { name: "Deka+",                   src: "/logos/customers/deka-plus.svg",               alt: "Deka+" },
  { name: "Horse Power",             src: "/logos/customers/horse-power.svg",             alt: "HorsePower Brands" },
  { name: "Oasis Senior Advisors",   src: "/logos/customers/oasis-senior-advisors.svg",   alt: "Oasis Senior Advisors" },
  { name: "EverLine",                src: "/logos/customers/everline.svg",                alt: "EverLine Coatings and Services" },
  { name: "CEFA",                    src: "/logos/customers/cefa.svg",                    alt: "CEFA Early Learning" },
  { name: "QC Kinetix",              src: "/logos/customers/qc-kinetix.svg",              alt: "QC Kinetix" },
  // ── The others ───────────────────────────────────────────────
  { name: "WSI",                     src: "/logos/customers/wsi.svg",                     alt: "WSI" },
  { name: "Real Property Management",src: "/logos/customers/real-property-mgmt.svg",     alt: "Real Property Management" },
  { name: "Spray-Net",               src: "/logos/customers/spray-net.svg",               alt: "Spray-Net" },
  { name: "Modern PurAir",           src: "/logos/customers/modern-purair.svg",           alt: "Modern PurAir" },
  { name: "Zoom Drain",              src: "/logos/customers/zoom-drain.svg",              alt: "Zoom Drain" },
  { name: "Heights Wellness",        src: "/logos/customers/heights-wellness.svg",        alt: "Heights Wellness Retreat" },
  { name: "Home Helpers",            src: "/logos/customers/home-helpers.svg",            alt: "Home Helpers Home Care" },
  // ── Placeholder entries (replace names + swap SVGs later) ────
  { name: "Customer 12",  src: "/logos/customers/customer-12.svg",  alt: "Customer 12" },
  { name: "Customer 13",  src: "/logos/customers/customer-13.svg",  alt: "Customer 13" },
  { name: "Customer 14",  src: "/logos/customers/customer-14.svg",  alt: "Customer 14" },
  { name: "Customer 15",  src: "/logos/customers/customer-15.svg",  alt: "Customer 15" },
  { name: "Customer 16",  src: "/logos/customers/customer-16.svg",  alt: "Customer 16" },
  { name: "Customer 17",  src: "/logos/customers/customer-17.svg",  alt: "Customer 17" },
  { name: "Customer 18",  src: "/logos/customers/customer-18.svg",  alt: "Customer 18" },
  { name: "Customer 19",  src: "/logos/customers/customer-19.svg",  alt: "Customer 19" },
  { name: "Customer 20",  src: "/logos/customers/customer-20.svg",  alt: "Customer 20" },
  { name: "Customer 21",  src: "/logos/customers/customer-21.svg",  alt: "Customer 21" },
  { name: "Customer 22",  src: "/logos/customers/customer-22.svg",  alt: "Customer 22" },
  { name: "Customer 23",  src: "/logos/customers/customer-23.svg",  alt: "Customer 23" },
  { name: "Customer 24",  src: "/logos/customers/customer-24.svg",  alt: "Customer 24" },
  { name: "Customer 25",  src: "/logos/customers/customer-25.svg",  alt: "Customer 25" },
  { name: "Customer 26",  src: "/logos/customers/customer-26.svg",  alt: "Customer 26" },
  { name: "Customer 27",  src: "/logos/customers/customer-27.svg",  alt: "Customer 27" },
  { name: "Customer 28",  src: "/logos/customers/customer-28.svg",  alt: "Customer 28" },
  { name: "Customer 29",  src: "/logos/customers/customer-29.svg",  alt: "Customer 29" },
  { name: "Customer 30",  src: "/logos/customers/customer-30.svg",  alt: "Customer 30" },
  { name: "Customer 31",  src: "/logos/customers/customer-31.svg",  alt: "Customer 31" },
  { name: "Customer 32",  src: "/logos/customers/customer-32.svg",  alt: "Customer 32" },
  { name: "Customer 33",  src: "/logos/customers/customer-33.svg",  alt: "Customer 33" },
  { name: "Customer 34",  src: "/logos/customers/customer-34.svg",  alt: "Customer 34" },
  { name: "Customer 35",  src: "/logos/customers/customer-35.svg",  alt: "Customer 35" },
  { name: "Customer 36",  src: "/logos/customers/customer-36.svg",  alt: "Customer 36" },
  { name: "Customer 37",  src: "/logos/customers/customer-37.svg",  alt: "Customer 37" },
  { name: "Customer 38",  src: "/logos/customers/customer-38.svg",  alt: "Customer 38" },
  { name: "Customer 39",  src: "/logos/customers/customer-39.svg",  alt: "Customer 39" },
  { name: "Customer 40",  src: "/logos/customers/customer-40.svg",  alt: "Customer 40" },
  { name: "Customer 41",  src: "/logos/customers/customer-41.svg",  alt: "Customer 41" },
  { name: "Customer 42",  src: "/logos/customers/customer-42.svg",  alt: "Customer 42" },
  { name: "Customer 43",  src: "/logos/customers/customer-43.svg",  alt: "Customer 43" },
  { name: "Customer 44",  src: "/logos/customers/customer-44.svg",  alt: "Customer 44" },
  { name: "Customer 45",  src: "/logos/customers/customer-45.svg",  alt: "Customer 45" },
  { name: "Customer 46",  src: "/logos/customers/customer-46.svg",  alt: "Customer 46" },
  { name: "Customer 47",  src: "/logos/customers/customer-47.svg",  alt: "Customer 47" },
  { name: "Customer 48",  src: "/logos/customers/customer-48.svg",  alt: "Customer 48" },
  { name: "Customer 49",  src: "/logos/customers/customer-49.svg",  alt: "Customer 49" },
  { name: "Customer 50",  src: "/logos/customers/customer-50.svg",  alt: "Customer 50" },
  { name: "Customer 51",  src: "/logos/customers/customer-51.svg",  alt: "Customer 51" },
  { name: "Customer 52",  src: "/logos/customers/customer-52.svg",  alt: "Customer 52" },
  { name: "Customer 53",  src: "/logos/customers/customer-53.svg",  alt: "Customer 53" },
  { name: "Customer 54",  src: "/logos/customers/customer-54.svg",  alt: "Customer 54" },
  { name: "Customer 55",  src: "/logos/customers/customer-55.svg",  alt: "Customer 55" },
  { name: "Customer 56",  src: "/logos/customers/customer-56.svg",  alt: "Customer 56" },
  { name: "Customer 57",  src: "/logos/customers/customer-57.svg",  alt: "Customer 57" },
  { name: "Customer 58",  src: "/logos/customers/customer-58.svg",  alt: "Customer 58" },
  { name: "Customer 59",  src: "/logos/customers/customer-59.svg",  alt: "Customer 59" },
];
