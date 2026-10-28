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

## Correction from code reading (2026-10-28, Interview Handbook research)
- **Formula builder = co-built.** His first version (drag-and-drop, own `formula-parser.js` / `formula-evaluator.js`, `use-formula-builder`) was restructured by teammate Ahmed Hinedy on 2025-12-25 (`37a14c6b`, `8d2ad80d`), which **deleted** the parser, evaluator and drag-drop hook. On `origin/dev` today (git blame): ~526 of ~1,000 lines in the formula module are his (FormulaEditor 137, ManageFormula 164, OperatorsPanel 57, VariablesPanel 39, utils 35, OutputTypeSelector 20, TestingPanel 17) and **all of `src/utils/formulaValidator.js`** (mathjs AST allowlist + trial run). Shipped editor = text field with click-to-insert at the cursor + suggestions; final validation is server-side (`/Services/EvaluateExpressionSyntax`); names are swapped for question IDs before saving. → Drop "drag-and-drop" and "custom parser/evaluator" from CV bullets.
- **TanStack Query rollout.** Local clone (fetched ≤ 2026-03-02): `origin/dev` and `origin/master` have **0** React Query files and 145 / 133 `useAxios` files; only `MEDX-879/react-query-base` got the QueryClient base. The up-to-date mono repo (`Documents/ahs-medical-exchange-services/ClientApp`, 2026-10-27) has the QueryClient in `App.js` and a `src/query/` folder with 2 modules (OTP — 12 commits by him — and system info), while 157 files still use `useAxios`. → Matches the user's "part of it was merged": the base + pattern shipped and the team uses it for new modules; the 25-module migration of existing screens did not land (yet). Wording must say "introduced / set up / migrated on a branch, rolling out in stages", never "migrated the app".
- Hook counts on the migration branch (src/query): 169 `useMutation(`, 49 `useQuery(`, 53 `invalidateQueries(`, 44 `useQueryClient(`. Some reads are wrapped as mutations (search, counts) — a code-smell talking point.

## Final bullets to use (supersede the candidates above — updated 2026-10-28)
1. Built the first version of a billing-formula builder for healthcare services — insert variables and operators at the cursor, live validation with mathjs (allowlisted variables and operators, no functions, divide-by-zero check) and a test panel; a teammate later restructured it, and about half of the shipped module plus its validator are my code.
2. Introduced TanStack Query to the codebase: set up the shared query client and a services → query-hooks pattern the team now uses for new modules, and migrated orders, invitations, messaging, staff and billing across 25 domain modules on a branch that is being rolled out in stages.
3. Wrote the team's React Query implementation guide and mentored 2 engineers on the new data layer.
