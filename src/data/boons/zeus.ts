import type { Boon } from '../types'

const ZEUS_CORE: Boon[] = [
  { id: 'heaven-strike', gods: ['zeus'], name: 'Heaven Strike', type: 'core', slot: 'attack', element: 'air', description: 'Your Attacks inflict Blitz; 80 Blitz damage at common rarity.', requires: [] },
  { id: 'heaven-flourish', gods: ['zeus'], name: 'Heaven Flourish', type: 'core', slot: 'special', element: 'air', description: 'Your Specials inflict Blitz; 100 Blitz damage at common rarity.', requires: [] },
  { id: 'storm-ring', gods: ['zeus'], name: 'Storm Ring', type: 'core', slot: 'cast', element: 'air', description: 'Casts create a binding circle where lightning bolts strike one foe at a time, 25 damage every 0.35 sec.', requires: [] },
  { id: 'thunder-rush', gods: ['zeus'], name: 'Thunder Rush', type: 'core', slot: 'sprint', element: 'air', description: 'Dashing or sprinting strikes surrounding foes with lightning bolts, 20 damage every 0.35 sec.', requires: [] },
  { id: 'ionic-gain', gods: ['zeus'], name: 'Ionic Gain', type: 'core', slot: 'none', element: 'air', description: 'An Aether Font restoring all Magick appears each Encounter, reappearing 10 sec after use.', requires: [] },
  { id: 'power-surge', gods: ['zeus'], name: 'Power Surge', type: 'core', slot: 'none', element: 'air', description: 'Whenever you use Magick, a random surrounding foe is struck by lightning for 30 damage.', requires: [] },
  { id: 'divine-vengeance', gods: ['zeus'], name: 'Divine Vengeance', type: 'core', slot: 'none', element: 'air', description: 'After you take damage, your foe is struck by lightning (100 damage, up to 2 times, scaling by rarity).', requires: [] },
  {
    id: 'lightning-lance',
    gods: ['zeus'],
    name: 'Lightning Lance',
    type: 'core',
    slot: 'cast',
    element: 'air',
    description: 'Hold Cast to aim the binding circle; foes within are struck by lightning for 50 damage.',
    requires: [['storm-ring', 'tidal-ring', 'arctic-ring', 'rapture-ring', 'smolder-ring', 'anvil-ring', 'engagement-ring']],
  },
  { id: 'static-shock', gods: ['zeus'], name: 'Static Shock', type: 'core', slot: 'none', element: 'air', description: 'Your strikes emit chain-lightning bouncing up to 4 times (10 damage), but Prime 50 Magick.', requires: [] },
  {
    id: 'double-strike',
    gods: ['zeus'],
    name: 'Double Strike',
    type: 'core',
    slot: 'none',
    element: 'air',
    description: 'Your lightning bolt effects have a 10% chance to strike twice.',
    requires: [['heaven-strike', 'heaven-flourish', 'storm-ring', 'thunder-rush', 'power-surge', 'divine-vengeance', 'lightning-lance']],
  },
  { id: 'arc-flash', augments: 'omega', gods: ['zeus'], name: 'Arc Flash', type: 'core', slot: 'none', element: 'air', description: 'Omega Moves immediately activate Blitz effects and make them stronger (+30% bonus damage).', requires: [['heaven-strike', 'heaven-flourish']] },
  { id: 'electric-overload', gods: ['zeus'], name: 'Electric Overload', type: 'core', slot: 'none', element: 'air', description: 'Your chain-lightning deals 20% more damage and bounces up to 3 additional times.', requires: [['static-shock']] },
  { id: 'air-quality', gods: ['zeus'], name: 'Air Quality', type: 'core', slot: 'none', infusion: { element: 'air', count: 5 }, description: 'Infusion: while you hold at least 5 Air boons, your hits never deal less than 50 damage.', requires: [] },
]

export const ZEUS_BOONS: Boon[] = [
  ...ZEUS_CORE,
  {
    id: 'shocking-loss',
    gods: ['zeus'],
    name: 'Shocking Loss',
    type: 'legendary',
    slot: 'none',
    element: 'air',
    description: 'First time you damage susceptible foes each Encounter, 25% chance to destroy them outright.',
    requires: [
      [
        'heaven-strike',
        'heaven-flourish',
        'storm-ring',
        'thunder-rush',
        'ionic-gain',
        'static-shock',
        'power-surge',
        'divine-vengeance',
        'lightning-lance',
        'arc-flash',
        'double-strike',
        'electric-overload',
      ],
    ],
  },
]
