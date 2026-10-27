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
   - GitHub accounts: `ibrahem-hassan2000`, `ibrahemhassan-cpu`
   - ⚠️ **NOT him:** `IbrahimNweave <ibrahim@nweave.com>`, `Ibrahim Mustafa (ibra-mustafa)`, `Hagar Hassan`. Do not count their commits.
   - Add any new identity found on laptop 2/3 to this list.
3. **Contribution honesty.** In team repos, describe only what *his* commits/branches touched. "Contributed to" vs "Built" vs "Led" must match reality.
4. **Client confidentiality.** Private client code (nWeave/Bitbucket) is never copied out — only facts about what he built. No secrets, keys, or customer data in this folder.
5. **No publishing without review.** No git push, no uploads, no sending CVs/emails before the user sees it and says yes.
6. **Language.** Chat with the user in Egyptian Arabic. CV content in English (ATS-friendly).
7. **Keep this file current.** After each step: update §9 STATUS and §10 Session Log.

---

## 2. Folder layout

```
cv/
├── CLAUDE.md                  ← auto-read entry point
├── CV_MASTER_PLAN.md          ← this file (the brain)
├── inventory/
│   ├── laptop-1-dell.md       ← repos, commits, features found on this laptop
│   ├── laptop-2-macbook.md    ← MacBook Pro M4
│   ├── laptop-3.md            ← (to create on laptop 3)
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

### Phase 6 — Review & polish
User reviews every variant. Fix. Export to PDF (and DOCX if needed). Optional: per-company tailoring when he applies.

---

## 4. Multi-laptop workflow

- This folder is the single source of truth. Move it between laptops via **(decision pending — see §11 Q1)**: private GitHub repo / Google Drive / USB.
- On laptop 2 and 3: open this folder, tell Claude "كمل الخطة" → it reads `CLAUDE.md` → runs Phase 1 for that laptop → writes `inventory/laptop-N.md` → updates STATUS.
- After all three are collected, **all further work happens on one laptop** (the user picks which).

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
5. **Old CV projects not yet located on this laptop:** okoRent, Takhawy (GitHub: Takhawy_Next), Kyasco (GitHub: kyascoApp), Edubrain, Megaminds — expected on laptop 2/3.
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
| 1.3 | Laptop 3 — collect | TODO | |
| 1.4 | GitHub (both accounts) — public repos listed | DONE (surface) | `inventory/github.md`; private repos need login |
| 1.5 | Bitbucket (nWeave) — remotes known, local clones read | PARTIAL | only repos cloned locally |
| 1.6 | User answers (metrics, roles, dates) | MOSTLY DONE | `inventory/user-answers.md` — team sizes still open |
| 2 | Deep dive per project | LAPTOPS 1 + 2 DONE | Laptop 1: `smart-faq`, `ahs-medx`, `osloop-website`, `kalima`, `nweave-other` (Boost-KGoal, Trackoo, ElevateMate, The Code, Zeustra), `side-showcases` (FAQ AI POC, Orchard, ARVAmethod, Makka Juice). Laptop 2: `bites-mart`, `one14-qardio` (role from user's words + repo docs/store pages). TODO: Lighthouse on live links; laptop 3 projects |
| 3 | Market research | PASS 2 DONE | `market/companies.md` (Tier A + Money Fellows; careers check, Levels.fyi salaries, interview styles + prep list), `market/archetypes.md`. Optional pass 3: LinkedIn pages for companies that timed out |
| 4 | Master CV | DRAFT (laptops 1 + 2) | `cv/master-cv.md` — nWeave (incl. ONE14, led), **Bites (part-time, Frontend Developer)**, Kyasco (personal, optional) added; `[LAPTOP-3]`/`[VERIFY]` slots left for Profound, Aquadic, okoRent, Takhawy, Edubrain, Megaminds. Variants/PDFs NOT yet regenerated with laptop-2 content |
| 5 | Variants | 4 DRAFTS | `cv/variants/fintech-senior.html`, `enterprise-senior.html`, `fintech-mid.html`, `enterprise-mid.html` (+ shared `cv.css`). Mid = same facts, headline "Frontend Engineer", no "led/designed/lead", mentoring softened → PDFs in `cv/output/`. Profound/Aquadic/ONE14 use the user's old-CV wording minus numbers until laptop 2 is checked. Export: headless Chrome `--print-to-pdf`. NEXT: Product SaaS Mid, Mid versions, Mobile after ONE14 |
| 6 | Review & export | TODO | |

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

---

## 11. Decisions & open questions

### Decided (2026-10-27)
- **Sync:** private GitHub repo for this folder. Local git is set up; the user creates the private repo and approves the first push. Never push without approval.
- **Target location:** Cairo + Alexandria (on-site/hybrid). Remote/Gulf section in §6 is out of scope for now.
- **Seniority:** two tracks per archetype — **Senior** variant and **Mid-level** variant.
- **Extras (all in scope, after Phase 5):** LinkedIn + GitHub clean-up, STAR story bank, cover letters + JD-tailoring prompt, portfolio site + job tracker.

- **nWeave = Osloop** (same company). **No unknown metrics** — only measured ones. **Mentored 2** at nWeave. **Main GitHub:** `ibrahem-hassan2000`. Details in `inventory/user-answers.md`.

- **Title:** contract = Software Engineer, work = frontend → CV line `nWeave — Software Engineer (Frontend)`. **Emails:** gmail = personal (on CV), osloop.dev = company work email (never on CV/GitHub).
- **Other projects** are on another laptop; the user connects it later. Current phase = data collection.

### Still open
- **Repo visibility:** `github.com/ibrahem-hassan2000/cv` is **public** (checked 2026-10-27). Decision was private → user changes it in GitHub Settings.
- ~~Bites / ONE14 role / Kyasco~~ answered 2026-10-27 (see `inventory/user-answers.md`): Bites = separate company, part-time 09/2025–04/2026; ONE14 = he led (planning, UX, tech choices, QA, GPS distance fix), code written via AI by a teammate; Kyasco = personal.
- ~~Bites title / ONE14 employer~~ answered 2026-10-27: Bites = Frontend Developer (React / Next.js); ONE14 = nWeave project (Apr – Sep 2026 per repo).
- Bites location (on-site / remote).
- Team sizes per company (rough).
- ~~Trackoo / Kalima / FAQ POC~~ answered 2026-10-27: Trackoo GPS + story cube co-built with a teammate ("co-built", never "built"); Kalima not published; FAQ AI POC = concept demo he built for the client, complements Smart FAQ.
- ~~AHS questions~~ answered 2026-10-27: migration partly merged; MSAL/SignalR/QuestionMaker not his (removed); after Feb 2026 moved to other nWeave projects.
