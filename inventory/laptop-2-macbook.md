# Laptop 2 — MacBook Pro M4 (/Users/ibrahemhassan) — collected 2026-10-27

Surface scan only. Phase 2 deep dives go to `evidence/projects/`.
"His commits" = non-merge commits on all refs by `hibrahem266@gmail.com`, `ibrahem.hassan@osloop.dev`, or `110791444+ibrahem-hassan2000@users.noreply.github.com` (new identity, see plan §1.2).
Scanned: home folder recursively (excluding `node_modules`, `Library`, caches), Desktop, Documents, Downloads. No external drives. 10 git repos found.

## Work repos — nWeave / Osloop (Bitbucket `nweave/*`)

| Repo (local path) | Stack | Total commits | His commits | His dates | Notes |
|---|---|---|---|---|---|
| `~/one14-qardio-app` | pnpm monorepo: Expo RN mobile (`artifacts/mobile`), api-server, Firebase Functions. Firebase (Auth, App Check, Crashlytics, Messaging), react-native-maps, react-native-track-player, expo-task-manager/location, TanStack Query, custom native modules `one14-gps-watch`, `one14-pedometer` | 413 | **0** | — | = ONE14 QARDIO. Repo dates 2026-04-20 → 09-15. Authors: Replit Agent 98, abdelOsloop 66, Ahmed Alaa 41, ahmadfikryfahmy 34, Abdelrahman 12. **None of the commits are his under any known identity.** Local changes = Gradle cache files only (he ran Android builds here). 15 build logs + `TESTFLIGHT_RELEASE_GUIDE.md` are tracked, last touched by Ahmed Alaa. → Ask the user what he did (see §11). |
| `~/tmt-trackooo` | Expo RN, Supabase, TanStack Query, NativeWind, expo-audio, expo-location | 122 | 8 | 2026-05-06 → 05-14 | **Same repo as laptop 1** — no new evidence. 12 local branches incl. `feat/audio-*`, `feat/story`, `feat/post-story`. |
| `~/Documents/projects/kyascoApp` | Expo RN, Expo Router, TanStack Query, axios, Uniwind/Tailwind | 2 | 2 (osloop.dev) | 2026-01-21 → 04-30 | GitHub `ibrahemhassan-cpu/kyascoApp`. **Mobile app, not the Next.js B2B platform** in the old CV. Committed with the nWeave email → ask whose project it was. |

## Bites Development — GitHub org `bites-development` (NEW, not in any CV)

| Repo | Stack | Total commits | His commits | His dates | Notes |
|---|---|---|---|---|---|
| `~/Documents/projects/Bites-Mart-Nextjs` (package `ibeauty`) | Next.js 14.2, React 18, TypeScript, TanStack Query v4, Zustand, MUI 6, Tailwind, react-hook-form + zod, i18next, LiveKit, socket.io, Pusher, Firebase | 2527 | **192** (+13 merges) | 2025-10-13 → 2026-04-14 | **190 of his commits are on `production`.** Big team repo (since 2024-03, 449 remote branches). Monthly: Oct 18 · Nov 33 · Dec 37 · Jan 34 · Feb 30 · Mar 28 · Apr 12. Other authors: RustedMiind 482, Omar Taha 333, Bashamega 333, AlbashengineerAhmed 106 … |
| `~/inbz` | Laravel + Inertia (React/Vue), Radix, TipTap, FullCalendar, Syncfusion | 713 | 1 | 2026-05-08 | Same org. Branch `feat/invoices`. Minor. |

**Bites-Mart — areas he touched most (by file changes, `app/(test)/…`):** invoice create/show/builder/list (≈260), sales orders/quotes/accounts/opportunities (≈240), Theater OS (seat templates, ticket types, movie/event booking + food ordering + checkout), double-entry journal & reports, expenses, bills, contracts (signature workflow), accept-payment, revenue, purchase; plus `lib/api` (209), `components/modern*`, `components/editor`, LiveKit video meetings, Mirotalk P2P rooms, Bites Pay, receivables/payables reports, debit notes API.
→ Strong ERP / fintech-adjacent evidence (invoices, accounting, payments). Phase 2 deep dive needed.

## Personal / side repos

| Repo | Stack | His commits | Dates | Remote / Notes |
|---|---|---|---|---|
| `~/kalima` | Expo RN, Supabase, TanStack Query (+persist), Zustand, i18next, expo-sqlite, expo-speech, Apple widget targets | 25 (all) | 2026-08-12 → 09-03 | **Same repo as laptop 1** (`ibrahemhassan-cpu/kalima`). |
| `~/Documents/projects/lingo` | Expo RN, NativeWind, TanStack Query, Zustand, MMKV, react-hook-form + zod, i18next | 1 (osloop.dev) | 2026-07-05 | No remote. Looks like an early Kalima prototype ("lingo" → "kalima"). |
| `~/Documents/projects/lingo2` | Expo RN, Supabase, expo-speech | 1 (osloop.dev) | 2026-08-07 | No remote. Second prototype, 5 days before Kalima starts. |
| `~/Documents/projects/Movie-Eg` | Expo RN, NativeWind | 1 | 2026-04-13 | No remote. Starter only. |
| `~/Documents/projects/test-code` | Swift / Xcode project | 1 | 2026-04-28 | No remote. Experiment. |
| `~/AndroidStudioProjects/MyApplication` | Android Studio template | — | 2026-04-28 | Not git. Experiment. |

## Other files worth a look
- `Downloads/Ibrahem_Hassan_FlowCV_Resume_2026-06-14.pdf` — another older CV version (June 2026). Compare with the Desktop CV on laptop 1 in Phase 4.
- `Downloads/testflight_feedback*/` — TestFlight crash/feedback exports (which app? probably ONE14 or Trackoo).
- `Downloads/Clockify_Time_Report_Detailed_01_04_2026-30_04_2026.pdf` — time report for April 2026; may show which projects he billed (ask before reading).
- Not read on purpose: `AuthKey_*.p8` (Apple keys — secrets), `inbz_db*` (database dump).

## Not found on this laptop
- Profound Agency and Aquadic work, okoRent, Takhawy, Edubrain, Megaminds, the Next.js Kyasco platform → expect on laptop 3.
- Smart FAQ, AHS, Osloop website, Boost-KGoal, The Code, Zeustra, ElevateMate → laptop 1 only.
