import type { Boon } from '../types'

const ARES_CORE: Boon[] = [
  { id: 'vicious-strike', gods: ['ares'], name: 'Vicious Strike', type: 'core', slot: 'attack', element: 'earth', description: 'Your Attack deals +20% damage and inflicts Wounds.', requires: [] },
  { id: 'vicious-flourish', gods: ['ares'], name: 'Vicious Flourish', type: 'core', slot: 'special', element: 'earth', description: 'Your Special deals +30% damage and inflicts Wounds.', requires: [] },
  { id: 'sword-ring', gods: ['ares'], name: 'Sword Ring', type: 'core', slot: 'cast', element: 'earth', description: 'Your Cast drops a falling blade over each foe in the binding circle, dealing 120 damage.', requires: [] },
  { id: 'stabbing-rush', gods: ['ares'], name: 'Stabbing Rush', type: 'core', slot: 'sprint', element: 'earth', description: 'Your Dash creates a row of five falling blades along your path, dealing 30 damage each.', requires: [] },
  { id: 'grisly-gain', gods: ['ares'], name: 'Grisly Gain', type: 'core', slot: 'none', element: 'earth', description: 'Weapon strikes have a 20% chance to spill Plasma, which also restores 15 Magick.', requires: [] },
  {
    id: 'meat-grinder',
    gods: ['ares'],
    name: 'Meat Grinder',
    type: 'core',
    slot: 'none',
    augments: 'cast',
    element: 'earth',
    description: 'Your Omega Cast also creates a Blade Rift in the binding circle, dealing 30 damage every sec.',
    requires: [['rapture-ring', 'solar-ring', 'arctic-ring', 'anvil-ring', 'engagement-ring', 'smolder-ring', 'tidal-ring', 'storm-ring', 'sword-ring']],
  },
  { id: 'profuse-bleeding', gods: ['ares'], name: 'Profuse Bleeding', type: 'core', slot: 'none', element: 'earth', description: 'Whenever you inflict Wounds or collect Plasma, drop a falling blade on a nearby foe dealing 30 damage.', requires: [['vicious-strike', 'vicious-flourish', 'grisly-gain', 'visceral-impact']] },
  { id: 'grievous-blow', gods: ['ares'], name: 'Grievous Blow', type: 'core', slot: 'none', element: 'earth', description: 'Foes with Wounds may suffer 200% damage when struck (+10% chance).', requires: [['vicious-strike', 'vicious-flourish']] },
  { id: 'visceral-impact', gods: ['ares'], name: 'Visceral Impact', type: 'core', slot: 'none', element: 'earth', description: 'After you take damage or slay a foe, spill Plasma, with 25% chance to spill twice.', requires: [] },
  { id: 'mutual-destruction', gods: ['ares'], name: 'Mutual Destruction', type: 'core', slot: 'none', element: 'earth', description: 'Gain 0.1% chance per missing life point to deal 200% damage.', requires: [] },
  { id: 'blood-spree', gods: ['ares'], name: 'Blood Spree', type: 'core', slot: 'none', element: 'earth', description: 'While below 40 health, your Attacks and Specials restore 1 health per hit.', requires: [] },
  { id: 'cut-above', augments: 'omega', gods: ['ares'], name: 'Cut Above', type: 'core', slot: 'none', element: 'earth', description: 'Your Omega Moves also drop a falling blade over each struck foe, dealing 90 damage, costing +5 Magick.', requires: [] },
  { id: 'rallying-cry', gods: ['ares'], name: 'Rallying Cry', type: 'core', slot: 'none', infusion: { element: 'earth', count: 4 }, description: 'With enough Earth boons, all your damaging Olympian boon effects are 50% stronger.', requires: [] },
]

export const ARES_BOONS: Boon[] = [
  ...ARES_CORE,
  {
    id: 'sanguinary-savor',
    gods: ['ares'],
    name: 'Sanguinary Savor',
    type: 'legendary',
    slot: 'none',
    element: 'earth',
    description: 'You inflict Wounds with +100 bonus power, and spilled Plasma is automatically drawn to you.',
    requires: [
      [
        'vicious-strike',
        'vicious-flourish',
        'sword-ring',
        'stabbing-rush',
        'grisly-gain',
        'visceral-impact',
        'profuse-bleeding',
        'meat-grinder',
        'grievous-blow',
        'mutual-destruction',
        'blood-spree',
        'cut-above',
      ],
    ],
  },
]
