# AHS Medical Exchange (MedX services) | nWeave | his work 2025-12-02 → 2026-02-08 | Frontend engineer in a large team

Local repo: `C:\Users\DELL\ahs-medical-exchange-services-frontend` (Bitbucket `nweave/ahs-medical-exchange-services-frontend`, private). Mono repo `Documents/ahs-medical-exchange-services` has only 1 stash-like commit from him.
His commits: **52 non-merge** (identity `ibrahem.hassan@osloop.dev`, 1 from gmail). Repo total ~3.9k commits since 2023, many devs.
His diff size: **569 file changes, +20.9k / −10.1k lines.**
Stack (repo): React (JS), TanStack Query 5, Zustand, PrimeReact, react-hook-form, mathjs, Azure MSAL, SignalR, Axios.

## What it is
Healthcare B2B platform connecting practices, providers and services: orders, clinical invitations, messaging, billable items, documents, staff, teams, practice settings.

## What HE did

### 1. Formula builder & evaluation engine (MEDX-1057) — MERGED to `dev`
- Drag-and-drop formula builder for billing/service formulas, with real-time validation and a testing panel (try a formula with sample values before saving).
- Own **parser + evaluator** (`formula-parser.js`, `formula-evaluator.js`) on top of **mathjs**, a validation utility, unique-name validation, rounding warnings, a typed output selector.
- 24 files: FormulaEditor, OperatorsPanel, VariablesPanel, TestingPanel, ValidationPanel, ExamplesPanel, `use-formula-builder` hook, unit test `utils.spec.js`. Built with react-hook-form.
- Commits 2025-12-02 → 2026-01-06. Found in `origin/dev` and later feature branches (payment flexibility, 2FA, admin panel) → it shipped and others built on it.

### 2. TanStack Query migration (MEDX-879) — on branch `MEDX-879/using-react-query`, **NOT merged** into `dev`/`master` as of local data
- Replaced the custom `useAxios` hook with TanStack Query queries/mutations, one domain at a time (2025-12-14 → 2026-02-08).
- Created a `src/query/` layer with **25 domain modules**: admin, auth, billable, categories, dashboard, depositMethod, documents, join, languages, locations, my-services, order, orders, practiceSettings, practices, profile, provider, serviceCapability, session, staff, states, taxonomies, team, templateVariables, twilio + `useGlobalQuery`.
- Migrated components: orders & order details, messaging/notifications (incl. the SignalR notification component's data calls), invitations (delete/resend), join requests, staff, teams, my-services, billable items, documents, user & practice settings, service capabilities, locations.
- QueryClient defaults (staleTime/gcTime), devtools, auth/token retrieval refactor in `api.js` / `useAxios`.
- Wrote a **"React Query Implementation Guide"** for the team (`Desktop/REACT_QUERY_GUIDE.html`) and a feature-slicing/branching guide (`Desktop/migration_guide.html`) → evidence for documentation/mentoring.
- `Desktop/query/` holds a copy of the 25 modules.

## Claims in the current CV that are NOT supported by his commits
| Current CV claim | Evidence | Action |
|---|---|---|
| "across 10+ core modules" TanStack migration | 25 modules — true, but branch unmerged | Keep, wording depends on user answer (shipped or not?) |
| "~40% fewer network payloads" | none, user doesn't know | REMOVE |
| "Dynamic Clinical Rules Engine / QuestionMaker / condition builder" | no QuestionMaker files in his commits; formula builder is his | Replace with formula builder bullet unless user shows other work |
| "Implemented Azure MSAL SSO, token refresh, RBAC" | MSAL already in repo; his commits touch no MSAL code (only token retrieval refactor) | REMOVE or ask user |
| "Integrated SignalR WebSockets" | he only moved the SignalR notification component's data calls to React Query | REMOVE "integrated"; at most "worked with SignalR real-time notifications" |
| "Mentored 3" | user says 2 | → mentored 2 |

## Candidate CV bullets
1. **Built a formula builder and evaluation engine for healthcare billing** — drag-and-drop editor, custom parser/evaluator on mathjs, live validation and a test panel — shipped to production branches and reused by payment features. (React, react-hook-form, mathjs)
2. **Led the move from a custom Axios hook to TanStack Query** — designed a query layer of 25 domain modules (orders, invitations, messaging, staff, billing…) with shared cache defaults, and migrated the order, messaging and invitation flows. *(wording "led/designed" vs "delivered" depends on merge status)*
3. **Wrote the team's React Query implementation guide** and mentored 2 engineers on the new data layer.
4. Worked in a large multi-team codebase (3.9k commits, PrimeReact, Zustand, SignalR, Azure MSAL) through Jira-ticketed branches (MEDX-xxx) and code review.

## Archetype fit
Healthtech ★★★ · Enterprise ★★★ · Fintech ★★☆ (billing formulas) · SaaS ★★☆ · E-commerce ★☆☆

## User answers (2026-10-27)
- TanStack migration: **part of it was merged** (rolled out in stages). → Bullet wording: "designed the 25-module query layer and migrated core flows, rolled out incrementally" — do not claim the whole app is on TanStack Query.
- MSAL, SignalR, QuestionMaker: **not his work** → removed from all CVs. SignalR/MSAL may appear only as "codebase stack" context, never as his achievement.
- After Feb 2026 he moved to **other nWeave projects** (Boost-KGoal, Osloop website, Smart FAQ, etc.).

## Final bullets to use (supersede the candidates above)
1. Built a formula builder and evaluation engine for healthcare billing — drag-and-drop editor, custom parser/evaluator on mathjs, live validation and a test panel; shipped and reused by later payment features.
2. Designed a TanStack Query layer of 25 domain modules to replace a custom Axios hook, migrated core flows (orders, invitations, messaging, staff, billing) and rolled it out in stages.
3. Wrote the team's React Query implementation guide and mentored 2 engineers on the new data layer.
