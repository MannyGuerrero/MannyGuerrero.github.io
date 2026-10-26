/**
 * ALL COPY LIVES HERE. Edit this file, not the components.
 *
 * Rules:
 * 1. No invented numbers. Every figure needs a source (see SOURCES in HANDOFF.md).
 * 2. No client, product, vendor or partner names. Describe the thing.
 * 3. No em dashes, en dashes, double hyphens, arrows or emoji.
 * 4. Copy wrapped in the c() helper is unconfirmed. It renders normally, but the
 *    release build refuses to pass until you verify it and remove the wrapper.
 */

export type T = string | { t: string; confirm: true };
export const c = (t: string): T => ({ t, confirm: true });
export const text = (x: T) => (typeof x === "string" ? x : x.t);
export const needsConfirm = (x: T) => typeof x !== "string";

export const site = {
  name: "Manny Guerrero",
  title: "Head of Product",
  roleLine: "Head of Product, Umbrage (Bain & Company)",
  linkedin: "https://www.linkedin.com/in/mannysguerrero/",
  // Email is assembled in the browser so the plain address never appears in the HTML.
  emailUser: "manny.guerrero.gx",
  emailDomain: "gmail.com",
  portrait: "/images/manny-800.webp",
  portraitAlt: "Portrait of Manny Guerrero",
};

// The industry claim is computed from the tiles below, so it cannot drift.
// 10 or more tiles reads "10+". Fewer reads the exact count. Delete a tile you cannot support.
export const industries: { name: string; line?: T }[] = [
  { name: "Healthcare", line: "Scheduling platform with propensity models for a medical retail company" },
  { name: "Oil and gas", line: "Autonomous frac completion controls on a unified field data platform" },
  { name: "Aviation and airlines", line: "One modernization plan across 14 undocumented legacy systems" },
  { name: "Utilities", line: "LLM driven unification of 100+ vendor data schemas" },
  { name: "Aerospace and defense", line: "AI transformation roadmap and proof of concept for a major defense contractor, starting with the software lifecycle" },
  { name: "Retail", line: "Loyalty app that reached 80,000+ users in three weeks" },
  { name: "Banking", line: "Model governance platform for financial institutions" },
  { name: "Blockchain", line: "Gas trading platform with faster reconciliation and settlement" },
  { name: "Finance", line: "One governed delivery model for a regulated payments company" },
  { name: "Manufacturing", line: "Remediation of core business systems and a modular target architecture for an industrial manufacturer in Mexico" },
  { name: "Pharma", line: "LLM assisted benefits and prior authorization submissions for a medication access platform" },
];

export const industryCount = industries.length;
export const industryLabel = industryCount >= 10 ? "10+" : String(industryCount);

export const heroes = {
  clients: {
    headline: "How I lead product, build teams, and ship in the agent era.",
    sub: `At Umbrage (Bain & Company), the product and AI delivery studio within the firm, I help organizations across ${industryLabel} industries turn their hardest problems into products people rely on.`,
    cta: { label: "Connect on LinkedIn", kind: "link" as const, href: site.linkedin },
    ctaAlt: { label: "Email", kind: "email" as const },
  },
  peers: {
    headline: "How I lead product, build teams, and ship in the agent era.",
    sub: "At Umbrage (Bain & Company), the product and AI delivery studio within the firm, I run product craft as agents start writing the code and product managers start building.",
    cta: { label: "Connect on LinkedIn", kind: "link" as const, href: site.linkedin },
    ctaAlt: { label: "Email", kind: "email" as const },
  },
};

// Counters: verified facts only (current portfolio). See HANDOFF.md, "Numbers".
export const counters = [
  { value: industryCount >= 10 ? 10 : industryCount, suffix: industryCount >= 10 ? "+" : "", label: "Industries" },
  { value: 4, suffix: "+", label: "Latin American markets" },
  { value: 80000, suffix: "+", label: "Active users within three weeks of a loyalty app launch" },
];

