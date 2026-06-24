# Agustin Portfolio — V2 AUDIT + BUILD SPEC (Hayden's 2026-06-24 iteration drop)

The site is live on `main` (globe-as-hero scrollytelling, design system, smooth scroll). Hayden
sent a large batch of real content + new features. This is the full spec. Build it all, keep the
existing aesthetic (ticket header, kraft paper, scrapbook, globe-as-hero, Lenis smooth scroll).

## Agustin — who he is (real bio facts)
- **Dual citizen: Argentina 🇦🇷 + USA 🇺🇸.** Speaks **English + Spanish**.
- **Bachelor's degree in Kinesiology.** Played club soccer at **Miami University** (also HS/club in Kentucky).
- **Blackburn Rovers** supporter (English Championship). **Louisville City FC** supporter (USL Championship).
- Follows Europe's top 5 + English Championship + Spain La Liga 2 + top 3 divisions of Argentine football +
  South American leagues + Copa Libertadores/Sudamericana, UCL/Europa/Conference, etc.
- Built his own college-club-soccer ranking system (analytics passion; matched US College Club Soccer's Top 20).
- Origin story: 2010 World Cup (age 7) → drew/colored all 32 flags → simulated WC qualifiers on his floor →
  fascination with geography → read about a country each night → can ID every flag, capital, and map location.

## THE BIO ESSAY (use verbatim-ish, broken into clean SPACED paragraphs — readable, not jumbled)
Hayden's exact text (5 paragraphs) — render as nicely spaced prose in an "About / The Story" section:
1. Passion for football + dual citizen + 2010 WC origin + flags/geography + reading countries each night.
2. Global following (Blackburn Rovers, La Liga 2, Argentine football, South American leagues + continental
   comps: Copa Libertadores, Copa Sudamericana, UCL, Europa, Conference) + recognizing obscure club logos.
3. Analytics/rankings (FIFA Coca-Cola rankings, his own college ranking model, Miami University).
4. Matches attended (El Clásico Camp Nou — Messi/Suárez/Neymar vs Real Madrid; UCL QF Barça vs Atlético;
   Tucumán Derby — panchuques + choripán; Louisville City ball boy vs Drogba's Phoenix Rising; Roma vs
   Salernitana at Stadio Olimpico; Copa América Centenario — Messi hat trick vs Panama @ Soldier Field,
   FK vs USA @ NRG Houston, final loss vs Chile; KR Reykjavík vs Valur in Iceland).
5. Stadiums visited (Santiago Bernabéu, Parc des Princes, La Bombonera) + bucket list (Superclásico,
   Maracanã, San Siro) + rivalries he loves (Old Firm Celtic/Rangers, Galatasaray/Fenerbahçe, Red Star/
   Partizan Belgrade).
[The full text is in Hayden's iMessage 2026-06-24 ~21:48 — paste it from there; keep his wording, just
 space the paragraphs so people actually read it.]

## THE 17 COUNTRIES HE'S BEEN TO (globe highlights ONLY these)
Argentina, Austria, Bahamas, Denmark, Dominican Republic, France, Greece, Hungary, Iceland, Italy,
Panama, Peru, Spain, Sweden, Switzerland, USA, Vatican City.
→ Replace the placeholder 23-country set. Globe rotates; ONLY these 17 are highlighted/visited.
→ Each opens a scrapbook story panel (real content where we have it: Spain, Argentina, Italy, France, USA,
  Iceland have rich match stories from the bio; others get a clean short entry).

## STADIUMS he's been to (clickable on the map — image you can click to see; he'll send stadium pics)
- **Camp Nou** (Barcelona, Spain) — El Clásico, Messi/Suárez/Neymar
- **Santiago Bernabéu** (Real Madrid, Spain)
- **Parc des Princes** (PSG, France)
- **La Bombonera** (Boca Juniors, Argentina)
- **Stadio Olimpico** (Roma, Italy)
- **Soldier Field** (Chicago, USA — Copa América), **NRG Stadium** (Houston, USA — Copa América)
- **Louisville** (Louisville City FC, USA), **Tucumán** (Atlético/San Martín, Argentina), **Iceland** (KR/Valur)
- Bucket list (mark as not-yet): Maracanã, San Siro, Superclásico

## FEATURE REQUESTS (build all)
1. **Globe**: rotates, highlights ONLY the 17; click a country → scrapbook story + (its stadiums clickable).
2. **Bio**: real essay, spaced readable paragraphs (an About section).
3. **Stamps → COUNTRY FLAGS**: replace the passport-stamp motif with the actual country flags (of the 17).
4. **Clickable stadiums** on the map / in the country panels — image you click to view (Camp Nou etc.).
5. **Team logos he watched** (Barça, Real Madrid, Atlético, Roma, Salernitana, Louisville City, Phoenix
   Rising, Argentina NT, PSG, Boca, Atlético Tucumán, San Martín, KR Reykjavík, Valur…).
6. **Dual citizenship**: prominent 🇦🇷 + 🇺🇸; note English + Spanish; note Kinesiology bachelor's.
7. **World Cup balls 2010→2026** (Jabulani '10, Brazuca '14, Telstar '18, Al Rihla '22, Trionda '26) — a row/section.
8. **A soccer field** element somewhere (pitch markings motif / section).
9. **SCRAMBLED CLUB-LOGO WALL** at the very bottom — logos of ALL: 1st+2nd division teams of Argentina,
   Spain, England; + all teams that competed in Copa Libertadores, Copa Sudamericana, UEFA Champions League,
   Europa League, Conference League, Bundesliga, Serie A, Ligue 1, FIFA Club World Cup, MLS, USL Championship.
   **SCRAMBLED** — do NOT group same-league teams together; shuffle them all. (Hundreds of crests.)
10. **Drive pics** (Hayden will TEXT these): him with Messi, graduation pic, stadium photos. Slot-ready.

## THE 3 SCRAPBOOK-CARDBOARD AGUSTIN CUTOUTS (whyre generates — nano banana + Higgsfield animate, cheap)
Style: **scrapbook / cardboard cutout** of Agustin (generated from his real full-body photos, texted by Hayden).
1. **HERO cutout** — Agustin arms-up "taking it all in," mountains around him, scrapbook-cardboard look,
   sits RIGHT BELOW the ticket header; appears on page load, FADES away as you scroll down to the globe.
2. **PER-COUNTRY cutouts** (×17) — Agustin wearing each country's NATIONAL TEAM jersey + WAVING that country's
   flag; **stop-motion** animated; pops up ON the country when you hover / scroll over it. Only the 17.
3. (Same cutout system; the per-country is the animated flag-wave.)
→ whyre owns generation (authed for image+video gen; spawned sessions cannot). Sessions wire the assets in
  (drop into `public/agustin/` + render on hover/scroll). Animate CHEAP on Higgsfield but still look good.

## DELEGATION (multiple ultracode sessions + whyre)
- **Session 1 (content)**: bio/About + 17-country globe highlight + real stories + stamps→flags + stadiums +
  dual-citizen/languages/degree facts + team logos he watched. Owns src/data + content/panel/about components.
- **Session 2 (collectibles)**: the scrambled club-logo wall + World Cup balls row + soccer-field element.
  Self-contained bottom sections (gather real crests; scramble). Minimal App.tsx overlap.
- **whyre**: generate + animate the 3 Agustin cutouts; place stadium/Messi/grad pics Hayden texts.
- **Session 3 (wire)**: integrate the cutouts (hero fade-on-scroll + per-country hover) + stadium pics.
Keep the existing aesthetic. Commit to per-session branches; whyre merges to main.
