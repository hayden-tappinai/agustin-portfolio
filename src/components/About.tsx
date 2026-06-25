import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Polaroid } from './Polaroid'
import { Flag } from './CountryFlag'
import type { StoryPhoto } from '../types/country'

type Fixing = 'washi' | 'pushpin' | 'paperclip'
type Tape = 'tape-gold' | 'tape-ocean' | 'tape-red' | 'tape-volt'

/**
 * The Story, told in Agustin's own voice — broken into short, spaced chapters
 * that alternate a tight paragraph with a taped scrapbook photo. Trimmed hard
 * to the moments that matter; the full travel log lives in the country stories.
 */
interface Chapter {
  num: string
  kicker: string
  title: string
  body: string
  /** Accent dot color token for the kicker. */
  dot: string
  /** Side photo — or the passport facts card when `facts` is set. */
  photo?: StoryPhoto & { rotate?: number; fixing?: Fixing; tape?: Tape }
  facts?: boolean
}

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    kicker: 'The Flags',
    title: 'It Started On The Floor',
    body: 'The 2010 World Cup got me. I was seven, so I drew all 32 flags by hand — then kept going until I had drawn every country on earth. I would spread them across the floor and play out the whole qualifiers, confederation by confederation. I still know every flag, every capital, and exactly where it sits on a map.',
    dot: 'bg-stamp-red',
    photo: { file: 'scrap_B4C72CA6.webp', caption: 'born into it', rotate: -3, fixing: 'washi', tape: 'tape-gold' },
  },
  {
    num: '02',
    kicker: 'Two Passports',
    title: 'Half & Half',
    body: "I'm an Argentine–American dual citizen, raised between both. That's why I never followed just the big leagues — I'm a Blackburn man in the Championship, I track all three Argentine divisions, and I'll stay up for any Libertadores or Sudamericana night.",
    dot: 'bg-pitch',
    facts: true,
  },
  {
    num: '03',
    kicker: 'Boots On',
    title: 'Kentucky To Miami',
    body: "I played growing up in Kentucky, then for Miami University's club side. Around then I got obsessed with how teams get ranked, so I built my own model off results and strength of schedule. When US College Club Soccer dropped their Top 20, I had picked the same twenty — just in a different order.",
    dot: 'bg-gold',
    photo: { file: 'IMG_3428.webp', caption: 'Kentucky · champions', rotate: 2.5, fixing: 'washi', tape: 'tape-red' },
  },
  {
    num: '04',
    kicker: 'The Big Nights',
    title: "Matches I Won't Forget",
    body: 'El Clásico at the Camp Nou — Messi, Suárez and Neymar against the Madrid side that won three Champions Leagues straight. A Serie A night at the Stadio Olimpico, dead level with the Salernitana away end singing all ninety. The Tucumán Derby up north, with the best stadium food of my life: panchuques and choripán. And KR Reykjavík vs Valur, football at the edge of the Arctic.',
    dot: 'bg-volt-deep',
    photo: { file: 'IMG_1469.webp', caption: 'Stadio Olimpico · Roma', rotate: -2, fixing: 'washi', tape: 'tape-ocean' },
  },
  {
    num: '05',
    kicker: 'Closer To Home',
    title: 'Louisville & A Copa Summer',
    body: "I grew up on Louisville City in the USL — my best night was being a ball boy in a final, the one where we hosted Didier Drogba's Phoenix Rising. That same summer I chased Argentina through the Copa América Centenario: Messi's hat-trick against Panama at Soldier Field, his free kick against the US at NRG, then the heartbreak of the final against Chile.",
    dot: 'bg-stamp-red',
    photo: { file: 'IMG_2260.webp', caption: 'Copa América · albiceleste', rotate: 3, fixing: 'pushpin' },
  },
  {
    num: '06',
    kicker: 'Now',
    title: 'Where I Am Now',
    body: 'Today I have a B.S. in Kinesiology from Miami, and the same itch I had at seven — to know every club and every derby, and to actually go. The Superclásico, the Maracanã, the San Siro before they knock it down: all still on the list.',
    dot: 'bg-pitch',
    photo: { file: 'IMG_0091.webp', caption: 'Miami U. · Kinesiology', rotate: -2.5, fixing: 'paperclip' },
  },
]

