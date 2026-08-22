import type { Boon } from '../types'

const APHRODITE_CORE: Boon[] = [
  { id: 'flutter-strike', gods: ['aphrodite'], name: 'Flutter Strike', type: 'core', slot: 'attack', element: 'water', description: 'Your Attacks deal +80% Close-Up damage to nearby foes.', requires: [] },
  { id: 'flutter-flourish', gods: ['aphrodite'], name: 'Flutter Flourish', type: 'core', slot: 'special', element: 'water', description: 'Your Specials deal +100% Close-Up damage to nearby foes.', requires: [] },
  { id: 'rapture-ring', gods: ['aphrodite'], name: 'Rapture Ring', type: 'core', slot: 'cast', element: 'air', description: 'Your Casts inflict Weak and deal 10 damage every 0.85 sec, dragging foes toward the center.', requires: [] },
  { id: 'passion-rush', gods: ['aphrodite'], name: 'Passion Rush', type: 'core', slot: 'sprint', element: 'air', description: 'Rushing deals 20 blast damage to surrounding foes and inflicts Weak, repeating once when you stop.', requires: [] },
  { id: 'glamour-gain', gods: ['aphrodite'], name: 'Glamour Gain', type: 'core', slot: 'none', element: 'air', description: 'You automatically inflict Weak on nearby foes and gradually restore 6 Magick per sec near them.', requires: [] },
  { id: 'shameless-attitude', gods: ['aphrodite'], name: 'Shameless Attitude', type: 'core', slot: 'none', element: 'air', description: 'You deal +5% damage; while you have at least 80% Health, the bonus is doubled.', requires: [] },
  { id: 'spiritual-affirmation', gods: ['aphrodite'], name: 'Spiritual Affirmation', type: 'core', slot: 'none', element: 'air', description: 'Gain +15% Max Health and Max Magick this night; cannot be upgraded with Poms.', requires: [] },
  { id: 'healthy-rebound', gods: ['aphrodite'], name: 'Healthy Rebound', type: 'core', slot: 'none', element: 'water', description: "Whenever you exit a Location, restore 100% Health if you haven't lost too much.", requires: [['shameless-attitude']] },
  { id: 'broken-resolve', gods: ['aphrodite'], name: 'Broken Resolve', type: 'core', slot: 'none', element: 'water', description: 'Your Weak effects are more potent (+10% damage reduction beyond base).', requires: [['rapture-ring', 'passion-rush', 'glamour-gain']] },
  { id: 'sweet-surrender', gods: ['aphrodite'], name: 'Sweet Surrender', type: 'core', slot: 'none', element: 'water', description: 'Weak-afflicted foes take +10% more damage.', requires: [['rapture-ring', 'passion-rush', 'glamour-gain']] },
  { id: 'heart-breaker', gods: ['aphrodite'], name: 'Heart Breaker', type: 'core', slot: 'none', element: 'water', description: 'Whenever you spend 40 Magick, create a Heartthrob dealing 80 area damage (max 6).', requires: [] },
  { id: 'secret-crush', gods: ['aphrodite'], name: 'Secret Crush', type: 'core', slot: 'none', element: 'air', description: 'Your Attacks gain +5 Power, but you Prime 20 Magick; cannot be upgraded with Poms.', requires: [] },
  { id: 'wispy-wiles', gods: ['aphrodite'], name: 'Wispy Wiles', type: 'core', slot: 'none', infusion: { element: 'air', count: 2 }, description: 'Gain a chance to Dodge (+2%) for each Air boon you have.', requires: [] },
]

export const APHRODITE_BOONS: Boon[] = [
  ...APHRODITE_CORE,
  {
    id: 'nervous-wreck',
    gods: ['aphrodite'],
    name: 'Nervous Wreck',
    type: 'legendary',
    slot: 'none',
    element: 'air',
    description: 'Whenever you inflict Weak, also randomly inflict 3 status curses drawn from other Olympians.',
    requires: [['broken-resolve', 'sweet-surrender', 'shameless-attitude', 'secret-crush', 'rapture-ring', 'passion-rush', 'glamour-gain', 'flutter-strike', 'flutter-flourish']],
  },
]
