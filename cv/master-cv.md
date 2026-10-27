# MASTER CV — Ibrahem Hassan (source of truth, never sent as-is)

> How to use: every variant in `cv/variants/` is cut from this file. Each bullet ends with an evidence tag `⟨…⟩` pointing to `evidence/projects/*.md` — strip the tags in the final PDF.
> `[LAPTOP-2]` = placeholder, fill from the other laptop. `[VERIFY]` = old-CV wording kept for now, must be confirmed with evidence or removed.
> Last updated: 2026-10-27 (laptop 1 + laptop 2 evidence).

---

## Header

**IBRAHEM HASSAN**
Senior Frontend Engineer · React · Next.js · React Native · TypeScript   ← headline changes per variant (Mid: "Frontend Engineer")
Alexandria, Egypt (open to Cairo / hybrid) · +20 127 679 0349 · hibrahem266@gmail.com
linkedin.com/in/ibrahem-hassan-521956247 · github.com/ibrahem-hassan2000 · Military status: Exempted

---

## Summary (long form — variants pick 3–4 lines)

Frontend engineer with 4 years of commercial experience building React, Next.js and React Native products for healthcare, B2B SaaS and agency clients. At nWeave I built a healthcare-operations knowledge platform's frontend from the first commit — 27 screens, role-based access with MFA, and 551 automated tests — and designed a 25-module TanStack Query data layer for a large healthcare exchange platform. I care about typed, tested code, a reusable component system, and shipping what the design actually shows. I also build interactive 3D/motion sites (Three.js, React Three Fiber, GSAP) and mobile apps with Expo, and I've mentored two teammates.

Summary angles per archetype (pick one):
- **Fintech:** "…correct, well-tested frontends with role-based access, MFA and typed API contracts, including invoicing, double-entry accounting and OTP-verified e-signatures in a Next.js business platform, plus React Native apps with biometrics and offline-first data."
- **Healthtech:** "…complex clinical and billing workflows: a formula engine for healthcare billing and a review-and-approval knowledge platform for a healthcare operations client."
- **Enterprise:** "…in large multi-team codebases (3.9k-commit repo, Jira-ticketed branches, code review) and as the lead frontend on greenfield client products."
- **Product SaaS:** "…design systems in Storybook, typed data layers from OpenAPI, and test suites that let a team move fast."
- **Mobile:** "…React Native / Expo apps with background audio, background GPS, home-screen widgets, biometrics and offline-first sync. I led a Qur'an-and-running app that is live on Google Play and the App Store."
- **Agency / Creative:** "…interactive 3D and motion websites with React Three Fiber, Three.js, GSAP and Lenis, delivered through client feedback rounds."

---

## Skills (only what has evidence; order changes per variant)

- **Languages:** TypeScript, JavaScript (ES2022+), HTML, CSS
- **Frameworks:** React 19, Next.js 14 (App Router — Bites, 192 commits), React Native + Expo, Vite, Astro
- **Data & state:** TanStack Query, Zustand, React Hook Form, Zod, OpenAPI-generated types, REST, Supabase, Firebase
- **UI:** Tailwind CSS v4, shadcn/ui, Radix UI, PrimeReact, MUI, Storybook, Atomic Design, TipTap, dnd-kit
- **Testing & quality:** Vitest, React Testing Library, Jest, Playwright (browser runner), Storybook a11y, oxlint
- **Motion & 3D:** GSAP (ScrollTrigger, SplitText), Three.js, React Three Fiber, Lenis, Motion, SVG/Canvas, WebGL
- **Mobile:** Expo, react-native-track-player, background GPS (expo-location / task manager), Android widgets, biometrics, notifications, offline-first, i18next (Arabic/English), TestFlight / Google Play releases
- **Real-time & integrations:** LiveKit (video calls), Strava OAuth, Firebase (Auth, Crashlytics, Messaging)
- **Auth & access:** role/capability-based routing, MFA flows, session handling, route guards
- **Tools & process:** Git, Bitbucket, GitHub, Jira, Figma, Vercel, Agile/Scrum, AI-assisted development (Claude Code-style context docs)
- **Removed vs old CV (no evidence):** Azure MSAL, SignalR integration, JSXGraph, Redux Toolkit, Webpack, PWA/Workbox (except Orchard PWA — keep as project detail), "WCAG 2.1 compliant".

---

## Experience

### nWeave (Osloop) — Software Engineer (Frontend) · Alexandria · 10/2025 – Present
Healthcare and B2B SaaS products, agency websites, and mobile apps (including ONE14 QARDIO, live on both stores).