export const gap = {
  eyebrow: "The problem",
  headline: "Plenty of AI pilots. Far fewer products people trust.",
  body: "The models are rarely the problem now. What stalls teams is picking the right first use case, making agents work inside legacy systems and messy data, proving the output is reliable, and getting people to change how they work. That is as much a product problem as a technical one.",
  first: "Strategy to proof of value. I help set the strategy and pick the first use case: who it is for, what value it has to prove (not just that it works), and what stays out.",
  second: "Proof of value to production. This is one of the places I work, leading the teams that carry a proven idea through delivery, adoption and scale.",
};

export const owns: { n: string; title: string; line: T }[] = [
  { n: "01", title: "Product strategy and 0 to 1 delivery", line: "I have taken products from first idea to launch across industries, and I still do: defining the problem, the first release and what it has to prove, then leading discovery, build and launch with the team. That is how a loyalty app got to 80,000+ users in three weeks and 100+ vendor schemas ended up in one system." },
  { n: "02", title: "Business P&L and revenue", line: "Together with the studio's leadership team, I am accountable for the practice's P&L and revenue. Part of why I was brought in was to grow our Latin America business from one account into many. In my first six months, I was directly involved in securing new growth accounts across the region, and we hit our annual revenue target by September 2026." },
  { n: "03", title: "Studio growth and new markets", line: "With the studio's leadership team, I help take the studio into new parts of the world, including Mexico, Brazil, Argentina and Chile, as well as London, through proven delivery and delivery teams on the ground." },
  { n: "04", title: "AI native delivery", line: "I am shaping Adaptive Delivery with our engineering and product leads: a way for small teams to deliver with agents, evaluations and human checkpoints." },
  { n: "05", title: "Product craft and talent", line: "I set the bar for how product managers are hired, coached and promoted, lead the principals who run client engagements, and built our AI proficiency ladder." },
  { n: "06", title: "Enterprise product experience", line: "Enterprise products have been the thread through my whole career, and I still build them: products used by Fortune 500 companies." },
];

export type Case = {
  id: string;
  industry: string;
  title: string;
  stat?: { value: string; label: string };
  context: string;
  outcome: string;
  role: T;
  decisions?: T;
  differently?: T;
};

export const cases: Case[] = [
  {
    id: "retail-loyalty",
    industry: "Retail, Mexico",
    title: "Loyalty app for a convenience retailer",
    stat: { value: "80,000+", label: "active users in three weeks" },
    context: "A consumer loyalty app for a convenience retailer in Mexico, taken from concept to launch.",
    outcome: "Reached the top 6 of its App Store category in Mexico, with 80,000+ active users within three weeks of launch.",
    role: "I owned the product from concept to launch: strategy, requirements, and the team that built and shipped the app.",
  },
  {
    id: "utility-data",
    industry: "Utilities",
    title: "Vendor data unification for a major U.S. utility",
    stat: { value: "100+", label: "vendor data schemas unified" },
    context: "Many vendors, each with its own data format and no shared system. The goal: a foundation AI products could stand on.",
    outcome: "100+ vendor schemas unified into one system through LLM driven mapping. It is now the base for further AI products.",
    role: "I owned product direction and oversaw delivery of the data and AI workstream, from the mapping approach to the team doing the work.",
  },
  {
    id: "payments-model",
    industry: "Finance",
    title: "Governed delivery model for a regulated payments company",
    stat: { value: "35%", label: "faster from prioritization to first commit" },
    context: "Product and engineering ran on separate lifecycles inside a regulated environment, which slowed every release.",
    outcome: "One governed operating model for both, cutting the time from prioritization to first commit by 35%.",
    role: "I designed the operating model and led its rollout, with oversight of the product and engineering teams that adopted it.",
  },
  {
    id: "blockchain-trading",
    industry: "Blockchain and energy",
    title: "Blockchain based gas trading platform",
    context: "A joint venture needed to replace outdated systems that supported gas trading.",
    outcome: "A platform that shortened reconciliation and settlement, freed up capital and sped up deal closures.",
    role: "I led strategy and requirements, and oversaw delivery of the platform and the team building it.",
  },
  {
    id: "frac-platform",
    industry: "Oil and gas",
    title: "Control platform for frac completions",
    stat: { value: "43%", label: "client revenue growth in six months" },
    context: "A redesign and rebuild of an autonomous frac completion control system, with a unified data platform for field operations.",
    outcome: "As the platform was adopted, the client reported 43% revenue growth and 70% headcount growth over six months. These are the client's results, built by a team effort.",
    role: "I owned strategy and delivery for the engagement, and oversaw the team across the control system rebuild and the data platform.",
  },
  {
    id: "patient-scheduling",
    industry: "Healthcare",
    title: "Patient scheduling platform for a medical retail company",
    context: "Corporate administrators had no central control over appointment availability across centers.",
    outcome: "An admin platform connected to online booking, with propensity models and granular control of availability.",
    role: "I owned requirements and the roadmap, and oversaw delivery of the admin platform and its link to online booking.",
  },
];

