# Spectra — healthcare services platform | Profound Agency | his commits 2024-07-14 → 2024-11-17 | Frontend Developer — owned the admin and doctor portals (user, 2026-10-27) | frontend: 2 (him + Moataz Ali), plus .NET backend team

Local repo: `Desktop/Projects/Spectra%20New%20Project` on laptop 3 (Azure DevOps `Profound-Group/Spectra New Project`, private client code — facts only). Frontend in `Spectra.Web/ClientApp/spectra-client`. Product: spectra.sa (old CV: "connects people with disabilities to healthcare services"). No link on the CV unless the user wants it.
Stack: Next.js 14 (App Router) in **JavaScript** (no TypeScript), TanStack Query v5 + TanStack Table, Zustand, Mantine 7 (+ charts), Chart.js, Tailwind, next-intl (Arabic / English), axios. The repo also has SignalR, FullCalendar, dnd-kit, react-quill and react-hook-form + zod, but **those are not in his diffs** → don't claim them for Spectra.
His commits: **242** non-merge (identity `ibrahem-hassan2000 <hibrahem226@gmail.com>`), **all on `Production`**. Frontend authors: Moataz Ali 357 (07/2024 → 01/2025), him 242.

## What it is
A healthcare platform that connects clients (families, organizations, patients) with doctors and medical staff: appointments, prescriptions, medical reports, contracts with organizations, video sessions, and a large admin back office.

## Who did what
- **User:** he owned the **admin portal and the doctor portal**; Moataz owned the **client / customer portal**.
- **Git agrees:** he created ~143 pages (`page.js`): **80 admin, 40 doctor**, plus shared clients/contracts/requests/video pages. Before he left the project (11/2024), Moataz's new pages were mostly client (23) and customer (20).
- **After he left:** in 12/2024 Moataz restructured the folders into one shared dashboard layout (`.jsx`), refactored main data (services, departments, drugs), and finished the contracts accept/reject cycle. So say "built the admin and doctor portals", not "the final version of every flow".

## What HE did (from his commits)
- **Admin — clients:** organizations (contracts, employees, prescriptions, clients and patients), families (patients, prescriptions, medical reports), patient details (appointments, prescriptions, reports).
- **Admin — master data, full CRUD:** drugs, lab analyses, complaints, departments, diagnostics, doctor specialties, services, internal tests ("handle API in main data in 5 sections", 2024-10-16).
- **Admin — settings:** website content (articles, ad banners, medical specialties, services, success stories), subscription packages, **user permissions** (19 commits on permissions).
- **Admin — staff and contracts:** add staff, staff profile with clients, contracts, prescriptions and team; contract information, details and new contracts.
- **Doctor portal:** dashboard, appointments (upcoming, previous, cancelled, deferred, calendar, working hours), clients (details, activities, prescriptions, medical reports, invitation code), contracts, chats, profile (certificates, team, prescriptions), ratings with progress bars, plans, wallet, settings, notifications, complaints.
- **Video sessions:** doctor and client video pages (14 commits).
- **Reports and charts:** client reports and diagnostic reports with charts (50 commits mention reports, 11 charts).

## Measurable impact (only with proof)
- 242 commits, all shipped to `Production`; ~143 pages created (80 admin, 40 doctor).
- `[NEEDS-PROOF]` users, doctors, organizations on the platform.

## Candidate CV bullets
1. **Built the admin and doctor portals** of a healthcare platform in Next.js 14 and TanStack Query: about 120 pages for appointments, prescriptions, medical reports, contracts and staff.
2. Built the admin back office: client organizations and families, staff, master-data CRUD (drugs, diagnostics, departments, specialties, services), website content and user permissions.
3. Built the doctor workspace: appointment management with a calendar, patient records with prescriptions and reports, contracts, chats, ratings and wallet, plus doctor–client video pages.
4. (Team line) Worked with a second frontend developer who owned the client portal; all 242 of my commits shipped to production.

## Archetype fit
Healthtech ★★★ · Enterprise / B2B SaaS ★★★ (RBAC, back office, .NET backend) · Product SaaS ★★☆ · Fintech ★☆☆ · E-commerce ☆ · Mobile ☆ · Agency ☆

## Interview story (STAR) — optional
S: a healthcare platform with three user types and a big back office. T: he owned the admin and doctor portals. A: built ~120 pages on a shared TanStack Query data layer, CRUD for all master data, permissions, and the doctor's appointment and patient-records flows. R: 242 commits in 4 months, all on production; the client portal was built in parallel by a teammate.
