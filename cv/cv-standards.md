# CV standards, audit and interview study list (2026-10-28)

> **بالعربي:** الملف ده بيقول الـ CV بيتقاس بإيه (الـ ATS والـ recruiter والـ hiring manager)، وبعدين بيراجع الـ master CV على المعايير دي، وفيه صياغات أقوى جاهزة، وقايمة مذاكرة للإنترفيو. أي CV لوظيفة لازم يعدّي على الـ checklist اللي في الآخر قبل ما يتبعت.

---

## 1. How a CV is judged — three readers

### Reader 1: the ATS (software)
- **Parse → match → rank.** If parsing fails, matching never happens. Multi-column layouts, tables, text boxes and graphics are the usual cause of misparsing. Most systems **rank** rather than auto-reject; recruiters usually open only the top 10–20.
- Newer systems (Workday, Eightfold) match meaning; older ones (Taleo, iCIMS classic) and **recruiters' own searches** still match literal words. → Use the **exact words** from the job post (e.g. "React Query" *and* "TanStack Query", "Next.js", "TypeScript").
- Hard skills weigh most. Put key terms in the **summary, skills and bullets** — a skill that appears only in the skills list counts less than one shown in use.
- Some old systems read Word better than PDF → keep a DOCX export ready on request.

### Reader 2: the recruiter (about 6 seconds on the first pass)
- TheLadders eye-tracking study (30 recruiters, 2012): ~80% of the first glance goes to **name, current title/company and dates, previous title/company and dates, education**, then a keyword scan. → Titles, company names and dates must be clean, consistent and easy to find; overlaps and gaps get noticed first.
- Clear single-column layout; the most important project first under each job.

### Reader 3: the hiring manager / engineer
- **Outcomes over duties.** Google's X-Y-Z ("accomplished X, as measured by Y, by doing Z") for the strongest bullets; simpler bullets for supporting work. Don't force the formula on every line.
- **Senior signals:** scope and ownership (built from scratch, owned a portal), architecture decisions, performance with numbers, accessibility, design systems, testing, mentoring, cross-team work, delivery under risk.
- Frontend reviewers look for **measured performance** (Lighthouse, Core Web Vitals, bundle size, render time) more than framework name-dropping.

