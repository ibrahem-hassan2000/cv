# ONE14 QARDIO | nWeave client project (Bitbucket `nweave/one14-qardio-app`) | repo 2026-04-20 → 2026-09-15 | product & technical lead (not the committer) | team ~4–5 (from commit identities)

Local repo: `~/one14-qardio-app` on laptop 2 (private, client code — facts only).
Stack: pnpm monorepo — Expo / React Native mobile app (`artifacts/mobile`), API server, Firebase Cloud Functions. Firebase Auth (Apple + Google sign-in), App Check, Crashlytics, Cloud Messaging, Firestore; react-native-maps, react-native-track-player, expo-location + expo-task-manager (background GPS), custom native modules `one14-gps-watch` and `one14-pedometer`, TanStack Query, Strava OAuth.
His commits: **0** under any of his identities. Commits came from one shared workflow (Replit Agent 98, abdelOsloop 66, Ahmed Alaa 41, ahmadfikryfahmy 34, Abdelrahman 12). His role comes from **his own words** (2026-10-27, `inventory/user-answers.md`) plus the indirect evidence below.
Live: Google Play `com.one14.qardio` (100+ downloads, checked 2026-10-27) · App Store `id6796342246` (released 2026-08-22, v1.1.4).

## What it is
A Qur'an-listening and running app: you run or walk while recitation plays ayah by ayah, and the app tracks distance, route and khatm progress. It has lock-screen audio, background GPS, a community feed and Strava sync.

## What HE did (user's words, 2026-10-27)
- **Led the project:** planned features, how each one behaves, the UX, what goes where and what to leave out, and which technical approach to take (e.g. play audio per ayah or per page/surah).
- **Directed the build:** most code was written with AI (Claude). He decided what to build and told the teammate who prompted the AI what to ask for and how.
- **Tested and improved:** ran the app on devices, found defects, and pushed fixes for UI, performance and usability.
- **GPS distance accuracy:** the hardest problem. Early builds under-counted distance. He traced it to a "circle" of several metres that had to be left before a point counted, and pushed to shrink or remove it so real movement is counted. Since then distance tracks well.
- Strava integration and many other features were planned and shipped under his lead.

## Supporting evidence in the repo
- Commit `2026-06-29 Ahmed Alaa: "Fixed the Session Active Time Stats font size … (with ibrahem)"`: names him as a working partner.
- `repro.log` (tracked) shows his own test build `com.ibrahem.trackotest3` on a device. Laptop 2 has Android Gradle build caches for the native GPS/pedometer modules and two TestFlight feedback exports (`Downloads/testflight_feedback*`): he was building and testing.
- **The distance problem is documented:** `docs/GPS_DISTANCE_ACCURACY_TUNING.md` (2026-07-14): a client ran ~30 km and the app recorded ~25 km (~17% under-count). The cause was a background path at ~100 m accuracy, a **10 m OS distance filter and an 8 m software floor**. `docs/CLIENT_REPORT_GPS_DISTANCE.md` (2026-09-08): a 6.42 km track run (Strava) / 6.13 km (Apple Watch) recorded as 3.10 km on build 1.0.4.
- **The fix is in the code** (`hooks/useGpsTracking.ts`, latest branch `feat/google-maps`): OS filter now `distanceInterval: 0` at `Accuracy.Highest`, 1 Hz. All gating moved into a software pipeline with an adaptive floor `max(8 m, accuracy × 0.5)`, plus Doppler stationary detection and spike filters. `JITTER_FACTOR` 0.8 → 0.5 was swept on seven field journals. Twin-device (iPhone + Android) walks are compared with Strava: road walk 1.292 km vs Strava 1.32 (iOS), 1.206 km vs 1.28 (Android).
- Strava: `Add notification preferences and Strava integration setup` (2026-05-21), `implement Strava OAuth token management functions` (2026-09-10).
- Audio approach: branches `experiment/surah-audio-qdc-timestamp-poc` ("Explore playing Quran surahs instead of individual ayahs") and `experiment/surah-audio-timestamp-tracking`, plus per-reciter surah timestamp files. This matches his "per ayah vs per page" decision.
- Repo has 160 test files and 158 docs (team output; don't use as his numbers).

## Measurable impact (only with proof)
- Live on both stores; Google Play 100+ downloads; App Store release 2026-08-22.
- Distance under-count documented before the fix (−17% on a 30 km run, −50% on a track run). Field walks after tuning are within ~2–6% of Strava on the same phones.
- `[NEEDS-PROOF]` "Measures distance better than Strava and the new smartwatch" (users said so). The repo's own walks show ONE14 slightly *under* Strava, so no comparison claim on the CV until there is a logged side-by-side or user feedback screenshots.

## Candidate CV bullets (wording matches his real role: led, directed, tested; not "built" or "coded")
1. **Led product and technical direction** for ONE14 QARDIO, a Qur'an-and-running app (React Native / Expo, Firebase) live on Google Play and the App Store. Planned the features, UX flows and technical approach and directed an AI-assisted build with a teammate.
2. **Drove the fix for GPS distance under-counting** (a 30 km run recorded as ~25 km). Identified that coarse location filters were discarding real movement, then moved tracking to 1 Hz high-accuracy fixes with a tuned software filter. Field-tested against Strava and Apple Watch on paired iPhone and Android devices.
3. **Owned on-device QA** across iOS and Android: UI, performance and usability reviews through TestFlight and internal Android builds.
4. Shaped the Qur'an audio experience (per-ayah vs full-surah playback with timestamp sync, lock-screen controls) and the Strava integration.

## Archetype fit
Mobile ★★★ · Healthtech/fitness ★★★ · Product SaaS ★★☆ (product ownership) · Enterprise ★★☆ · Fintech ★☆☆ · Agency ☆

## Interview story (STAR) — draft
S: Runners reported missing distance (30 km → ~25 km; a track run at half). T: make distance trustworthy without rewriting the tracking engine. A: found the metre-level "circle" gate and coarse OS filters, decided to shrink/remove them, set up twin-device field tests against Strava/Apple Watch, iterated on the filter. R: release builds track distance closely; the app is live on both stores.

## Open
- Was ONE14 an nWeave client project (Bitbucket `nweave`, nWeave teammates) or a separate contract? Old CV said "Contract 07/2026 – 10/2026"; repo runs 04/2026 → 09/2026.
- Latest code may be newer than 2026-09-15. The user offered to pull it if more evidence is needed.
