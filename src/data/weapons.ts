import type { Weapon } from './types'

export const WEAPONS: Weapon[] = [
  {
    id: 'staff',
    name: "Witch's Staff",
    aspects: [
      { id: 'staff-melinoe', weaponId: 'staff', name: 'Aspect of Melinoë', default: true, description: 'Gain Max Magick and greater Power for your Specials.', synergy: { slots: ['special'], keywords: ['magick'] } },
      { id: 'staff-circe', weaponId: 'staff', name: 'Aspect of Circe', description: 'Your Animal Familiar casts alongside you, forming a damaging Psychic Leash.', synergy: { slots: ['cast'], keywords: ['cast'] } },
      { id: 'staff-momus', weaponId: 'staff', name: 'Aspect of Momus', description: 'Your Omega Moves fire in place up to 3 times until you use them again.', synergy: { keywords: ['omega'] } },
      { id: 'staff-anubis', weaponId: 'staff', name: 'Aspect of Anubis', hidden: true, description: 'Grants the Ankh Scepter, raising Lone Shades wherever you slay foes.' },
    ],
  },
  {
    id: 'blades',
    name: 'Sister Blades',
    aspects: [
      { id: 'blades-melinoe', weaponId: 'blades', name: 'Aspect of Melinoë', default: true, description: 'Attacks and Specials deal bonus backstab damage from behind.' },
      { id: 'blades-artemis', weaponId: 'blades', name: 'Aspect of Artemis', description: 'Channeling Omega Attack occasionally Parries, then triggers a critical Riposte.', synergy: { keywords: ['omega'] } },
      { id: 'blades-pan', weaponId: 'blades', name: 'Aspect of Pan', description: 'Specials seek foes within your Casts; longer channeling fires more shots.', synergy: { slots: ['cast', 'special'], keywords: ['cast'] } },
      { id: 'blades-the-morrigan', weaponId: 'blades', name: 'Aspect of the Morrigan', hidden: true, description: 'Grants Crow Cutters, enabling the Blood Triad ritual that strikes nearby foes.' },
    ],
  },
  {
    id: 'flames',
    name: 'Umbral Flames',
    aspects: [
      { id: 'flames-melinoe', weaponId: 'flames', name: 'Aspect of Melinoë', default: true, description: 'Your Attacks and Specials may deal Critical damage.', synergy: { keywords: ['critical'] } },
      { id: 'flames-moros', weaponId: 'flames', name: 'Aspect of Moros', description: 'Attacks linger 6 sec. and explode when struck by your Specials.', synergy: { slots: ['attack', 'special'] } },
      { id: 'flames-eos', weaponId: 'flames', name: 'Aspect of Eos', description: 'Omega Attack fires a Daybreaker that deals area damage and copies your Specials.', synergy: { slots: ['attack', 'special'], keywords: ['omega'] } },
      { id: 'flames-supay', weaponId: 'flames', name: 'Aspect of Supay', hidden: true, description: 'Grants Devil Sparks, which also enhance your Rush Boon.', synergy: { slots: ['sprint'] } },
    ],
  },
  {
    id: 'axe',
    name: 'Moonstone Axe',
    aspects: [
      { id: 'axe-melinoe', weaponId: 'axe', name: 'Aspect of Melinoë', default: true, description: 'Gain bonus Attack Power and Max Health.', synergy: { slots: ['attack'] } },
      { id: 'axe-charon', weaponId: 'axe', name: 'Aspect of Charon', description: 'Your Cast erupts like your Omega Cast when struck by your Omega Special.', synergy: { slots: ['cast', 'special'], keywords: ['omega'] } },
      { id: 'axe-thanatos', weaponId: 'axe', name: 'Aspect of Thanatos', description: 'Attack is faster; strikes grant stacking Omega-Move critical chance until damaged.', synergy: { slots: ['attack'], keywords: ['omega', 'critical'] } },
      { id: 'axe-nergal', weaponId: 'axe', name: 'Aspect of Nergal', hidden: true, description: 'Grants the Rock Lion Mace; become Berserk after striking enough foes.', synergy: { slots: ['attack'] } },
    ],
  },
  {
    id: 'skull',
    name: 'Argent Skull',
    aspects: [
      { id: 'skull-melinoe', weaponId: 'skull', name: 'Aspect of Melinoë', default: true, description: 'Attacks gain Power for each Shell fired and not yet retrieved.', synergy: { slots: ['attack'] } },
      { id: 'skull-medea', weaponId: 'skull', name: 'Aspect of Medea', description: 'Attack stays within reach, exploding after your Specials hit or 3 sec.', synergy: { slots: ['attack', 'special'] } },
      { id: 'skull-persephone', weaponId: 'skull', name: 'Aspect of Persephone', description: 'Omega Special is Sprouted and steerable; Boons start at bonus levels.', synergy: { slots: ['special'], keywords: ['omega'] } },
      { id: 'skull-hel', weaponId: 'skull', name: 'Aspect of Hel', hidden: true, description: 'Grants Frost Mane, granting the way of the Valkyrie after your Omega Special.', synergy: { slots: ['special'], keywords: ['omega'] } },
    ],
  },
  {
    id: 'coat',
    name: 'Black Coat',
    aspects: [
      { id: 'coat-melinoe', weaponId: 'coat', name: 'Aspect of Melinoë', default: true, description: 'Your Attacks, Sprint, and move speed are faster.', synergy: { slots: ['attack', 'sprint'] } },
      { id: 'coat-selene', weaponId: 'coat', name: 'Aspect of Selene', description: 'Start with Sky Fall, a hidden Hex that strikes multiple foes and applies Shine.', synergy: { keywords: ['hex'] } },
      { id: 'coat-nyx', weaponId: 'coat', name: 'Aspect of Nyx', description: 'Grants Omega Boost, letting you produce Nightspawn split-off attacks.', synergy: { keywords: ['omega'] } },
      { id: 'coat-shiva', weaponId: 'coat', name: 'Aspect of Shiva', hidden: true, description: 'Grants Purifying Grace, absorbing Omega Special blasts to grow Destructive.', synergy: { slots: ['special'], keywords: ['omega'] } },
    ],
  },
]

export const WEAPON_BY_ID: Map<string, Weapon> = new Map(WEAPONS.map((w) => [w.id, w]))

export function aspectById(id: string | null) {
  if (!id) return null
  for (const w of WEAPONS) {
    const aspect = w.aspects.find((a) => a.id === id)
    if (aspect) return aspect
  }
  return null
}
