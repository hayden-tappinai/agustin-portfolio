import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/** House spring (SPEC §7) — the same one that drives the globe lift + ticket tear. */
const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const

interface RevealProps {
  children: ReactNode
  className?: string
  /** Vertical offset to rise from. */
  y?: number
  /** Horizontal offset to slide from. */
  x?: number
  /** Scale to grow from. */
  scale?: number
  /** Stagger delay (seconds). */
  delay?: number
  /** Re-animate every time it enters view (default: once). */
  repeat?: boolean
}

/**
 * Scroll-in reveal — fades/slides/scales a block into place on the house spring
 * as it enters the viewport. The page is one continuous kraft scroll; these
 * reveals give it the cinematic, woven-together feel (no hard section cuts).
 */
export function Reveal({ children, className, y = 28, x = 0, scale = 1, delay = 0, repeat = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: !repeat, margin: '-80px' }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  )
}
