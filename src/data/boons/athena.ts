import type { Boon } from '../types'

export const ATHENA_BOONS: Boon[] = [
  { id: 'divine-dash', gods: ['athena'], name: 'Divine Dash', type: 'core', slot: 'sprint', element: 'fire', description: 'Your Dash deals 10 damage to foes in your path and can momentarily grant you Deflect.', requires: [] },
  { id: 'phalanx-shot', gods: ['athena'], name: 'Phalanx Shot', type: 'core', slot: 'special', element: 'fire', description: 'Your Specials also launch a Deflecting projectile ahead, dealing 10 damage, rearming after 2 sec.', requires: [] },
  { id: 'mental-block', gods: ['athena'], name: 'Mental Block', type: 'core', slot: 'cast', element: 'fire', description: 'Your Casts also deal a burst of 40 damage in the area and momentarily make you Deflect.', requires: [] },
  { id: 'defensive-posture', gods: ['athena'], name: 'Defensive Posture', type: 'core', slot: 'none', element: 'fire', description: 'After you take damage, become Impervious for 2 sec, recharging every 13 sec.', requires: [] },
  { id: 'stalwart-stand', gods: ['athena'], name: 'Stalwart Stand', type: 'core', slot: 'none', element: 'fire', description: 'Gain +1 Death Defiance that replenishes in each Location, but Prime 150 Magick.', requires: [] },
  { id: 'renewed-faith', gods: ['athena'], name: 'Renewed Faith', type: 'core', slot: 'none', element: 'fire', description: 'Replenish all spent Death Defiance now and improve their potency (+10% life restored when used).', requires: [] },
  { id: 'righteous-pike', gods: ['athena'], name: 'Righteous Pike', type: 'core', slot: 'none', element: 'fire', description: 'Whenever you spend 90 Magick, up to 3 foes are struck by spears from heaven, dealing 150 damage.', requires: [] },
  { id: 'task-force', gods: ['athena'], name: 'Task Force', type: 'core', slot: 'none', description: 'If your Hex is Godsent, that effect may activate +1 additional time in each Location.', requires: [] },
]
