import type { ReactElement } from 'react'
import { useSoccerBall } from '../../hooks/useSoccerBall'

interface SoccerBallOverlayProps {
  /** True while a country is hovered — drives whether the animation plays. */
  active: boolean
}

/**
 * Renders the soccer-ball fly-through over the globe while a country is hovered
 * (SPEC §8). The render path is fully wired: `useSoccerBall` probes `public/`
 * for the Higgsfield asset and exposes it; this draws a transparent WebM (or a
 * GIF/PNG) centered over the globe. Until the asset is dropped in, it renders
 * nothing — never a broken image.
 */
export function SoccerBallOverlay({ active }: SoccerBallOverlayProps): ReactElement | null {
  const { playing, asset } = useSoccerBall(active)
  if (!playing || !asset) return null

  const className =
    'pointer-events-none absolute left-1/2 top-1/2 z-30 h-32 w-32 -translate-x-1/2 -translate-y-1/2'

  return asset.kind === 'video' ? (
    <video src={asset.src} autoPlay loop muted playsInline aria-hidden className={className} />
  ) : (
    <img src={asset.src} alt="" aria-hidden className={className} />
  )
}
