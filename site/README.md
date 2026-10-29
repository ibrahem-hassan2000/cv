# Interview Kit — React site

One React app (Vite + React 18 + TypeScript + React Router) that shows both dashboards:

- **Study Guide**: the content from `../study-guide/data/*.js`
- **Project Guides** (Interview Handbook): the content from `../project-guides/data/*.js`

The content files are **not copied**. The app imports them directly, so editing a data file updates the static dashboards and this site together. The CSS is reused from `../project-guides/assets/guide.css` and `../study-guide/assets/study.css`; `src/app.css` adds only the landing page.

## Run it locally

```bash
npm --prefix site install
```

```bash
npm --prefix site run dev
```

Then open http://localhost:5194.

## Build

```bash
npm --prefix site run build
```

The build output goes to `site/dist/`. It uses `base: "./"` and a HashRouter (`#/study/...`), so it works under any path, including GitHub Pages at `/cv/`.

## Routes

| Route | Page |
|---|---|
| `#/` | Landing page with two doors |
| `#/study` · `#/study/s/<section>` · `#/study/t/<section>/<topic>` · `#/study/o/<group>` | Study Guide |
| `#/study/quick` · `#/study/quiz[/<section>]` · `#/study/search?q=` | Before the interview · Test yourself · Search |
| `#/projects` · `#/projects/<id>[/<tab>]` · `#/projects/concepts[/<id>]` | Project Guides |

## Deploy (GitHub Pages)

`.github/workflows/pages.yml` builds `site/` and publishes `site/dist` on every push to `main` that touches the site, the data or the CSS.

One-time setup on GitHub: **Settings → Pages → Source: GitHub Actions**.

The site is then live at `https://ibrahem-hassan2000.github.io/cv/`.

## Adding content

- **A new data file** (a new study section or project) must be added in two places:
  - the `index.html` of its static dashboard;
  - `src/data.ts` in this app.
- **A new project logo** is also imported and mapped in `src/data.ts`.
