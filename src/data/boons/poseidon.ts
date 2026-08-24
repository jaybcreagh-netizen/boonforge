import type { Boon } from '../types'

const POSEIDON_CORE: Boon[] = [
  { id: 'wave-strike', gods: ['poseidon'], name: 'Wave Strike', type: 'core', slot: 'attack', element: 'water', description: 'Your Attacks hit foes with a splash dealing 20 damage that knocks other foes away.', requires: [] },
  { id: 'wave-flourish', gods: ['poseidon'], name: 'Wave Flourish', type: 'core', slot: 'special', element: 'water', description: 'Your Specials hit foes with a splash dealing 25 damage that knocks other foes away.', requires: [] },
  { id: 'tidal-ring', gods: ['poseidon'], name: 'Tidal Ring', type: 'core', slot: 'cast', element: 'water', description: 'Your Casts also immediately blast nearby foes for 60 damage and inflict Froth.', requires: [] },
  { id: 'breaker-rush', gods: ['poseidon'], name: 'Breaker Rush', type: 'core', slot: 'sprint', element: 'water', description: 'Whenever you Sprint, blast the first foe you run into for 80 damage, knocking foes away.', requires: [] },
  { id: 'flood-gain', gods: ['poseidon'], name: 'Flood Gain', type: 'core', slot: 'none', element: 'water', description: 'Your Omega Moves briefly restore any Magick you use, lasting 4 sec; repeatable after 8 sec.', requires: [] },
  { id: 'hydraulic-might', gods: ['poseidon'], name: 'Hydraulic Might', type: 'core', slot: 'none', element: 'water', description: 'At the start of each Encounter, your Attacks and Specials are +100% stronger for 10 sec.', requires: [] },
  { id: 'buried-treasure', gods: ['poseidon'], name: 'Buried Treasure', type: 'core', slot: 'none', element: 'water', description: 'Minor Finds and Gold are worth +50% more; receive Gold, healing, and Bones now.', requires: [] },
  { id: 'high-surf', gods: ['poseidon'], name: 'High Surf', type: 'core', slot: 'none', element: 'water', description: 'Hit surrounding foes with a splash dealing 40 damage as they start to strike, but Prime 30 Magick.', requires: [] },
  { id: 'sea-star', gods: ['poseidon'], name: 'Sea Star', type: 'core', slot: 'none', element: 'water', description: 'Whenever you claim rewards other than Boons, Hammers, or rare resources, a copy may appear (25%).', requires: [] },
  { id: 'slippery-slope', gods: ['poseidon'], name: 'Slippery Slope', type: 'core', slot: 'none', element: 'water', description: 'Your splash effects also inflict Froth, and Froth deals +20% more damage.', requires: [['wave-strike', 'wave-flourish']] },
  {
    id: 'geyser-spout',
    gods: ['poseidon'],
    name: 'Geyser Spout',
    type: 'core',
    slot: 'none',
    element: 'water',
    description: 'Your Omega Cast gains +150 Power and knocks foes away.',
    requires: [['tidal-ring', 'storm-ring', 'arctic-ring', 'engagement-ring', 'solar-ring', 'smolder-ring', 'sword-ring']],
  },
  { id: 'ocean-swell', augments: 'omega', gods: ['poseidon'], name: 'Ocean Swell', type: 'core', slot: 'none', element: 'water', description: 'Your Omega Moves also launch a wide wave dealing 40 damage that knocks foes away, using +5 Magick.', requires: [] },
  { id: 'water-fitness', gods: ['poseidon'], name: 'Water Fitness', type: 'core', slot: 'none', infusion: { element: 'water', count: 2 }, description: 'Gain +15 Max Life for each Water boon you have.', requires: [] },
]

export const POSEIDON_BOONS: Boon[] = [
  ...POSEIDON_CORE,
  {
    id: 'king-tide',
    gods: ['poseidon'],
    name: 'King Tide',
    type: 'legendary',
    slot: 'none',
    element: 'water',
    description: 'Your splash effects are larger and deal +200% bonus damage to Guardians.',
    requires: [['wave-strike', 'wave-flourish', 'breaker-rush', 'flood-gain', 'geyser-spout', 'hydraulic-might', 'ocean-swell', 'slippery-slope', 'high-surf']],
  },
]
