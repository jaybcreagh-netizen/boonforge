import type { Hex } from './types'

export const HEXES: Hex[] = [
  { id: 'phase-shift', name: 'Phase Shift', effect: 'Everything else moves 50% slower for 4 sec while you move normally.', godsent: 'Squall of Demeter: foes take +20 damage every 0.2 sec during the effect.' },
  { id: 'twilight-curse', name: 'Twilight Curse', effect: 'Launch a seeking projectile that inflicts Morph on up to 5 susceptible foes.', godsent: 'Temper of Zeus: lightning bolts repeatedly deal 80 damage near your shot.' },
  { id: 'lunar-ray', name: 'Lunar Ray', effect: 'Fire an aimable beam dealing up to 800 damage over 2 sec.', godsent: 'Shine of Apollo: bigger solar-infused ray with +500 Power.' },
  { id: 'wolf-howl', name: 'Wolf Howl', effect: 'Rise up, then crash down on the target area for 200 damage.', godsent: 'Hand of Hephaestus: the landing blast deals 800 damage.' },
  { id: 'moon-water', name: 'Moon Water', effect: 'Restore 15 health up to 3 times; uses reset whenever you drink from Fountains.', godsent: 'Pride of Poseidon: for 10 sec, restore 4 HP and 50 Magick every 1 sec.' },
  { id: 'night-bloom', name: 'Night Bloom', effect: 'Raise the last susceptible foe slain this Encounter to fight for you for 12 sec.', godsent: 'Nurture of Hera: servant is 25% faster with +30% Critical chance.' },
  { id: 'total-eclipse', name: 'Total Eclipse', effect: 'Blast a large target area for 1000 damage after a 4-sec delay.', godsent: 'Heart of Hestia: rapidly inflict max-stack Scorch on all foes until it lands.' },
  { id: 'dark-side', name: 'Dark Side', effect: 'Transform into an Impervious nightmare form with her own attacks for 5 sec.', godsent: 'Allure of Aphrodite: continually create Heartthrobs dealing 80 damage.' },
  {
    id: 'sky-fall',
    name: 'Sky Fall',
    effect: 'Inflict Shine and deal 50 damage to a random surrounding foe, 8 times.',
    note: 'Exclusive to Black Coat — Aspect of Selene.',
    godsent: 'Lance of Ares: each hit also inflicts Wounds.',
  },
]

export const HEX_BY_ID: Map<string, Hex> = new Map(HEXES.map((h) => [h.id, h]))
