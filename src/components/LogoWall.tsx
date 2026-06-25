import { memo, useState } from 'react'
import { Reveal } from './Reveal'
import { CLUBS, CLUB_COUNT, CLUB_LEAGUE_COUNT, type Club } from '../data/clubs'

/**
 * The Logo Wall (SPEC §9) — the very bottom of the page. Every crest Agustin can
 * name, from three countries' top two divisions to every continental and club
 * world-cup field, all shuffled together so no two league-mates sit side by side
 * (the order is pre-scrambled in data/clubs.ts). A dense pinboard of taped chips
 * on the kraft; a real badge where the source has one, a clean monogram where it
 * doesn't. On-brand: scrapbook tiles, Anton heading, one volt spark.
 */

const MONO_TONES = ['#1e7a46', '#14598c', '#c0362c', '#c8992f', '#14233a', '#a6d400']
const STOP = new Set(['fc', 'cf', 'sc', 'ac', 'afc', 'cd', 'ca', 'club', 'de', 'of', 'the', 'el', 'la', 'los'])

/** Initials for the monogram fallback — short code if we have one, else the
 *  first letters of the meaningful words. */
function initials(c: Club): string {
  const code = c.short.replace(/[^A-Za-z]/g, '')
  if (code.length >= 2 && code.length <= 4) return code.slice(0, 3).toUpperCase()
  const words = c.name.split(/\s+/).filter((w) => !STOP.has(w.toLowerCase()))
  const src = words.length ? words : c.name.split(/\s+/)
  return src.slice(0, 3).map((w) => w[0]).join('').toUpperCase() || '?'
}

function toneFor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return MONO_TONES[h % MONO_TONES.length]
}

// deterministic scrapbook tilt per tile — subtle, straightens on hover
const TILTS = [-3.4, -1.8, 0.8, 2.6, -0.9, 1.7, -2.4, 3.1, -1.2, 2.1]

// I only pin the first slice to the board — the rest live in my head. The
// "+N more" chip carries the real remaining count (CLUB_COUNT - SHOWN).
const SHOWN = 50
const REMAINING = CLUB_COUNT - SHOWN

const Crest = memo(function Crest({ club, index }: { club: Club; index: number }) {
  // 0 = TheSportsDB badge, 1 = api-sports CDN, 2 = monogram fallback
  const [stage, setStage] = useState(0)
  const tilt = TILTS[index % TILTS.length]
  const src = stage === 0 ? club.badge : `https://media.api-sports.io/football/teams/${club.apiId}.png`
  const showImg = stage === 0 || (stage === 1 && !!club.apiId)

  return (
    <div className="group/crest relative flex aspect-square items-center justify-center" title={`${club.name} · ${club.country}`}>
      <div
        className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#fcfbf6] p-[14%] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.28)] group-hover/crest:!rotate-0 group-hover/crest:scale-[1.13] group-hover/crest:shadow-paper"
        style={{
          transform: `rotate(${tilt}deg)`,
          boxShadow: '0 3px 9px rgba(58,42,18,0.16), inset 0 0 0 1px rgba(58,42,18,0.06)',
        }}
      >
        {showImg ? (
          <img
            src={src}
            alt={club.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
            onError={() => setStage((s) => (s === 0 && club.apiId ? 1 : 2))}
            draggable={false}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center rounded-full font-display text-[clamp(11px,2.4vw,17px)] leading-none tracking-[0.02em] text-paper"
            style={{ background: toneFor(club.name) }}
            aria-label={club.name}
          >
            {initials(club)}
          </div>
        )}
      </div>
    </div>
  )
})

// the trailing "+N more" chip — same taped scrapbook tile, but it stands in for
// every badge I didn't pin up. Same tilt/straighten-on-hover as the crests.
const MoreChip = memo(function MoreChip({ count, index }: { count: number; index: number }) {
  const tilt = TILTS[index % TILTS.length]
  return (
    <div className="group/crest relative flex aspect-square items-center justify-center" title={`${count} more crests I can name`}>
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-[11px] bg-ink p-[10%] text-center transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.28)] group-hover/crest:!rotate-0 group-hover/crest:scale-[1.13] group-hover/crest:shadow-paper"
        style={{
          transform: `rotate(${tilt}deg)`,
          boxShadow: '0 3px 9px rgba(58,42,18,0.22), inset 0 0 0 1px rgba(166,212,0,0.35)',
        }}
        aria-label={`Plus ${count} more crests`}
      >
        <span className="font-display text-[clamp(15px,3.2vw,24px)] leading-none tracking-[0.01em] text-volt">+{count}</span>
        <span className="mt-[5px] font-mono text-[clamp(7px,1.4vw,10px)] font-bold uppercase tracking-[0.14em] text-paper/70">more</span>
      </div>
    </div>
  )
})

// memo'd: `selected` country state lives in App, so this prop-less section would
// otherwise re-map all crests on every globe select/close.
export const LogoWall = memo(function LogoWall() {
  return (
    <section id="logo-wall" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-24">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-volt-deep" style={{ boxShadow: '0 0 0 3px rgba(166,212,0,0.22)' }} />
            The Logo Wall · {CLUB_COUNT} crests · {CLUB_LEAGUE_COUNT} competitions
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,8vw,92px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            Every Badge
            <br /> I Can Name
          </h2>
          <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-[1.6] text-ink-2">
            Two divisions deep in Argentina, Spain &amp; England — plus everyone who's played a Libertadores,
            Sudamericana, Champions, Europa, Conference or Club World Cup night, and the whole of the
            Bundesliga, Serie A, Ligue 1, MLS &amp; USL. All shuffled together. No two league-mates touch.
          </p>
        </div>
      </Reveal>

      <Reveal y={40} delay={0.05}>
        <div className="relative mt-12" style={{ transform: 'rotate(-0.25deg)' }}>
          {/* the board it's all pinned to */}
          <span className="washi tape-gold" style={{ top: '-17px', left: '10%', transform: 'rotate(-4deg)', zIndex: 20 }} />
          <span className="washi tape-red" style={{ top: '-17px', right: '12%', transform: 'rotate(5deg)', zIndex: 20 }} />
          <div
            className="rounded-[16px] p-5 sm:p-8"
            style={{
              background: 'linear-gradient(180deg, rgba(255,250,235,0.5), rgba(205,183,137,0.16))',
              boxShadow: '0 22px 48px rgba(58,42,18,0.16), inset 0 0 0 1px rgba(58,42,18,0.07)',
            }}
          >
            <div
              className="graticule-paper rounded-[10px] p-3 sm:p-4"
              style={{ boxShadow: 'inset 0 2px 10px rgba(58,42,18,0.1)' }}
            >
              <div className="grid grid-cols-[repeat(auto-fill,minmax(58px,1fr))] gap-2 sm:grid-cols-[repeat(auto-fill,minmax(72px,1fr))] sm:gap-3">
                {CLUBS.slice(0, SHOWN).map((club, i) => (
                  <Crest key={`${club.apiId || club.name}-${i}`} club={club} index={i} />
                ))}
                <MoreChip count={REMAINING} index={SHOWN} />
              </div>
            </div>
          </div>

          <p className="mt-6 font-hand text-[24px] text-ink-faint" style={{ transform: 'rotate(-1deg)' }}>
            ...and I could probably tell you what division each one's in <span aria-hidden="true">⚽</span>
          </p>
        </div>
      </Reveal>
    </section>
  )
})
