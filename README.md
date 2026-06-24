# Agustín — Footy & Far-Flung Places

A personal portfolio whose hero is an **interactive 3D globe**. Spin it, hover a
country to lift it off the surface, and click in to read a story from that place
(soccer + travel). Blue ocean, green land — clean by design.

## Stack

- **Vite + React 19 + TypeScript** (strict)
- **react-globe.gl** (globe.gl / three-globe / three) for the WebGL globe
- **Tailwind CSS** for the overlay chrome and country panel
- **Natural Earth 110m** admin-0 countries (real GeoJSON, 177 countries)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

## How it works

- `src/components/GlobeHero.tsx` — the globe. Blue `MeshPhongMaterial` ocean +
  green country polygons. Hover raises a country via `polygonAltitude`; click
  selects it and the camera flies there. Auto-rotate pauses while you inspect.
- `src/components/CountryPanel.tsx` — the slide-in panel (placeholder photos +
  story for V1; focus-managed and `inert` when closed).
- `src/hooks/useCountries.ts` — loads the GeoJSON from `public/`.
- `src/data/stories.ts` — placeholder stories; real content from Agustín's
  travel photos is mapped in later.
- `src/lib/theme.ts` — the single source of truth for the palette (mirrored into
  `tailwind.config.js` and `src/index.css`).
- `src/components/FeaturedNav.tsx` — a visually hidden keyboard/SR path into the
  stories, since the globe canvas is pointer-only.

## Pending assets (clean seams left, not faked)

- **Soccer-ball hover animation** — a hand-drawn b/w fly-through (Higgsfield,
  background stripped). The seam is wired: `GlobeHero` feeds a live `active` flag
  to `SoccerBallOverlay` via `useSoccerBall`; drop the asset into `public/` and
  render it in `SoccerBallOverlay` — no re-plumbing.
- **Real photos & stories** — replace the placeholders in `src/data/stories.ts`.
