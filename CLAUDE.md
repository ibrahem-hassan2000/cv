# CV Project — read this first (any laptop, any session)

This folder is Ibrahem Hassan's CV engine. Its goal: strong, honest, company-targeted CVs for frontend roles (React / Next.js / React Native) at large and mid-size companies in Egypt (and remote/Gulf if he chooses).

Before doing anything:

1. Read `CV_MASTER_PLAN.md` — the goal, rules, phases and the **STATUS** table (where we stopped).
2. Read `inventory/` — what has been collected from each laptop.
3. Continue from the first phase/step in STATUS that is not `DONE`. Do not restart finished work and do not change the main idea.
4. When you finish a step, update the STATUS table and the Session Log at the bottom of `CV_MASTER_PLAN.md`.

How the user wants to work (decided 2026-10-27):
- **New facts go into the evidence base only.** When the user gives new information or a new laptop's projects, update `inventory/`, `evidence/projects/` and `cv/master-cv.md`. **Do not regenerate the CV variants or PDFs on your own.**
- **CVs are made per job, on request.** When the user says he wants to apply to a job (and shares the posting), build one CV tailored to that job: pick the projects and bullets that fit it best from `cv/master-cv.md`, match the job's keywords, keep it to 1–2 pages, and export the PDF. The existing `cv/variants/` are starting templates, not something to keep in sync.
- **Interview Handbook (project guides, added 2026-10-28, redesigned the same day).** `project-guides/index.html` is a one-page app (sidebar with project logos, Arabic / English / Both switch, technical terms in English). Each project is one data file `project-guides/data/<id>.js` with tabs: Overview · **Decisions** (what he chose, the alternatives, why, could both live together, what is better today, one sentence to say) · How it works (flows + pattern sketches) · Hooks · Problems solved · Interview (STAR, Q&A, terms, Don't say). `data/concepts.js` explains the ideas behind the decisions. The goal: he can learn from it and explain every choice in an interview with international companies. When he says "كمّل الـ project guides" on a laptop, take the **To do** entries in `project-guides/data/handbook.js` whose code is on that laptop, read the code, and follow `project-guides/README.md`. Start from `project-guides/data/_template.js`. **No screenshots** (his decision) — logos from the repos only.
- **Study Guide (added 2026-10-29).** `study-guide/index.html` is a separate dashboard (linked both ways with the Handbook): every interview topic from HTML to system design, with when-to-use / X vs Y / traps / his projects / interview Q&A with follow-ups / self-test, plus verified JS output questions. When he says "كمّل دليل المذاكرة", write the next planned section in `data/registry.js` order, following `study-guide/README.md`; run `node study-guide/tools/verify-output.js` after touching output questions.
- **Online copy (added 2026-10-29).** Both dashboards are published as one private Claude artifact so he can open them from any device signed in to claude.ai: **https://claude.ai/artifact/UN48ckqtk4J9xhS2V44MFb** (entry page `hub.html` → `study-guide/` and `project-guides/`). After changing either dashboard, republish to the SAME url: read it first (Artifact action "read"), then publish `hub.html` with `url` set to that link and the changed files in `files`. Never create a second artifact for this.
- **Companies (added 2026-10-29).** `market/data/companies.js` (`window.MARKET`) feeds the `/companies` section of the React site: companies in Cairo/Alexandria with posting status, study tracks that link to Study Guide topics, and job boards. When he asks to refresh it, re-check each company's careers page / LinkedIn, update `status` and `checked`, and keep facts public only (no recruiter names or private links).
- **Public React site (added 2026-10-29).** `site/` is a Vite + React + TypeScript app that shows both guides. It imports the same data files (`site/src/data.ts`), so never copy content into it. A new data file or logo must also be added to `site/src/data.ts`. It is live on **Vercel** (deployed by the user: Root Directory `site`, Vite preset), which redeploys on every push to `main` — so pushing (only after his OK) publishes. The GitHub Pages workflow exists but GitHub Actions is blocked by a billing lock on his account. See `site/README.md`.
- **Per-job CVs from chat:** when he pastes a job post, build the tailored CV (see the per-job rule above and `cv/cv-standards.md` §6).
- **Main laptop = laptop 2 (MacBook Pro M4).** This is his personal, primary machine; future work happens here. Laptop 3 (old Windows machine) is fully collected (2026-10-28); no more collection needed there.

Hard rules (short form — full list in the plan):
- Every CV bullet must trace back to evidence in `inventory/` (commits, code, live link, or the user's own words). No invented numbers.
- Never push, publish, or send anything before the user reviews and says yes (global rule).
- The GitHub repo is public: no client code, secrets, internal URLs or hostnames in any file — facts only.
- Talk to the user in Egyptian Arabic; write CV content in English.
