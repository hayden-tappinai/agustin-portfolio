import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import * as THREE from 'three'
import type { CountryFeature, SelectedCountry } from '../types/country'
import { useCountries } from '../hooks/useCountries'
import { SoccerBallOverlay } from './soccer-ball/SoccerBallOverlay'
import { countryKey, toSelectedCountry } from '../lib/countries'
import { altitude, palette } from '../lib/theme'
import { VISITED_ISO3 } from '../data/stories'

// Stable constant accessors — these never depend on state, so defining them at
// module scope keeps their identity fixed and stops react-globe.gl from
// re-applying side/stroke colours across all ~177 polygons on every render.
const sideColorAccessor = () => palette.landSide
const strokeColorAccessor = () => palette.landStroke

/** Measure a container so the WebGL canvas fills its navy zone exactly. */
function useElementSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const e = entries[0]
      if (e) setSize({ width: Math.round(e.contentRect.width), height: Math.round(e.contentRect.height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

interface GlobeHeroProps {
  /** The currently selected country (panel open), owned by App. */
  selected: SelectedCountry | null
  /** Called when a country is clicked on the globe. */
  onSelect: (country: SelectedCountry) => void
}

export function GlobeHero({ selected, onSelect }: GlobeHeroProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [containerRef, { width, height }] = useElementSize()
  const { status, features, error } = useCountries()

  const [hovered, setHovered] = useState<CountryFeature | null>(null)
  const [ready, setReady] = useState(false)

  // A flat, lightly-shaded blue ocean. No Earth texture — clean by design.
  const oceanMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: palette.ocean, shininess: 8 }),
    [],
  )

  // Hover / visited / selected drive the cap colour. Visited countries read a
  // touch brighter ("lit up"); hover + selection are the brightest shade of the
  // same green, so the globe still reads as a calm few greens.
  const capColor = useCallback(
    (obj: object) => {
      const f = obj as CountryFeature
      if (f === hovered) return palette.landHover
      if (selected && countryKey(f) === selected.key) return palette.landHover
      const iso3 = f.properties.ISO_A3
      if (iso3 && VISITED_ISO3.has(iso3)) return palette.landVisited
      return palette.land
    },
    [hovered, selected],
  )
  const polyAltitude = useCallback(
    (obj: object) => {
      const f = obj as CountryFeature
      if (f === hovered) return altitude.hover
      if (selected && countryKey(f) === selected.key) return altitude.selected
      return altitude.rest
    },
    [hovered, selected],
  )

  const handleHover = useCallback((obj: object | null) => {
    setHovered((obj as CountryFeature | null) ?? null)
  }, [])

  const handleClick = useCallback(
    (obj: object, _event: MouseEvent, coords: { lat: number; lng: number }) => {
      onSelect(toSelectedCountry(obj as CountryFeature, coords))
    },
    [onSelect],
  )

  // Expanding volt "you-are-here" ring on the selected country.
  const ringsData = useMemo(
    () => (selected ? [{ lat: selected.lat, lng: selected.lng }] : []),
    [selected],
  )
  const ringColor = useCallback(() => (t: number) => `rgba(205,255,61,${1 - t})`, [])

  // One-time controls + camera + lighting setup once the globe is ready.
  useEffect(() => {
    if (!ready) return
    const globe = globeRef.current
    if (!globe) return

    const controls = globe.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.55
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.6
    controls.minPolarAngle = Math.PI * 0.12
    controls.maxPolarAngle = Math.PI * 0.88

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.1 })

    globe.lights([
      new THREE.AmbientLight(0xffffff, 2.1),
      (() => {
        const dir = new THREE.DirectionalLight(0xffffff, 1.4)
        dir.position.set(1, 1, 1)
        return dir
      })(),
    ])

    // Let a vertical touch-drag scroll the page (so the pinned, full-screen globe
    // never traps a phone's scroll) while horizontal drags still rotate it.
    const canvas = globe.renderer().domElement as HTMLCanvasElement
    canvas.style.touchAction = 'pan-y'
  }, [ready])

  // Fly to a country whenever one is selected (globe click or keyboard nav).
  useEffect(() => {
    if (!ready || !selected) return
    globeRef.current?.pointOfView({ lat: selected.lat, lng: selected.lng, altitude: 1.8 }, 900)
  }, [ready, selected])

  // Pause the idle spin while the user is inspecting (hovering or panel open).
  useEffect(() => {
    if (!ready) return
    const controls = globeRef.current?.controls()
    if (!controls) return
    controls.autoRotate = hovered === null && selected === null
  }, [ready, hovered, selected])

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ cursor: hovered ? 'pointer' : 'grab' }}>
      {width > 0 && height > 0 && (
        <Globe
          ref={globeRef}
          width={width}
          height={height}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={oceanMaterial}
          showAtmosphere
          atmosphereColor={palette.atmosphere}
          atmosphereAltitude={0.11}
          polygonsData={features}
          polygonCapColor={capColor}
          polygonSideColor={sideColorAccessor}
          polygonStrokeColor={strokeColorAccessor}
          polygonAltitude={polyAltitude}
          polygonsTransitionDuration={260}
          onPolygonHover={handleHover}
          onPolygonClick={handleClick}
          ringsData={ringsData}
          ringColor={ringColor}
          ringMaxRadius={4}
          ringPropagationSpeed={2}
          ringRepeatPeriod={900}
          onGlobeReady={() => setReady(true)}
        />
      )}

      {/* Soccer-ball hover animation seam — renders nothing until the asset lands. */}
      <SoccerBallOverlay active={hovered !== null} />

      {status === 'error' && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-navy-2/90 px-4 py-2 text-sm text-paper/80">
          Couldn't load the map: {error}
        </div>
      )}
    </div>
  )
}
