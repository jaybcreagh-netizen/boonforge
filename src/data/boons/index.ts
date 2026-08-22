import { APHRODITE_BOONS } from './aphrodite'
import { APOLLO_BOONS } from './apollo'
import { ARES_BOONS } from './ares'
import { ARTEMIS_BOONS } from './artemis'
import { ATHENA_BOONS } from './athena'
import { DEMETER_BOONS } from './demeter'
import { DUO_BOONS } from './duos'
import { HEPHAESTUS_BOONS } from './hephaestus'
import { HERA_BOONS } from './hera'
import { HERMES_BOONS } from './hermes'
import { HESTIA_BOONS } from './hestia'
import { POSEIDON_BOONS } from './poseidon'
import { ZEUS_BOONS } from './zeus'
import type { Boon, GodId } from '../types'

export const BOONS: Boon[] = [
  ...ZEUS_BOONS,
  ...HERA_BOONS,
  ...POSEIDON_BOONS,
  ...APHRODITE_BOONS,
  ...ARES_BOONS,
  ...DEMETER_BOONS,
  ...HEPHAESTUS_BOONS,
  ...HESTIA_BOONS,
  ...APOLLO_BOONS,
  ...ARTEMIS_BOONS,
  ...ATHENA_BOONS,
  ...HERMES_BOONS,
  ...DUO_BOONS,
]

export const BOON_BY_ID: Map<string, Boon> = new Map(BOONS.map((b) => [b.id, b]))

export function boonsForGod(god: GodId): Boon[] {
  return BOONS.filter((b) => b.gods.includes(god))
}

function prettify(id: string): string {
  return id
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function boonName(id: string): string {
  const boon = BOON_BY_ID.get(id)
  return boon ? boon.name : prettify(id)
}

export function boonGod(id: string): GodId | null {
  return BOON_BY_ID.get(id)?.gods[0] ?? null
}
