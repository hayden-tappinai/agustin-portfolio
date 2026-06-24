import { motion } from 'framer-motion'
import type { StoryPhoto } from '../types/country'
import { SceneArt } from '../lib/scenes'

const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const

type Fixing = 'washi' | 'pushpin' | 'paperclip'
type Tape = 'tape-gold' | 'tape-ocean' | 'tape-red' | 'tape-volt'

interface PolaroidProps {
  photo: StoryPhoto
  /** Resting tilt in degrees — hover straightens to 0. */
  rotate?: number
  /** How the photo is fixed to the page. */
  fixing?: Fixing
  /** Washi colorway (when fixing="washi"). */
  tape?: Tape
  /** Frame width. */
  width?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * A taped Polaroid (SPEC §4.4). Develops on mount (over-bright → settles) and
 * straightens + lifts on hover — the signature Polaroid motion. Renders the real
 * photo when `photo.file` is present, otherwise a tasteful vector scene.
 */
export function Polaroid({ photo, rotate = -3, fixing = 'washi', tape = 'tape-gold', width = '17rem', className, style }: PolaroidProps) {
  const src = photo.file ? `${import.meta.env.BASE_URL}agustin/photos/${photo.file}` : null

  return (
    <motion.figure
      className={['polaroid', className].filter(Boolean).join(' ')}
      style={{ width, ...style }}
      initial={{ rotate, y: 8, opacity: 0 }}
      whileInView={{ rotate, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ rotate: 0, y: -6, scale: 1.015, boxShadow: '0 22px 40px var(--paper-shadow)', zIndex: 40 }}
      transition={SPRING}
    >
      {fixing === 'washi' && <span className={['washi', tape].join(' ')} style={{ top: '-15px', right: '-14px', transform: 'rotate(34deg)' }} />}
      {fixing === 'pushpin' && <span className="pushpin" style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }} />}
      {fixing === 'paperclip' && (
        <svg width="26" height="58" viewBox="0 0 26 58" aria-hidden style={{ position: 'absolute', top: '-18px', left: '34px', zIndex: 5, filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.25))' }}>
          <path d="M8 50 V14 a5 5 0 0 1 10 0 V46 a8 8 0 0 1 -16 0 V18" stroke="#9a9a9a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      )}

      <motion.div
        className="polaroid-photo"
        initial={{ filter: 'brightness(2.4) contrast(0.4) saturate(0.3)', opacity: 0.25 }}
        whileInView={{ filter: 'brightness(1) contrast(1) saturate(1)', opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {src ? (
          <img src={src} alt={photo.caption} className="h-full w-full object-cover" style={{ display: 'block' }} />
        ) : (
          <SceneArt scene={photo.scene ?? 'stadium'} />
        )}
      </motion.div>

      <figcaption className="polaroid-cap">{photo.caption}</figcaption>
      {photo.date && <span className="polaroid-date">{photo.date}</span>}
    </motion.figure>
  )
}
