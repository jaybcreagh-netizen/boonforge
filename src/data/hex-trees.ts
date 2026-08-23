export interface HexNode {
  name: string
  effect: string
  tier: 'regular' | 'bright' | 'sublime' | 'duo'
}

export interface HexTree {
  nodes: HexNode[]
  godsentNode?: string
  notes?: string
}

function tierOf(effect: string): HexNode['tier'] {
  if (effect.startsWith('Duo/Godsent:')) return 'duo'
  if (effect.startsWith('Sublime:')) return 'sublime'
  if (effect.startsWith('Bright:')) return 'bright'
  return 'regular'
}

const raw: Record<string, Array<[string, string]>> = {
  'phase-shift': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Preparation', 'On entering a Location, Hex starts 40% charged; can appear twice per layout.'],
    ['Steadfastness', 'After using your Hex, take -2% damage this Encounter (does not stack).'],
    ['Patience', 'Hex lasts +0.5 sec.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Accumulation', 'Bright: During Hex, gain +1% damage per foe slain until you use it again.'],
    ['Purification', 'Bright: Each use instantly destroys most foes ranged shots.'],
    ['Contingency', 'Bright: Death Defiance effects fully recharge the Hex if not ready.'],
    ['Alacrity', 'Bright: During Hex, move and strike 30% faster.'],
    ['Precision', 'Sublime: +10% Critical chance during Hex; Magick cost +50.'],
    ['Stillness', 'Sublime: Everything else moves 75% slower; Magick cost +30.'],
    ['Squall of Demeter', 'Duo/Godsent: All foes take +20 damage every 0.2 sec during the effect.'],
  ],
  'twilight-curse': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Purpose', 'After use, +5% damage this Encounter (does not stack).'],
    ['Exposure', '+10% damage to Morph-afflicted foes.'],
    ['Humility', 'Hex lasts +2 sec.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Ambition', 'Bright: Hex deals +625 damage to Guardians.'],
    ['Extinction', 'Bright: Slain Morph-afflicted foes blast nearby foes for 300 damage.'],
    ['Decline', 'Bright: Hex deals +120 damage.'],
    ['Spread', 'Bright: Projectile bounces toward up to +10 foes.'],
    ['Orchestration', 'Bright: Casts pull Morph-afflicted foes into the binding circle.'],
    ['Infection', 'Sublime: Hex also inflicts every status Curse available from your other abilities; Magick cost +20.'],
    ['Sustenance', 'Sublime: 30% chance per Location to turn 1 cursed foe into a healing item; Magick cost +20.'],
    ['Temper of Zeus', 'Duo/Godsent: Lightning bolts repeatedly deal 80 damage near the projectile.'],
  ],
  'lunar-ray': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Purpose', 'After use, +5% damage this Encounter (does not stack).'],
    ['Intensity', 'Hex gains +40 Power over every 1 sec of firing.'],
    ['Bearing', 'Each use grants +10 Armor lasting for the effect duration.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Dispersion', 'Bright: Beam deals area damage at its end point.'],
    ['Obstinance', 'Bright: Beam fires for up to +1 sec.'],
    ['Contact', 'Bright: First damaging hit of each use has +500 Power.'],
    ['Exodus', 'Bright: Beam pierces through foes.'],
    ['Overflow', 'Bright: Deals 50 damage every 0.2 sec in an area around you.'],
    ['Prominence', 'Sublime: Hex continually aims and fires on its own; Magick cost +60.'],
    ['Trinity', 'Sublime: Fires 3 beams in a fan pattern; Magick cost +90.'],
    ['Shine of Apollo', 'Duo/Godsent: Fire a bigger solar-infused ray with +500 Power.'],
  ],
  'wolf-howl': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Hunger', 'Hex deals +20% damage to Armor.'],
    ['Urgency', 'After use, move 5% faster this Encounter (does not stack).'],
    ['Instinct', 'Hex has +50 Power.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Vicinity', 'Bright: Impact area 50% larger.'],
    ['Lethality', 'Bright: Next Attack/Special hit after use deals Critical damage.'],
    ['Duality', 'Bright: Also deals damage before you rise up.'],
    ['Frenzy', 'Bright: Applies your Rush Boon effect to up to 5 foes.'],
    ['Tenacity', 'Sublime: Gain +20 Armor for 3 sec after use; Magick cost +30.'],
    ['Brutality', 'Sublime: Use the Hex 1 more time within 3 sec; Magick cost +15.'],
    ['Hand of Hephaestus', 'Duo/Godsent: Blast deals 800 damage where you land.'],
  ],
  'moon-water': [
    ['Fortune', 'Gain +15 gold whenever you use the Hex.'],
    ['Vigor', 'Hex heals +10 HP per use.'],
    ['Purity', 'Hex restores +50 Magick per use.'],
    ['Abundance', '+1 Hex use before requiring a Fountain.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Zeal', 'Bright: Deal +50% damage for 5 sec after use.'],
    ['Panacea', 'Bright: Also restores HP lost during the last 2 sec.'],
    ['Conservation', 'Bright: Fountains grant +3 Hex uses, even with uses remaining.'],
    ['Radiance', 'Bright: Makes you Impervious for 1 sec.'],
    ['Clarity', 'Sublime: Next Omega Move rapidly restores Magick for 5 sec; Magick cost +20.'],
    ['Tribulation', 'Sublime: Also triggers after-you-take-damage Boon effects; Magick cost +20.'],
    ['Saturation', 'Sublime: Also fires your Omega Cast with guaranteed Critical; Magick cost +20.'],
    ['Pride of Poseidon', 'Duo/Godsent: For 10 sec, restore 4 HP and 50 Magick every 1 sec.'],
  ],
  'night-bloom': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Purpose', 'After use, +5% damage this Encounter (does not stack).'],
    ['Preparation', 'On entering a Location, Hex starts 40% charged; can appear twice per layout.'],
    ['Devotion', 'Raised servants deal +10% damage.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Servitude', 'Bright: Servants fight indefinitely within that Location instead of expiring.'],
    ['Retaliation', 'Bright: Servants gain after-you-take-damage effects from your Boons.'],
    ['Rigor', 'Bright: Servants move and attack 60% faster.'],
    ['Confluence', 'Bright: Casts summon servants inside the binding circle.'],
    ['Selflessness', 'Sublime: Servants take 20% of damage meant for you; Magick cost +30.'],
    ['Eruption', 'Sublime: Servants deal +500 damage on their first hit; Magick cost +10.'],
    ['Nurture of Hera', 'Duo/Godsent: Servant is 25% faster with +30% Critical chance.'],
  ],
  'total-eclipse': [
    ['Purpose', 'After use, +5% damage this Encounter (does not stack).'],
    ['Preparation', 'On entering a Location, Hex starts 40% charged; can appear twice per layout.'],
    ['Magnitude', 'Hex has +100 Power.'],
    ['Vastness', 'Blast area 20% larger.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Consequence', 'Bright: Hitting a Guardian charges your next Hex by 30 Magick.'],
    ['Fragmentation', 'Bright: Adds 3 smaller blasts (100 damage each) after 0.5 sec.'],
    ['Numbness', 'Bright: Foes in the area move 80% slower afterward.'],
    ['Softness', 'Bright: Foes in the area take +30% damage afterward.'],
    ['Devastation', 'Sublime: Second moon blast lands 2 sec later; Magick cost +50.'],
    ['Excess', 'Sublime: Spawns your Omega Cast right after the blast; Magick cost +20.'],
    ['Eminence', 'Sublime: Gain +50 Armor from use until the blast; Magick cost +50.'],
    ['Heart of Hestia', 'Duo/Godsent: Rapidly inflict Scorch on all foes until the blast.'],
  ],
  'dark-side': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Tension', 'After use, +1% Dodge chance this Encounter (does not stack).'],
    ['Bloodthirst', '+20% damage during the Hex.'],
    ['Focus', 'Transformation lasts +0.5 sec.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Savagery', 'Bright: Attack is 25% faster while transformed.'],
    ['Dominion', 'Bright: Cast deals +30% damage while transformed (Omega Cast too).'],
    ['Contingency', 'Bright: Death Defiance effects fully recharge the Hex if not ready.'],
    ['Splendor', 'Bright: Special gains your Special Boon bonuses while transformed.'],
    ['Sanctity', 'Sublime: Cast acts as a fully channeled Omega Cast; Magick cost +10.'],
    ['Resonance', 'Sublime: Attack gains your Attack Boon bonuses; Magick cost +20.'],
    ['Horror', 'Sublime: Special deals Critical damage to distant foes; Magick cost +20.'],
    ['Allure of Aphrodite', 'Duo/Godsent: Continually create Heartthrobs dealing 80 damage.'],
  ],
  'sky-fall': [
    ['Growth', 'Hex also auto-charges as though you spent 1 Magick every 1 sec.'],
    ['Brilliance', 'Hex deals damage +1 additional time in succession.'],
    ['Sting', 'Hex has +10 Power.'],
    ['Omen', 'Shine-afflicted foes take +5% damage from Omega Moves.'],
    ['Lineage', 'Hex can be Godsent +1 time when used in Guardian Encounters.'],
    ['Ferocity', 'Bright: +50 damage each time it keeps hitting the same foe.'],
    ['Calm', 'Bright: Take -20% damage during the Hex (base version only).'],
    ['Ambition', 'Bright: Hex deals +30% damage to Guardians.'],
    ['Cascade', 'Sublime: Omega Moves strike a random nearby foe with the Hex effect; Magick cost +30.'],
    ['Prism', 'Sublime: Strikes +2 foes each time (base version only); Magick cost +30.'],
    ['Lance of Ares', 'Duo/Godsent: Every hit inflicts Wounds.'],
  ],
}

