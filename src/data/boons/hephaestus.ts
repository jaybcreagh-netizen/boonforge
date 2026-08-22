import type { Boon } from '../types'

const HEPHAESTUS_CORE: Boon[] = [
  { id: 'volcanic-strike', gods: ['hephaestus'], name: 'Volcanic Strike', type: 'core', slot: 'attack', element: 'fire', description: 'Your Attacks can cause a blast that deals 400 damage in the area.', requires: [] },
  { id: 'volcanic-flourish', gods: ['hephaestus'], name: 'Volcanic Flourish', type: 'core', slot: 'special', element: 'fire', description: 'Your Specials can cause a blast that deals 500 damage in the area.', requires: [] },
  { id: 'anvil-ring', gods: ['hephaestus'], name: 'Anvil Ring', type: 'core', slot: 'cast', element: 'earth', description: 'Your Casts deal damage 3 times in succession to foes in the binding circle.', requires: [] },
  { id: 'smithy-rush', gods: ['hephaestus'], name: 'Smithy Rush', type: 'core', slot: 'sprint', element: 'fire', description: 'If a foe is near after you Dash, cause a blast that deals 200 damage in the area.', requires: [] },
  { id: 'tough-gain', gods: ['hephaestus'], name: 'Tough Gain', type: 'core', slot: 'none', element: 'earth', description: 'Whenever you take damage, shrug some of it off and restore 150 Magick.', requires: [] },
  { id: 'grand-caldera', gods: ['hephaestus'], name: 'Grand Caldera', type: 'core', slot: 'none', element: 'fire', description: 'Your blast effects deal more damage and are 50% larger.', requires: [['volcanic-strike', 'volcanic-flourish', 'smithy-rush']] },
  { id: 'molten-touch', gods: ['hephaestus'], name: 'Molten Touch', type: 'core', slot: 'none', element: 'fire', description: 'Your Attacks and Specials deal +40% bonus damage to Armor.', requires: [] },
  { id: 'heavy-metal', gods: ['hephaestus'], name: 'Heavy Metal', type: 'core', slot: 'none', element: 'earth', description: 'Your Weapon deals damage based on 20% of your Armor, and you gain +50 Armor now.', requires: [] },
  { id: 'trusty-shield', gods: ['hephaestus'], name: 'Trusty Shield', type: 'core', slot: 'none', element: 'earth', description: 'Whenever you enter a Location, gain Armor for that Location, but Prime 30 Magick (+10 Armor).', requires: [] },
  { id: 'security-system', gods: ['hephaestus'], name: 'Security System', type: 'core', slot: 'none', element: 'earth', description: 'At the start of each Encounter, gain Armor that lasts 7 sec (75 Armor).', requires: [] },
  { id: 'uncanny-fortitude', gods: ['hephaestus'], name: 'Uncanny Fortitude', type: 'core', slot: 'none', element: 'earth', description: 'Gain bonus Max Health (+20%) based on your Magick limit.', requires: [] },
  { id: 'furnace-blast', gods: ['hephaestus'], name: 'Furnace Blast', type: 'core', slot: 'none', element: 'fire', description: 'Your blast effects also inflict Glow on foes (+15% Glow bonus damage).', requires: [['volcanic-strike', 'volcanic-flourish', 'smithy-rush']] },
  { id: 'martial-art', gods: ['hephaestus'], name: 'Martial Art', type: 'core', slot: 'none', infusion: { element: 'earth', count: 2 }, description: 'Your Attack and Special deal +5% damage for each Earth boon you have.', requires: [] },
]

export const HEPHAESTUS_BOONS: Boon[] = [
  ...HEPHAESTUS_CORE,
  {
    id: 'premium-service',
    gods: ['hephaestus'],
    name: 'Premium Service',
    type: 'legendary',
    slot: 'none',
    element: 'earth',
    description: 'Your Aspect of the Nocturnal Arms is even stronger (+1 Aspect bonus rank).',
    requires: [['volcanic-strike', 'volcanic-flourish', 'smithy-rush', 'heavy-metal', 'trusty-shield', 'grand-caldera', 'molten-touch', 'furnace-blast']],
  },
]
