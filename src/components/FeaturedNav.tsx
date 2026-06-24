import type { SelectedCountry } from '../types/country'
import { FEATURED_COUNTRIES } from '../data/featured'

interface FeaturedNavProps {
  onSelect: (country: SelectedCountry) => void
}

/**
 * Visually hidden, keyboard/screen-reader path into the country stories.
 * The globe is a pointer-driven canvas, so this gives non-pointer users a real
 * way to open each place's panel (and makes the content indexable). It shares
 * the exact same selection path as a globe click.
 */
export function FeaturedNav({ onSelect }: FeaturedNavProps) {
  return (
    <nav aria-label="Open a country's story" className="sr-only">
      <ul>
        {FEATURED_COUNTRIES.map((country) => (
          <li key={country.key}>
            <button type="button" onClick={() => onSelect(country)}>
              Open {country.name} story
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
