import type { ArcanaCard } from './types'

export const MAX_GRASP = 30

export const ARCANA_CARDS: ArcanaCard[] = [
  { id: 'the-sorceress', numeral: 'I', name: 'The Sorceress', effect: 'Your Omega Moves are 20-35% faster.', grasp: 1 },
  { id: 'the-wayward-son', numeral: 'II', name: 'The Wayward Son', effect: 'Restore 3-6 Health after exiting each Location.', grasp: 1 },
  { id: 'the-huntress', numeral: 'III', name: 'The Huntress', effect: 'Attack and Special deal +30-60% damage while Magick is below 100%.', grasp: 2 },
  { id: 'eternity', numeral: 'IV', name: 'Eternity', effect: 'Everything moves slower for 0.8-1.5 sec while you channel Omega Moves.', grasp: 3 },
  { id: 'the-moon', numeral: 'V', name: 'The Moon', effect: 'Your Hex auto-charges each second as if you spent Magick.', grasp: 0 },
  { id: 'the-furies', numeral: 'VI', name: 'The Furies', effect: 'Deal +20-35% damage to foes inside your Casts.', grasp: 2 },
  { id: 'persistence', numeral: 'VII', name: 'Persistence', effect: 'Gain +20-50 Max Health and +20-50 Max Magick.', grasp: 2 },
  { id: 'the-messenger', numeral: 'VIII', name: 'The Messenger', effect: 'Casts briefly make you Impervious and move 50-80% faster.', grasp: 1 },
  { id: 'the-unseen', numeral: 'IX', name: 'The Unseen', effect: 'Restore 6-12 Magick every 1 sec.', grasp: 5 },
  { id: 'night', numeral: 'X', name: 'Night', effect: '+9-18% Critical chance per different Omega Move in an Omega Combo.', grasp: 2 },
  { id: 'the-swift-runner', numeral: 'XI', name: 'The Swift Runner', effect: 'Sprint is 5-13% faster and passes through most dangers.', grasp: 1 },
  { id: 'death', numeral: 'XII', name: 'Death', effect: 'Gain +1-4 Death Defiance.', grasp: 4 },
  { id: 'the-centaur', numeral: 'XIII', name: 'The Centaur', effect: 'Gain +3-6 Health and Magick every 5 Locations visited.', grasp: 0 },
  { id: 'origination', numeral: 'XIV', name: 'Origination', effect: 'Deal +25-63% damage to foes afflicted with curses from two different Olympians.', grasp: 5 },
  { id: 'the-lovers', numeral: 'XV', name: 'The Lovers', effect: 'Take 0 damage from the first 1-4 hits in Guardian Encounters.', grasp: 3 },
  { id: 'the-enchantress', numeral: 'XVI', name: 'The Enchantress', effect: '+1-4 Change of Fate; lets you alter Location Rewards.', grasp: 3 },
  { id: 'the-boatman', numeral: 'XVII', name: 'The Boatman', effect: 'Gain +200-350 Gold.', grasp: 5 },
  { id: 'the-artificer', numeral: 'XVIII', name: 'The Artificer', effect: 'Turn 1-4 Minor Finds into random Major Finds per night.', grasp: 3 },
  { id: 'excellence', numeral: 'XIX', name: 'Excellence', effect: 'Boons have +30-60% chance to be Rare or better, including Legendary.', grasp: 5 },
  { id: 'the-queen', numeral: 'XX', name: 'The Queen', effect: 'Boons have +6-12% chance to include Duo blessings.', grasp: 0 },
  { id: 'the-fates', numeral: 'XXI', name: 'The Fates', effect: 'Gain +2-5 Change of Fate.', grasp: 0 },
  { id: 'the-champions', numeral: 'XXII', name: 'The Champions', effect: '+1-4 Change of Fate; lets you alter Boons and certain choices.', grasp: 4 },
  { id: 'strength', numeral: 'XXIII', name: 'Strength', effect: 'With no Death Defiance: take -30-45% damage and deal +20%.', grasp: 4 },
  { id: 'divinity', numeral: 'XXIV', name: 'Divinity', effect: 'Boons have +10-25% chance to include Epic blessings.', grasp: 0 },
  { id: 'judgement', numeral: 'XXV', name: 'Judgement', effect: 'Activate 3-6 random inactive Arcana Cards whenever you vanquish a Guardian.', grasp: 0 },
]

export const BOON_ODDS_CARD_IDS = new Set(['excellence', 'the-queen', 'divinity', 'origination'])

export const ARCANA_BY_ID: Map<string, ArcanaCard> = new Map(ARCANA_CARDS.map((c) => [c.id, c]))
