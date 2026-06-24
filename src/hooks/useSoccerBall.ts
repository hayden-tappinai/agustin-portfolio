import { useEffect, useState } from 'react'

export interface SoccerBallAsset {
  src: string
  kind: 'video' | 'image'
}

export interface SoccerBallState {
  /** Whether the fly-through animation should be rendering right now. */
  playing: boolean
  /** The resolved asset, or null until one is dropped into `public/`. */
  asset: SoccerBallAsset | null
}

/**
 * SEAM for the soccer-ball hover animation (CONTEXT.md / SPEC §8).
 *
 * A separate Higgsfield session produces a hand-drawn b/w soccer-ball
 * fly-through (background stripped → transparent asset) and drops it into
 * `public/`. This hook owns the *trigger* ("play while a country is hovered")
 * and *resolution*: it probes the candidate files once on mount, so the moment
 * the asset lands it renders — no code change needed — and until then there is
 * never a broken image.
 *
 * Order matters: the animated TRANSPARENT WebP is preferred (best cross-browser,
 * incl. Safari, and autoplays/loops in an <img>); the transparent WebM is the
 * fallback for engines without animated-WebP support.
 */
const CANDIDATES: ReadonlyArray<{ file: string; kind: 'video' | 'image' }> = [
  { file: 'soccer-ball.webp', kind: 'image' },
  { file: 'soccer-ball.webm', kind: 'video' },
]

export function useSoccerBall(active: boolean): SoccerBallState {
  const [asset, setAsset] = useState<SoccerBallAsset | null>(null)

  useEffect(() => {
    let cancelled = false
    const probe = async () => {
      for (const c of CANDIDATES) {
        const src = `${import.meta.env.BASE_URL}${c.file}`
        try {
          const res = await fetch(src, { method: 'HEAD' })
          if (!cancelled && res.ok) {
            setAsset({ src, kind: c.kind })
            return
          }
        } catch {
          /* not present yet — try the next candidate */
        }
      }
    }
    void probe()
    return () => {
      cancelled = true
    }
  }, [])

  return { playing: active && asset !== null, asset }
}