Sources: [simplify.jobs](https://simplify.jobs/blog/how-to-write-ats-resume-2026), [stylingcv (ATS internals)](https://stylingcv.com/blog/how-ats-systems-actually-work-in-2026-inside-taleo-workday-greenhouse-icims-more/), [atsverification](https://atsverification.com/blog/how-ats-scoring-works/), [metaintro](https://www.metaintro.com/blog/what-recruiters-see-after-ats-ranks-your-resume), [TheLadders study via recruiter.com](https://www.recruiter.com/i/theladders-reveals-research-reporting-that-resumes-spend-six-seconds-with-a-recruiter/), [Inc. on Google X-Y-Z](https://www.inc.com/bill-murphy-jr/google-recruiters-say-these-5-resume-tips-including-x-y-z-formula-will-improve-your-odds-of-getting-hired-at-google.html), [GreatFrontEnd senior resume](https://www.greatfrontend.com/blog/senior-frontend-developer-resume). Mostly vendor/blog sources — directional, not research-grade.

---

## 2. Number check (every number in `master-cv.md`, 2026-10-28)

| Number | Status | Note |
|---|---|---|
| 4 years experience | ✅ | 10/2022 → 10/2026 |
| Smart FAQ 166 / 173 commits, 27 screens, 551 tests in 55 files, 75 stories, ~3 weeks | ✅ re-counted today | HEAD 357c1a2 (2026-10-26) |
| Smart FAQ 94 endpoints | ✅ | 94 paths = 101 operations in `openapi/v1.json`; "94 endpoints" is safe |
| Smart FAQ table re-render ~20 ms → ~2 ms | ✅ **new** | commit 0680377, test harness. Use as "per table re-render", not page load |
| AHS 25 modules, 3.9k commits | ✅ | branch MEDX-879; repo 3,922 commits |
| Osloop 26+ feedback items | ✅ | H-01 → H-26 |
| okoRent 336/364, 110 pages, 4 portals, 31 modules | ✅ (laptop 3 evidence) | not re-checkable here |
| Spectra "about 120 pages" | ✅ | 80 admin + 40 doctor = 120 (143 incl. shared pages) |
| Bites 192 commits, 190 on production, #2 of 14, 78 pages | ✅ (laptop 2 evidence) | |
| ONE14 100+ downloads, App Store 08/2026, −17% on 30 km before the fix | ✅ (laptop 2 evidence) | "better than Strava" stays `[NEEDS-PROOF]` |
| Aquadic 9 repos, ~530 commits | ✅ | numbers bank says ~529 — both fine |
| Mentored 2 | ✅ user | |

No wrong numbers found. Spelling fixed: "Quran" → "Qur'an" everywhere.

---

## 3. Audit of `master-cv.md` against the three readers

### ✅ Already strong
- One column, real text, standard headings, PDF — parses cleanly.
- Every number is real and traceable; nothing a follow-up question can break.
- Senior signals exist: built from scratch (Smart FAQ, okoRent), owned portals (Spectra), architecture (data layers, design system), mentoring, cross-team (AHS, Bites 14-person team), product lead (ONE14).
- Skills appear inside bullets (React 19, TanStack Query, SignalR…), not only in the list.

### ⚠️ Fix or decide
1. **Dates in the 6-second scan.** Around 09/2025 the reader sees three jobs at once: Profound (shown to 09/2025), Bites part-time (from 09/2025) and nWeave (from 10/2025); Freelance also overlaps Aquadic/Profound. → Always print **"Part-time · Remote"** next to Bites and **"alongside full-time roles"** next to Freelance, in the job line itself, so the overlap reads as intentional. (Profound end month: user's choice stays; real month is 07/08-2025 if a background check asks.)
2. **Too many feature-list bullets.** Many lines are "Built X, Y and Z with A and B". They prove scope but not impact. → Lead each job with **one or two X-Y-Z bullets** (rewrites in §4), keep the rest short.
3. **Performance proof is thin.** Frontend reviewers look for numbers; we have one (20 → 2 ms). → Run Lighthouse on the live links he is happy to show (Osloop, Orchard, ARVAmethod, Makka Juice) and keep the scores in the numbers bank; use only where good.
4. **Redux keyword.** Removed as "no evidence", but job posts ask for it often (e.g. Thndr: Redux/MobX/Context). He did use Redux Toolkit (anyShop 2023, two 2025 take-home tasks). → Put **"Redux Toolkit"** back in Skills (not in job bullets). Honest and it helps ATS.
5. **Accessibility is under-sold.** Evidence: Storybook a11y checks, keyboard drag-and-drop (dnd-kit KeyboardSensor), `useId` label wiring, Radix primitives. → One short clause in Smart FAQ: "keyboard-accessible drag-and-drop, a11y checks in Storybook". Don't claim "WCAG compliant".
6. **Too long for any one job.** The master is the source; a per-job CV keeps: summary 3 lines, nWeave 5–7 bullets, Bites 3, Profound 4–5, Freelance 1, Aquadic 2–3, 1–2 projects, 2 pages max.
7. **LinkedIn must match.** Recruiters cross-check titles and dates. Update LinkedIn to the same titles/dates before applying (extras, Phase 7).
8. **Public `cv` repo is linked from the CV's GitHub.** Reminder only — the user's decision stands.

---

## 4. Stronger wording (X-Y-Z) — ready to use

| Where | Current | Stronger (all facts verified) |
|---|---|---|
| Smart FAQ (lead bullet) | Built the frontend from the first commit … 27 Figma screens … ~3 weeks | **Delivered a healthcare-operations knowledge platform's frontend in three weeks — 27 screens, 3 roles with MFA and 551 automated tests — as lead and main author (166 of 173 commits), using React 19, TypeScript and TanStack Query.** |
| Smart FAQ (performance) | Fixed list performance by rendering one table layout … | **Cut admin-table re-render time from ~20 ms to ~2 ms by rendering one layout per screen size, memoizing row menus and badges, and mounting menus on first open.** |
| Smart FAQ (security) | Implemented three roles … MFA for admins | **Secured the app with a cookie session, antiforgery tokens on every write, capability-based routing and MFA for admins, and ETag checks so two admins can't overwrite each other.** |
| AHS (formula) | Built a formula builder and evaluation engine … | **Built a billing-formula builder that lets admins write pricing rules safely — a mathjs parser with an allowlist (no functions, no eval), live validation, divide-by-zero checks and a test panel.** |
| AHS (data layer) | Designed a TanStack Query layer of 25 domain modules … | **Designed a 25-module TanStack Query layer to replace a custom Axios hook across orders, invitations, messaging, staff and billing, and wrote the team's guide; the shared client and pattern are used for new features.** |
| ONE14 (GPS) | Drove the fix for GPS distance under-counting … | **Led the fix for a 17% GPS distance under-count (a 30 km run recorded as ~25 km) by moving tracking to 1 Hz high-accuracy fixes with a tuned software filter, field-tested against Strava and Apple Watch.** |
| okoRent (lead) | Built the entire frontend as the only frontend developer … | **Built a rental marketplace's entire frontend alone — 110 pages across guest, user, business and admin portals (336 of 364 commits) — with Next.js 14, TypeScript and TanStack Query.** |
| Bites (impact) | Worked in a 14-person team: 192 commits … | **Shipped 190 commits to production in 7 months part-time — second-most in a 14-person team — across invoicing, accounting and e-signature modules.** |

---

## 5. Interview study list (what to revise, in order)

1. **Your own projects first** — open the Interview Handbook (`project-guides/index.html`): read each project's **Decisions** and **Interview** tabs (Smart FAQ, okoRent, ONE14, Bites, AHS first).
2. **JavaScript core** — closures (incl. stale closures in hooks), event loop, promises/async, `this`, prototypes, equality, array methods. (_VOIS asks closures.)
3. **React rendering** — reconciliation, keys, when components re-render, `memo` / `useMemo` / `useCallback`, refs; your 20 → 2 ms story.
4. **Data fetching** — server vs client state, query keys, invalidation, staleTime/gcTime, optimistic updates, race conditions (AHS + Smart FAQ stories).
5. **Web security for frontend** — XSS, CSRF, cookie vs localStorage, httpOnly/SameSite, sanitising HTML (Smart FAQ allowlist).
6. **Next.js** — App Router, server vs client components, SSR/SSG/ISR, middleware, server actions (okoRent, Bites).
7. **Performance** — Core Web Vitals (LCP, INP, CLS), lazy loading, code-splitting, virtualization, measuring with DevTools/Lighthouse.
8. **Testing** — unit vs component vs E2E, Testing Library philosophy, what to mock (Smart FAQ's fake fetch).
9. **React Native** — background tasks, location accuracy, audio, store releases (ONE14, Kalima, Trackoo).
10. **Frontend system design** — design a dashboard with filters, a chat, an editor with drafts/review; talk about state, caching, real-time, errors, a11y.
11. **Behavioral (STAR)** — the STAR block in every handbook project; plus "a disagreement", "a mistake" (AHS long branch is a good honest one), "mentoring two teammates".
12. **Gap to close (optional):** GraphQL basics — one small Apollo project; asked by _VOIS.

---

## 6. Checklist before sending any per-job CV
- [ ] Job title in the headline matches the post's wording (Senior / Mid).
- [ ] Top 8–10 keywords from the post appear (exact spelling) in summary, skills and bullets — only where true.
- [ ] Each job starts with its strongest X-Y-Z bullet.
- [ ] Every number is in the numbers bank (`master-cv.md`).
- [ ] Bites says "Part-time · Remote"; Freelance says "alongside full-time roles".
- [ ] 2 pages max, one column, PDF (DOCX if the portal asks).
- [ ] Links work (GitHub, LinkedIn; live demos only if he wants them).
- [ ] LinkedIn titles/dates match the CV.
- [ ] He can tell the story behind every bullet (handbook).