export const alsoWorked: { industry: string; title: string }[] = [
  { industry: "Aviation", title: "One modernization plan for 14 undocumented legacy systems at an aviation maintenance provider" },
  { industry: "Manufacturing", title: "Digital track and trace for tubular goods, built over 2.5 years" },
  { industry: "Energy", title: "Mobile app for on demand fleet fueling at a global energy company" },
  { industry: "Banking", title: "Model governance platform for financial institutions (prior employer)" },
];

export const adaptive = {
  eyebrow: "How I work",
  headline: "Adaptive Delivery",
  body: "Forward deployed teams, the model AI labs use to get their models working inside customers, put a small team next to the client and build evaluations from the client's real scenarios. Adaptive Delivery takes that approach and builds a delivery model around it, on three ideas.",
  pillars: [
    { n: "1", title: "Intent engineering", body: "Write the intent with the client instead of long requirement documents. A good spec is one an agent can check its own work against: worked examples, expected outputs and edge cases written down. If the client does not have one, the first phase produces it." },
    { n: "2", title: "Context architecture", body: "Design the environment agents work inside: the data, tools, permissions and rules, and the contracts where one part of the product meets another. That is what makes their output trustworthy in real systems." },
    { n: "3", title: "Continuous iteration", body: "Agents build, test and review in short loops. People set direction, test behavior and make the calls. Each engineer owns a slice of the product and answers for it, and nothing merges on a decision they cannot explain." },
  ],
};

export const craft = {
  eyebrow: "Craft",
  headline: "The product manager role is converging with the builder role.",
  body: "When agents write the code, the scarce skills are judgment, context and clear intent. I coach product managers to build and evaluate with AI, not just write specs for it.",
  caption: "Each role keeps its craft. What disappears are the handoffs between them.",
};

export const ladder: { level: string; name: string; line: T }[] = [
  { level: "L1", name: "Foundational", line: "Uses AI tools for individual tasks with guidance." },
  { level: "L2", name: "Practitioner", line: "Builds repeatable prompts and workflows into daily work." },
  { level: "L3", name: "Integrator", line: "Embeds agents into team delivery and reviews their output critically." },
  { level: "L4", name: "Architect", line: "Designs context, evaluation and guardrails that others reuse." },
  { level: "L5", name: "Expert", line: "Shapes the practice across teams and measures its impact." },
];

export const leadership = {
  eyebrow: "Leadership",
  headline: "How I run a craft",
  items: [
    { title: "A clear bar", body: "We hire for delivery, communication, commercial instinct and relationship skills." },
    { title: "Principals own outcomes", body: "Senior product managers own client results and growth, not just delivery." },
    { title: "Standards are written down", body: "Expectations live in a playbook people coach against, and we update it as the work changes." },
    { title: "Clarity over fear", body: "We set expectations with clear language and support, not pressure." },
  ],
};

export const writing: { title: string; href: string; date?: string }[] = [
  // Add at least 3 LinkedIn posts or essays. The section stays hidden until then.
];

export const contact = {
  headline: "Let's talk.",
  clients: "",
  peers: "I'm always glad to connect with other product leaders, founders and anyone who likes trading ideas.",
};


// Scrolling ticker under the header: industries and regions only.
export const regions: string[] = ["USA", "Mexico", "Brazil", "Argentina", "Chile", "EU", "UK"];
export const ticker: string[] = [...industries.map((i) => i.name), ...regions];
