import type { Element } from './types'

export type DamageBucket = 'attack' | 'special' | 'cast' | 'omega' | 'all'

export interface DamageTag {
  bucket?: DamageBucket
  pct?: number
  perElement?: Element
  perPct?: number
  perGodPct?: number
  crit?: number
  vuln?: number
  shots?: number
  note?: string
}

export const DAMAGE_TAGS: Record<string, DamageTag> = {
  'nova-strike': { bucket: 'attack', pct: 0.4 },
  'nova-flourish': { bucket: 'special', pct: 0.6 },
  'perfect-image': { bucket: 'all', pct: 0.1, note: 'until you take damage' },

  'flutter-strike': { bucket: 'attack', pct: 0.8, note: 'close-range foes' },
  'flutter-flourish': { bucket: 'special', pct: 1.0, note: 'close-range foes' },
  'shameless-attitude': { bucket: 'all', pct: 0.05, note: 'doubled above 80% HP' },
  'sweet-surrender': { vuln: 0.1 },

  'vicious-strike': { bucket: 'attack', pct: 0.2 },
  'vicious-flourish': { bucket: 'special', pct: 0.3 },

  'pressure-points': { crit: 0.03 },
  'shadow-pounce': { crit: 0.08, note: 'Omega Moves after Dash' },
  'vital-sign': { crit: 0.15, note: 'foes above 80% Health/Armor' },
  'lethal-snare': { crit: 0.1, note: 'foes inside your Casts' },
  'killing-stroke': { crit: 0.1, note: 'Specials only' },
  'death-warrant': { crit: 0.3, note: 'Marked foe' },

  'ice-strike': { bucket: 'attack', pct: 0.3 },
  'ice-flourish': { bucket: 'special', pct: 0.4 },
  'weed-killer': { bucket: 'omega', pct: 0.5, note: 'Omega Attack' },
  'local-climate': { bucket: 'omega', pct: 0.2, note: 'Omega Cast; doubled inside circle' },

  'martial-art': { bucket: 'all', perElement: 'earth', perPct: 0.05 },

  'sworn-strike': { bucket: 'attack', pct: 0.5 },
  'sworn-flourish': { bucket: 'special', pct: 0.6 },
  'extended-family': { bucket: 'all', perGodPct: 0.03 },
  'uncommon-grace': { bucket: 'all', pct: 0.1, note: 'while no Common boons held' },

  'hydraulic-might': { bucket: 'attack', pct: 1.0, note: 'first 10 sec of each Encounter' },

  'snuffed-candle': { bucket: 'all', pct: 0.15, note: 'isolated foes' },

  'origination': { vuln: 0.25, note: 'foes hit by curses from two different Olympians' },
  'furnace-blast': { vuln: 0.15, note: 'Glow-afflicted (blast-hit) foes' },
  'exceptional-talent': { bucket: 'omega', shots: 2, note: 'fires twice, +20 Magick cost' },
}
