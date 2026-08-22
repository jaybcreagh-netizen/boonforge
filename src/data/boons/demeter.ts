import type { Boon } from '../types'

const DEMETER_CORE: Boon[] = [
  { id: 'ice-strike', gods: ['demeter'], name: 'Ice Strike', type: 'core', slot: 'attack', element: 'water', description: 'Your Attack deals +30% damage and inflicts Freeze.', requires: [] },
  { id: 'ice-flourish', gods: ['demeter'], name: 'Ice Flourish', type: 'core', slot: 'special', element: 'water', description: 'Your Special deals +40% damage and inflicts Freeze.', requires: [] },
  { id: 'arctic-ring', gods: ['demeter'], name: 'Arctic Ring', type: 'core', slot: 'cast', element: 'water', description: 'Your Cast inflicts Freeze and repeatedly deals 10 damage every 0.5 sec inside the binding circle.', requires: [] },
  { id: 'frigid-rush', gods: ['demeter'], name: 'Frigid Rush', type: 'core', slot: 'sprint', element: 'water', description: 'Your Sprint forms a lingering Gust around you, dealing 4 damage every 0.25 sec.', requires: [] },
  { id: 'tranquil-gain', gods: ['demeter'], name: 'Tranquil Gain', type: 'core', slot: 'none', element: 'earth', description: 'After remaining inactive 0.5 sec, rapidly restore Magick until you act (+50% restoration).', requires: [] },
  { id: 'arctic-gale', gods: ['demeter'], name: 'Arctic Gale', type: 'core', slot: 'none', element: 'water', description: 'Your Casts also create a Gust at the binding circle dealing 4 damage every 0.25 sec.', requires: [] },
  { id: 'plentiful-forage', gods: ['demeter'], name: 'Plentiful Forage', type: 'core', slot: 'none', element: 'earth', description: 'Whenever you gather resources, restore 10% life; grants 1 Mystery Seed now.', requires: [] },
  { id: 'steady-growth', gods: ['demeter'], name: 'Steady Growth', type: 'core', slot: 'none', element: 'earth', description: 'Every 6 Encounters cleared, a random boon you hold gains rarity (needs a non-Heroic boon).', requires: [] },
  { id: 'snow-queen', gods: ['demeter'], name: 'Snow Queen', type: 'core', slot: 'none', element: 'earth', description: 'Gain a barrier stopping 1 instance of damage in each Location, but Prime 25 Magick.', requires: [] },
  {
    id: 'weed-killer',
    gods: ['demeter'],
    name: 'Weed Killer',
    type: 'core',
    slot: 'none',
    element: 'earth',
    description: 'Your Omega Attack deals +50% damage but costs +10 Magick.',
    requires: [['ice-strike', 'heaven-strike', 'wave-strike', 'nova-strike', 'flame-strike', 'volcanic-strike', 'flutter-strike', 'sworn-strike', 'vicious-strike']],
  },
  {
    id: 'local-climate',
    gods: ['demeter'],
    name: 'Local Climate',
    type: 'core',
    slot: 'none',
    element: 'earth',
    description: 'Your Omega Cast deals +20% damage, doubled while you stand within the binding circle.',
    requires: [['arctic-ring', 'storm-ring', 'engagement-ring', 'solar-ring', 'rapture-ring', 'anvil-ring', 'smolder-ring', 'sword-ring']],
  },
  { id: 'cold-storage', gods: ['demeter'], name: 'Cold Storage', type: 'core', slot: 'none', element: 'water', description: 'Your Freeze effects last 2 sec longer.', requires: [['ice-strike', 'ice-flourish', 'arctic-ring']] },
  { id: 'frosty-veneer', gods: ['demeter'], name: 'Frosty Veneer', type: 'core', slot: 'none', infusion: { element: 'water', count: 4 }, description: 'While holding enough Water boons, take 10 less damage from hits of 20 or more.', requires: [] },
]

export const DEMETER_BOONS: Boon[] = [
  ...DEMETER_CORE,
  {
    id: 'winter-harvest',
    gods: ['demeter'],
    name: 'Winter Harvest',
    type: 'legendary',
    slot: 'none',
    element: 'earth',
    description: 'Freeze-afflicted foes shatter upon reaching 10% health, dealing 100 damage in the area.',
    requires: [['ice-strike', 'ice-flourish', 'arctic-ring', 'plentiful-forage', 'snow-queen', 'steady-growth', 'weed-killer', 'cold-storage', 'local-climate']],
  },
]
