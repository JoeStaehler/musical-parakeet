export interface Section {
  id: string
  title: string
  body: string
  type: 'text' | 'image'
  imageCaption?: string
}

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  year: string
  role: string
  client: string
  overview: string
  sections: Section[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'checkout-redesign',
    title: 'Checkout Redesign',
    subtitle: 'Reducing cart abandonment by 32% through streamlined UX',
    year: '2024',
    role: 'Lead Product Designer',
    client: 'Retail Platform',
    overview:
      'The existing checkout flow had a 68% abandonment rate driven by excessive form fields, a misleading progress indicator, and poor mobile performance. This project focused on removing friction at every step while preserving conversion quality.',
    sections: [
      {
        id: 'cr-1',
        title: 'The Problem',
        body: 'Users were abandoning at step 2 of a 5-step checkout process. The form required 22 fields — many redundant — and the progress indicator was misleading. Mobile LCP times exceeded 4 seconds, making the experience feel broken before it even began.',
        type: 'text',
      },
      {
        id: 'cr-2',
        title: 'Research & Discovery',
        body: 'We ran 12 usability sessions with existing customers and 8 with first-time buyers. Session recordings revealed that 60% of users stopped at the billing address step. Exit surveys pointed to confusion about why a billing address was required separately when a shipping address had already been entered.',
        type: 'text',
      },
      {
        id: 'cr-3',
        title: 'Design Explorations',
        body: 'Early concepts collapsed all steps into a single scrollable page. Testing showed this helped returning users but confused new ones who lacked context. We settled on a two-step flow: (1) delivery + payment, (2) review + confirm.',
        type: 'image',
        imageCaption: 'Wireframe explorations — single-page vs. two-step flow',
      },
      {
        id: 'cr-4',
        title: 'Final Design',
        body: 'The final design reduced form fields from 22 to 9 through smart defaults, postcode address lookup, and a "same as delivery" toggle. Trust signals — security badges, return policy summary, and live chat — were integrated into a persistent sidebar.',
        type: 'image',
        imageCaption: 'Final checkout UI — desktop and mobile',
      },
      {
        id: 'cr-5',
        title: 'Outcome',
        body: 'Six weeks post-launch: cart abandonment dropped from 68% to 36%. Average checkout time fell from 4:20 to 2:05. Mobile conversion increased by 41%. The project was cited as a key factor in Q4 revenue growth.',
        type: 'text',
      },
    ],
  },
  {
    slug: 'banking-app',
    title: 'Mobile Banking App',
    subtitle: 'Designing for financial clarity across income levels',
    year: '2023',
    role: 'Product Designer',
    client: 'Fintech Startup',
    overview:
      'A greenfield mobile banking application targeting underserved communities with limited financial literacy. The core challenge: designing complex financial tools that felt approachable and trustworthy rather than intimidating.',
    sections: [
      {
        id: 'ba-1',
        title: 'Context',
        body: "The client was launching a challenger bank for users with thin credit files and variable income. Existing banking apps were designed for financially sophisticated users — this one needed to work for someone opening their first bank account.",
        type: 'text',
      },
      {
        id: 'ba-2',
        title: 'User Research',
        body: "We interviewed 20 participants across three income brackets. The critical insight: users didn't distrust the bank — they distrusted themselves. They worried about overdrafts, hidden fees, and making mistakes. Design had to proactively prevent these anxieties.",
        type: 'text',
      },
      {
        id: 'ba-3',
        title: 'Information Architecture',
        body: 'Card sorting sessions revealed users organized features by frequency of use, not by banking category. "Send money" and "check balance" needed to be immediately accessible. We eliminated the traditional account/cards/payments taxonomy in favor of a task-oriented structure.',
        type: 'image',
        imageCaption: 'IA restructuring: traditional vs. task-oriented navigation',
      },
      {
        id: 'ba-4',
        title: 'Design System',
        body: 'We built a component library calibrated for financial data: large legible number displays, color-coded transaction types, and a system of "safety indicators" showing users their financial position at a glance — without requiring them to do math.',
        type: 'image',
        imageCaption: 'Component library — financial display patterns',
      },
      {
        id: 'ba-5',
        title: 'Results',
        body: "Beta launch with 500 users showed 78% 30-day retention — well above the 40% industry average for challenger banks. Support tickets for 'I didn't understand my balance' dropped to near zero after the clarity-focused balance view shipped.",
        type: 'text',
      },
    ],
  },
  {
    slug: 'design-system',
    title: 'Enterprise Design System',
    subtitle: 'Unifying 14 product teams under one design language',
    year: '2023',
    role: 'Design Systems Lead',
    client: 'Enterprise SaaS',
    overview:
      'After years of rapid growth through acquisitions, the company ran 14 distinct product experiences — each with its own patterns, components, and visual language. This project built a shared design system that could serve all teams without stifling their autonomy.',
    sections: [
      {
        id: 'ds-1',
        title: 'The Challenge',
        body: 'With 14 teams, 6 design tools, and no shared component library, design debt had compounded to the point where a single UI change could require updates across dozens of files. Engineering was maintaining 11 separate button implementations.',
        type: 'text',
      },
      {
        id: 'ds-2',
        title: 'Audit & Alignment',
        body: 'We started with a comprehensive audit: 847 unique components across all products, 143 distinct shades of "primary blue," and 31 different body text sizes. The audit report became the business case for investment — and made the scope of the problem undeniable.',
        type: 'text',
      },
      {
        id: 'ds-3',
        title: 'System Architecture',
        body: 'Rather than a top-down mandate, we designed a federated model: a "core" layer maintained by the systems team, and "product" layers owned by individual teams. Core components could be extended but not broken. Teams got flexibility; foundations stayed consistent.',
        type: 'image',
        imageCaption: 'Federated design system architecture diagram',
      },
      {
        id: 'ds-4',
        title: 'Rollout Strategy',
        body: 'We onboarded teams in waves, starting with the two highest-traffic products. Each team was paired with a "systems buddy" who embedded with them for two sprints. Documentation was written by product designers — not systems designers — to reflect real use cases.',
        type: 'image',
        imageCaption: 'Component documentation — anatomy, usage, and accessibility',
      },
      {
        id: 'ds-5',
        title: 'Impact',
        body: 'Twelve months post-launch: design handoff time reduced by 60%. Feature development speed increased by 35% (measured by sprint velocity). Accessibility violations across all products dropped by 89%. The system now serves 120 designers and 300 engineers.',
        type: 'text',
      },
    ],
  },
  {
    slug: 'patient-portal',
    title: 'Patient Portal',
    subtitle: 'Making health records legible for patients, not just clinicians',
    year: '2022',
    role: 'Senior Product Designer',
    client: 'Healthcare Network',
    overview:
      "A regional healthcare network needed to overhaul their patient portal — the primary interface for managing appointments, viewing test results, and messaging care teams. The existing system had a 22% adoption rate among registered users.",
    sections: [
      {
        id: 'pp-1',
        title: 'Starting Point',
        body: 'The legacy portal was designed for clinical completeness, not patient comprehension. Lab results showed raw values with no context. Medication lists used brand names inconsistent with pharmacy labels. Appointment scheduling required 11 clicks minimum. Most users gave up and called instead.',
        type: 'text',
      },
      {
        id: 'pp-2',
        title: 'Research Approach',
        body: "We partnered with the hospital's patient advisory board — 12 regular patients from diverse backgrounds. Rather than standard usability testing, we ran 'understanding sessions': we showed patients their own recent lab results and asked them to explain what they meant. The results were illuminating.",
        type: 'text',
      },
      {
        id: 'pp-3',
        title: 'Key Insight',
        body: "Patients didn't want raw data — they wanted answers to three questions: 'Am I okay?', 'Does my doctor know?', and 'What should I do next?' Every design decision was filtered through this lens. We replaced value tables with plain-language summaries and clear status indicators.",
        type: 'image',
        imageCaption: 'Before/after: lab results view',
      },
      {
        id: 'pp-4',
        title: 'Design Decisions',
        body: 'Test results now show a plain-language summary first, with technical data collapsed and accessible on demand. Medications are cross-referenced with pharmacy names. Appointments can be scheduled in 3 clicks. The message center uses email-like conventions rather than clinical ticketing patterns.',
        type: 'image',
        imageCaption: 'Redesigned dashboard — patient view',
      },
      {
        id: 'pp-5',
        title: 'Outcomes',
        body: "Eighteen months post-launch: portal adoption grew from 22% to 61%. Patient-initiated message volume increased by 110% — an indicator that patients were engaging more proactively with their care. Call center volume for 'I don't understand my results' decreased by 44%.",
        type: 'text',
      },
    ],
  },
]
