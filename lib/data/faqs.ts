// Homepage FAQ content — single source of truth for both the visible
// accordion (FAQSection) and the FAQPage JSON-LD schema (app/page.tsx),
// so the structured data always matches the on-page content exactly.

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What do brands actually buy first?",
    a: "Answers: AI support and intelligent ticketing across your network. That's the base platform. Actions, Agents, and Apps are unlocked on the same foundation, with no new deployment.",
  },
  {
    q: "How long does implementation take?",
    a: "Full rollout takes about 10 weeks. Six weeks for integration and planning, two weeks for corporate launch, two weeks for location onboarding, then ongoing support. Rollouts include full white-labelling, multi-lingual capabilities, and forward-deployed engineering.",
  },
  {
    q: "How is this different from ChatGPT or Copilot?",
    a: "Generic AI answers from the open internet and stops there. EZee is grounded in your brand's knowledge and connected to your systems. It answers with citations, takes actions in your tools, runs autonomous workflows, and builds apps for your network. All governed by your rules.",
  },
  {
    q: "Is our data used to train AI models?",
    a: "Never. Your data is isolated in dedicated AWS infrastructure, encrypted in transit and at rest, and never used for third-party model training.",
  },
  {
    q: "Who controls what the AI can see and do?",
    a: "You do. Role-based access by HQ admin, coach, franchisee, and location staff. Approval gates on high-stakes actions. A central log of questions asked, actions taken, agents triggered, and apps deployed.",
  },
  {
    q: "How many locations can the platform support?",
    a: "Networks from 10 to 4,500+ locations run on EZee today. Adding a location takes minutes.",
  },
];
