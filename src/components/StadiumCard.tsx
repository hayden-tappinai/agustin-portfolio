import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Stadium } from '../types/country'
import { SceneArt } from '../lib/scenes'

/** The stadium photo, read from public/agustin/stadiums/<slug>.jpg — falls back
 *  to a tasteful vector scene if the file isn't there yet (never broken). */
function StadiumImg({ stadium }: { stadium: Stadium }) {
  const [failed, setFailed] = useState(false)
  const src = stadium.file
    ? `${import.meta.env.BASE_URL}agustin/photos/${stadium.file}`
    : `${import.meta.env.BASE_URL}agustin/stadiums/${stadium.slug}.jpg`
  if (failed) return <SceneArt scene={stadium.scene ?? 'stadium'} />
  return (
    <img
      src={src}
      alt={stadium.name}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
      style={{ display: 'block' }}
    />
  )
}

interface StadiumCardProps {
  stadium: Stadium
  rotate?: number
  onOpen: () => void
}

/** A clickable stadium image slot in the country panel — taped print + label;
 *  click opens the full photo in a lightbox. */
export function StadiumCard({ stadium, rotate = 0, onOpen }: StadiumCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${stadium.name}`}
      className="group relative block w-full overflow-hidden rounded-md bg-[#fdfdfb] p-[10px] pb-[46px] text-left transition-transform hover:-translate-y-1"
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: '0 12px 26px var(--paper-shadow)' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        <StadiumImg stadium={stadium} />
        <span
          className="absolute right-2 top-2 rounded px-2 py-[2px] font-mono text-[8px] font-bold uppercase tracking-[0.12em]"
          style={
            stadium.visited
              ? { background: 'rgba(28,23,18,0.82)', color: 'var(--paper)' }
              : { background: 'rgba(200,153,47,0.92)', color: 'var(--ink)' }
          }
        >
          {stadium.visited ? 'Visited' : 'Bucket list'}
        </span>
        {/* persistent tap/zoom cue (visible on touch, brightens on hover) */}
        <span className="absolute bottom-2 left-2 grid h-[22px] w-[22px] place-items-center rounded-full bg-ink/70 text-paper opacity-80 transition-opacity group-hover:opacity-100">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <div className="absolute bottom-[8px] left-[12px] right-[12px]">
        <div className="font-hand text-[21px] leading-none text-ink-2">{stadium.name}</div>
        <div className="mt-[2px] font-mono text-[9px] uppercase tracking-[0.1em] text-ink-faint">
          {stadium.club ? `${stadium.club} · ` : ''}
          {stadium.city}
        </div>
      </div>
    </button>
  )
}

interface StadiumLightboxProps {
  stadium: Stadium
  onClose: () => void
}

export function StadiumLightbox({ stadium, onClose }: StadiumLightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center p-4 sm:p-8"
      style={{ background: 'rgba(10,20,34,0.82)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[860px]"
        initial={{ scale: 0.94, y: 14, rotate: -1.2 }}
        animate={{ scale: 1, y: 0, rotate: -1.2 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="overflow-hidden rounded-lg bg-[#fdfdfb] p-3 pb-16" style={{ boxShadow: '0 30px 60px rgba(10,20,34,0.5)' }}>
          <div className="relative aspect-[16/10] overflow-hidden bg-navy">
            <StadiumImg stadium={stadium} />
          </div>
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <div className="font-display text-[clamp(22px,4vw,34px)] uppercase leading-none tracking-[0.02em] text-ink">{stadium.name}</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                {stadium.club ? `${stadium.club} · ` : ''}
                {stadium.city}
              </div>
            </div>
            <span
              className="shrink-0 rounded px-2 py-[3px] font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
              style={stadium.visited ? { background: 'var(--pitch)', color: 'var(--paper)' } : { background: 'var(--gold)', color: 'var(--ink)' }}
            >
              {stadium.visited ? 'Visited' : 'Bucket list'}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-ink text-paper shadow-lg transition-transform hover:scale-105"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}
