# Interview Handbook (project guides) — how it works and how to add a project

> **بالعربي:** ده "دليل الإنترفيو" بتاع إبراهيم. افتح `index.html` في المتصفح. على الجنب فيه المشاريع باللوجوهات، وكل مشروع متقسم لتابات: نظرة عامة · القرارات التقنية · إزاي شغال · الـ Hooks · مشاكل حليتها · الإنترفيو. وفيه صفحة «المفاهيم» بتشرح الأفكار اللي ورا القرارات. فوق في زرار عربي / English / Both. أي Claude على أي لاب يكمّل المشاريع اللي في قايمة «لسه» بنفس القالب والقواعد اللي تحت.

## Structure
- `index.html` — the app shell. Loads the data files, then `assets/app.js` renders everything (no build step, works from disk).
- `data/handbook.js` — registry + the **To do** list (projects whose code is on another laptop).
- `data/<project>.js` — one file per project. Copy `data/_template.js` to start.
- `data/concepts.js` — the concept cards (server state, query keys, real-time options, token storage…). Decisions link to them with `concept: "<id>"`.
- `assets/app.js` — renderer and routing (`#/`, `#/concepts`, `#/<id>/<tab>`). `assets/guide.css` — styles (light/dark, RTL).
- `assets/img/` — **logos only**, taken from the project repos. **No screenshots** (the user's decision, 2026-10-28).

## Tabs per project
1. **Overview** — 30-second pitch, what I built (grouped), my role (mine vs team), tools.
2. **Decisions** — the core. For each big choice: what I picked · the alternatives · why · *could both live together?* (yes / no / partly) · *better option today?* · one English sentence to say in the interview · link to the concept.
3. **How it works** — flow diagrams (steps) and pattern sketches (simplified code written from scratch — never copied client code).
4. **Hooks** — grouped, with counts from his diffs, what for, and what to remember.
5. **Problems solved** — problem → fix → result (+ lesson).
6. **Interview** — STAR story, likely questions with answers, key terms, **Don't say**, evidence.

## How to research a project (what laptop 3 did)
1. Read `evidence/projects/<project>.md` first.
2. Save his diffs once: `git log --all --no-merges --author=<his identities> -p > <scratch>/his.diff` (identities: `CV_MASTER_PLAN.md` §1.2).
3. Count hook calls he **added**: `grep -cE "^\+.*\buseQuery\(" his.diff` (same for `useMutation`, `useInfiniteQuery`, `invalidateQueries`, `useForm`, `useFieldArray`, `useWatch`, `useEffect`, `useState`, `useMemo`, `useCallback`, `useRef`, store `create(`…).
4. Count libraries he imported: `grep -oE "^\+import .* from ['\"][^'\"]+['\"]" his.diff | … | sort | uniq -c`.
5. Read the key shared files he authored (check with `git log --format=%an -- <file>`): API client, query hooks, wrappers, middleware, real-time code, stores.
6. For **Decisions**, look for: the tool used, other libraries in `package.json` that do the same job (duplicates are a good "lesson"), and what the backend dictates (e.g. .NET → SignalR).
7. Check every claim against the code. A library in `package.json` but not in his diffs goes under **Don't say**.

## Rules
- **Facts only, no client code copied.** API names are fine; copied functions, internal URLs/hostnames, secrets are not. The GitHub repo is public.
- **No screenshots.** Logos from the repos only.
- Every claim has evidence (code, git, or the user's words). If research shows a CV bullet is wrong, fix `cv/master-cv.md` and the evidence file, and log it in `CV_MASTER_PLAN.md` §10.
- Arabic in simple Egyptian Arabic; technical terms in English.
- After adding a project: add its `<script>` line in `index.html` and its import (and logo) in `site/src/data.ts`, remove it from `todo` in `data/handbook.js`, update the STATUS row in `CV_MASTER_PLAN.md`.
