import type { Boon } from '../types'

const HESTIA_CORE: Boon[] = [
  { id: 'flame-strike', gods: ['hestia'], name: 'Flame Strike', type: 'core', slot: 'attack', element: 'fire', description: 'Your Attacks inflict Scorch (30 damage); afflicted foes take accrued Scorch damage every 1 sec.', requires: [] },
  { id: 'flame-flourish', gods: ['hestia'], name: 'Flame Flourish', type: 'core', slot: 'special', element: 'fire', description: 'Your Specials inflict Scorch (35 damage).', requires: [] },
  { id: 'smolder-ring', gods: ['hestia'], name: 'Smolder Ring', type: 'core', slot: 'cast', element: 'fire', description: 'Your Casts repeatedly inflict Scorch (40 damage per sec) on foes in the binding circle.', requires: [] },
  { id: 'heat-rush', gods: ['hestia'], name: 'Heat Rush', type: 'core', slot: 'sprint', element: 'fire', description: 'Your Sprint leaves a cinder trail dealing 10 damage every 0.25 sec; burning damage to you is reduced to 1.', requires: [] },
  { id: 'cardio-gain', gods: ['hestia'], name: 'Cardio Gain', type: 'core', slot: 'none', element: 'fire', description: 'Whenever your Attack or Special deals damage, restore 4 Magick per strike.', requires: [] },
  { id: 'highly-flammable', gods: ['hestia'], name: 'Highly Flammable', type: 'core', slot: 'none', element: 'fire', description: 'The first time you inflict Scorch on a foe, inflict +80 extra Scorch damage.', requires: [['flame-strike', 'flame-flourish', 'smolder-ring']] },
  { id: 'glowing-coal', gods: ['hestia'], name: 'Glowing Coal', type: 'core', slot: 'cast', element: 'fire', description: 'Hold Cast to aim a fireball exploding for 60 blast damage; the binding circle forms there.', requires: [] },
  { id: 'controlled-burn', gods: ['hestia'], name: 'Controlled Burn', type: 'core', slot: 'none', element: 'fire', description: 'Your Omega Special also launches a fireball dealing 100 blast damage, costing +10 Magick.', requires: [] },
  { id: 'flash-fry', gods: ['hestia'], name: 'Flash Fry', type: 'core', slot: 'none', element: 'fire', description: 'Your foes perish in a blast dealing 60 damage to surrounding foes.', requires: [] },
  { id: 'hot-pot', gods: ['hestia'], name: 'Hot Pot', type: 'core', slot: 'none', element: 'fire', description: 'Gain +4% Dodge chance, doubled against Scorch-afflicted foes.', requires: [['flame-strike', 'flame-flourish', 'smolder-ring']] },
  { id: 'pyro-technique', gods: ['hestia'], name: 'Pyro Technique', type: 'core', slot: 'none', element: 'fire', description: 'Your Scorch effects deal damage 50% faster.', requires: [['flame-strike', 'flame-flourish', 'smolder-ring']] },
  { id: 'snuffed-candle', gods: ['hestia'], name: 'Snuffed Candle', type: 'core', slot: 'none', element: 'fire', description: 'You deal +15% damage to foes that are nowhere near other foes.', requires: [] },
  { id: 'slow-cooker', gods: ['hestia'], name: 'Slow Cooker', type: 'core', slot: 'none', infusion: { element: 'fire', count: 2 }, description: 'Your Attacks and Specials gain +2 Power per Fire boon you have.', requires: [] },
]

export const HESTIA_BOONS: Boon[] = [
  ...HESTIA_CORE,
  {
    id: 'fire-away',
    gods: ['hestia'],
    name: 'Fire Away',
    type: 'legendary',
    slot: 'none',
    element: 'fire',
    description: "Your Casts destroy many foes' ranged shots and inflict 400 Scorch on the attacking foes.",
    requires: [['smolder-ring', 'flame-strike', 'flame-flourish', 'flash-fry', 'hot-pot', 'pyro-technique', 'highly-flammable', 'glowing-coal', 'controlled-burn']],
  },
]
