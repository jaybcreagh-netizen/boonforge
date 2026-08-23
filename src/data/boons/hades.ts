import type { Boon } from '../types'

export const HADES_BOONS: Boon[] = [
  { id: 'life-tax', gods: ['hades'], name: 'Life Tax', type: 'core', slot: 'none', description: 'Restore health equal to 1% of damage you deal, up to 150 restored life total.', requires: [] },
  { id: 'howling-soul', gods: ['hades'], name: 'Howling Soul', type: 'core', slot: 'cast', description: 'Your Casts launch a homing projectile dealing 200 damage; the binding circle forms where it strikes.', requires: [] },
  { id: 'old-grudge', gods: ['hades'], name: 'Old Grudge', type: 'core', slot: 'none', description: 'In the Chronos/Typhon fight, the boss takes a burst after 3 sec, losing 20% of their life.', requires: [] },
  { id: 'deep-dissent', gods: ['hades'], name: 'Deep Dissent', type: 'core', slot: 'none', description: 'In the Chronos/Typhon fight, the boss summons 50% fewer reinforcements.', requires: [] },
  { id: 'gigaros-dash', gods: ['hades'], name: 'Gigaros Dash', type: 'core', slot: 'none', description: 'Your Dash strikes surrounding foes with a sweep dealing 50 damage and inflicting Scorn.', requires: [] },
  { id: 'last-gasp', gods: ['hades'], name: 'Last Gasp', type: 'core', slot: 'none', description: 'Deal 10% more damage for each Death Defiance you have used this night.', requires: [] },
  { id: 'cinerary-circle', gods: ['hades'], name: 'Cinerary Circle', type: 'core', slot: 'none', description: 'Whenever you use 60 Magick, summon 3 Soul Urns around you, each exploding for 200 damage.', requires: [] },
  { id: 'unseen-ire', gods: ['hades'], name: 'Unseen Ire', type: 'core', slot: 'none', description: 'After you take damage, go Dark and deal 70% more damage while Dark lasts.', requires: [] },
]
