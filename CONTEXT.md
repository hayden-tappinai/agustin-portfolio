# Agustin's Portfolio — Project Context

You are building a personal portfolio site for **Agustin**, a friend of the owner (Hayden). The centerpiece is an **interactive 3D globe** of the world. Agustin loves soccer ("footy") and travel — when you click a country he's been to, it shows his photos and tells a story.

This file is the full vision. Read it before starting. Build V1 = the interactive globe (see SUCCESS CRITERIA in the /goal message).

## The vision
- A draggable, spinnable 3D globe is the hero of the page.
- **Hover** a country → that country physically lifts/raises off the globe surface.
- **Click** a country → opens a panel with Agustin's photos + a short story from that place. (For V1, wire the click → panel interaction with placeholder content; real photos/stories come later.)
- Simple, clean aesthetic: **blue ocean, green land** — 2–3 colors total, not a busy textured Earth. Countries must be **geographically accurate** (real GeoJSON, e.g. Natural Earth countries).

## The key technical decision (already made — do NOT revisit)
Use a **real 3D WebGL globe**, NOT a pre-rendered spinning video. Only real geometry supports clicking individual countries and the hover-lift effect.
- Use **react-globe.gl** (wraps globe.gl / three.js) — the high-level WebGL wrapper. It gives drag-to-rotate, `polygonsData` from GeoJSON, `onPolygonHover`/`onPolygonClick`, and `polygonAltitude` (the hover-lift) out of the box. `three` and `react-globe.gl` are already installed.
- Globe styling: a blue ocean sphere/material + green country polygons. Raise `polygonAltitude` on hover. No green-screen/background removal needed — it renders on the page background natively.
- Countries GeoJSON: fetch/bundle a world-countries GeoJSON (Natural Earth 110m is plenty for V1). Each polygon carries the country name/ISO for the click handler.

## Stack (match the owner's portfolio: hayden-portfolio-lovable)
Vite + React + TypeScript + Tailwind CSS. The base is already scaffolded in this repo (`npm create vite react-ts` + `three` + `react-globe.gl` + tailwind installed). Keep it clean, typed (no `any`), componentized. Quality bar: a polished, distinctive portfolio, not generic.

## Assets coming separately (don't block on these for V1)
- **Soccer ball animation:** whyre (the orchestrator) is generating a small black-and-white, hand-drawn-style soccer ball fly-through animation in Higgsfield (start frame + end frame on green bg → animated → background stripped). It will be dropped into `public/` later and wired as a fun hover effect (e.g. plays near the cursor / over the lifting country). For V1, leave a clean seam for it (a placeholder component/hook), don't fake it.
- **Agustin's photos:** live in a Google Drive "Footy" folder (soccer + travel pics; one is Real Madrid at the Bernabéu). whyre will download + map them to countries later. For V1, the country panel uses placeholder photos/story text.

## Repo
`github.com/hayden-tappinai/agustin-portfolio`. Commit + push to `main` as you go.

## Working rules
- Do NOT ask the orchestrator (whyre) or Hayden questions — make sensible decisions and proceed. Take your time.
- Use ultracode Workflow orchestration; break the build into multiple workflows.
- VERIFY by actually running it (`npm run dev`, load it, confirm the globe drags/clicks/hover-lifts) and building it (`npm run build`) before calling V1 done.
