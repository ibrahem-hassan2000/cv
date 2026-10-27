# Bites business platform (Bites-Mart-Nextjs) | Bites (bites.com) — part-time | 09/2025 – 04/2026 (his commits 2025-10-13 → 2026-04-14) | Frontend Developer (React / Next.js — user, 2026-10-27) | 14 active contributors

Local repo: `~/Documents/projects/Bites-Mart-Nextjs` on laptop 2 (GitHub org `bites-development`, private client code — facts only). Package name `ibeauty`. Product domain: bites.com.
Stack: Next.js 14.2 (App Router), React 18, TypeScript, TanStack Query v4, Zustand, MUI 6 + Tailwind + Radix, react-hook-form + Zod, i18next, LiveKit, socket.io, Pusher, Firebase, FullCalendar, dnd-kit, TipTap/Lexical.
His commits: **192 non-merge + 13 merges** (identities `hibrahem266@gmail.com`, `ibrahem-hassan2000`, GitHub noreply). **190 of the 192 are on `production`.** Repo total 2,527 commits since 2024-03, 449 remote branches.
Team: 14 people committed during his period; he is **#2 by commits** (Bashamega 333, him 190, AlbashengineerAhmed 106, others ≤ 25).
Monthly: Oct 18 · Nov 33 · Dec 37 · Jan 34 · Feb 30 · Mar 28 · Apr 12. Steady part-time work over 7 months.

## What it is
An all-in-one business platform (ERP-style) on Next.js: finance (invoices, bills, expenses, double-entry accounting, reports), sales CRM (accounts, opportunities, quotes, orders), contracts with e-signatures, payments, video meetings, and vertical modules such as Theater OS (cinema and event booking).

## What HE did (from his commits; area = folders under `app/(test)/`)
- **Invoices: main author** (43 of ~74 commits in `invoice/`). He built the invoice create page, invoice show/edit, the invoice builder and list with pagination and filters, payment dialog, attachments, email tracking and template generation, percentage discounts and conditional quantity rendering. He also built a "modern" invoice flow (`invoice-modern/`), quotes and documents.
- **E-signatures:** OTP-verified signature for contracts and invoices (2026-03-27). Contract creation with a signature workflow (`contracts/`, 18 of 24 commits).
- **Accounting and finance:** double-entry journal and reports (10 of 12 commits), receivables/payables reports, expenses with forms and date pickers (19 of 21), bills, debit-notes API and types, revenue, accept-payment applications, finance dashboard, Bites Pay.
- **Sales CRM: contributor** (42 commits; RustedMiind is the main author). He built sales orders (create, edit, refetch), sales quotes, the account list and detail pages, opportunities, and contact management with category icons.
- **Theater OS: co-built with Bashamega** (11 commits each). Admin side covers movies, events, food, taxonomy, seating-template editor and ticket types. Public side is a booking flow with seat selection, food ordering, checkout and tickets (2026-02-25 → 03-03).
- **Shared pieces:** `lib/api` modules (209 file changes), typed API (`types/api`), a reusable item-management component and standard create forms across sales, purchase and invoices, ConfirmDialog provider, Lead Inbox, Mirotalk P2P meeting dialog, part of the LiveKit video integration (shared with others).
- **Size:** created 78 new pages (`page.tsx`) and ~690 new files. Line counts are inflated by generated/moved code, so don't use them.

## Measurable impact (only with proof)
- 192 commits over 7 months part-time, 190 shipped to production, #2 of 14 contributors.
- 78 pages created.
- `[NEEDS-PROOF]` users, customers or revenue of the platform. Ask the user only if they know.

## Candidate CV bullets
1. **Built finance modules** for a Next.js 14 business platform: invoices (builder, payments, attachments, email tracking), bills, expenses, debit notes, receivables and payables reports, and double-entry journal reports.
2. **Added OTP-verified e-signatures** to contracts and invoices and built the contract-creation workflow.
3. **Co-built Theater OS**, a cinema and events module: admin for movies, food, seating templates and ticket types, plus a public booking flow with seat selection, food ordering and checkout.
4. Built sales CRM screens (orders, quotes, accounts, opportunities) in a 14-person team. 190 of my commits were merged to production over 7 months (part-time), the second-most of any contributor.
5. (Optional) Contributed to real-time features: LiveKit video calls and peer-to-peer meeting rooms.

## Archetype fit
Fintech ★★★ (invoices, payments, accounting, e-signatures) · Enterprise/ERP ★★★ · Product SaaS ★★★ · E-commerce ★★☆ (booking/checkout) · Healthtech ★☆☆ · Mobile ☆ · Agency ☆

## Open
- ~~Job title~~ answered: Frontend Developer, React and Next.js; the project was mostly Next.js.
- ~~Location~~ answered: remote; the company is based in Cairo.
- Start month: the user said 9/2025 (wrote "2015", read as a typo). First commit is 2025-10-13.
- `~/inbz` (same org, Laravel + Inertia): 1 commit on 2026-05-08 (`feat/invoices`). Too small for the CV.
