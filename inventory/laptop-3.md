# Laptop 3 — Windows 11 (C:\Users\hibra) — collected 2026-10-27

Surface scan only. Phase 2 deep dives go to `evidence/projects/`.
"His commits" = non-merge commits on all refs by `hibrahem266@gmail.com`, `ibrahem.hassan@osloop.dev`, `110791444+ibrahem-hassan2000@users.noreply.github.com`, or **`hibrahem226@gmail.com`** (new identity, see below).
Scanned: home folder recursively (excluding `node_modules`, `AppData`, caches, build output), Desktop, Documents, Downloads, OneDrive Desktop, and `C:\` top-level folders. Drive `F:` is empty. 30 git repos found. Personal folders (photos, courses) skipped on purpose.

## New identity
- **`ibrahem-hassan2000 <hibrahem226@gmail.com>`** — "226" instead of "266", most likely a typo in an old git config. Same name as his GitHub account, and it sits next to the gmail identity in his own repos (edubrain, anyShop, Takhawy_Next, rashaktk). Used 2023 → 2025. **His — confirmed by the user 2026-10-27.**
- Without it, Profound work shows 0 commits (WeRent, Spectra, Nearcare are all under this email).

## Profound Agency (Profound Group — Azure DevOps `Profound-Group/*`)

| Repo (local path) | Stack | Total commits | His commits | His dates | Notes |
|---|---|---|---|---|---|
| `Desktop/Projects/WeRent` (= **okoRent**) | Next.js 14, TypeScript, TanStack Query v5, Zustand, Tailwind, next-intl, react-hook-form + yup, Recharts, Google Maps, **@microsoft/signalr** | 364 | **336** (92%) | 2024-08-10 → 2025-04-06 | Brand in code = OkoRent / okorent.com. Old-CV link not used any more (user: no link on the CV). User: he built the whole frontend. Only other author: amir elkassar (28, mostly backend/.NET + tests). Four portals, **110 pages** on `Development`: guest 8, auth 7, user 29, premium (business) 33, admin 31, payment 2. **31 TanStack Query hook modules** (`src/hooks/queries`). His diffs include **SignalR** real-time notifications (`e494da4`, 2025-01-12) and a SignalR chat hub (`2a0417f`, 2025-02-18), checkout + payment links, wallet, calendar, bookings, invoice download, inbox/chat, wishlist, reviews, support. |
| `Desktop/okorent` (not git) | HTML email templates | — | — | 2025-02 → 03 | Transactional emails for okoRent: welcome, verification code, reset password, invoice, quotation, request approved, preparing order, order shipped, contact-us reply. |
| `Desktop/Projects/Spectra%20New%20Project` (+ older copy in `OneDrive/Desktop`, 41 commits) | Next.js 14 (`Spectra.Web/ClientApp/spectra-client`) on a .NET solution: TanStack Query v5 + Table, Zustand, Mantine 7 (+charts), Chart.js, FullCalendar, dnd-kit, react-hook-form + zod, next-intl, react-quill, signature canvas, react-virtuoso | 1045 | **242** | 2024-07-14 → 2024-11-17 | = **Spectra** (spectra.sa — healthcare services for people with disabilities). All 242 are on `Production`. Two main frontend devs: Moataz Ali (357) and him (242, #2). User: **he owned the admin and doctor portals; Moataz owned the client portal.** His areas: admin settings/content, main data (services, departments, diagnostics, drugs, complaints, specialties, tests), contracts (admin/doctor/staff), clients (organization, family, patient details), staff add/edit, permissions, packages, doctor appointments, doctor & client video pages, reports with charts. SignalR is in `package.json` but **not in his diffs** → don't claim it for Spectra. |
| `Desktop/Projects/Nearcare` | Next.js client on a .NET backend | 565 | 4 | 2024-07-24 → 08-04 | Pharmacy section: sessions, previous sessions, download. Minor — at most one line. |

## Aquadic (GitHub org `AQuadic/*`) — 10/2022 → 07/2024, matches the CV dates

| Repo | Stack | His commits | His dates | Notes |
|---|---|---|---|---|
| `OneDrive/.../Analytica-next` | Next.js 13 (App Router), TanStack Query v4, next-intl, Firebase, react-bootstrap, Mantine | **142** of 163 | 2023-08-08 → 2024-07-11 | E-learning: courses, instructors, exams, checkout, Google login, AR/EN. Started it from `create-next-app`. |
| `.../find_help_next` | Next.js 13, MUI, next-intl, Firebase, Google Maps | **98** of 100 | 2023-08-08 → 2024-03-15 | Services marketplace: service providers, categories, booking + checkout, chat, phone verify, AR/EN. |
| `.../marina_react` | Next.js 13 (Pages Router), i18next, Tailwind, Sass | **83** of 89 | 2023-04-03 → 2024-07-08 | = **Marina** (marina.com.eg, old CV). Listings, articles, guide, invoices + payment, service requests, lost & found, complaints, admin login, OTP. |
| `.../alwatania_front` | HTML / CSS / JS | **71** of 73 | 2022-10-26 → 2024-03-11 | E-commerce front (basket, addresses, account). His first commercial repo. |
| `Desktop/Projects/megamind_front` (+ OneDrive copy) | HTML / CSS / JS | **60** of 83 | 2023-03-07 → 2024-09-01 | = **Megaminds Academy** (megaminds-academy.com, old CV) → Aquadic client. |
| `.../learning_front` | HTML / CSS / JS | 24 of 25 | 2023-05-25 → 08-06 | Course platform: courses, video, certificates, checkout. |
| `.../institute` | HTML / CSS / JS | 23 of 23 | 2023-12-04 → 2024-03-13 | Institute site. |
| `.../mdr-E-com` | HTML / CSS / JS | 15 of 15 | 2024-06-11 → 06-26 | E-commerce site. |
| `.../Tajj_front` | HTML / CSS / JS | 13 of 13 | 2023-12-31 → 2024-01-02 | Landing site with AR/EN `lang.json`. |

Count: **9 Aquadic client repos** on this laptop (3 Next.js, 6 HTML/CSS/JS), ~529 of his commits. The old CV says "10+ clients" → only 9 proven so far; aquadic.github.io (company site, old CV) not cloned here.

## Bites (GitHub org `bites-development`)

| Repo | Stack | His commits | His dates | Notes |
|---|---|---|---|---|
| `Desktop/Bites-Mart-Nextjs` | same as laptop 2 | 191 | 2025-10-13 → 2026-04-09 | **Same repo as laptop 2** — no new evidence. Local branch `feat/update-invoice`. |
| `Desktop/Projects/inmeetp2p` (package `mirotalk`) | MiroTalk P2P (Node) + axios | 5 of 22 | 2026-02-06 → 02-22 | P2P video rooms used by Bites meetings. Small. |
| `Desktop/THEATER MANAGEMENT SYSTEM V2.txt`, `Teater os V3.txt` | spec text | — | 2026-02 | Theater OS specs → supports "co-built Theater OS". |

## Personal / freelance / side repos
User (2026-10-27): **Takhawy, Edubrain, Rehla and Rashaktk were freelance.** The rest of this table is personal practice or job take-home tasks.

| Repo | Stack | His commits | Dates | Remote / Notes |
|---|---|---|---|---|
| `Desktop/Projects/edubrain` | Next.js 14, TypeScript, Tailwind, react-hook-form + yup | 65 (all) | 2025-04-23 → 05-11 | github `ibrahem-hassan2000/edubrain`. = **Edubrain** (old CV: AI homework assistant). Company unknown → §11. |
| `OneDrive/.../TakhawiWebsiteFrontENd` | Next.js 14, TypeScript, next-intl, react-bootstrap | 49 (all) | 2024-02-08 → 09-30 | github org **`Hayah-Technology`**. = **Takhawy** (takhawe.com, Saudi trip-sharing, old CV). Which company? → §11. |
| `OneDrive/.../Takhawy_Next` | same | 13 (all) | 2024-02-19 → 09-29 | github `ibrahem-hassan2000/Takhawy_Next` (live takhawy-next.vercel.app) — his copy of the above. |
| `OneDrive/.../rashaktk` | Next.js 14, TypeScript, next-intl, Swiper | 51 (all) | 2024-06-03 → 08-12 | github `ibrahem-hassan2000/rashaktk` (live). Client or personal? → §11. |
| `OneDrive/.../rehla` | Next.js 14, react-bootstrap | 9 | 2024-03-31 → 04-07 | github, live. |
| `OneDrive/.../anyShop` (+ `C:\client`, CRA + Mantine copy, 2023-06) | React, Redux Toolkit, Firebase, Tailwind | 11 | 2023-05-29 → 12-11 | github, live. Early learning project. |
| `OneDrive/.../hemaApp` | Expo 48, React Native | 5 | 2023-06 → 07 | github. Early RN practice. |
| `OneDrive/.../car` | HTML / CSS | 3 | 2024-07 | github. |
| `Desktop/Projects/kyasco` | React + Vite "fusion-starter", Radix, TanStack Query, Three.js | 0 (62 by **Builder.io bot**) | 2026-01-05 → 01-06 | github `ibrahem-hassan2000/kyasco`. AI-generated (Builder.io) web version of his personal Kyasco idea. The Expo app is on laptop 2. Not CV material. |
| `Desktop/dubisign-task` | Next.js 15, React 19, Tailwind 4, TanStack Query, Redux Toolkit | 4 | 2025-09-11 → 09-12 | github, live. Job take-home task. |
| `Desktop/singleclic-task` | React 19, Vite, Tailwind 4, TanStack Query, Redux Toolkit | 5 | 2025-07-19 | github. Job take-home task. |
| `Desktop/ecommerce-angular` | Angular 17, Tailwind | 1 | 2025-06-02 | no remote. Angular practice — 1 commit, don't list Angular as a skill on this. |
| `Desktop/Projects/video-test` | Next.js 14 | 1 | 2024-08-20 | no remote. Experiment. |

## Other files worth a look
- `Desktop/Ibrahem-Hassan-CV.pdf` (June 2025) — older CV. Profound 07/2024 – present, Aquadic 10/2022 – 07/2024, "2 years of experience". Projects with live links: okorent-client-side.vercel.app, spectra.sa, marina.com.eg, takhawe.com, aquadic.github.io, megaminds-academy.com. Confirms okoRent, Spectra, Marina, Takhawy, Megaminds are the projects from the CV.
- `Desktop/Mid-Level Frontend Developer Task.pdf` (2025-11) — a job take-home brief. Not evidence.
- `Desktop/Clockify_Time_Report_*` (Nov 2025, Feb 2026) — time reports, not read (ask before reading, same rule as laptop 2).
- `Desktop/all-jobs` (+ zip, 2026-01) — `jobs/` + `server/`, not git. Not checked.
- Not read on purpose: tracked `.env` files in WeRent (may hold secrets), personal folders (photos, courses).

## Not found on this laptop
- ONE14, Smart FAQ, AHS, Osloop website, Kalima → laptops 1 / 2.
- e-comerce, sanaTes (empty folder here), erpDash (all listed in `inventory/github.md`) — on GitHub only.
- The Next.js "Kyasco B2B platform" from the old CV does not exist as code; Kyasco is personal (laptop 2 Expo app + this Builder.io prototype).
