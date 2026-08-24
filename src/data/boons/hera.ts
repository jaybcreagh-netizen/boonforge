import type { Boon } from '../types'

const HERA_CORE: Boon[] = [
  { id: 'sworn-strike', gods: ['hera'], name: 'Sworn Strike', type: 'core', slot: 'attack', element: 'earth', description: 'Your Attack deals +50% damage and inflicts Hitch.', requires: [] },
  { id: 'sworn-flourish', gods: ['hera'], name: 'Sworn Flourish', type: 'core', slot: 'special', element: 'earth', description: 'Your Special deals +60% damage and inflicts Hitch.', requires: [] },
  { id: 'engagement-ring', gods: ['hera'], name: 'Engagement Ring', type: 'core', slot: 'cast', element: 'air', description: 'Your Casts inflict Hitch and immediately deal 20 damage per foe in the binding circle.', requires: [] },
  { id: 'nexus-rush', gods: ['hera'], name: 'Nexus Rush', type: 'core', slot: 'sprint', element: 'fire', description: 'Your Sprint inflicts Hitch on nearby foes, dealing 60 damage whenever it does.', requires: [] },
  { id: 'born-gain', gods: ['hera'], name: 'Born Gain', type: 'core', slot: 'none', element: 'water', description: 'Whenever you run out of Magick, Prime 20 until the next Location to restore all Magick.', requires: [] },
  { id: 'extended-family', gods: ['hera'], name: 'Extended Family', type: 'core', slot: 'none', element: 'fire', description: 'Damaging effects from Olympian boons deal +3% more damage per boon-granting god you have.', requires: [] },
  { id: 'dying-wish', gods: ['hera'], name: 'Dying Wish', type: 'core', slot: 'none', element: 'air', description: 'Whenever a Hitch-afflicted foe is slain, deal 40 damage to all other Hitch-afflicted foes.', requires: [['sworn-strike', 'sworn-flourish', 'engagement-ring', 'nexus-rush']] },
  { id: 'bridal-glow', gods: ['hera'], name: 'Bridal Glow', type: 'core', slot: 'none', element: 'water', description: 'Make 1 random non-Heroic boon Heroic and upgrade its Level by 1.', requires: [] },
  { id: 'hereditary-bane', gods: ['hera'], name: 'Hereditary Bane', type: 'core', slot: 'none', element: 'water', description: 'Your Hitch effects deal +10% damage and last +5 sec longer.', requires: [['sworn-strike', 'sworn-flourish', 'engagement-ring', 'nexus-rush']] },
  {
    id: 'rousing-reception',
    gods: ['hera'],
    name: 'Rousing Reception',
    type: 'core',
    slot: 'none',
    augments: 'cast',
    element: 'air',
    description: 'Your Casts deal 60 damage to foes wherever they appear upon joining the Encounter.',
    requires: [['rapture-ring', 'solar-ring', 'arctic-ring', 'anvil-ring', 'engagement-ring', 'smolder-ring', 'tidal-ring', 'storm-ring', 'sword-ring']],
  },
  { id: 'uncommon-grace', gods: ['hera'], name: 'Uncommon Grace', type: 'core', slot: 'none', element: 'fire', description: 'While none of your other boons are Common, you deal +10% damage.', requires: [] },
  { id: 'fine-line', augments: 'omega', gods: ['hera'], name: 'Fine Line', type: 'core', slot: 'none', element: 'earth', description: 'Your Omega Moves create a fissure dealing 120 damage in a long line, but cost +15 Magick.', requires: [] },
  { id: 'proper-upbringing', gods: ['hera'], name: 'Proper Upbringing', type: 'core', slot: 'none', infusion: { element: 'any', count: 4 }, description: 'While you hold at least one boon of each Element, all your Common boons gain Rare rarity.', requires: [] },
]

export const HERA_BOONS: Boon[] = [
  ...HERA_CORE,
  {
    id: 'all-together',
    gods: ['hera'],
    name: 'All Together',
    type: 'legendary',
    slot: 'none',
    description: 'Gain 1 each of Earth, Water, Air, and Fire Elements, plus an Infusion boon choice per element.',
    requires: [
      ['sworn-strike', 'sworn-flourish', 'engagement-ring', 'nexus-rush', 'bridal-glow', 'uncommon-grace', 'fine-line', 'hereditary-bane', 'rousing-reception'],
    ],
  },
]
