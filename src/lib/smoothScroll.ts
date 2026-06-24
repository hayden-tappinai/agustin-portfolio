import type Lenis from 'lenis'

/**
 * A tiny module-level handle on the app's Lenis instance so any component can
 * route a programmatic scroll (nav links, the ticket "tear to begin") through
 * the same smooth-scroll engine, with a graceful native fallback.
 */
let instance: Lenis | null = null

export function setLenis(l: Lenis | null): void {
  instance = l
}

export function scrollToTarget(target: string | HTMLElement, offset = 0): void {
  const el = typeof target === 'string' ? document.getElementById(target) : target
  if (!el) {
    if (target === 'top') instance?.scrollTo(0, { offset: 0 })
    return
  }
  if (instance) {
    instance.scrollTo(el, { offset, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function scrollToTop(): void {
  if (instance) instance.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