function FactsCard() {
  return (
    <div className="relative w-full max-w-[340px] rounded-lg bg-paper-2 p-5" style={{ border: '1px solid var(--paper-edge)', boxShadow: '0 14px 30px var(--paper-shadow)' }}>
      <span className="washi tape-ocean" style={{ top: '-13px', left: '24px', transform: 'rotate(-5deg)' }} />
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint">Passport · The Facts</p>

      <div className="mt-4 flex items-center gap-3">
        <Flag iso2="AR" className="h-[24px] w-[36px] rounded-[2px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        <Flag iso2="US" className="h-[24px] w-[36px] rounded-[2px]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
        <span className="font-display text-[clamp(20px,3vw,26px)] uppercase leading-none tracking-[0.02em] text-ink">Dual Citizen</span>
      </div>

      <dl className="mt-5 space-y-3 border-t border-dashed border-paper-edge pt-4">
        <Row label="Citizenship" value="Argentina + United States" />
        <Row label="Languages" value="English · Spanish" />
        <Row label="Degree" value="B.S. Kinesiology — Miami University" />
        <Row label="Supports" value="Blackburn Rovers · Louisville City FC" />
      </dl>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="mt-[2px] font-sans text-[14px] font-semibold leading-snug text-ink">{value}</dd>
    </div>
  )
}

/** One chapter row: a tight paragraph beside a taped photo, sides alternating. */
function ChapterRow({ chapter, index, dropcap }: { chapter: Chapter; index: number; dropcap?: boolean }) {
  const flip = index % 2 === 1 // odd chapters put the photo on the left (desktop)

  const text = (
    <Reveal x={flip ? 18 : -18} className={flip ? 'lg:order-2' : 'lg:order-1'}>
      <div className="max-w-[460px]">
        <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
          <span className={`h-[8px] w-[8px] rounded-full ${chapter.dot}`} />
          {chapter.num} · {chapter.kicker}
        </p>
        <h3 className="mt-2 font-display text-[clamp(24px,3.4vw,34px)] uppercase leading-[1.06] tracking-[0.015em] text-ink">
          {chapter.title}
        </h3>
        <p
          className={[
            'mt-3 font-sans text-[17px] leading-[1.72] text-ink-2',
            dropcap
              ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[58px] first-letter:leading-[0.72] first-letter:text-pitch'
              : '',
          ].join(' ')}
        >
          {chapter.body}
        </p>
      </div>
    </Reveal>
  )

  const media: ReactNode = chapter.facts ? (
    <FactsCard />
  ) : chapter.photo ? (
    <Polaroid
      photo={chapter.photo}
      rotate={chapter.photo.rotate ?? -3}
      fixing={chapter.photo.fixing ?? 'washi'}
      tape={chapter.photo.tape ?? 'tape-gold'}
      width="min(300px, 82%)"
    />
  ) : null

  return (
    <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2">
      {text}
      <Reveal x={flip ? -18 : 18} delay={0.06} className={['flex justify-center', flip ? 'lg:order-1 lg:justify-start' : 'lg:order-2 lg:justify-end'].join(' ')}>
        {media}
      </Reveal>
    </div>
  )
}

/**
 * The About / The Story section — Agustin's life in football, first person, told
 * as short alternating chapters of copy + taped scrapbook photos.
 */
export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <Reveal>
        <div>
          <p className="flex items-center gap-[10px] font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-ink-faint">
            <span className="h-[8px] w-[8px] rounded-full bg-stamp-red" style={{ boxShadow: '0 0 0 3px rgba(192,54,44,0.18)' }} />
            The Story · Est. 2010
          </p>
          <h2 className="mt-3 font-display text-[clamp(40px,6vw,68px)] uppercase leading-[1.04] tracking-[0.015em] text-ink">
            How It Started
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-col gap-14 sm:gap-20">
        {CHAPTERS.map((chapter, i) => (
          <ChapterRow key={chapter.num} chapter={chapter} index={i} dropcap={i === 0} />
        ))}
      </div>
    </section>
  )
}
