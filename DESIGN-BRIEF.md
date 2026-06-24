# "Agustins Portfolio" — Design System Brief

You are creating a **design system in Claude Design** (claude.ai/design) for **Agustin's portfolio**. The portfolio's centerpiece is an interactive 3D globe — click a country Agustin has been to and his photos + a story appear. Agustin loves soccer ("footy") and travel. This design system defines the whole site's look around that globe.

Your job: author the design system as preview cards and **sync it to Claude Design** (use the DesignSync tool / `/design-sync` workflow). Give Claude Design as MUCH context as possible — rich, specific, opinionated. Name the project exactly **"Agustins Portfolio"**.

## The aesthetic — a fusion (this is the whole point)
Marry four worlds into one cohesive, distinctive system:

1. **World Cup / sport** — the spectacle of the global tournament. Bunting of flags, pitch line markings, the soccer ball (black & white panels), jersey numbers, scoreboard/stat typography, stadium grids, the gold of a trophy/medal.
2. **Travel & geographical** — maps and cartography. Latitude/longitude graticule lines, route dashes between cities, a compass rose, coordinates as labels (e.g. `40.4530° N, 3.6883° W`), passport stamps, postage stamps, boarding-pass/ticket-stub forms, country flags, dotted "you-are-here" markers.
3. **Scrapbook / travel-journal** — the tactile, analog, memory-keeping layer. Taped-down Polaroid photos (white frame, slight rotation), washi tape, torn/deckled paper edges, kraft/cream paper texture, ink stamps, paper-clip and pushpin accents, handwritten margin notes and annotations, coffee-ring stains, layered collage.
4. **Young-founder tech spark** — what keeps it from looking like a craft fair. A modern, confident grid underneath. Crisp alignment, generous negative space in places, one electric accent color, sharp UI components. The analog texture sits ON a modern, intentional structure. Bold and current, not twee.

**Tone:** bold, confident, adventurous, personal. Big heavy type. Warm and tactile but sharp. "A young guy who's seen the world and isn't shy about it."

## Direction (be specific, opinionated — pick real values)
- **Typography:** a BOLD oversized display face (think a heavy grotesque or condensed athletic sans — pick a real Google Font like Anton, Archivo Black, or a bold Clash/Druk-style) for headlines that feel like stadium banners; a clean readable sans for body/UI (Inter, DM Sans, or similar); a handwritten/marker font for annotations and captions (e.g. Caveat, Permanent Marker); and a monospace for coordinates/stats/scoreboard numbers (e.g. JetBrains Mono, Space Mono). Show a full type scale + the weight/role of each.
- **Color:** build a palette from the fusion — pitch green, sky/ocean blue, passport/stamp red, trophy gold, kraft-paper cream/tan, deep ink black/navy, and ONE electric tech accent (a vivid spark — electric lime, hot magenta, or cyan — pick one). Give hex + role for each, light theme primary (cream paper) with the bold colors as accents.
- **Textures & materials:** kraft/cream paper background, washi-tape strips, torn-edge dividers, ink-stamp frames, postage-stamp perforated borders, Polaroid photo frames, dashed route lines, graticule grid overlays. Show these as reusable motifs.
- **Components:** buttons (primary "ticket" button, stamp button), a Polaroid/taped photo card, a "destination" card (country flag + name + coordinates + a story snippet, framed like a journal entry), a passport-stamp badge, a jersey-number / stat badge, a scoreboard stat block, a compass/legend element, and nav styled like a boarding pass or scoreboard. Real, polished, on-brand.
- **Motifs to include:** soccer ball, compass rose, route dashes, latitude lines, flag bunting, passport stamp, pushpin/paperclip, washi tape.

## Cohesion with the globe (important)
The interactive 3D globe itself stays CLEAN and minimal (blue ocean, green land) for legibility — it's the calm center. This bold scrapbook/World-Cup aesthetic wraps AROUND it: the page background, headers, the country-story panels (journal-entry style), nav, captions. Design the system so the globe sits comfortably inside it. The country panel that opens on click should feel like a scrapbook page / journal entry with a Polaroid of Agustin's photo, the coordinates, a passport stamp, and a handwritten story.

## Deliverable
A rich **"Agustins Portfolio"** design system live in Claude Design with cards for: Brand/identity, Color palette, Typography, Textures & materials, Core components, and the signature "destination / country-story" scrapbook card. Author the card source in this folder (`design-system/`), then create the Claude Design project and sync everything. Pour maximum descriptive context into Claude Design — names, values, the why behind each choice. Also commit the source to this branch.

## Motion & Interactions (micro-animations — REQUIRED; these feed the eventual site)
The design system must ALSO specify subtle micro-interactions/animations that bring the aesthetic to life and complement it — tasteful, physical, never flashy. Build a dedicated **"Motion & Interactions"** card group in Claude Design (animate the previews where possible, or annotated frames). For each: trigger, what moves, duration, easing, and implementation note (CSS / Framer Motion) so they drop straight into the React site. Include at least:
- **Soccer ball** — rolls/bounces across a surface or spins; arcs through on a transition.
- **Washi tape sticks on** — a tape strip drops into place over a photo/card with a slight settle + tiny rotation, like it's pressed down.
- **Polaroid develops** — photo fades/develops in from white with a scale + shadow settle, like an instant photo appearing.
- **Passport stamp thunk** — stamp drops + presses with a quick scale-overshoot + ink settle, on revealing a visited country.
- **Route line draws** — dashed travel route animates point-to-point across the map (stroke-dashoffset).
- **Pushpin / paperclip drop** — pins drop and settle on a card corner.
- **Page-corner peel/lift** — card or journal-page corner curls on hover (paper feel).
- **Compass needle** — spins and settles pointing to a destination.
- **Scoreboard count-up** — stat numbers tick up.
- **Flag bunting sway** — gentle idle sway.
Subtle, on-brand (paper/tape/sport). These complement, never distract from, the content. They must sit in the same motion language as the globe's hover-lift and the planned soccer-ball hover effect.

## REVISIONS — Hayden review of iteration 1 (2026-06-24, these override conflicts above)
1. **Bold display type is too CRAMPED.** Loosen letter-spacing and increase line-height on the big bold headlines — give them room to breathe. Don't pack letters tight.
2. **Do NOT hand-code illustrated/character animations (e.g. the soccer ball).** Claude-coded versions look bad. Any drawn/character motion = a **Higgsfield-generated asset** (start frame + end frame → animated → background stripped), produced separately by the orchestrator (whyre). In the design system just leave a clean LABELED SLOT/placeholder ("Higgsfield asset — added later"); do NOT build these in CSS.
3. **Keep the TICKET design — Hayden loves it. Make it a SIGNATURE element** (boarding-pass / ticket-stub motif, prominent).
4. **Add a "ticket rip-off" interaction:** clicking a ticket/tag tears it off along its perforated edge and the stub detaches (tear + slight fall/rotate). This IS a coded micro-interaction — build + spec it (perforation, tear, detach). Make it a hero interaction.
5. **Don't over-spec generic hover animations** — the interactive globe already provides the main hover motion (countries lift on hover). Keep Motion & Interactions focused on DISTINCT, on-brand CODED interactions (ticket rip-off, washi-tape stick-on, passport-stamp thunπk, page-corner peel, route-line draw, scoreboard count-up) + the Higgsfield-asset slots. No redundant hover padding.
