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

export const DAMAGE_TAGS: Record<string, DamageTag[]> = {
  'nova-strike': [{ bucket: 'attack', pct: 0.4 }],
  'nova-flourish': [{ bucket: 'special', pct: 0.6 }],
  'perfect-image': [{ bucket: 'all', pct: 0.1, note: 'until you take damage' }],

  'flutter-strike': [{ bucket: 'attack', pct: 0.8, note: 'close-range foes' }],
  'flutter-flourish': [{ bucket: 'special', pct: 1.0, note: 'close-range foes' }],
  'shameless-attitude': [{ bucket: 'all', pct: 0.05, note: 'doubled above 80% HP' }],
  'sweet-surrender': [{ vuln: 0.1 }],

  'vicious-strike': [{ bucket: 'attack', pct: 0.2 }],
  'vicious-flourish': [{ bucket: 'special', pct: 0.3 }],

  'pressure-points': [{ crit: 0.03 }],
  'shadow-pounce': [{ crit: 0.08, note: 'Omega Moves after Dash' }],
  'vital-sign': [{ crit: 0.15, note: 'foes above 80% Health/Armor' }],
  'lethal-snare': [{ crit: 0.1, note: 'foes inside your Casts' }],
  'killing-stroke': [{ crit: 0.1, note: 'Specials only' }],
  'death-warrant': [{ crit: 0.3, note: 'Marked foe' }],

  'ice-strike': [{ bucket: 'attack', pct: 0.3 }],
  'ice-flourish': [{ bucket: 'special', pct: 0.4 }],
  'weed-killer': [{ bucket: 'omega', pct: 0.5, note: 'Omega Attack' }],
  'local-climate': [{ bucket: 'omega', pct: 0.2, note: 'Omega Cast; doubled inside circle' }],

  'martial-art': [{ bucket: 'all', perElement: 'earth', perPct: 0.05 }],

  'sworn-strike': [{ bucket: 'attack', pct: 0.5 }],
  'sworn-flourish': [{ bucket: 'special', pct: 0.6 }],
  'extended-family': [{ bucket: 'all', perGodPct: 0.03 }],
  'uncommon-grace': [{ bucket: 'all', pct: 0.1, note: 'while no Common boons held' }],

  'hydraulic-might': [{ bucket: 'attack', pct: 1.0, note: 'first 10 sec of each Encounter' }],

  'snuffed-candle': [{ bucket: 'all', pct: 0.15, note: 'isolated foes' }],

  'furnace-blast': [{ vuln: 0.15, note: 'Glow-afflicted (blast-hit) foes' }],
  'exceptional-talent': [{ bucket: 'omega', shots: 2, note: 'fires twice, +20 Magick cost' }],

  'unseen-ire': [{ bucket: 'all', pct: 0.7, note: 'while Dark, after taking damage' }],
  'last-gasp': [{ bucket: 'all', perGodPct: 0, note: '+10% per used Death Defiance (not auto-counted)' }],
}

export const ARCANA_DAMAGE_TAGS: Record<string, DamageTag[]> = {
  'the-huntress': [
    { bucket: 'attack', pct: 0.3, note: 'while Magick below 100%' },
    { bucket: 'special', pct: 0.3, note: 'while Magick below 100%' },
  ],
  'the-furies': [{ vuln: 0.2, note: 'foes inside your Casts' }],
  night: [{ crit: 0.15, note: 'different Omega Moves in a combo' }],
  strength: [{ bucket: 'all', pct: 0.2, note: 'only while you hold no Death Defiance' }],
  origination: [{ vuln: 0.25, note: 'foes hit by curses from two different Olympians' }],
}

export const HAMMER_DAMAGE_TAGS: Record<string, DamageTag[]> = {
  'extending-wallop': [{ bucket: 'attack', pct: 1.0, note: 'distant foes only' }],
  'cross-cataclysm': [{ bucket: 'omega', pct: 0.5 }],
  'rapid-thrasher': [{ bucket: 'attack', pct: 0.5, note: 'attack speed ≈ DPS' }],
  'rapid-moonshot': [{ bucket: 'special', pct: 0.25, note: 'special speed' }],
  'dual-moonshot': [{ bucket: 'special', shots: 2, note: '-40% range' }],
  'giga-moonburst': [{ bucket: 'omega', pct: 3.0, note: 'requires channeling +30 Magick' }],
  'aetheric-moonburst': [{ bucket: 'omega', pct: 0.5 }],
  'mirrored-thrasher': [{ bucket: 'attack', shots: 2, note: 'costs 5 Magick per hit' }],

  'sweeping-ambush': [{ bucket: 'omega', pct: 4.0, note: '+20 Magick cost' }],
  'skulking-onslaught': [{ bucket: 'attack', pct: 1.5, note: 'from behind' }],
  'final-slice': [{ bucket: 'attack', pct: 0.6, note: 'sequence finisher only' }],
  'dancing-knives': [{ bucket: 'special', pct: 0.15 }],
  'hidden-knives': [{ bucket: 'special', pct: 0.2 }],
  'rapid-onslaught': [{ bucket: 'attack', pct: 0.35, note: 'attack speed' }],
  'sudden-flurry': [{ bucket: 'omega', pct: 0.4, note: 'Omega Special channel speed' }],
  'sinister-pinion': [{ bucket: 'special', pct: 1.0, note: 'tick rate doubled' }],

  'mega-blaze': [{ bucket: 'attack', pct: 0.3 }],
  'furious-blaze': [{ bucket: 'attack', pct: 0.2, note: 'while channeling' }],
  'rising-helix': [{ bucket: 'special', pct: 0.25, note: 'at full duration' }],

  'rapid-slash': [{ bucket: 'attack', pct: 0.3, note: 'attack speed' }],
  'furious-whirlwind': [{ bucket: 'omega', pct: 0.35, note: 'channel speed' }],
  'siege-shredder': [{ bucket: 'special', pct: 1.5 }],
  'heaven-splitter': [{ bucket: 'attack', shots: 2, note: 'combo reduced to opening slam' }],

  'mega-driver': [{ bucket: 'special', pct: 0.5 }],
  'rapid-driver': [{ bucket: 'special', pct: 0.35, note: 'special speed' }],
  'looming-ignition': [{ bucket: 'attack', pct: 0.5, note: 'detonating Attacks' }],
  'garmr-gaze': [{ bucket: 'attack', pct: 0.25 }],
  'leering-glance': [{ bucket: 'attack', pct: 0.15, note: 'successive hits' }],
  'boosted-ignition': [{ bucket: 'attack', pct: 0.15, note: 'after Dash or Special' }],
  'runic-driver': [{ bucket: 'special', pct: 0.15, note: 'per foe struck' }],
  'helheim-charge': [{ bucket: 'omega', shots: 3 }],

  'rapid-frame': [{ bucket: 'attack', pct: 0.35, note: 'attack speed' }],
  'siege-frame': [{ bucket: 'attack', pct: 0.3 }],
  'mooncrest-riser': [{ bucket: 'attack', pct: 0.4, note: 'Dash-Strike only' }],
  'chakra-collider': [{ bucket: 'omega', pct: 1.5 }],
}