**Smart FAQ System — healthcare operations knowledge platform (lead frontend, Oct 2026)**
- Built the frontend from the first commit — React 19, TypeScript, TanStack Query, Tailwind and shadcn/ui — with 27 Figma screens for desktop and mobile, shipped in about three weeks (166 of 173 commits). ⟨smart-faq⟩
- Implemented three roles with capability-based routing and navigation, invitation activation, session-expiry handling and MFA for admins. ⟨smart-faq⟩
- Typed the full API contract (94 endpoints) from OpenAPI and built the data layer with a typed error catalogue, then removed every mock once the ASP.NET Core backend was live. ⟨smart-faq⟩
- Built an editorial workflow: TipTap rich-text editor, draft → submit → return or publish, version comparison, archive and move, an audit log with filters, and a drag-and-drop category tree. ⟨smart-faq⟩
- Wrote 551 unit and component tests (Vitest, Testing Library) and 75 Storybook stories with accessibility checks for an Atomic-Design component system. ⟨smart-faq⟩
- Fixed list performance by rendering one table layout and stopping per-row menu and badge re-renders. ⟨smart-faq⟩
- Built an AI FAQ proof of concept that matches intent across Arabic, Franco-Arabic and English, to show the client what the product could do. ⟨side-showcases⟩

**AHS Medical Exchange — healthcare B2B platform (Dec 2025 – Feb 2026)**
- Built a formula builder and evaluation engine for healthcare billing: drag-and-drop editor, custom parser and evaluator on mathjs, live validation and a test panel. It shipped and later payment features build on it. ⟨ahs-medx⟩
- Designed a TanStack Query layer of 25 domain modules to replace a custom Axios hook, migrated core flows (orders, invitations, messaging, staff, billing) and rolled it out in stages. ⟨ahs-medx⟩
- Wrote the team's React Query implementation guide. ⟨ahs-medx⟩
- Worked in a 3.9k-commit, multi-team codebase through Jira-ticketed branches and code review. ⟨ahs-medx⟩

**OsLoop studio website (Oct 2026)** — live: osloop-website.vercel.app
- Built the studio's website with React Three Fiber and GSAP: a draggable 3D glass hero, a 3D markets globe and a scroll-driven process ring, responsive from 320px with lazy-loaded media. ⟨osloop-website⟩
- Built four custom loading screens and a script that exports the 3D brand icon to GLB, OBJ and STL; delivered two client feedback rounds (26+ tracked items). ⟨osloop-website⟩

**ONE14 QARDIO — Qur'an & running app, product & technical lead (Apr – Sep 2026)** — live on Google Play (`com.one14.qardio`, 100+ downloads) and the App Store (id6796342246, released 08/2026)
> He led the project. A teammate wrote the code through an AI-assisted workflow, so the wording is "led / directed / drove", never "built" or "coded". Dates come from the repo (04/2026 → 09/2026).
- Led product and technical direction for a Qur'an-and-running app (React Native / Expo, Firebase) live on Google Play and the App Store. Planned features, UX flows and technical approach and directed an AI-assisted build with a teammate. ⟨one14-qardio, user-answers⟩
- Drove the fix for GPS distance under-counting (a 30 km run recorded as ~25 km). Identified that coarse location filters were discarding real movement, then moved tracking to 1 Hz high-accuracy fixes with a tuned software filter. Field-tested against Strava and Apple Watch on paired iPhone and Android devices. ⟨one14-qardio⟩
- Owned on-device QA across iOS and Android: UI, performance and usability reviews through TestFlight and internal Android builds. ⟨one14-qardio, user-answers⟩
- Shaped the Qur'an audio experience (per-ayah vs full-surah playback with timestamp sync, lock-screen controls) and the Strava integration. ⟨one14-qardio⟩
- `[NEEDS-PROOF]` "measures distance better than Strava / smartwatches". Don't use it without a logged comparison.

**Other nWeave work**
- Boost-KGoal (pelvic-health workouts): built the pulse-pattern editor and pattern-matching configuration, and secured the admin area with route guards and tests. ⟨nweave-other⟩
- Trackoo (Muslim fitness app, React Native): built the Quran audio player with lock-screen controls, the stories viewer and the feed's TanStack Query data layer; co-built background GPS tracking and a 3D story-cube transition with a teammate. ⟨nweave-other⟩
- ElevateMate (careers platform): built the job dashboard, job-details page and a validated application form with file upload. ⟨nweave-other⟩
- The Code and Zeustra (agency sites, React/Astro/GSAP): built sections, video viewer, SEO data and legal pages. ⟨nweave-other⟩

**Team**
- Mentored two teammates through code reviews and pairing. ⟨user-answers⟩

### Bites — Frontend Developer (Part-time) · Remote (Cairo-based) · 09/2025 – 04/2026
All-in-one business platform (bites.com) on Next.js 14: finance, sales CRM, contracts, payments and vertical modules.
- Built finance modules: invoices (builder, payments, attachments, email tracking), bills, expenses, debit notes, receivables and payables reports, and double-entry journal reports. ⟨bites-mart⟩
- Added OTP-verified e-signatures to contracts and invoices and built the contract-creation workflow. ⟨bites-mart⟩
- Co-built Theater OS, a cinema and events module: admin for movies, food, seating templates and ticket types, plus a public booking flow with seat selection, food ordering and checkout. ⟨bites-mart⟩
- Built sales CRM screens (orders, quotes, accounts, opportunities) with Next.js 14, TanStack Query, Zustand, react-hook-form + Zod and MUI. ⟨bites-mart⟩
- Worked in a 14-person team: 192 commits over 7 months part-time, 190 merged to production, the second-most of any contributor. ⟨bites-mart⟩

