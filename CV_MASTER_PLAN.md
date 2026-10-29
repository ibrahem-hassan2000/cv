# CV Master Plan — Ibrahem Hassan (Frontend: React / Next.js / React Native)

> **ملخص بالعربي:** الملف ده هو "المخ" بتاع المشروع. أي Claude يفتحه على أي لاب من التلاتة يعرف الهدف، القواعد، احنا وصلنا لفين، ويكمل من أول خطوة مش DONE في جدول الـ STATUS. الهدف: نجمع كل شغلك من التلات لابات + GitHub + Bitbucket، نتأكد من كل حاجة بدليل، نبحث في الشركات الكبيرة والمتوسطة في مصر، ونطلع CV أساسي قوي + نسخ مخصوصة لكل نوع شركة (ترتيب ومشاريع مختلفة).

---

## 0. Goal

Build a **Master Evidence Base** of everything Ibrahem has built, then produce:

1. **One master CV** (everything, long form — never sent, it's the source).
2. **Targeted CV variants** — one per company *archetype* (fintech, healthtech, e-commerce, SaaS, mobile-first, agency/creative, enterprise/outsourcing), and later per specific company when he applies.
3. Supporting assets (optional, see §7): LinkedIn rewrite, GitHub profile clean-up, cover-letter templates, interview story bank.

Success = each CV passes ATS keyword checks for its target, every bullet is defensible in an interview, and the top third of page 1 makes a recruiter stop.

---

## 1. Rules (never break these)

1. **Evidence first.** Every bullet in a CV cites an entry in `inventory/`. If a number (%, ms, Lighthouse score, users) has no evidence, it's marked `[NEEDS-PROOF]` and the user is asked — never invented, never inflated.
2. **One identity map.** The user commits under several identities. Only these count as his:
   - `ibrahem.hassan@osloop.dev` (name "Ibrahem Hassan" / "ibrahem hassan")
   - `hibrahem266@gmail.com` (names "ibrahem-hassan2000", "ibrahem hassan", "hibrahem266@gmail.com")
   - `110791444+ibrahem-hassan2000@users.noreply.github.com` (GitHub web/PR commits, found on laptop 2)
   - `hibrahem226@gmail.com` (name "ibrahem-hassan2000") — typo of the gmail ("226"), found on laptop 3, used 2023–2025. All his Profound commits use it. Confirmed by the user 2026-10-27.
   - GitHub accounts: `ibrahem-hassan2000`, `ibrahemhassan-cpu`
   - ⚠️ **NOT him:** `IbrahimNweave <ibrahim@nweave.com>`, `Ibrahim Mustafa (ibra-mustafa)`, `Hagar Hassan`. Do not count their commits.
   - Add any new identity found on laptop 2/3 to this list.
3. **Contribution honesty.** In team repos, describe only what *his* commits/branches touched. "Contributed to" vs "Built" vs "Led" must match reality.
4. **Client confidentiality.** Private client code (nWeave/Bitbucket) is never copied out — only facts about what he built. No secrets, keys, or customer data in this folder.
5. **No publishing without review.** No git push, no uploads, no sending CVs/emails before the user sees it and says yes.
6. **Language.** Chat with the user in Egyptian Arabic. CV content in English (ATS-friendly).
7. **Keep this file current.** After each step: update §9 STATUS and §10 Session Log.
8. **Show what he built, not what happened to it later** (user, 2026-10-28). If his code was built and merged/delivered, the CV says he built it, even if a teammate later rewrote, simplified or removed it, or the client dropped it. Guardrails: (a) the work must really be his (rule 3); (b) never claim results that didn't happen (users, % gains, "used by X") — present-tense impact needs evidence; (c) the Interview Handbook keeps the full story so he can answer "is it still like that?" honestly.

---

## 2. Folder layout

```
cv/
├── CLAUDE.md                  ← auto-read entry point
├── CV_MASTER_PLAN.md          ← this file (the brain)
├── inventory/
│   ├── laptop-1-dell.md       ← repos, commits, features found on this laptop
│   ├── laptop-2-macbook.md    ← MacBook Pro M4
│   ├── laptop-3.md            ← Windows 11 (C:\Users\hibra): Profound, Aquadic, old personal repos
│   ├── github.md              ← public repos, both accounts
│   └── user-answers.md        ← facts only the user can give (metrics, dates, roles)
├── evidence/
│   └── projects/<project>.md  ← deep dive per project: what he did, features, commits, impact, keywords
├── market/
│   ├── companies.md           ← Egypt companies: what they do, stack, archetype, size, hiring notes
│   └── archetypes.md          ← what each company type values → which projects lead
├── cv/
│   ├── master-cv.md           ← everything, source of truth
│   ├── variants/<archetype>.md
│   └── output/                ← final PDFs / DOCX
└── extras/                    ← LinkedIn, cover letters, STAR stories (optional)
```

---

## 3. Phases

### Phase 1 — Collect (per laptop)  
On **each** laptop:
1. Find every git repo (home, Desktop, Documents, Downloads, other drives) excluding `node_modules`.
2. For each repo: remote, stack (package.json), total commits, **his** commits (per §1.2), date range, team size (shortlog).
3. Find non-git project folders too (zips, dist, design assets).
4. Write `inventory/laptop-N.md` using the same table format as laptop-1.

### Phase 2 — Deep dive per project → `evidence/projects/*.md`
For each project where he has meaningful work:
- Read his commit messages + diffs (`git log --author=... --stat`, `-p` on key commits).
- Extract: features he built, refactors, bugs fixed, perf work, tests, libraries introduced.
- Measure what can be measured honestly: # modules touched, # components, test count, bundle size, Lighthouse (run it on live URLs), app store links.
- Write 3–6 candidate bullets per project (Action → What → Tech → Result), each with its evidence pointer.
- Tag keywords for ATS (e.g. `TanStack Query`, `SSR`, `RTL/i18n`, `Expo EAS`, `Playwright`).

Template for each project file:
```
# <Project>  | company/context | dates | role | team size
Stack:
His commits: N (identity, date range)  | Live: url | Store: url
## What it is (1–2 lines)
## What HE did (bullets with commit hashes / files)
## Measurable impact (only with proof)  [NEEDS-PROOF] items listed
## Candidate CV bullets
## Archetype fit: fintech ★☆☆ | health ★★★ | ecommerce … 
## Interview story (STAR) — optional
```

### Phase 3 — Market research → `market/companies.md`
For each company in the target list (§6): what the product is, frontend stack (job posts, engineering blogs, StackShare, LinkedIn JDs, Wuzzuf), size, city / remote, seniority they hire, interview style, and **which of his projects matter most to them**.
Sources: company careers pages, LinkedIn Jobs, Wuzzuf, Glassdoor, engineering blogs. Mark each fact with source + date.

### Phase 4 — Master CV → `cv/master-cv.md`
Rewrite from evidence: summary, skills (grouped, no fluff), experience (per company), projects, education. Fix the issues listed in §8.

### Phase 5 — Variants → `cv/variants/*.md` + PDFs
Per archetype: reorder projects, swap bullets, change summary headline + skills order, keep 1–2 pages. Run an ATS keyword check against 2–3 real JDs per archetype.

### Phase 6 — Per-job CVs (on request only)
**Changed 2026-10-27 by the user:** CVs are no longer regenerated whenever new evidence arrives. New facts only update `inventory/`, `evidence/` and `master-cv.md`.
When the user says "I want to apply to this job" (with the posting): read the job post, pick the best-fitting projects and bullets from `master-cv.md`, mirror the job's keywords honestly, keep 1–2 pages, export the PDF to `cv/output/<company>-<role>.pdf`, and log it (company, role, date, file) in `cv/applications.md`. The four files in `cv/variants/` are starting templates.

### Phase 8 — Interview Handbook (project guides) → `project-guides/`
**Added 2026-10-28 by the user; redesigned the same day after his feedback** ("not readable, hard to find things; I want to enjoy opening it and learn from it; why did I use X and not Y, could both work, is there something better"). Now a one-page app: `index.html` + `assets/app.js` + one data file per project (`data/<id>.js`) + `data/concepts.js`. Sidebar with project logos; Arabic / English / Both; tabs per project: Overview · **Decisions** (chose / alternatives / why / both together? / better today? / sentence to say / concept link) · How it works (flow diagrams, pattern sketches) · Hooks · Problems solved · Interview (STAR, Q&A, terms, Don't say, evidence). **No screenshots** (user, 2026-10-28) — logos from the repos only. Research comes from **reading the code on the laptop that has it**, not only from `evidence/`. Rules, research steps and template: `project-guides/README.md`, `project-guides/data/_template.js`. If the research shows a CV bullet is wrong, fix `cv/master-cv.md` and the evidence file too.

---

## 4. Multi-laptop workflow

- This folder is the single source of truth. Move it between laptops via **(decision pending — see §11 Q1)**: private GitHub repo / Google Drive / USB.
- On laptop 2 and 3: open this folder, tell Claude "كمل الخطة" → it reads `CLAUDE.md` → runs Phase 1 for that laptop → writes `inventory/laptop-N.md` → updates STATUS.
- After all three are collected, **all further work happens on one laptop**: **laptop 2 (MacBook Pro M4)**, the user's main personal laptop (decided 2026-10-27).

---

## 5. Archetypes → what leads the CV

| Archetype | What they value | Lead projects (current guess, refine in Phase 2) |
|---|---|---|
| Healthtech / Enterprise SaaS | complex forms, RBAC, SSO, real-time, data correctness | AHS MedX (nWeave), Boost-KGoal, Smart FAQ |
| Fintech | security, auth, state correctness, testing, mobile | AHS (MSAL/RBAC), Smart FAQ (Playwright), ONE14, Kalima |
| E-commerce / Quick-commerce / B2B | performance, i18n/RTL, catalogs, checkout, dashboards | Kyasco, okoRent, Makka Juice, Profound work |
| Product SaaS (B2B tools) | design systems, tables, testing, DX | Smart FAQ, ElevateMate, design system (Profound) |
| Mobile-first | RN/Expo, background tasks, offline, store releases | ONE14 QARDIO, Trackoo, Kalima |
| Agency / Creative / Marketing | motion, 3D, pixel-perfect, Core Web Vitals | Osloop website, Apple clone, Arvamethod, Zeustra, The Code |
| Enterprise / Outsourcing | breadth, Azure, process, many clients | AHS (Azure MSAL, SignalR), Aquadic 10+ sites |

---

## 6. Target company seed list (Egypt) — TO VERIFY in Phase 3

Not verified yet. Phase 3 confirms each one's product, stack, and whether they hire React/Next/RN frontend.

- **Fintech:** Paymob, Fawry, valU, MNT-Halan, Thndr, Telda, Khazna, Money Fellows, Sympl, Klivvr, Axis, Lucky, Contact
- **Healthtech:** Vezeeta, Yodawy, Chefaa, Shezlong
- **E-commerce / Quick-commerce / Logistics / B2B:** Breadfast, Rabbit, Talabat (Delivery Hero), Noon, Cartona, MaxAB-Wasoko, Bosta, Trella, Homzmart, Nawy, Sylndr, elmenus
- **Product SaaS / Tech:** Instabug, Bluworks, Foodics (Cairo), Zid / Salla (Cairo teams), ExpandCart, Swvl
- **Enterprise / Outsourcing / Telecom:** _VOIS (Vodafone), Orange Business, e& , Sumerge, ITWorx, Link Development, Giza Systems, IBM Egypt, Raya, Valeo (non-embedded roles only)
- **Agencies / Product studios:** Robusta, Ibtikar, Appgain, Inova, Areeb, digital agencies in Alexandria
- **Remote-from-Egypt (optional):** Andela, Toptal, Turing, Gulf companies hiring remote

---

## 7. Extra deliverables (optional — user decides, §11 Q4)

- **Evidence vault & STAR story bank** — every bullet has a 60-second interview story ready.
- **LinkedIn rewrite** — headline, About, Experience aligned with the master CV.
- **GitHub clean-up** — profile README, pin the 6 best repos, add READMEs + live links + screenshots, archive tutorial repos (2022–2023 todo/course repos hurt more than they help).
- **Portfolio site** — one page linking live demos (osloop, apple, arvamethod, Makka Juice…).
- **Cover-letter templates** per archetype.
- **Job-tracker** — which CV went to which company, date, status.
- **JD tailoring prompt** — paste a job post → get a tailored variant in minutes.

---

## 8. Known issues in current CVs (fix in Phase 4)

Current CV = `Desktop/Ibrahem_Hassan_Senior_Frontend_Engineer_CV.pdf` (new, Senior). Old = `Downloads/Ibrahem_Hassan_CV (2).pdf`.

1. **Unproven numbers — REMOVE** (user confirmed 2026-10-27 they are not known): `~40% fewer payloads`, `Lighthouse 62→94+`, `FCP −35%`, `bounce −20%`, `30+ components`. `Mentored 3` → **mentored 2** at nWeave. Replace with numbers we measure ourselves in Phase 2 (module/commit/test counts, live Lighthouse runs).
2. **AHS claims checked (see `evidence/projects/ahs-medx.md`):** TanStack migration = 25 modules but branch `MEDX-879` not merged; MSAL, SignalR integration and QuestionMaker have no support in his commits → remove unless the user shows otherwise. His strongest AHS item is the **formula builder/evaluation engine** (merged).
3. **More unsupported claims found** (see `evidence/projects/nweave-other.md`): Boost-KGoal "engineered the portal / JSXGraph plotting" (his diffs: no JSXGraph — he built the pulse-pattern editor + admin guard); Trackoo "GPS / 3D story cube / map camera" (his diffs: audio player, stories, feed data layer only); ElevateMate "virtualized TanStack Table / LocalForage" (his diffs: job dashboard + application form). Rewrite all three.
4. **Missing strong work:** Smart FAQ frontend (166 commits in Oct 2026, React + TanStack Query + Playwright), Kalima (Expo + i18n + Supabase, 25 commits), Osloop website (39 commits, R3F/GSAP), Apple / Arvamethod / Makka Juice live 3D/GSAP sites, Zeustra & The Code (Astro/GSAP), Firebase-Auth-React.
5. **Old CV projects — located on laptop 3** (see `inventory/laptop-3.md`): okoRent = Profound repo `WeRent` (336 of 364 commits), Spectra (242), Marina + Megaminds = Aquadic repos, Takhawy (`Hayah-Technology` org), Edubrain (own GitHub). Kyasco = personal (Expo app on laptop 2 + Builder.io prototype on laptop 3); no Next.js Kyasco platform exists.
6. **"Senior" title & "4+ years"** — commercial experience since 10/2022 = ~4 years. Title must match how nWeave lists him (§11 Q3).
7. **Osloop = nWeave** (same company, confirmed). Employer on CV stays nWeave; Osloop website counts as nWeave work.
8. ONE14 dates in old CV were `07/2026–10/2026` — confirm.
9. Contact links (LinkedIn/GitHub) must be clickable and correct in the PDF.

---

## 9. STATUS

| # | Step | Status | Notes |
|---|---|---|---|
| 1.1 | Laptop 1 (DELL, this one) — collect | DONE (surface) | `inventory/laptop-1-dell.md` |
| 1.2 | Laptop 2 (MacBook Pro M4) — collect | DONE (surface) | `inventory/laptop-2-macbook.md`. New: **Bites Development** (Bites-Mart-Nextjs, 192 commits, 10/2025–04/2026). ONE14 repo found but **0 commits by him** → §11 questions. No Profound/Aquadic work here |
| 1.3 | Laptop 3 (Windows 11, `C:\Users\hibra`) — collect | DONE | `inventory/laptop-3.md`. 30 repos. New identity `hibrahem226@gmail.com`. **Profound:** okoRent/WeRent (336 commits, 110 pages, SignalR chat + notifications in his diffs), Spectra (242, #2 frontend dev), Nearcare (4). **Aquadic:** 9 client repos, ~529 commits, 10/2022 → 07/2024. Plus Takhawy, Edubrain, rashaktk, rehla, anyShop, take-home tasks. Bites-Mart = same as laptop 2 |
| 1.4 | GitHub (both accounts) — public repos listed | DONE (surface) | `inventory/github.md`; private repos need login |
| 1.5 | Bitbucket (nWeave) — remotes known, local clones read | PARTIAL | only repos cloned locally |
| 1.6 | User answers (metrics, roles, dates) | MOSTLY DONE | `inventory/user-answers.md` — team sizes still open |
| 2 | Deep dive per project | ALL 3 LAPTOPS DONE | Laptop 3: `okorent`, `spectra`, `aquadic`, `freelance` (2026-10-28). Laptop 1: `smart-faq`, `ahs-medx`, `osloop-website`, `kalima`, `nweave-other` (Boost-KGoal, Trackoo, ElevateMate, The Code, Zeustra), `side-showcases` (FAQ AI POC, Orchard, ARVAmethod, Makka Juice). Laptop 2: `bites-mart`, `one14-qardio` (role from user's words + repo docs/store pages). TODO: Lighthouse on live links (only for links the user wants on the CV) |
| 3 | Market research | PASS 2 DONE | `market/companies.md` (Tier A + Money Fellows; careers check, Levels.fyi salaries, interview styles + prep list), `market/archetypes.md`. Optional pass 3: LinkedIn pages for companies that timed out |
| 4 | Master CV | DRAFT (all 3 laptops) | `cv/master-cv.md` — nWeave (incl. ONE14, led), Bites (part-time), **Profound (okoRent sole frontend, Spectra admin + doctor portals), Freelance (4 clients), Aquadic (9 client repos)** rewritten from evidence 2026-10-28; skills updated (SignalR via okoRent, Mantine, next-intl, FullCalendar…). No `[LAPTOP-3]` slots left. Variants/PDFs not regenerated (per-job only) |
| 5 | Variants | 4 DRAFTS | `cv/variants/fintech-senior.html`, `enterprise-senior.html`, `fintech-mid.html`, `enterprise-mid.html` (+ shared `cv.css`). Mid = same facts, headline "Frontend Engineer", no "led/designed/lead", mentoring softened → PDFs in `cv/output/`. **Regenerated 2026-10-27 on laptop 2 with Bites + ONE14 (under nWeave); old ONE14 "Projects" entry and Kyasco-at-Profound removed.** Profound/Aquadic still use the user's old-CV wording minus numbers until laptop 3 is checked. Export: headless Chrome `--print-to-pdf` (Windows), or on a Mac without Chrome `swiftc -O cv/variants/html2pdf.swift -o /tmp/html2pdf && /tmp/html2pdf <variant>.html <out>.pdf` (WebKit, A4, same margins). `cv.css` now lets long jobs flow across pages (bullets kept whole). NEXT: Product SaaS Mid, Mid versions, Mobile after ONE14 |
| 6 | Per-job CVs | ON REQUEST | Only when the user shares a job he wants to apply to (see §3 Phase 6). **Run the checklist in `cv/cv-standards.md` §6 and use its X-Y-Z rewrites.** Do not regenerate variants on new evidence |
| 8 | Interview Handbook (`project-guides/`) | 9 DONE, 3 TODO (all laptop 1) — Smart FAQ + AHS done on laptop 1 (2026-10-28); left: Osloop website, other nWeave, side showcases | **Done on laptop 2 (2026-10-28):** ONE14 QARDIO (role = led; hooks counted from the app code, not his diffs), Kalima. **Done on laptop 3 (2026-10-28):** okoRent, Bites, Spectra, Aquadic, Freelance (+ 14 concept cards). To do list lives in `project-guides/data/handbook.js`. **TODO on laptop 1:** Smart FAQ (p1), AHS MedX (p1), Osloop website (p2), other nWeave — Boost-KGoal, Trackoo, ElevateMate, The Code, Zeustra (p3), side showcases (p3). Follow `project-guides/README.md` |
| 7 | Extras beyond the CV (interview prep etc.) | LATER | The user will add new plans later (interview prep and similar). Laptop 3 collection also later |
| 9 | Study Guide (`study-guide/`) | DONE (27/27) | 184 topics, 468 questions, 88 verified output questions, 12 tested live-coding solutions; checkers in `study-guide/tools/`. How-to: `study-guide/README.md` |
| 10 | React site (`site/`) | DONE — live on Vercel | Vite + React + TS app that imports the same data files (no copies); landing page + both guides; deploy workflow `.github/workflows/pages.yml`. Deployed by the user on Vercel (Root Directory `site`, Vite preset); GitHub Pages workflow blocked by a GitHub billing lock. How-to: `site/README.md` |

---

## 10. Session Log

- **2026-10-27 — Laptop 1 (DELL):** Read new + old CV. Scanned home/Desktop/Documents/Downloads: 20 git repos. Listed GitHub `ibrahem-hassan2000` (24 repos) and `ibrahemhassan-cpu` (8 repos). Built identity map; found that `IbrahimNweave` is a different person (earlier count was inflated — corrected). Created this plan, `CLAUDE.md`, `inventory/laptop-1-dell.md`, `inventory/github.md`. User decided sync/location/seniority/extras (§11). Local git initialised and first commit made (not pushed). Next: user answers §11 "Still open", then Phase 1 on laptops 2 and 3, then Phase 2 deep dives here.
- **2026-10-27 (later):** User answered: nWeave = Osloop; current CV metrics unknown → removed; mentored 2; main GitHub `ibrahem-hassan2000`. Saved in `inventory/user-answers.md`.
- **2026-10-27 (later):** Title = Software Engineer (contract), frontend work. gmail personal / osloop.dev work email. Other projects on another laptop — later.
- **2026-10-27 — Phase 2 started:** Smart FAQ (166/173 commits, 27 screens, 551 tests, 75 stories, 94 typed endpoints) and AHS (52 commits; formula engine merged; TanStack migration on unmerged branch; MSAL/SignalR/QuestionMaker not his per commits). Evidence files in `evidence/projects/`.
- **2026-10-27 — Phase 2 laptop 1 finished:** AHS answers recorded (migration partly merged; MSAL/SignalR/QuestionMaker removed). Deep dives for Osloop website, Kalima, Boost-KGoal, Trackoo, ElevateMate, The Code, Zeustra, FAQ AI POC, Orchard, ARVAmethod, Makka Juice. Found unsupported claims in Boost-KGoal/Trackoo/ElevateMate bullets.
- **2026-10-27 — Phase 3 pass 1:** Web research on Cairo/Alex frontend hiring. Tier-A list, ATS keyword table, gaps (GraphQL, E2E, measured perf). Alexandria market thin → Cairo hybrid/remote-friendly roles. Archetype → project order table written. Many postings old — re-check before applying.
- **2026-10-27 — Phase 3 pass 2:** Thndr senior closed but hires often (VC job boards); Paymob/Instabug no FE openings; Money Fellows added. Salaries: Levels.fyi Cairo senior median ~EGP 938K/yr. Interview styles: Robusta take-home, _VOIS JS/React internals. Interview prep list written.
- **2026-10-27 — Phase 4 draft:** `cv/master-cv.md` written from evidence: header, 6 summary angles, evidence-only skills, nWeave experience (Smart FAQ, AHS, Osloop, others), personal projects, numbers bank, removed-claims list. Profound/Aquadic/ONE14 left as `[LAPTOP-2]`/`[VERIFY]`.
- **2026-10-27 — Phase 5:** Fintech Senior + Enterprise Senior variants as HTML (ATS-friendly single column) → 2-page PDFs via headless Chrome. Awaiting user review.
- **2026-10-27 — Phase 5:** Fintech Mid + Enterprise Mid variants and PDFs. NEXT: user review notes on all four, then Product SaaS / Mobile / Agency.
- **2026-10-27 — Laptop 2 (MacBook Pro M4):** Cloned `ibrahem-hassan2000/cv`, repo-local git identity set to the gmail. Phase 1 surface scan: 10 git repos. New employer-level evidence: Bites Development `Bites-Mart-Nextjs` (Next.js 14 ERP: invoices, sales, double-entry, Theater OS, LiveKit; 192 commits, 190 on production) + `inbz` (1). ONE14 QARDIO repo present but no commits under his identities. kyascoApp here = Expo app (2 commits, osloop email), not the Next.js platform. Kalima + Trackoo duplicate laptop 1. lingo/lingo2 = Kalima prototypes. Found that the GitHub `cv` repo is **public** (plan says private) → told the user. NEXT: user answers §11 laptop-2 questions, Phase 2 deep dive on Bites-Mart, then laptop 3.
- **2026-10-27 — Laptop 2, Phase 2:** User answered: Bites part-time 09/2025–04/2026; ONE14 role = lead (no commits, AI-assisted build by a teammate); Kyasco personal. Verified ONE14 from the repo: GPS under-count docs (−17% on 30 km), the filter change in code (10 m OS filter → 1 Hz Highest + software floor), Strava OAuth, surah/ayah audio experiments, live store listings (Play 100+, App Store 08/2026). Bites deep dive: invoices main author, e-signatures, accounting, Theater OS co-built, sales contributor; #2 of 14. Wrote `evidence/projects/one14-qardio.md`, `bites-mart.md`; updated `master-cv.md`. NEXT: Bites title + ONE14 employer/dates, regenerate the 4 variants + PDFs, then laptop 3.
- **2026-10-27 — Laptop 2:** User confirmed Bites title = Frontend Developer (React / Next.js) and ONE14 = nWeave. Master CV: ONE14 moved from Projects into the nWeave section (Apr – Sep 2026). NEXT: regenerate the 4 variants + PDFs, then laptop 3.
- **2026-10-27 — Laptop 2:** Bites = remote (Cairo-based company). Repo stays public until the project is done (user's choice).
- **2026-10-27 — Laptop 2, Phase 5 refresh:** All 4 variants updated: Bites job (fintech: finance/e-signature focus + "Finance domain" skills line; enterprise: ERP/team focus), ONE14 under nWeave (Senior "led/drove", Mid "planned/found"), Trackoo dropped from fintech, Next.js 14 in skills, summaries mention Bites/ONE14. No Chrome on the Mac → added `cv/variants/html2pdf.swift` (WebKit). Fixed a page-break rule that left page 1 half empty. All 4 PDFs = 2 pages. NEXT: user review of the 4 PDFs, then laptop 3.
- **2026-10-27 — Workflow change (user):** (1) don't regenerate CVs when new info arrives; only update the evidence base; make a tailored CV only when he shares a job to apply for. (2) Laptop 2 (MacBook) = main laptop from now on. (3) Laptop 3 (old, other projects) comes later. (4) New plans beyond the CV (e.g. interview prep) will come later. Written into `CLAUDE.md` and §3/§4/§9.
- **2026-10-27 — Laptop 3 (Windows 11, `C:\Users\hibra`), Phase 1:** Cloned the repo (needs `git config core.longpaths true` on Windows). Scanned home, OneDrive Desktop and `C:\`: 30 git repos. Found identity `hibrahem226@gmail.com` (typo of the gmail) — without it Profound shows 0 commits. Profound (Azure DevOps): okoRent = repo `WeRent` (336/364 commits, 4 portals, 110 pages, 31 query modules, SignalR notifications + chat in his diffs), Spectra (spectra.sa, 242 commits, all on Production, #2 of 2 main frontend devs), Nearcare (4). Aquadic (`AQuadic` GitHub org): 9 client repos (Analytica 142, Find Help 98, Marina 83, Alwatania 71, Megaminds 60 + 4 HTML sites), dates match 10/2022 → 07/2024. Also Takhawy (`Hayah-Technology`), Edubrain, rashaktk, rehla, anyShop, hemaApp, 2 job take-home tasks, `inmeetp2p` (Bites, 5). June 2025 CV on the Desktop links every old project to a live URL. Wrote `inventory/laptop-3.md`; updated §1.2, §8, §9, §11 and the master CV slots. Master CV bullets for Profound/Aquadic NOT rewritten yet. NEXT: user answers §11 laptop-3 questions → Phase 2 deep dives (okoRent, Spectra, Aquadic) → master CV bullets.
- **2026-10-28 — Laptop 3, answers + Phase 2:** User confirmed the `226` email; Profound end 07/08-2025 shown as 09/2025 (his choice); Takhawy, Edubrain, Rehla, Rashaktk = freelance; okoRent = all his, no link; Spectra = he owned admin + doctor, Moataz the client portal. Deep dives written: `okorent.md` (110 pages, SignalR chat + notifications, booking calendar, payments, 31 query modules), `spectra.md` (git confirms ~143 pages he created: 80 admin, 40 doctor; Spectra is JavaScript, not TypeScript; Moataz refactored admin/doctor after he left in 11/2024), `aquadic.md` (9 repos; TanStack Query installed but unused → not claimed), `freelance.md` (4 clients). Old-CV claims dropped for lack of evidence: ISR, shared Radix library, Axios retries, "10+ clients", "AI homework assistant". Master CV: Profound, new Freelance entry, Aquadic, skills, summary and numbers bank rewritten. NEXT: per-job CVs on request; laptop collection is complete.
- **2026-10-28 — Phase 8 started (user request): project guides.** Created `project-guides/` (bilingual HTML, shared `assets/guide.css` + `guide.js`, `index.html`, `_template.html`, `README.md`). Wrote guides for okoRent, Spectra, Bites, Aquadic, Freelance from the code on laptop 3. Code reading corrected the evidence: **okoRent is not bilingual** (next-intl routing only, translation files copied from another project) → removed "Arabic/English" from its CV bullet; **Bites: no Zustand in his code** → removed from the CV bullet; **Aquadic = 3 Next.js + 6 HTML** (not 4 + 5) → "six more clients"; **Spectra is JavaScript**; video session = UI only; **Edubrain has 12 route handlers** (bcrypt + JWT, Puppeteer PDF, JSON-file storage — prototype). Removed an internal API hostname from `inventory/laptop-3.md` (public repo). Added Phase 8 to §3/§9 and `CLAUDE.md`. NEXT: laptop 1 and laptop 2 guides (see §9 row 8).
- **2026-10-28 — Phase 8 redesign (user feedback).** User: laptop 3 needs no more collection (it stays with him). The HTML was "good but not readable"; he wants something he enjoys opening and learns from, with "why X and not Y, could both work, is something better" for international interviews. Rebuilt `project-guides/` as a data-driven one-page app (sidebar + logos, tabs, Decisions tab, flow diagrams, pattern sketches, concepts page with 14 cards). User said **no screenshots** — all screenshots deleted; logos from the repos kept (okoRent, Bites, Spectra). Old per-project HTML pages and `_template.html` removed; new template `data/_template.js`. Freelance check: Takhawy has no react-hook-form (only Edubrain).
- **2026-10-28 — Laptop 2 (main):** Pulled laptop 3 work into `~/cv-project/cv`. Removed three claims that laptop 3 disproved from the 4 templates in `cv/variants/` and re-exported the PDFs (2 pages each): Zustand in the Bites bullet, "shared Tailwind + Radix component library" at Profound (enterprise), "shared Axios layer with retries" at Aquadic (all four). Zustand stays in Skills (okoRent, Spectra). The templates still use old Profound/Aquadic wording; per-job CVs must be cut from `master-cv.md`, not from these templates.

- **2026-10-28 — Laptop 2, Phase 8:** Wrote `project-guides/data/one14.js` (10 decisions: OS filter vs 1 Hz + software filter, adaptive jitter floor, two GPS modes, pedometer fusion, track-player, surah + timestamps vs per-ayah, wall-clock timer, Firebase vs the unused Express/Postgres scaffold, Strava OAuth in Cloud Functions, persistent outbox) and `data/kalima.js` (10 decisions: Supabase + RLS, Anki-style SM-2 in SQL, SQLite offline queue with idempotent replay, persisted query cache, invalidate active, Gemini edge function with shared cache + daily limit, LTR layout with translated copy, fingerprint → Keychain credentials, native widgets, expo-speech). Logos from the app icons. Code findings: ONE14 shake-to-feedback is on an unmerged branch (not shipped); the mobile app never calls the repo's Express API; Strava connect requires `activity:write`. Kalima also has an iOS widget (`targets/widget`). Checked in the browser: all tabs render, no console errors. NEXT: laptop 1 guides (Smart FAQ, AHS, Osloop, other nWeave, side showcases).
- **2026-10-28 — Laptop 1, Phase 8:** Wrote `project-guides/data/smartfaq.js` (10 decisions: Vite SPA vs Next, cookie session + XSRF double-submit, typed ApiError + retry rules, scoped query keys, capability-based access, ETag/If-Match, OpenAPI types, URL filters without search text, shadcn + Atomic Design, fake-fetch testing; measured fix 20 ms → 2 ms per table re-render, commit 0680377) and `data/ahs.js` (8 decisions). Logos: Osloop mark (Smart FAQ), AHS `public/LOGO.svg`. Checked in the browser via a local static server: all tabs render, no console errors. **Code reading corrected AHS:** the formula builder is co-built — a teammate's restructure (2025-12-25) deleted his drag-and-drop, parser and evaluator; on `dev` ~half of the module's lines and the whole mathjs validator are his. TanStack Query: dev/master have 0 React Query files in the local clone; the mono repo (10/2026) has the QueryClient + `src/query` pattern (OTP module mostly his) while 157 files still use `useAxios`. Updated `evidence/projects/ahs-medx.md` and the two AHS bullets + summary in `cv/master-cv.md`. The 4 templates in `cv/variants/` still carry the old AHS wording — not changed (per-job rule); ask the user. NEXT: Osloop website, other nWeave, side-showcase guides.
- **2026-10-28 — Laptop 1, rule + CV audit:** New rule §1.8 (user): the CV shows what he built, not what happened to it later. AHS bullets restored to the full formula builder (drag-and-drop, own parser/evaluator — all merged to dev in 12/2025) and the 25-module TanStack Query layer; the handbook keeps the later restructure for honest follow-ups. Researched how CVs are screened (ATS parse/match/rank, 6-second recruiter scan, X-Y-Z bullets, senior signals) and wrote `cv/cv-standards.md`: number check (all correct; Smart FAQ re-counted), audit, 8 X-Y-Z rewrites, interview study list, pre-send checklist. Master CV: Redux Toolkit back in Skills (used in anyShop + 2025 tasks), Qur'an spelling unified.
- **2026-10-29 — Laptop 1, Study Guide (user request):** Agreed design with the user (separate dashboard, links both ways, no done-marks, test-yourself, before-the-interview page, search, Arabic/English like the Handbook, study order HTML → behavioral, extra JS output questions, a Working-with-AI section). Built `study-guide/` (shell, 27 sections registered) and wrote HTML (6 topics), CSS (8), JavaScript (12) and 88 JS output questions in 10 groups — every answer checked by running it (`tools/verify-output.js`, 88/88). Added a Study Guide link to the Handbook sidebar. Checked all 47 routes in the browser, no errors.
- **2026-10-29 — Laptop 1, Study Guide completed (user: "finish all of it"):** Wrote the remaining 23 sections — TypeScript, Browser, Networking, Security, React fundamentals (+ React what-happens questions), Hooks (16 topics: every core/React 19 hook, TanStack Query, react-hook-form, router, React Native), React patterns, State, Forms, Routing, Next.js, Styling, Accessibility, Performance, Testing, React Native, Tooling/Git/CI, i18n & RTL, Animation & 3D, Live coding (12 solutions executed and tested by `tools/verify-live-coding.js`), Frontend system design (RADIO + 7 cases), Working with AI (prompting, agent workflow, reviewing AI code, AI features, talking about AI) and Behavioral (STAR story bank from real evidence, intro, conflict, mistakes, leadership, salary/Egypt notes). Added `tools/check-data.js` (validates shape and Handbook links). Project references were checked against code; four unsupported ones were corrected before commit (toaster live region, a Find Help router claim, a Kyasco RTL example, a Profound design-system line). Browser check: 254 routes in 3 languages, no errors, no horizontal scroll at 375px.
- **2026-10-29 — Online access (user: open the dashboards from phone or any laptop):** Added `hub.html` (entry page with two doors + how to ask for a per-job CV) and published hub + study guide + project guides (53 files) as one private artifact: https://claude.ai/artifact/UN48ckqtk4J9xhS2V44MFb. Read every handbook file written by other sessions before publishing. Republish rule recorded in CLAUDE.md. Not yet confirmed by the user that in-artifact links between the pages work.
- **2026-10-29 — React site (user: a React version on GitHub Pages, public link, no sign-in):** Built `site/` — Vite + React 18 + TypeScript + React Router (HashRouter, `base: "./"`). It imports `study-guide/data/*.js` and `project-guides/data/*.js` directly and reuses both stylesheets, so the static dashboards and the site share one source. Landing page with two doors and the language switch; all study and project routes. Added `.github/workflows/pages.yml` (build `site/`, deploy `site/dist`). Checked in the browser: 280 routes × 3 languages render with no console errors; no horizontal scroll on phone width. Committed locally; not pushed (waiting for the user's review).
- **2026-10-29 — Site live:** Pushed `e328378`. GitHub Pages did not run (GitHub account locked for billing). The user deployed `site/` on Vercel himself and confirmed it works.
- **2026-10-29 — Study Guide depth (user: content feels shallow for Mid/Senior):** Measured it: median topic ≈ 190 English words — a map, not depth. Agreed to add a Deep dive layer to ~35–40 core topics instead of rewriting all 184. Built the format (`data/deep-<section>.js`, `STUDY.deepen`, a Basics / Deep dive tab in the static guide and the React site, `tools/verify-deep.js`) and wrote the first one: JavaScript event loop (6 how-it-works steps, 4 failure cases with fixes, 3 Mid-vs-Senior answers, 2 drill-down chains up to 4 levels, sources). Node examples verified by running them. Waiting for the user's feedback before the next topics.
---

## 11. Decisions & open questions

### Decided (2026-10-27)
- **Sync:** GitHub repo `github.com/ibrahem-hassan2000/cv`. It is **public for now, by the user's choice** (2026-10-27); he makes it private when the project is finished. Never push without approval.
- **Target location:** Cairo + Alexandria (on-site/hybrid). Remote/Gulf section in §6 is out of scope for now.
- **Seniority:** two tracks per archetype — **Senior** variant and **Mid-level** variant.
- **Extras (all in scope, after Phase 5):** LinkedIn + GitHub clean-up, STAR story bank, cover letters + JD-tailoring prompt, portfolio site + job tracker.

- **nWeave = Osloop** (same company). **No unknown metrics** — only measured ones. **Mentored 2** at nWeave. **Main GitHub:** `ibrahem-hassan2000`. Details in `inventory/user-answers.md`.

- **Title:** contract = Software Engineer, work = frontend → CV line `nWeave — Software Engineer (Frontend)`. **Emails:** gmail = personal (on CV), osloop.dev = company work email (never on CV/GitHub).
- **Other projects** are on another laptop; the user connects it later. Current phase = data collection.

### Still open
- ~~Bites / ONE14 role / Kyasco~~ answered 2026-10-27 (see `inventory/user-answers.md`): Bites = separate company, part-time 09/2025–04/2026; ONE14 = he led (planning, UX, tech choices, QA, GPS distance fix), code written via AI by a teammate; Kyasco = personal.
- ~~Bites title / ONE14 employer~~ answered 2026-10-27: Bites = Frontend Developer (React / Next.js); ONE14 = nWeave project (Apr – Sep 2026 per repo).
- ~~Bites location~~ answered: remote, Cairo-based company.
- Team sizes per company (rough).
- ~~Laptop 3 questions~~ answered 2026-10-27 (see `inventory/user-answers.md`): `hibrahem226@gmail.com` is his; left Profound 07 or 08/2025 but shows 09/2025 on the CV (his choice); Takhawy, Edubrain, Rehla, Rashaktk = freelance; okoRent = he built the whole frontend, no link on the CV; Spectra = he owned the admin and doctor portals, Moataz Ali the client portal.
- ~~Trackoo / Kalima / FAQ POC~~ answered 2026-10-27: Trackoo GPS + story cube co-built with a teammate ("co-built", never "built"); Kalima not published; FAQ AI POC = concept demo he built for the client, complements Smart FAQ.
- ~~AHS questions~~ answered 2026-10-27: migration partly merged; MSAL/SignalR/QuestionMaker not his (removed); after Feb 2026 moved to other nWeave projects.
