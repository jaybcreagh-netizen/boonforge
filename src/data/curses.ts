import type { ChaosCurse } from './types'

const BECOMES_BLESSING = 'Becomes a permanent random Blessing once the curse expires.'

export const CURSES: ChaosCurse[] = [
  { id: 'paupers', name: "Pauper's Curse", bane: `Cannot earn Gold for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'atrophic', name: 'Atrophic Curse', bane: `Lose 20/29 Max Health for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'enshrouded', name: 'Enshrouded Curse', bane: `Location Reward previews hidden for 4/6 Encounters. ${BECOMES_BLESSING}` },
  { id: 'excruciating', name: 'Excruciating Curse', bane: `Take +20%/+50% damage for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'maimed', name: 'Maimed Curse', bane: `Attacks deal 3/6 self-damage for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'flayed', name: 'Flayed Curse', bane: `Specials deal 3/6 self-damage for 4/6 Encounters. ${BECOMES_BLESSING}` },
  { id: 'caustic', name: 'Caustic Curse', bane: `Slain foes hurl an Inferno-Bomb at you for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'slothful', name: 'Slothful Curse', bane: `Move and Sprint 40%/60% slower for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'gagged', name: 'Gagged Curse', bane: `Omega Moves deal 5/8 self-damage for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'ordinary', name: 'Ordinary Curse', bane: `Next 2/3 Boons limited to Common rarity. ${BECOMES_BLESSING}` },
  { id: 'addled', name: 'Addled Curse', bane: `Casts deal 3/6 self-damage for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'neurotic', name: 'Neurotic Curse', bane: `Each Dash spends 10/20 Magick for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'fixated', name: 'Fixated Curse', bane: `Every Magick use Primes that Magick until expiry (3/5 Encounters). ${BECOMES_BLESSING}` },
  { id: 'rejected', name: 'Rejected Curse', bane: `Next 2/4 Boon offers have one fewer choice. ${BECOMES_BLESSING}` },
  { id: 'paralyzing', name: 'Paralyzing Curse', bane: `Taking damage stuns you 0.5/1.4 sec for 3/5 Encounters. ${BECOMES_BLESSING}` },
  { id: 'doomed', name: 'Doomed Curse', bane: `Encounter not cleared within 120 sec deals 500 damage (2/3 Encounters). ${BECOMES_BLESSING}` },
  { id: 'barren', name: 'Barren Curse', bane: `All Arcana Cards have no effect for 3/6 Encounters. ${BECOMES_BLESSING} Requires owning another Chaos boon.` },
]
