# BUILD BRIEF — Agustin Portfolio: full design integration (V2, the finished site)

You are the **integration build session**. The globe works (V1) and the design system is
authored. Your job: turn the clean functional globe into the **finished, fully-designed
portfolio** by applying the "Agustins Portfolio" design system to the real React site.
By the time you're done it should look like a finished, distinctive product — not a demo.

## Read these FIRST (in order)
1. `design-system/SPEC.md` — THE design contract (colors, fonts, motifs, components, motion). Obey it.
2. `design-system/*.html` — 18 rendered reference cards (brand, color, typography, textures,
   buttons, destination-card, globe-cohesion, nav-boarding-pass, scoreboard, jersey-badge,
   passport-badge, polaroid, compass-legend, motion-ticket, motion-scrapbook, motion-data,
   motion-language, higgsfield-slots). Open them; match their look in real components.
3. `CONTEXT.md` — the product vision.
4. The existing app: `src/App.tsx`, `src/components/GlobeHero.tsx`, `CountryPanel.tsx`,
   `FeaturedNav.tsx`, `components/soccer-ball/SoccerBallOverlay.tsx`, `hooks/`, `lib/theme.ts`,
   `data/stories.ts`, `data/featured.ts`, `types/country.ts`.

## The aesthetic (one breath)
Stadium-banner type on kraft paper; passport stamps next to jersey numbers; a clean modern
grid holding a collage of taped Polaroids, route dashes, coordinates — ONE electric-lime
spark. Warm tactile analog texture on a sharp modern structure. **The globe stays clean &
minimal (navy/ocean/green) — it's the calm center. The bold scrapbook/World-Cup aesthetic
wraps AROUND it** (page bg, header, nav, the country-story panel, footer, captions).

## Deliverables (build all of it, real + polished)
1. **Design tokens everywhere.** Put the full SPEC §1 palette + §2 fonts into `lib/theme.ts`,
   `index.css`, `tailwind.config.js`. Load the 4 Google fonts (Anton, Plus Jakarta Sans,
   Caveat, Permanent Marker, Space Mono) via the exact link in SPEC §2. Kraft-paper body bg.
   Keep Plus Jakarta as body (house font).
2. **Hero / header.** Big Anton stadium-banner title ("AGUSTÍN" + footy/travel tagline),
   on-brand eyebrow with coordinates, optional flag bunting. Loosen Anton tracking + line-height
   per the SPEC revision (the bold type must BREATHE — never cramped).
3. **The globe zone** = a navy section (the calm center), globe untouched functionally. Frame
   it with graticule + a compass/legend (●visited ◌next).
4. **Country-story panel = THE HERO scrapbook journal entry** (SPEC §5 destination card): taped
   Polaroid(s) of Agustin's photo, country name in Anton, coordinates in Space Mono, a passport
   **stamp**, a **handwritten** (Caveat) story, torn paper edge, faint graticule. This is the
   centerpiece of the whole site — make it gorgeous.
5. **Ticket rip-off — the HERO coded interaction (SPEC §7.1).** A ticket/tag (e.g. the
   "back to globe" control or a "VISITED" stub) that, on click, **tears along its perforation**
   and the stub falls + rotates + fades. Build it for real (Framer Motion AnimatePresence +
   spring {stiffness:300,damping:25}, or CSS clip-path halves + the §7 easing tokens). Showcase it.
6. **Boarding-pass nav** (SPEC §5): FROM/TO, GATE, SEAT, fake barcode, nav links as fields.
7. **Scoreboard stat block** (countries / matches / miles), **jersey/stat badges**,
   **passport-stamp badges**, **compass/legend** — incorporate these components on the page.
8. **Motion language** (SPEC §7): house spring everywhere; washi-tape stick-on, polaroid
   develop, passport-stamp thunk, route-line draw, scoreboard count-up. Physical, paper-weighted,
   tasteful. Do NOT pad generic hovers (the globe already provides hover-lift). Install
   `framer-motion`.
9. **Soccer ball wiring (you WIRE, you do NOT generate).** A separate assets session is producing
   the Higgsfield asset. Wire `SoccerBallOverlay` to render it on `playing` from
   `public/soccer-ball.gif` (or `.webm`/`.png` — whatever lands; check `public/` for it). If the
   asset isn't present yet, keep the no-render seam but have the render path coded so dropping the
   file in is the only remaining step. Do NOT call Higgsfield yourself.
10. **Photos (ingest if present — see contract below).**

## PHOTOS — ingestion contract (do NOT fetch them yourself)
The orchestrator (whyre) is producing Agustin's real photos + a mapping into a STAGING dir
OUTSIDE this repo, then will signal you. Specifically, when ready you will find:
- `~/tappinai/assets/agustin/photos/*.webp` (web-optimized) and
- `~/tappinai/assets/agustin/photo-map.json` — shape:
  `{ "<ISO_A3>": { "coords": "40.42° N, 3.69° W", "title": "...", "story": "...",
     "photos": [ { "file": "esp-1.webp", "caption": "Santiago Bernabéu" }, ... ] }, ... }`
When that file exists: COPY the photos into `public/photos/`, extend `CountryStory`
(`types/country.ts`) to add `coords: string` + `photos: { file: string; caption: string }[]`,
populate `data/stories.ts` from the map, and render the real Polaroids + coords in the panel.
**If `photo-map.json` does NOT exist yet when you finish the structural build, ship with the
tasteful SVG/gradient Polaroid placeholders (SPEC §4.4 — never a broken <img>) and leave the
ingestion code path ready.** Poll `~/tappinai/assets/agustin/photo-map.json` every so often
during your run; ingest the moment it appears. The orchestrator may also re-prompt you.

## Working rules (Hayden's orchestration runbook)
- Use **ultracode Workflow orchestration** — break this into multiple workflows (tokens/system,
  hero+globe, country panel, ticket interaction, nav+scoreboard+badges, motion, photo ingest, QA).
- **Do NOT ask questions** — make sensible, opinionated decisions and proceed. Take your time.
- **You are the SOLE writer of this repo.** Commit to the `design-system` branch as you go.
  Do NOT push (the orchestrator merges to `main` + pushes after QA). The orchestrator only adds
  files under `public/`-bound staging + `~/tappinai/assets/agustin/`; it will not touch your code.
- TypeScript strict, no `any`. Components clean + typed. Match the existing structure.
- **VERIFY by running**: `npm run dev` + load it + click a country + see the styled panel; run
  `npm run build`; take a Playwright screenshot and actually look at it before declaring done.
  Quality bar: a finished, distinctive, "holy shit" portfolio — not a generic template.

## Definition of done
The site is fully styled per the design system, the country panel is the scrapbook hero, the
ticket rip-off works, nav/scoreboard/badges/motion are in, the soccer-ball render path is wired,
photos are ingested if available (placeholders if not), `npm run build` passes, and it looks
finished in the browser. Committed to `design-system`. Then go idle — the orchestrator QAs +
merges to main.
