# Osloop Smart FAQ System (CARTI pilot) | nWeave | 2026-10-04 → 2026-10-26 | Frontend lead (sole main author)

Local repo: `C:\Users\DELL\Desktop\projects\smart-faq-frontend` (Bitbucket `nweave/smart-faq-frontend`, private)
His commits: **166 of 173** non-merge (other 7: ahmedalaadev). He built the frontend from the first commit (`initial Vite + React + TypeScript setup`).
Stack: React 19, TypeScript 6, Vite 8, React Router 8, TanStack Query 5, Tailwind v4, shadcn/ui + Radix, react-hook-form + Zod, TipTap 3 (rich text), dnd-kit, Storybook 10 (a11y addon), Vitest 4 + Testing Library + Playwright browser runner, oxlint, OpenAPI-generated types. Backend: ASP.NET Core API (separate team), cookie session.

## What it is
Invitation-only internal knowledge hub for a healthcare operations client (CARTI): staff search approved operational answers; Knowledge Managers write and submit articles; Admins review, approve, publish, and manage users, taxonomy and the audit trail.

## What HE did (from commit history + `context/` docs)
- **Architecture from zero:** Atomic-Design component system (atoms → molecules → organisms → templates), feature folders (`auth`, `knowledge`, `drafts`, `admin`, `questions`, `reports`, `shared`), page-as-a-folder pattern, central config for routes/capabilities/navigation. Documented in `context/architecture.md`, `data-layer.md`, `code-standards.md`.
- **27 Figma screens (S01–S34)** built 1:1 at desktop 1440px and mobile 390px — auth, knowledge home, departments, search, article, drafts, editor, review queue, admin overview, users, access, taxonomy, audit log.
- **Role- and capability-based access:** 3 roles (Team Member, Knowledge Manager, Admin), route guards, navigation filtered by capability; capabilities taken from the API session.
- **Auth flows:** sign-in, invitation activation, password change, **MFA setup/verification for Admins**, session-expired handling, "server unreachable" vs sign-out distinction.
- **Data layer:** HTTP client + typed API error catalogue, TanStack Query defaults, queries/mutations for knowledge, drafts, admin, audit; **types generated from the OpenAPI contract (94 endpoints)**; removed all mock APIs once backend was live (`refactor(api): call the backend only`).
- **Editorial workflow:** TipTap rich-text editor with custom tools (callouts, tables, links), draft states, validation, preview → submit → return/publish, discard/withdraw, compare a correction with the published version, permanent delete, archive/unarchive/move.
- **Admin tools:** user invite/edit/disable, department & category tree with **drag-and-drop reorder (dnd-kit, keyboard accessible)**, audit log with action/result/date-range filters and grouped action names, search synonyms setting, per-user time zone.
- **Search UX:** multi-department filter, typo/synonym handling, highlighted matches, URL-synced filters, pages up to 100.
- **UX audit implementation:** shared list kit (filter bar, status dictionary, empty states, breadcrumbs), unified illustrated error state, leave-without-saving guard, layout text overflow fixes.
- **Performance fix:** `fix(lists): draw one table layout and stop re-rendering every row's menu and badge` (2026-10-22).
- **Quality:** **551 unit/component test cases in 55 test files** (Vitest + Testing Library), **75 Storybook stories** with a11y addon, sign-in journeys tested through real routes.
- **Codebase size:** ~40k lines of TypeScript/TSX across 522 files (his work).
- **AI-assisted workflow:** repo has `context/ai-workflow-rules.md`, progress tracker, unit plans and Storybook MCP addon → he runs a structured AI-assisted dev process (Claude Code-style context docs). Useful talking point for modern teams.

## Measured numbers (all verified from the repo, 2026-10-27)
166 commits · 27 screens · 3 roles · 94 API endpoints typed · 551 test cases · 55 test files · 75 stories · ~40k LOC · built in ~3 weeks.
[NEEDS-PROOF]: none used.

## Candidate CV bullets
1. **Built a healthcare-operations knowledge platform's frontend from scratch** (React 19, TypeScript, TanStack Query, Tailwind/shadcn) — 27 Figma screens, 3 roles with capability-based routing, and MFA for admins, shipped in ~3 weeks as lead frontend engineer (166 of 173 commits).
2. **Designed an Atomic-Design component system documented in 75 Storybook stories** with accessibility checks, reused across 7 feature areas.
3. **Wrote 551 unit and component tests** (Vitest + Testing Library) covering the request layer, query client, auth journeys and review workflow.
4. **Typed the full API contract (94 endpoints) from OpenAPI** and built a TanStack Query data layer with a typed error catalogue and session-expiry handling against an ASP.NET Core backend.
5. **Built an editorial review workflow** — TipTap rich-text editor, draft → submit → return/publish, version comparison, audit log with filters, drag-and-drop taxonomy tree.
6. (AI-friendly teams) Ran an AI-assisted development workflow with structured context docs, unit plans and a progress tracker.

## Archetype fit
SaaS ★★★ · Healthtech ★★★ · Enterprise ★★★ · Fintech ★★☆ (auth/MFA/testing) · E-commerce ★☆☆ · Mobile ☆ · Agency ☆

## Interview story (STAR) — draft
S: client needed an internal knowledge hub, backend still being built. T: own the whole frontend. A: built design system + mock-backed screens first, then OpenAPI-typed data layer, swapped mocks for the real API, added tests per feature. R: 27 screens, 551 tests, mocks removed, delivered in ~3 weeks.