const notes: Record<string, string> = {
  'phase-shift': 'Godsent requires any Demeter boon or Barley Sheaf keepsake.',
  'twilight-curse': 'Godsent requires any Zeus boon or Cloud Bangle keepsake.',
  'lunar-ray': 'Godsent requires any Apollo boon or Harmonic Photon keepsake.',
  'wolf-howl': 'Godsent requires any Hephaestus boon or Adamant Shard keepsake.',
  'moon-water': 'Godsent requires any Poseidon boon or Vivid Sea keepsake.',
  'night-bloom': 'Godsent requires any Hera boon or Iridescent Fan keepsake.',
  'total-eclipse': 'Godsent requires any Hestia boon or Everlasting Ember keepsake.',
  'dark-side': 'Godsent requires any Aphrodite boon or Beautiful Mirror keepsake.',
  'sky-fall': 'Godsent requires any Ares boon or Sword Hilt keepsake. Exclusive to Black Coat Aspect of Selene.',
}

export const HEX_TREES: Record<string, HexTree> = Object.fromEntries(
  Object.entries(raw).map(([hexId, list]) => [
    hexId,
    {
      nodes: list.map(([name, effect]) => ({ name, effect, tier: tierOf(effect) })),
      godsentNode: list.find(([, effect]) => effect.startsWith('Duo/Godsent:'))?.[0],
      notes: notes[hexId],
    },
  ]),
)
