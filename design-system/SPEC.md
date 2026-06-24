# Agustins Portfolio — Shared Design Contract

> This is the single source of truth every preview card must obey. Read it in full
> before authoring. The whole point of the system is **cohesion**: four worlds fused
> into one — World Cup spectacle, travel cartography, scrapbook journal, young-founder
> tech spark. Every card must look like it was torn from the same sketchbook.

---

## 0. The fusion, in one breath

A young guy who's seen the world and isn't shy about it. Stadium-banner type on
kraft paper. Passport stamps next to jersey numbers. A clean modern grid holding
down a collage of taped Polaroids, route dashes, and coordinates — with **one**
electric-lime spark that says *this was made in 2026, not 1974*.

**Warm, tactile, analog texture sitting on a sharp, intentional, modern structure.**
Not twee. Not a craft fair. Bold and current.

---

## 1. Color — exact hex + role

Light theme primary: **kraft paper**, with the bold fusion colors as accents.
The interactive globe (navy/ocean/green) is the calm center; this system wraps around it.

### Paper / surface (warm kraft — the base)
| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F2E8CF` | Primary kraft-cream page background |
| `--paper-2` | `#E8D9B5` | Aged-tan secondary surface / cards / journal pages |
| `--paper-edge` | `#CDB789` | Torn / deckle edge tone, dividers |
| `--paper-line` | `#C7B488` | Faint ruled grid line on paper |
| `--paper-shadow` | `rgba(58,42,18,0.18)` | Warm drop-shadow for lifted paper |

### Ink / structure
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#1C1712` | Near-black warm ink — display type + body |
| `--ink-2` | `#4A4034` | Muted brown ink — secondary text |
| `--ink-faint` | `#8A7E68` | Faint ink — captions, ruled meta, watermarks |
| `--navy` | `#0A1422` | Globe navy — dark sections / the globe zone (cohesion) |
| `--navy-2` | `#14233A` | Lifted navy panel inside dark sections |

### Fusion accents
| Token | Hex | Role |
|---|---|---|
| `--pitch` | `#1E7A46` | Deep pitch green — sport / grass / primary action |
| `--globe-green` | `#3EA96B` | Globe land green — cohesion with the real globe |
| `--ocean` | `#14598C` | Ocean / sky blue — travel, matches the globe ocean |
| `--stamp-red` | `#C0362C` | Passport & postage ink red — stamps, "you-are-here" |
| `--gold` | `#C8992F` | Trophy / medal gold — awards, highlights, foil |

### Electric (the single tech spark — use SPARINGLY)
| Token | Hex | Role |
|---|---|---|
| `--volt` | `#CDFF3D` | Electric lime — fills/glows on dark, highlighter behind dark text, active pulse |
| `--volt-deep` | `#A6D400` | Volt for text/lines on light kraft (the bright lime is illegible as text) |

**Rule:** volt is the *one* electric note. Use it for a single focal moment per
composition — an active dot, a CTA underline, a highlight swipe, the "live" pulse on
the you-are-here marker. Never two volt elements competing. Everything else is the
warm earthy palette.

---

## 2. Typography — four families

