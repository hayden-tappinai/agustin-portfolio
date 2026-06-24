import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import * as THREE from 'three'
import type { CountryFeature, SelectedCountry } from '../types/country'
import { useCountries } from '../hooks/useCountries'
import { SoccerBallOverlay } from './soccer-ball/SoccerBallOverlay'
import { toSelectedCountry } from '../lib/countries'
import { altitude, palette } from '../lib/theme'

// Stable constant accessors — these never depend on state, so defining them at
// module scope keeps their identity fixed and stops react-globe.gl from
// re-applying side/stroke colours across all ~177 polygons on every render.
const sideColorAccessor = () => palette.landSide
const strokeColorAccessor = () => palette.landStroke

function useWindowSize() {
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

interface GlobeHeroProps {
  /** The currently selected country (panel open), owned by App. */
  selected: SelectedCountry | null
  /** Called when a country is clicked on the globe. */
  onSelect: (country: SelectedCountry) => void
}

export function GlobeHero({ selected, onSelect }: GlobeHeroProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const { width, height } = useWindowSize()
  const { status, features, error } = useCountries()

  const [hovered, setHovered] = useState<CountryFeature | null>(null)
  const [ready, setReady] = useState(false)

  // A flat, lightly-shaded blue ocean. No Earth texture — clean by design.
  const oceanMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: palette.ocean, shininess: 8 }),
    [],
  )

  // Hover-driven accessors — re-applied (with transition) when `hovered` changes,
  // which is exactly what produces the lift. (react-globe.gl types the accessor
  // arg as `object`; our data are always CountryFeature.)
  const capColor = useCallback(
    (obj: object) => ((obj as CountryFeature) === hovered ? palette.landHover : palette.land),
    [hovered],
  )
  const polyAltitude = useCallback(
    (obj: object) => ((obj as CountryFeature) === hovered ? altitude.hover : altitude.rest),
    [hovered],
  )

  const handleHover = useCallback((obj: object | null) => {
    // react-globe.gl passes the hovered datum (a CountryFeature) or null.
    setHovered((obj as CountryFeature | null) ?? null)
  }, [])

  const handleClick = useCallback(
    (obj: object, _event: MouseEvent, coords: { lat: number; lng: number }) => {
      // The clicked datum is a CountryFeature; coords is the surface click point.
      onSelect(toSelectedCountry(obj as CountryFeature, coords))
    },
    [onSelect],
  )

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
    // Keep the poles from flipping past vertical for a steadier feel.
    controls.minPolarAngle = Math.PI * 0.12
    controls.maxPolarAngle = Math.PI * 0.88

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2.4 })

    // Even, soft lighting so the ocean reads as one clean colour (no harsh
    // day/night terminator) while lifted countries still cast subtle depth.
    globe.lights([
      new THREE.AmbientLight(0xffffff, 2.1),
      (() => {
        const dir = new THREE.DirectionalLight(0xffffff, 1.4)
        dir.position.set(1, 1, 1)
        return dir
      })(),
    ])
  }, [ready])

  // Fly to a country whenever one is selected (from a globe click or the
  // keyboard nav) — a single fly path for both entry points.
  useEffect(() => {
    if (!ready || !selected) return
    globeRef.current?.pointOfView(
      { lat: selected.lat, lng: selected.lng, altitude: 1.8 },
      900,
    )
  }, [ready, selected])

  // Pause the idle spin while the user is inspecting (hovering or panel open).
  useEffect(() => {
    if (!ready) return
    const controls = globeRef.current?.controls()
    if (!controls) return
    controls.autoRotate = hovered === null && selected === null
  }, [ready, hovered, selected])

  return (
    <div className="fixed inset-0 z-0 bg-navy" style={{ cursor: hovered ? 'pointer' : 'grab' }}>
      <Globe
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="#0a1422"
        globeMaterial={oceanMaterial}
        showAtmosphere
        atmosphereColor={palette.atmosphere}
        atmosphereAltitude={0.16}
        polygonsData={features}
        polygonCapColor={capColor}
        polygonSideColor={sideColorAccessor}
        polygonStrokeColor={strokeColorAccessor}
        polygonAltitude={polyAltitude}
        polygonsTransitionDuration={260}
        onPolygonHover={handleHover}
        onPolygonClick={handleClick}
        onGlobeReady={() => setReady(true)}
      />

      {/* Soccer-ball hover animation seam — renders nothing until the asset lands. */}
      <SoccerBallOverlay active={hovered !== null} />

      {status === 'error' && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-surface/90 px-4 py-2 text-sm text-muted">
          Couldn't load the map: {error}
        </div>
      )}
    </div>
  )
}
