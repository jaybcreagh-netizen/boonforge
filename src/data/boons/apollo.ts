import type { Boon } from '../types'

const APOLLO_CORE: Boon[] = [
  { id: 'nova-strike', gods: ['apollo'], name: 'Nova Strike', type: 'core', slot: 'attack', element: 'air', description: 'Your Attack deals +40% damage in a larger area.', requires: [] },
  { id: 'nova-flourish', gods: ['apollo'], name: 'Nova Flourish', type: 'core', slot: 'special', element: 'air', description: 'Your Special deals +60% damage in a larger area.', requires: [] },
  { id: 'solar-ring', gods: ['apollo'], name: 'Solar Ring', type: 'core', slot: 'cast', element: 'fire', description: 'Your Casts inflict Daze and burst for 80 damage right before they expire.', requires: [] },
  { id: 'blinding-rush', gods: ['apollo'], name: 'Blinding Rush', type: 'core', slot: 'sprint', element: 'fire', description: 'Your Sprint moves 15% faster and inflicts Daze on surrounding foes.', requires: [] },
  { id: 'lucid-gain', gods: ['apollo'], name: 'Lucid Gain', type: 'core', slot: 'none', element: 'air', description: 'Restores 40 Magick each time one of your Casts expires.', requires: [] },
  { id: 'light-smite', gods: ['apollo'], name: 'Light Smite', type: 'core', slot: 'none', element: 'fire', description: 'Taking damage retaliates for 50 damage and Dazes nearby foes.', requires: [] },
  { id: 'perfect-image', gods: ['apollo'], name: 'Perfect Image', type: 'core', slot: 'none', element: 'air', description: 'Deal +10% damage until you take damage; the bonus returns after 15 sec unharmed.', requires: [] },
  { id: 'dazzling-display', gods: ['apollo'], name: 'Dazzling Display', type: 'core', slot: 'none', element: 'fire', description: 'Your Attacks have a +10% chance to inflict Daze.', requires: [['nova-strike']] },
  { id: 'back-burner', gods: ['apollo'], name: 'Back Burner', type: 'core', slot: 'none', element: 'fire', description: 'Strikes from behind deal +50% damage to foes afflicted with Daze.', requires: [['solar-ring', 'blinding-rush', 'dazzling-display', 'light-smite']] },
  { id: 'prominence-flare', gods: ['apollo'], name: 'Prominence Flare', type: 'core', slot: 'none', element: 'fire', description: 'After your Omega Cast expires, rapidly deal 10 damage in the area for 2 sec.', requires: [['solar-ring']] },
  { id: 'super-nova', gods: ['apollo'], name: 'Super Nova', type: 'core', slot: 'none', element: 'air', description: 'Your Casts expand in size, growing up to 40% larger until they expire.', requires: [] },
  { id: 'extra-dose', gods: ['apollo'], name: 'Extra Dose', type: 'core', slot: 'none', element: 'air', description: 'Your Attack has a +5% chance to hit two times.', requires: [['nova-strike']] },
  { id: 'self-healing', gods: ['apollo'], name: 'Self Healing', type: 'core', slot: 'none', infusion: { element: 'fire', count: 3 }, description: 'Infusion: while you hold enough Fire boons, restore 30% of damage taken, healed gradually.', requires: [] },
  { id: 'shared-wealth', gods: ['apollo'], name: 'Shared Wealth', type: 'core', slot: 'none', description: 'Grants 90 Gold; appears only when Apollo has no remaining boons to offer.', requires: [] },
]

export const APOLLO_BOONS: Boon[] = [
  ...APOLLO_CORE,
  {
    id: 'exceptional-talent',
    gods: ['apollo'],
    name: 'Exceptional Talent',
    type: 'legendary',
    slot: 'none',
    element: 'fire',
    description: 'Your Omega Attack and Omega Special fire two times, but cost +20 Magick.',
    requires: [
      [
        'nova-strike',
        'nova-flourish',
        'solar-ring',
        'blinding-rush',
        'lucid-gain',
        'extra-dose',
        'super-nova',
        'back-burner',
        'prominence-flare',
      ],
    ],
  },
]
