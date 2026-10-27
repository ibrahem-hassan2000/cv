# OsLoop Media Production website | nWeave/Osloop (company's own site) | 2026-10-07 → 2026-10-25 | Main frontend dev

Local: `C:\Users\DELL\Desktop\projects\osloop website` · GitHub `ibrahemhassan-cpu/osloop-website` · Live: https://osloop-website.vercel.app
His commits: **39 of 48 non-merge** (+260k lines incl. assets/GLB; code share smaller).
Stack: React, Vite, Three.js, React Three Fiber, GSAP, Lenis, Motion, Swiper-style carousel.

## What it is
Marketing site for OsLoop (the media-production arm of nWeave): home, all projects with animated category filters, per-project "story" pages; Light/Dark theme.

## What HE did (commit messages)
- **Draggable 3D glass ∞ hero** — arrow draws the infinity logo and takes it back; glass material ends.
- **3D globe "Our reach"** of the markets OsLoop works with; **3D process ring**; team cards dealt onto a circle; industry orbit.
- **Custom loading screens lab** (`/loaders`, 4 options incl. "Take Shape" 3D word, "Press Play" self-drawing icon) with shared loop-motion helpers.
- **Export script that generates the 3D OsLoop icon as GLB / OBJ / STL.**
- Scroll-driven sections (hold-last-card before next section, image loops with clickable dots), contact form with human check (math question until Cloudflare Turnstile keys arrive).
- **Client feedback rounds** handled as tickets (round 1: H-01 → H-26; round 2), content/media handoff from Figma.
- Responsive from 320px up; lazy image loading ("project stills download only where they are seen").

## Measurable (to do)
- [ ] Run Lighthouse on the live URL (mobile + desktop) and record scores here — only then use a number.

## Candidate CV bullets
1. Built the OsLoop studio website with React Three Fiber and GSAP — a draggable 3D glass hero, a 3D markets globe and a scroll-driven process ring — responsive from 320px and lazy-loading media.
2. Built four custom WebGL/SVG loading screens and a script that exports the 3D brand icon to GLB/OBJ/STL.
3. Delivered two client feedback rounds (26+ tracked items) directly with the client.

## Archetype fit
Agency/Creative ★★★ · E-commerce/marketing ★★☆ · SaaS ★☆☆
