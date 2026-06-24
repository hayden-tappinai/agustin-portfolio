import { useSoccerBall } from '../../hooks/useSoccerBall'

interface SoccerBallOverlayProps {
  /** True while a country is hovered — drives whether the animation plays. */
  active: boolean
}

/**
 * SEAM: renders the soccer-ball fly-through animation while a country is hovered.
 *
 * V1 intentionally renders nothing — the Higgsfield asset (a hand-drawn b/w
 * soccer ball, background stripped) hasn't been produced yet. The contract is
 * fully wired: `GlobeHero` passes a live `active` flag, and `useSoccerBall`
 * turns it into `playing`. Dropping the asset in is a one-component change here,
 * not a re-plumbing.
 *
 * When the asset arrives, render it on `playing`, e.g.:
 *
 *   if (!playing) return null
 *   return (
 *     <img
 *       src={`${import.meta.env.BASE_URL}soccer-ball.gif`}
 *       aria-hidden
 *       className="pointer-events-none fixed inset-0 z-30 m-auto h-32 w-32"
 *     />
 *   )
 */
export function SoccerBallOverlay({ active }: SoccerBallOverlayProps): null {
  const { playing } = useSoccerBall(active)
  if (!playing) return null
  // Asset not produced yet — render nothing even while "playing".
  return null
}
