# okoRent — rental marketplace (repo `WeRent`) | Profound Agency | his commits 2024-08-10 → 2025-04-06 | Frontend Developer — sole frontend developer (user, 2026-10-27) | frontend: 1 (him), backend lead: amir elkassar

Local repo: `Desktop/Projects/WeRent` on laptop 3 (Azure DevOps `Profound-Group/We Rent`, private client code — facts only). Brand in code: OkoRent / okorent.com. **No link on the CV** (user's choice).
Stack: Next.js 14 (App Router), TypeScript, TanStack Query v5 + TanStack Table, Zustand, Tailwind + Mantine 7 (charts, dates, dropzone, TipTap), next-intl (locale routing only), react-hook-form + yup, nuqs (URL state), @microsoft/signalr, FullCalendar (resource timeline), Google Maps + OpenLayers, react-virtuoso, Recharts, Swiper.
His commits: **336 of 364** non-merge (identity `ibrahem-hassan2000 <hibrahem226@gmail.com>`). The other 28 are amir elkassar (backend / .NET, tests, branch cleanup).
Monthly: Aug 44 · Sep 42 · Oct 3 · Nov 27 · Dec 69 · Jan 78 · Feb 36 · Mar 35 · Apr 2.
Timeline: started the client app inside the .NET solution (`WeRent/src/Web/ClientApp`, 2024-08-10), moved to a standalone Next.js app at the root in 12/2024.

## What it is
A peer-to-peer rental marketplace: people and businesses list items for rent, others book them for dates, pay, chat and track orders. Four portals: public guest site, user (free), premium (business), and platform admin.

## What HE did (from his commits)
- **Whole frontend, four portals, 110 pages** on `Development`: guest 8, auth 7, user 29, premium 33, admin 31, payment 2.
- **Guest + auth:** home, product listing and product details with reviews, search by location and dates, owner profiles, How it works, Pricing, Who we are, Contact. Sign-up, login, email confirm, phone verify, forgot/reset password.
- **User portal:** dashboard, listings (add/edit with stock and stock locations on a map), bookings and booking details, requests, rentals, checkout and successful-payment pages, wallet, billing with filters, wishlist, inbox, notifications, support and FAQ, ads for listings, warehouses, calendar, profile with "complete your profile" prompt, vacation mode.
- **Premium (business) portal:** order creation, orders, clients, maintenance, taxes, warehouses, settings (general, employees, invoice and quotation templates), billing, calendar, inbox (02 → 03/2025).
- **Admin portal:** accounts (with notes history and reviews), bookings (order details, edit order, notes), listings (add/edit/assign), master data (categories, ads + ad pricing, banners, plans), memberships, invoices, demo requests, support, inbox.
- **Real-time with SignalR:** live notifications (`e494da4`, 2025-01-12) and a chat hub with new-message events (`2a0417f`, 2025-02-18), token-authenticated connections.
- **Chat:** inbox with infinite scroll (`useInfiniteQuery`) and a virtualized message list (react-virtuoso) — all 5 commits using each are his.
- **Data layer:** 31 TanStack Query hook modules (`src/hooks/queries`: admin, auth, guest, user), mutations with cache invalidation (41 of his commits use `invalidateQueries`, 0 by others), upgraded to the latest React Query in 02/2025.
- **Filters in the URL:** nuqs `useQueryState` for list filters and search (11 commits, all his).
- **Payments:** checkout, payment links, payment success/failed pages, wallet, invoice download (03/2025).
- **Booking calendar:** FullCalendar resource timeline for bookings (8 of 10 commits).
- **Maps:** Google Maps for listing and stock locations (27 of 29 commits), plus OpenLayers (9 of 11).
- **i18n — routing only:** next-intl locale-prefixed routes (`/ar`, `/en`) and RTL switching, but **no translated UI text** (`useTranslations` is used in 0 files; `messages/*.json` are left over from another project). Don't call okoRent "bilingual".
- **Shared states:** `QueryWrapper` (render-prop component, 12 commits, all his) handles loading, empty, 401 (clears token), 403, 404 and 500 for every list and detail page.
- **Auth:** JWT in an `httpOnly`, `sameSite=strict` cookie set by a server action, with the cookie expiry taken from the token; `middleware.ts` combines next-intl with role-based redirects (guest, user, admin).
- **Optimistic chat:** a sent message is added to the TanStack cache at once with status `pending`, and SignalR messages are written into the cache with `setQueriesData` instead of refetching.
- **Email templates** (not git, `Desktop/okorent`, 02–03/2025): welcome, verification code, reset password, invoice, quotation, request approved, preparing order, order shipped, contact-us reply.

## Measurable impact (only with proof)
- 336 of 364 commits; sole frontend developer (user).
- 110 pages across 4 portals; 31 query modules; 166 component files.
- `[NEEDS-PROOF]` users, listings, bookings — unknown. Product is not linked on the CV.

## Candidate CV bullets
1. **Built the entire frontend** of a peer-to-peer rental marketplace as the only frontend developer: 110 pages across four portals (guest, user, business, admin) in Next.js 14, TypeScript and TanStack Query.
2. **Added real-time chat and notifications** with SignalR, with an infinite-scroll, virtualized inbox.
3. Built booking, checkout and payment flows: date-range availability, a resource-timeline booking calendar, payment links, wallet and invoices.
4. Built the business (premium) portal: orders, clients, maintenance, taxes, warehouses, employees and invoice/quotation templates.
5. Structured the data layer as 31 TanStack Query modules with cache invalidation and URL-synced filters; one shared wrapper for loading, empty and error states; role-based route protection in Next.js middleware.

## Archetype fit
E-commerce / marketplace ★★★ · Product SaaS ★★★ · Fintech ★★☆ (payments, wallet, invoices) · Enterprise ★★☆ (.NET backend, SignalR) · Healthtech ☆ · Mobile ☆ · Agency ☆

## Interview story (STAR) — optional
S: Profound needed a rental marketplace with four user types. T: he was the only frontend developer. A: built every portal on Next.js 14 with a TanStack Query layer, then added SignalR chat and notifications on the .NET backend's hubs. R: 110 pages, 336 commits over 8 months.
