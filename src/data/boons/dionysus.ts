import type { Boon } from '../types'

export const DIONYSUS_BOONS: Boon[] = [
  { id: 'tipsy-shot', gods: ['dionysus'], name: 'Tipsy Shot', type: 'core', slot: 'cast', element: 'water', description: 'Hold Cast to lob a large explosion; the binding circle forms at the blast location.', requires: [] },
  { id: 'worry-free', gods: ['dionysus'], name: 'Worry Free', type: 'core', slot: 'none', element: 'water', description: 'Gain a random amount of Max Life; your exact health total becomes a mystery.', requires: [] },
  { id: 'drunken-stupor', gods: ['dionysus'], name: 'Drunken Stupor', type: 'core', slot: 'none', element: 'water', description: 'Your Omega Moves inflict Hangover damage-over-time the first time they strike each foe.', requires: [] },
  { id: 'bounce-back', gods: ['dionysus'], name: 'Bounce Back', type: 'core', slot: 'none', element: 'water', description: 'After each Encounter, restore some health if you took any damage during it.', requires: [] },
  { id: 'bottomless-drink', gods: ['dionysus'], name: 'Bottomless Drink', type: 'core', slot: 'none', element: 'water', description: 'In each Encounter, Grape Juice appears in the area and grants Power when used.', requires: [] },
  { id: 'happy-haze', gods: ['dionysus'], name: 'Happy Haze', type: 'core', slot: 'none', element: 'water', description: 'Every 8 sec per Encounter, Festive Fog appears that strengthens you while inside it.', requires: [] },
  { id: 'personal-loan', gods: ['dionysus'], name: 'Personal Loan', type: 'core', slot: 'none', element: 'water', description: 'Give up all your Gold now; after the next Guardian, gain that much and more.', requires: [] },
  { id: 'reckless-abandon', gods: ['dionysus'], name: 'Reckless Abandon', type: 'core', slot: 'none', element: 'water', description: 'Your Attacks randomly deal exactly 5, 55, or 555 damage on each hit.', requires: [] },
]
