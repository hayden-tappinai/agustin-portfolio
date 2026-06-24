import { useEffect, useState } from 'react'
import type { FeatureCollection, Geometry } from 'geojson'
import type { CountryFeature, CountryProperties } from '../types/country'

/**
 * Natural Earth 110m admin-0 countries, served from `public/`.
 * Resolved against Vite's BASE_URL so it works under any deploy base path.
 */
const GEOJSON_URL = `${import.meta.env.BASE_URL}ne_110m_admin_0_countries.geojson`

type CountriesState =
  | { status: 'loading'; features: CountryFeature[]; error: null }
  | { status: 'ready'; features: CountryFeature[]; error: null }
  | { status: 'error'; features: CountryFeature[]; error: string }

/**
 * Fetch the world-countries GeoJSON once and return its features.
 * Antarctica is dropped — it reads as a distracting white band across the
 * bottom of the globe and Agustin isn't telling stories from there.
 */
export function useCountries(): CountriesState {
  const [state, setState] = useState<CountriesState>({
    status: 'loading',
    features: [],
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    fetch(GEOJSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} loading countries`)
        return res.json() as Promise<FeatureCollection<Geometry, CountryProperties>>
      })
      .then((data) => {
        if (cancelled) return
        const features = (data.features as CountryFeature[]).filter(
          (f) => f.properties.ISO_A3 !== 'ATA',
        )
        setState({ status: 'ready', features, error: null })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const message = err instanceof Error ? err.message : 'Failed to load countries'
        setState({ status: 'error', features: [], error: message })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
