# Agustins Portfolio — Design System

The visual system that wraps the interactive 3D globe at the heart of Agustín's
portfolio. A deliberate **fusion of four worlds**: World Cup / sport · travel &
cartography · scrapbook / travel-journal · young-founder tech spark. Warm and tactile,
but sharp and current — analog texture sitting on a confident modern grid.

**[`SPEC.md`](./SPEC.md) is the single source of truth** — exact palette hex, the four
font families, the motif cookbook, the motion contract, and the Higgsfield-asset
convention. Read it before touching a card.

## The cards

Each `*.html` file is a fully self-contained preview card (inline CSS + inline SVG; the
only external dependency is the Google Fonts link). The first line of every file is a
`<!-- @dsCard group="…" -->` marker that Claude Design uses to build its card index. These
are synced to the **"Agustins Portfolio"** project on claude.ai/design.

| Group | Card | What it is |
|---|---|---|
| Brand | `brand.html` | Identity cover — wordmark, fusion, motif vocabulary, voice |
| Brand | `globe-cohesion.html` | Full-page composition: how the bold system wraps the clean globe |
| Color | `color.html` | Palette — kraft base, fusion accents, the single volt spark, in-context |
| Type | `typography.html` | Anton / Plus Jakarta Sans / Caveat / Permanent Marker / Space Mono + scale |
| Textures | `textures.html` | Material library — washi, torn edge, stamps, perforation, graticule, route dashes, compass, pitch lines, ball, pushpin, bunting, coffee ring |
| Components | `buttons.html` | Ticket (signature primary), stamp, ghost/volt buttons |
| Components | `polaroid.html` | Taped Polaroid photo card |
| Components | `passport-badge.html` | Passport / postage ink-stamp badges |
| Components | `jersey-badge.html` | Jersey-number / stat squad card |
| Components | `scoreboard.html` | Stadium scoreboard stat block (dark navy) |
| Components | `nav-boarding-pass.html` | Navigation styled as a boarding pass |
| Components | `compass-legend.html` | Compass rose + map legend (globe chrome) |
| Signature | `destination-card.html` | **The country-story scrapbook panel** that opens on globe click |
| Motion & Interactions | `motion-ticket.html` | **Hero coded interaction** — the ticket rip-off |
| Motion & Interactions | `motion-scrapbook.html` | Washi stick-on, polaroid develop, stamp thunk, pushpin drop, page-corner peel |
| Motion & Interactions | `motion-data.html` | Route-line draw, scoreboard count-up |
| Motion & Interactions | `motion-language.html` | Shared timing contract — spring, easings, durations |
| Motion & Interactions | `higgsfield-slots.html` | Labeled placeholder slots for generated drawn/character motion |

## Palette (see SPEC §1 for roles)
Kraft `#F2E8CF` · aged tan `#E8D9B5` · ink `#1C1712` · globe navy `#0A1422` · pitch
`#1E7A46` · globe-green `#3EA96B` · ocean `#14598C` · stamp-red `#C0362C` · gold `#C8992F`
· **volt `#CDFF3D`** (the one electric spark; `#A6D400` on light kraft).

## Type
**Anton** (display/banner — open tracking, breathing leading) · **Plus Jakarta Sans**
(body/UI) · **Caveat** (handwriting/notes) · **Permanent Marker** (rare marker accent) ·
**Space Mono** (coordinates, stats, tickets, scoreboards).

## Motion
Physical, paper-weighted, spring over linear (`stiffness:300, damping:25`). The globe owns
hover; the system codes the **distinct** interactions only — ticket rip-off (hero), washi
stick-on, polaroid develop, passport-stamp thunk, pushpin drop, page-corner peel,
route-line draw, scoreboard count-up. **Drawn / character motion (the soccer ball) is NOT
hand-coded** — it's a Higgsfield-generated transparent asset dropped into a reserved slot.

## Local preview
```sh
python3 -m http.server 8765 --directory design-system
# open http://127.0.0.1:8765/brand.html
```