### Profound Agency — Frontend Developer · Alexandria · 07/2024 – 09/2025
`[LAPTOP-3]` Collect repos and commits (not on laptops 1 or 2). Old-CV content to verify:
- ~~Kyasco~~ moved to Projects: the user says it is a **personal** project, not Profound work (2026-10-27).
- `[VERIFY]` okoRent — peer-to-peer rental marketplace in Next.js: storefront, admin panel, live chat, notifications, user roles.
- `[VERIFY]` Shared Tailwind + Radix component library reused across client apps — **count must come from code, not "30+".**
- `[VERIFY]` ISR, image optimisation, code-splitting — **no Lighthouse numbers until measured.**
- `[LAPTOP-2]` Takhawy (trip-sharing, Next.js — GitHub `Takhawy_Next`, live takhawy-next.vercel.app), Edubrain (AI homework assistant, Next.js) — which company?

### Aquadic — Frontend Developer · Alexandria · 10/2022 – 07/2024
`[LAPTOP-2]` Collect repos. Old-CV content to verify:
- `[VERIFY]` Built responsive React and Next.js websites for 10+ clients (e-commerce, corporate) — count clients.
- `[VERIFY]` Centralised Axios layer with interceptors for auth tokens, unified errors and retries.
- `[VERIFY]` Translated Figma designs into responsive layouts. (Remove "−20% bounce", "−35% FCP" — no proof.)
- `[LAPTOP-2]` Megaminds Academy (HTML/CSS/JS) — which company? Public GitHub client sites from this period: anyShop, e-comerce, rehla, sanaTes, rashaktk, erpDash.

---

## Projects

### Kalima — English vocabulary app · Personal · 08/2026 – 09/2026 · GitHub
- Built an Arabic/English vocabulary app in React Native (Expo) with spaced repetition and Gemini-generated content, offline-first with Supabase sync. ⟨kalima⟩
- Added an Android home-screen widget, fingerprint sign-in, scheduled reminders and cached text-to-speech. ⟨kalima⟩

### The Orchard (البستان) — interactive learning game · Personal · 09/2026 · apple-five-eta.vercel.app
- Built a bilingual learning game with GSAP, SVG and Canvas — open a fruit, plant the seed, grow and harvest — installable as an offline PWA. ⟨side-showcases⟩

### Pitch sites — ARVAmethod & Makka Juice · 09/2026 · arvamethod.vercel.app · makka-juice-lovat.vercel.app
- Built pitch websites with GSAP ScrollTrigger, Lenis, Three.js and lazy-loaded WebGL — a landing page in four design directions and a cinematic scroll-driven brand concept. ⟨side-showcases⟩

### Kyasco — wholesale ordering app · Personal · 01/2026 – 04/2026 · GitHub `ibrahemhassan-cpu/kyascoApp` (optional, mobile variant only)
- Built an Expo / React Native app for his own plastic-materials wholesale idea, using Expo Router, TanStack Query and axios. Only 2 commits, so keep it as a one-line project or leave it out. ⟨laptop-2-macbook, user-answers⟩

### `[LAPTOP-3]` slots
- okoRent · Takhawy · Edubrain · Megaminds · Profound and Aquadic client work.

---

## Education
**B.Sc. Computer Science** — Faculty of Science, Minia University · 10/2018 – 06/2022

---

## Numbers bank (all measured — safe to use)
| Number | Source |
|---|---|
| 166 of 173 commits, Smart FAQ | git |
| 27 screens, 3 roles, 94 typed endpoints | repo + context docs |
| 551 tests / 55 files, 75 stories, ~40k LOC | repo count 2026-10-27 |
| ~3 weeks Smart FAQ build (Oct 4 → Oct 26) | git dates |
| 25 TanStack Query modules (AHS) | `src/query/` |
| 3.9k-commit AHS repo | git |
| 26+ client feedback items (Osloop round 1) | commit message H-01→H-26 |
| Mentored 2 | user |
| Bites: 192 commits, 190 on production, #2 of 14 contributors, 7 months part-time, 78 pages created | git (laptop 2) |
| ONE14: live on Google Play (100+ downloads) and App Store (08/2026) | store pages, checked 2026-10-27 |
| ONE14: −17% distance under-count on a 30 km run before the GPS fix | `docs/GPS_DISTANCE_ACCURACY_TUNING.md` |
| **To add:** Lighthouse scores of live sites | run before use |

## Removed from the old CVs (do not bring back without evidence)
~40% fewer payloads · Lighthouse 62→94+ · FCP −35% · bounce −20% · 30+ components · mentored 3 · Azure MSAL SSO · SignalR integration · QuestionMaker/Clinical rules engine · JSXGraph plotting · ElevateMate virtualized TanStack Table / LocalForage · Trackoo GPS as solo work.
