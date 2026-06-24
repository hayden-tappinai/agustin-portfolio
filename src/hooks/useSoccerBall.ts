export interface SoccerBallState {
  /** Whether the fly-through animation should be playing right now. */
  playing: boolean
}

/**
 * SEAM for the soccer-ball hover animation (see CONTEXT.md).
 *
 * whyre is generating a black-and-white, hand-drawn-style soccer-ball
 * fly-through in Higgsfield (background stripped). This hook owns the *trigger*
 * decision — currently "play while a country is hovered." When the asset lands,
 * `SoccerBallOverlay` renders it on `playing`, and any position logic (cursor-
 * following or country-anchored) is added there alongside the asset.
 *
 * Deliberately overhead-free: no listeners, no per-frame state. It does not
 * track the cursor yet because there is nothing to position until the asset
 * exists — wiring that in now would re-render the heavy globe for no payoff.
 */
export function useSoccerBall(active: boolean): SoccerBallState {
  return { playing: active }
}
