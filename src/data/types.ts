export const ELEMENTS = ['air', 'water', 'earth', 'fire'] as const
export type Element = (typeof ELEMENTS)[number]

export const BOON_SLOTS = ['attack', 'special', 'cast', 'sprint'] as const
export type BoonSlot = (typeof BOON_SLOTS)[number]

export type BoonType = 'core' | 'duo' | 'legendary'

export type GodId =
  | 'zeus'
  | 'poseidon'
  | 'athena'
  | 'aphrodite'
  | 'ares'
  | 'demeter'
  | 'hephaestus'
  | 'hera'
  | 'hestia'
  | 'apollo'
  | 'artemis'
  | 'hermes'

export const SEEDED_GOD_IDS: GodId[] = [
  'zeus',
  'hera',
  'poseidon',
  'aphrodite',
  'ares',
  'demeter',
  'hephaestus',
  'hestia',
  'apollo',
  'artemis',
  'athena',
  'hermes',
]

export interface Infusion {
  element: Element | 'any'
  count: number
}

export interface Boon {
  id: string
  gods: GodId[]
  name: string
  type: BoonType
  slot: BoonSlot | 'none'
  element?: Element
  infusion?: Infusion
  description: string
  requires: string[][]
}

export interface GodInfo {
  id: GodId
  name: string
  title: string
  color: string
}

export const WEAPON_IDS = ['staff', 'blades', 'flames', 'skull', 'coat', 'axe'] as const
export type WeaponId = (typeof WEAPON_IDS)[number]

export interface Aspect {
  id: string
  weaponId: WeaponId
  name: string
  description: string
  default?: boolean
  hidden?: boolean
  synergy?: { slots?: BoonSlot[]; keywords?: string[] }
}

export interface Weapon {
  id: WeaponId
  name: string
  aspects: Aspect[]
}

export interface ArcanaCard {
  id: string
  numeral: string
  name: string
  effect: string
  grasp: number
}

export interface Keepsake {
  id: string
  god: GodId
  name: string
  donor: string
  description: string
}

export interface Hex {
  id: string
  name: string
  effect: string
  godsent?: string
  note?: string
}

export interface ChaosCurse {
  id: string
  name: string
  bane: string
}

export interface BuildState {
  weaponId: WeaponId | null
  aspectId: string | null
  picked: string[]
  keepsakes: string[]
  hexId: string | null
}

export const MAX_KEEPSAKES = 2

export const EMPTY_BUILD: BuildState = {
  weaponId: null,
  aspectId: null,
  picked: [],
  keepsakes: [],
  hexId: null,
}
