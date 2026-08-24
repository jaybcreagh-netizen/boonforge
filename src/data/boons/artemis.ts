import type { Boon } from '../types'

export const ARTEMIS_BOONS: Boon[] = [
  { id: 'support-fire', augments: 'any', gods: ['artemis'], name: 'Support Fire', type: 'core', slot: 'none', element: 'air', description: 'After you hit with your Attacks or Specials, fire a seeking arrow dealing 10 damage.', requires: [] },
  { id: 'pressure-points', gods: ['artemis'], name: 'Pressure Points', type: 'core', slot: 'none', element: 'earth', description: 'Any damage you deal may be Critical (+3% critical chance).', requires: [] },
  { id: 'shadow-pounce', gods: ['artemis'], name: 'Shadow Pounce', type: 'core', slot: 'none', element: 'air', description: 'After you Dash, your Omega Moves may deal Critical damage for 2 sec (+8% chance).', requires: [] },
  { id: 'vital-sign', gods: ['artemis'], name: 'Vital Sign', type: 'core', slot: 'none', element: 'earth', description: 'Foes with at least 80% Health or Armor may take Critical damage (+15% chance).', requires: [] },
  { id: 'lethal-snare', gods: ['artemis'], name: 'Lethal Snare', type: 'core', slot: 'none', element: 'earth', description: 'Foes in your Casts may take Critical damage from your Attacks (+10% chance).', requires: [] },
  { id: 'easy-shot', augments: 'cast', gods: ['artemis'], name: 'Easy Shot', type: 'core', slot: 'none', element: 'air', description: 'A piercing arrow dealing 50 damage fires toward any foe damaged by your Omega Cast.', requires: [] },
  { id: 'death-warrant', gods: ['artemis'], name: 'Death Warrant', type: 'core', slot: 'none', element: 'earth', description: 'Every 20 sec a random foe becomes Marked (+30% chance they take critical damage).', requires: [] },
  { id: 'killing-stroke', gods: ['artemis'], name: 'Killing Stroke', type: 'core', slot: 'none', element: 'air', description: 'Your Specials may deal Critical damage (+10% chance), but you Prime 40 Magick.', requires: [] },
  { id: 'whispered-prayer', gods: ['artemis'], name: 'Whispered Prayer', type: 'core', slot: 'none', element: 'air', description: 'Your Hex may deal Critical damage (+30% chance); requires deepened bond with Artemis and an offensive Hex.', requires: [] },
]
