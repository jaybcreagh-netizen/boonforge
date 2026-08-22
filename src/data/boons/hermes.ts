import type { Boon } from '../types'

const HERMES_CORE: Boon[] = [
  { id: 'nimble-limbs', gods: ['hermes'], name: 'Nimble Limbs', type: 'core', slot: 'none', element: 'earth', description: 'Your Attack, Special, and Cast are faster (+10% strike speed).', requires: [] },
  { id: 'racing-thoughts', gods: ['hermes'], name: 'Racing Thoughts', type: 'core', slot: 'none', element: 'earth', description: 'Your Omega Moves channel faster (+15% Omega move speed).', requires: [] },
  { id: 'winners-circle', gods: ['hermes'], name: "Winner's Circle", type: 'core', slot: 'cast', element: 'earth', description: 'You channel your Omega Cast faster and your Casts expire sooner (+100% Omega Cast speed).', requires: [] },
  { id: 'nitro-boost', gods: ['hermes'], name: 'Nitro Boost', type: 'core', slot: 'sprint', element: 'fire', description: 'Your Sprint is 15% faster and grants a barrier ignoring 1 instance of damage per Encounter.', requires: [] },
  { id: 'stutter-step', gods: ['hermes'], name: 'Stutter Step', type: 'core', slot: 'sprint', element: 'earth', description: 'You can Dash more frequently (+25% dash recovery speed).', requires: [] },
  { id: 'hasty-retreat', gods: ['hermes'], name: 'Hasty Retreat', type: 'core', slot: 'none', element: 'air', description: 'Gain Dodge chance and move speed per Boon owned (+0.5% each).', requires: [] },
  { id: 'hard-target', gods: ['hermes'], name: 'Hard Target', type: 'core', slot: 'none', element: 'air', description: "Most foes' ranged shots are slower (-30% projectile speed).", requires: [] },
  { id: 'quick-buck', gods: ['hermes'], name: 'Quick Buck', type: 'core', slot: 'none', element: 'air', description: 'You find Gold in greater quantities: receive +100 Gold plus +20% bonus Gold.', requires: [] },
  { id: 'mean-streak', gods: ['hermes'], name: 'Mean Streak', type: 'core', slot: 'none', element: 'air', description: 'Each time you slay a foe, deal +1% more damage for the next 45 sec.', requires: [] },
  { id: 'travel-deal', gods: ['hermes'], name: 'Travel Deal', type: 'core', slot: 'none', element: 'fire', description: 'Your first purchase in each Location costs less Gold (-5%), and another item appears afterward.', requires: [] },
  {
    id: 'success-rate',
    gods: ['hermes'],
    name: 'Success Rate',
    type: 'core',
    slot: 'none',
    element: 'water',
    description: 'Your chance-based effects are more likely to occur (+30% odds), except Dodge or Daze.',
    requires: [
      ['sea-star', 'divine-vengeance', 'double-strike', 'dazzling-display', 'extra-dose', 'pressure-points', 'vital-sign', 'lethal-snare', 'death-warrant', 'killing-stroke', 'grisly-gain', 'visceral-impact', 'mutual-destruction', 'grievous-blow', 'profuse-bleeding', 'arterial-spray'],
    ],
  },
  { id: 'tall-order', gods: ['hermes'], name: 'Tall Order', type: 'core', slot: 'none', infusion: { element: 'any', count: 3 }, description: 'While you hold enough of any one Element, you deal +25% damage.', requires: [] },
]

export const HERMES_BOONS: Boon[] = [
  ...HERMES_CORE,
  {
    id: 'paid-dues',
    gods: ['hermes'],
    name: 'Paid Dues',
    type: 'legendary',
    slot: 'none',
    element: 'air',
    description: 'Whenever you take damage, you lose Gold before you lose Health (-3 Gold per damage point).',
    requires: [['nimble-limbs', 'racing-thoughts', 'hard-target', 'winners-circle', 'stutter-step', 'hasty-retreat', 'mean-streak', 'nitro-boost']],
  },
]