Load all fonts with this exact link (preconnect first):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@500;600;700&family=Permanent+Marker&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
```

| Role | Family | Stack | Use |
|---|---|---|---|
| **Display / banner** | **Anton** | `"Anton","Arial Narrow",sans-serif` | Huge stadium-banner headlines, jersey numbers, scoreboard headers, country names. **UPPERCASE**, **OPEN tracking `+0.01em–0.03em`** (Anton is condensed — give it air; **never negative**), **line-height `1.0–1.12`** (the very largest hero display may go to `0.98`, never tighter). Let the bold headlines BREATHE. The signature voice. |

> ⚠️ **Revision (Hayden, 2026-06-24): the bold display type was too CRAMPED.** Loosen it
> everywhere — positive letter-spacing on Anton, generous line-height, room around big
> headlines. No tight negative tracking, no `line-height` under `0.98`, ever.
| **Body / UI** | **Plus Jakarta Sans** | `"Plus Jakarta Sans",system-ui,sans-serif` | All body, UI labels, paragraphs. Weights 400–800. (Also the house body font — cohesion.) |
| **Handwriting** | **Caveat** | `"Caveat",cursive` | Margin notes, journal captions, story snippets, annotations. ~20–34px. |
| **Marker** | **Permanent Marker** | `"Permanent Marker",cursive` | Bold marker callouts: "GOAL!", stamp overlays, circled words, arrows-and-notes. Use rarely, 1 per card max. |
| **Mono / data** | **Space Mono** | `"Space Mono",ui-monospace,monospace` | Coordinates (`40.4530° N, 3.6883° W`), stats, ticket/boarding-pass fields, scoreboard digits, dates, ISO codes. Uppercase tracked `0.08–0.14em` for labels. |

### Type scale (reference)
| Step | Font / size / settings |
|---|---|
| Display XL | Anton, `clamp(56px,7vw,104px)`, ls `+0.01em`, lh `0.98`, uppercase |
| Display L | Anton, `64px`, ls `+0.015em`, lh `1.04`, uppercase |
| Display M | Anton, `40px`, ls `+0.02em`, lh `1.1`, uppercase |
| Title | Plus Jakarta 800, `28px`, ls `0` |
| Body L | Plus Jakarta 500, `18px`, lh `1.55` |
| Body | Plus Jakarta 400, `16px`, lh `1.6` |
| Small / caption | Plus Jakarta 500, `13px` |
| Mono label | Space Mono 700, `12px`, uppercase, ls `0.12em` |
| Hand note | Caveat 600, `24–30px` |

---

## 3. Card chrome (consistency across all cards)

Every card is a **self-contained HTML page** — inline `<style>`, inline SVG, only the
Google Fonts link as an external dep. No JS required (subtle CSS-only motion welcome).

- **First line MUST be exactly:** `<!-- @dsCard group="GROUP" -->` (group given per card).
- `<meta charset>` + viewport, a `<title>` like `Agustins Portfolio — <Card>`.
- `*{box-sizing:border-box;margin:0;padding:0}`.
- `body`: the **kraft paper background** (see §4.1), `font-family:var(--font-body)`,
  color `var(--ink)`, padding `48px` (dark-section cards may use `0`/full-bleed navy).
- Center content in `.stage{max-width:1100px;margin:0 auto}`.
- Open with an **eyebrow** + **h1**, in the house pattern but on-brand:
  - eyebrow: Space Mono 700, 11–12px, uppercase, ls `0.14em`, color `var(--ink-faint)`,
    often prefixed with a coordinate or a `✦`/`●` glyph.
  - h1: **Anton**, uppercase, large (40–56px), color `var(--ink)`.
- Design each card to look complete at ~**1100px wide**; height can be tall (800–1500px).
- Put `:root{ ... all tokens ... }` in every card so tokens resolve standalone.

Standard `:root` block to paste into every card:
```css
:root{
  --paper:#F2E8CF; --paper-2:#E8D9B5; --paper-edge:#CDB789; --paper-line:#C7B488;
  --paper-shadow:rgba(58,42,18,0.18);
  --ink:#1C1712; --ink-2:#4A4034; --ink-faint:#8A7E68; --navy:#0A1422; --navy-2:#14233A;
  --pitch:#1E7A46; --globe-green:#3EA96B; --ocean:#14598C; --stamp-red:#C0362C; --gold:#C8992F;
  --volt:#CDFF3D; --volt-deep:#A6D400;
  --font-display:"Anton","Arial Narrow",sans-serif;
  --font-body:"Plus Jakarta Sans",system-ui,sans-serif;
  --font-hand:"Caveat",cursive; --font-marker:"Permanent Marker",cursive;
  --font-mono:"Space Mono",ui-monospace,monospace;
}
```

---

## 4. Motif cookbook (copy-ready, paste & adapt)

### 4.1 Kraft paper background
```css
body{
  background-color:#F2E8CF;
  background-image:
    radial-gradient(120% 130% at 0% 0%, rgba(255,250,235,0.55) 0%, transparent 42%),
    radial-gradient(120% 130% at 100% 100%, rgba(150,118,64,0.20) 0%, transparent 55%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}
```
Dark (navy) sections invert: `background:var(--navy)` with a faint graticule overlay
(see §4.7) and the same noise at `opacity:0.08`.

### 4.2 Washi tape strip
```css
.washi{
  position:absolute; width:130px; height:36px;
  background:
    repeating-linear-gradient(46deg, rgba(255,255,255,.22) 0 7px, transparent 7px 14px),
    var(--tape, rgba(205,255,61,.6));
  box-shadow:0 2px 4px rgba(0,0,0,.14);
  clip-path:polygon(3% 0,97% 5%,100% 95%,0 100%); /* torn ends */
  transform:rotate(-5deg); opacity:.9;
}
```
Tape colorways: ocean `rgba(20,89,140,.55)`, stamp-red `rgba(192,54,44,.5)`,
gold `rgba(200,153,47,.55)`, volt `rgba(205,255,61,.6)`. Pick one per piece of tape.

### 4.3 Torn / deckled paper edge
Use a jagged `clip-path` or layered SVG. Quick deckle on a panel:
```css
.torn{ clip-path:polygon(0 0,100% 0,100% 92%,96% 96%,90% 92%,83% 97%,76% 92%,68% 97%,
  60% 92%,52% 97%,44% 92%,36% 97%,28% 92%,20% 97%,12% 92%,5% 96%,0 92%); }
```
Pair with a thin `--paper-edge` drop to suggest the under-layer.

### 4.4 Polaroid / taped photo
```css
.polaroid{ background:#fdfdfb; padding:12px 12px 46px; box-shadow:0 12px 26px var(--paper-shadow);
  transform:rotate(-3deg); position:relative; }
.polaroid .photo{ aspect-ratio:1/1; background:linear-gradient(135deg,#cdd9df,#9bb0c2); } /* placeholder */
.polaroid .cap{ font-family:var(--font-hand); font-size:26px; color:var(--ink-2);
  position:absolute; bottom:8px; left:14px; }
```
Photo placeholders: use a tasteful gradient or a simple inline SVG scene (pitch, skyline,
mountains) — never a broken `<img>`. Add a `.washi` over a corner.

### 4.5 Postage-stamp perforated border
```css
.postage{ background:#fbf7ec; padding:14px;
  -webkit-mask:
    radial-gradient(circle 6px at 6px 6px, transparent 96%, #000) -6px -6px,
    radial-gradient(circle 6px, transparent 96%, #000) 0 0;
  -webkit-mask-size:16px 16px; mask-size:16px 16px;
  filter:drop-shadow(0 4px 8px var(--paper-shadow)); }
```
Simpler reliable perforation: a white card with a dashed-dotted border drawn by
`radial-gradient` repeated along edges, OR an SVG `<rect>` with many small white
circles punched along the border. Use whichever renders cleanly.

### 4.6 Passport / ink stamp
```css
.stamp{ font-family:var(--font-mono); color:var(--stamp-red); border:2.5px solid var(--stamp-red);
  border-radius:50%; padding:18px; text-align:center; transform:rotate(-13deg);
  opacity:.85; mix-blend-mode:multiply; letter-spacing:.06em; text-transform:uppercase;
  box-shadow:inset 0 0 0 3px rgba(192,54,44,.35); }
```
Vary: circular, oval, rectangular "ENTRY/EXIT" boxes, scalloped edge. Always rotated,
faded, multiply-blended so it reads as real ink on paper. Add a tiny date + city.

### 4.7 Graticule (lat/long) overlay
```css
.graticule{ background-image:
  linear-gradient(rgba(20,89,140,.10) 1px,transparent 1px),
  linear-gradient(90deg, rgba(20,89,140,.10) 1px,transparent 1px);
  background-size:46px 46px; }
```
On navy: use `rgba(110,227,160,.10)`. For a globe feel, overlay curved SVG ellipses.

### 4.8 Dashed route line + plane
```html
<svg viewBox="0 0 400 80" fill="none">
  <path d="M12 60 Q 200 -10 388 40" stroke="var(--stamp-red)" stroke-width="2.5"
    stroke-dasharray="1 9" stroke-linecap="round"/>
  <circle cx="12" cy="60" r="4" fill="var(--stamp-red)"/>
  <!-- plane glyph at the end; ✈ also works as text -->
</svg>
```
Route dashes are `stroke-dasharray:"1 9"` round dots (the classic dotted travel line).

### 4.9 Pitch line markings
White lines on green: outer box, halfway line, center circle + spot, penalty arc.
Inline SVG, `stroke:rgba(255,255,255,.85)`, `fill:none`, `stroke-width:2`.

### 4.10 Soccer ball (b/w)
Inline SVG: white circle, black central pentagon, partial pentagons around it, thin
outline. Keep it iconic and flat (the hand-drawn flythrough lives in the app; here it's
a clean mark). ~64–96px.

### 4.11 Compass rose
Inline SVG: 8-point star (long N/S/E/W spokes + short diagonals), center pip, an `N`
in Anton at top, optional degree ring. Ink or gold stroke.

### 4.12 Pushpin & paperclip
Pushpin: a radial-gradient circle (stamp-red or ocean) with a small highlight + a thin
shadow stem. Paperclip: a rounded `<path>` stroke in `#8c8c8c` clipped over a corner.

### 4.13 Flag bunting
A horizontal string (thin line) with alternating triangle pennants
(`clip-path:polygon(0 0,100% 0,50% 100%)`) cycling fusion colors. Tops a header nicely.

---

## 5. Components — required behaviors

- **Ticket / boarding-pass — THE SIGNATURE MOTIF (Hayden loves it; make it prominent).**
  ticket-stub shape — a perforated tear seam (round punched notches + a dashed tear line),
  a small punched circle, Space Mono uppercase label, fill `--pitch` (or `--ink`), a faint
  `→` or `✈`. Looks like a torn match / airline ticket. This motif recurs as the primary
  button, the nav (boarding pass), tags, and the back-to-globe control.
  - **Ticket rip-off interaction (HERO coded micro-interaction):** clicking a ticket/tag
    **tears it off along its perforation** — the stub detaches and falls/rotates away
    (the dashed seam splits, one piece drops with a slight rotate + fade). Build & spec
    this for real in CSS (`clip-path` halves + a tear keyframe). It is the showcase
    interaction of the system. (See §7.)
- **Stamp button (secondary):** circular/octagonal ink-stamp style, `--stamp-red` double
  border, rotated ~-3°, multiply feel, Space Mono label. Reads as a rubber stamp.
- **Ghost / link:** Plus Jakarta, `--volt-deep` underline that's the single spark.
- **Polaroid card:** §4.4, with washi tape + handwritten caption + slight rotation.
- **Destination / country-story card (THE signature):** a journal-page spread — country
  flag chip + country name in **Anton** + coordinates in Space Mono + a passport **stamp**
  + a taped **Polaroid** of Agustin's photo + a **handwritten** story (Caveat) + a torn
  paper edge + a faint graticule. Framed like a real scrapbook entry. This is the hero.
- **Passport-stamp badge:** §4.6 as a reusable badge (country, date, "ENTRY").
- **Jersey / stat badge:** big Anton number on a jersey/kit-colored field, name + position +
  a stat in Space Mono. Think a player card.
- **Scoreboard stat block:** dark navy scoreboard, segmented/mono digits, uppercase Anton
  labels — e.g. `COUNTRIES 23 · MATCHES 47 · MILES 88,402`. Stadium-LED feel; the live
  figure may glow `--volt`.
- **Compass / legend:** compass rose + a small map legend (●=visited, ◌=next, dashed=route).
- **Boarding-pass nav:** a horizontal nav as a boarding pass / scoreboard — `FROM`/`TO`,
  `GATE`, `SEAT`, a fake barcode (repeating-linear-gradient bars), nav links as the fields.

---

## 7. Motion language (shared timing contract)

Micro-interactions must feel **physical and paper-weighted** — things have mass, they
drop and *settle*; springs over linear; one spark of energy, never flashy. Motion
complements content; it never distracts.

> ⚠️ **Revision (Hayden, 2026-06-24) — read carefully, this overrides the original brief:**
> 1. **Do NOT hand-code illustrated / character animations** (the soccer ball, drawn
>    figures, etc.). Claude-coded versions look bad. Any drawn / character MOTION is a
>    **Higgsfield-generated asset** (start frame + end frame → animated → background
>    stripped), produced separately. In the design system, leave a **clean LABELED SLOT**
>    for it (see §8) — never build it in CSS. A flat *static* iconic mark (a simple b/w
>    ball glyph as a motif) may stay, but it must not animate.
> 2. **The globe already provides the main hover motion** (countries lift on hover). Do
>    NOT pad with generic hover animations. Keep motion focused on **distinct, on-brand
>    CODED interactions** + the Higgsfield slots.
> 3. The **ticket rip-off** is the new **hero coded interaction** — see §7.1.

### The motions we DO code (focused set)
**Ticket rip-off (hero)** · washi tape sticks on · polaroid develops · passport-stamp
thunk · pushpin/paperclip drop · page-corner peel · route-line draws · scoreboard
count-up. Each gets **trigger / what moves / duration / easing / impl note (CSS + Framer
Motion)**. Motion preview cards must **animate live** (CSS keyframes, looped on an ambient
cycle since hover/click can't be captured in a static render).

### What we do NOT code (→ Higgsfield slot, §8)
soccer-ball roll/bounce/fly-through and any drawn/character motion. (Compass-needle spin
and flag-bunting sway are de-emphasized; show them only as a static element + a one-line
note, not as a featured coded loop.)

### 7.1 Ticket rip-off (HERO interaction)
Trigger: click a ticket / tag / "VISITED" stub. The ticket splits along its perforation
(the dashed seam), the detached stub **falls + rotates + fades** while the main piece
settles. Build it in CSS: two `clip-path` halves of the same ticket; on `.torn`, animate
the stub's `transform: translateY()+rotate()` and `opacity`, with the seam notches as the
pivot. `~520ms`, `--ease-thunk` on the split + `--ease-paper` on the fall. Framer Motion:
`AnimatePresence` on the stub, spring `{stiffness:300,damping:25}`, exit `y/rotate/opacity`.

### Spring (house standard — Framer Motion)
```js
transition={{ type:"spring", stiffness:300, damping:25 }}
```
Use this spring for lifts, drops, and settles (matches the globe + house rule).

### Easing tokens (CSS)
| Token | cubic-bezier | Use |
|---|---|---|
| `--ease-thunk` | `cubic-bezier(.18,.89,.32,1.28)` | Overshoot — ticket tear, stamp thunk, pushpin drop, washi settle |
| `--ease-paper` | `cubic-bezier(.2,.7,.2,1)` | Smooth paper glide — corner peel, polaroid develop, stub fall |
| `--ease-draw` | `cubic-bezier(.65,0,.35,1)` | Route-line draw, count-up |

### Duration scale
`--t-micro 120ms` · `--t-quick 240ms` · `--t-base 400ms` · `--t-tear 520ms` ·
`--t-slow 700ms` · ambient idle loops `2.5–6s`.

Add these to every motion card's `:root`:
```css
--ease-thunk:cubic-bezier(.18,.89,.32,1.28); --ease-paper:cubic-bezier(.2,.7,.2,1);
--ease-draw:cubic-bezier(.65,0,.35,1);
--t-micro:120ms; --t-quick:240ms; --t-base:400ms; --t-tear:520ms; --t-slow:700ms;
```

## 8. Higgsfield asset slots (drawn / character motion lives here)

Drawn or character animations are **generated in Higgsfield** (b/w hand-drawn style,
start frame + end frame on a green background → animated → background stripped to
transparent WebM/PNG-sequence), then dropped into the React site. The design system must
NOT fake these in CSS — instead show a **clean labeled placeholder slot**:

```html
<div class="hf-slot" role="img" aria-label="Higgsfield asset slot">
  <span class="hf-tag">HIGGSFIELD ASSET — added later</span>
  <span class="hf-meta">soccer-ball fly-through · transparent WebM · ~480×480 · loops</span>
</div>
```
```css
.hf-slot{ position:relative; display:grid; place-items:center; gap:8px; min-height:180px;
  border:2px dashed var(--ink-faint); border-radius:14px;
  background:repeating-linear-gradient(45deg, rgba(28,23,18,.03) 0 10px, transparent 10px 20px);
  color:var(--ink-2); }
.hf-tag{ font-family:var(--font-mono); font-size:12px; letter-spacing:.12em; text-transform:uppercase;
  background:var(--ink); color:var(--paper); padding:5px 10px; border-radius:4px; }
.hf-meta{ font-family:var(--font-mono); font-size:11px; color:var(--ink-faint); }
```
Each slot states **what asset, where it sits, its trigger, and rough dimensions**. The
signature one: the **b/w hand-drawn soccer-ball fly-through** that plays near the cursor /
over a lifting country on the globe.

## 6. Quality bar
- Real, specific copy — use Agustin's world: footy, the Bernabéu/Real Madrid, Madrid
  coordinates `40.4168° N, 3.7038° W`, places like Madrid, Buenos Aires, Lisbon, Tokyo.
- No lorem ipsum. No broken images. No external scripts.
- Tactile but SHARP — crisp alignment under the collage. Generous negative space somewhere.
- Every card must teach Claude Design *why*: include short captions explaining the choice
  (e.g. "Anton = stadium banner", "volt used once = the spark"). Put rationale in small
  Plus Jakarta text or Space Mono side-notes so the card is self-documenting.
