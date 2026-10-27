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
- **Main laptop = laptop 2 (MacBook Pro M4).** This is his personal, primary machine; future work happens here. Laptop 3 is an old machine with other projects. He will connect it later for a one-time Phase 1 collection.

Hard rules (short form — full list in the plan):
- Every CV bullet must trace back to evidence in `inventory/` (commits, code, live link, or the user's own words). No invented numbers.
- Never push, publish, or send anything before the user reviews and says yes (global rule).
- The GitHub repo is public: no client code, secrets, internal URLs or hostnames in any file — facts only.
- Talk to the user in Egyptian Arabic; write CV content in English.
