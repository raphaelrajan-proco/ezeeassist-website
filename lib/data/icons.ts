// TODO: Replace placeholder paths with actual Flaticon SVG files, then update components to use CustomIcon instead of lucide-react.
//
// Usage:
//   import { icons } from "@/lib/data/icons";
//   import { CustomIcon } from "@/components/CustomIcon";
//   <CustomIcon src={icons.problemRepetitive} alt="Repetitive questions" size={24} />

export const icons = {
  // ── Homepage — Problem section ─────────────────────────────
  problemRepetitive:   "/icons/problem-repetitive.svg",
  problemScattered:    "/icons/problem-scattered.svg",
  problemAfterHours:   "/icons/problem-afterhours.svg",

  // ── Homepage — How It Works ────────────────────────────────
  howitConnect:        "/icons/howit-connect.svg",
  howitAsk:            "/icons/howit-ask.svg",
  howitAnswer:         "/icons/howit-answer.svg",

  // ── Homepage — Security callout ────────────────────────────
  securityIsolation:   "/icons/security-isolation.svg",
  securityNoTraining:  "/icons/security-no-training.svg",
  securitySoc2:        "/icons/security-soc2.svg",
  securityAudit:       "/icons/security-audit.svg",

  // ── Platform — Pillars ─────────────────────────────────────
  platformAiAgent:     "/icons/platform-ai-agent.svg",
  platformChannels:    "/icons/platform-channels.svg",
  platformTicketing:   "/icons/platform-ticketing.svg",
  platformInsights:    "/icons/platform-insights.svg",
  platformWorkflows:   "/icons/platform-workflows.svg",
  platformIntegrations:"/icons/platform-integrations.svg",

  // ── AI Agent — Capabilities (6) ───────────────────────────
  capMultichannel:     "/icons/cap-multichannel.svg",
  capCitations:        "/icons/cap-citations.svg",
  capBrandKnowledge:   "/icons/cap-brand-knowledge.svg",
  capMultilanguage:    "/icons/cap-multilanguage.svg",
  capEscalation:       "/icons/cap-escalation.svg",
  capLearning:         "/icons/cap-learning.svg",

  // ── Ticketing — Features (3) ──────────────────────────────
  ticketAutoCategory:  "/icons/ticket-auto-category.svg",
  ticketPriority:      "/icons/ticket-priority.svg",
  ticketContext:       "/icons/ticket-context.svg",

  // ── Insights — Dashboard capabilities (4) ─────────────────
  insightTopQuestions:    "/icons/insight-top-questions.svg",
  insightContentGaps:     "/icons/insight-content-gaps.svg",
  insightUsageByLocation: "/icons/insight-usage-location.svg",
  insightTrends:          "/icons/insight-trends.svg",

  // ── Workflows — Example workflows (4) ────────────────────
  workflowOnboarding:  "/icons/workflow-onboarding.svg",
  workflowVendor:      "/icons/workflow-vendor.svg",
  workflowCompliance:  "/icons/workflow-compliance.svg",
  workflowContent:     "/icons/workflow-content.svg",

  // ── Security page — Responsible AI (3) ───────────────────
  securityAccessControl: "/icons/security-access-control.svg",
  securityNoThirdParty:  "/icons/security-no-third-party.svg",
  securityEnterprise:    "/icons/security-enterprise.svg",

  // ── Security page — Compliance standards (6) ─────────────
  securityCloud:           "/icons/security-cloud.svg",
  securityIndexing:        "/icons/security-indexing.svg",
  securityDataCompartment: "/icons/security-data-compartment.svg",
  securityPermissions:     "/icons/security-permissions.svg",
  securityPii:             "/icons/security-pii.svg",
  securityEncryption:      "/icons/security-encryption.svg",

  // ── Why EZee Assist — Generic AI fails (3) ───────────────
  whyGenericInternet:    "/icons/why-generic-internet.svg",
  whyNoMultiLocation:    "/icons/why-no-multi-location.svg",
  whyNoEscalation:       "/icons/why-no-escalation.svg",

  // ── Why EZee Assist — Differentiators (6) ────────────────
  whyBrandKnowledge:       "/icons/why-brand-knowledge.svg",
  whyMultiTenant:          "/icons/why-multi-tenant.svg",
  whyNetworkMemory:        "/icons/why-network-memory.svg",
  whyFranchiseEscalation:  "/icons/why-franchise-escalation.svg",
  whyHubSpoke:             "/icons/why-hub-spoke.svg",
  whyChannelNative:        "/icons/why-channel-native.svg",

  // ── Industries — Hub page (3) ─────────────────────────────
  industryFranchise:     "/icons/industry-franchise.svg",
  industryMultiLocation: "/icons/industry-multi-location.svg",
  industryUniversity:    "/icons/industry-university.svg",

  // ── Industries — Cross-industry benefits (4) ─────────────
  benefitAlwaysOn:       "/icons/benefit-always-on.svg",
  benefitZeroMigration:  "/icons/benefit-zero-migration.svg",
  benefitVisibility:     "/icons/benefit-visibility.svg",
  benefitEscalation:     "/icons/benefit-escalation.svg",

  // ── Franchising page — Pain points (4) ───────────────────
  franchisePainRepetitive:  "/icons/franchise-pain-repetitive.svg",
  franchisePainScattered:   "/icons/franchise-pain-scattered.svg",
  franchisePainSatisfaction:"/icons/franchise-pain-satisfaction.svg",
  franchisePainScaling:     "/icons/franchise-pain-scaling.svg",

  // ── Franchisors page — Features (6) ──────────────────────
  franchisorSlash:        "/icons/franchisor-slash.svg",
  franchisorConsistency:  "/icons/franchisor-consistency.svg",
  franchisorOnboard:      "/icons/franchisor-onboard.svg",
  franchisorInsights:     "/icons/franchisor-insights.svg",
  franchisorEscalation:   "/icons/franchisor-escalation.svg",
  franchisorZeroBehavior: "/icons/franchisor-zero-behavior.svg",

  // ── About — Values (5) ────────────────────────────────────
  valueHonest:      "/icons/value-honest.svg",
  valueOpinions:    "/icons/value-opinions.svg",
  valueOwners:      "/icons/value-owners.svg",
  valueCommunicate: "/icons/value-communicate.svg",
  valueUrgency:     "/icons/value-urgency.svg",

  // ── Press section (2 types) ───────────────────────────────
  pressArticle:  "/icons/press-article.svg",
  pressPodcast:  "/icons/press-podcast.svg",

  // ── Navbar mega-menu icons ────────────────────────────────
  navPlatformOverview: "/icons/nav-platform-overview.svg",
  navAiAgent:          "/icons/nav-ai-agent.svg",
  navTicketing:        "/icons/nav-ticketing.svg",
  navInsights:         "/icons/nav-insights.svg",
  navWorkflows:        "/icons/nav-workflows.svg",
  navIntegrations:     "/icons/nav-integrations.svg",
} as const;

export type IconKey = keyof typeof icons;
