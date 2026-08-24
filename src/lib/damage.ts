import { BOON_BY_ID } from '../data/boons'
import { ARCANA_DAMAGE_TAGS, DAMAGE_TAGS, HAMMER_DAMAGE_TAGS } from '../data/damage-tags'
import type { DamageBucket, DamageTag } from '../data/damage-tags'
import type { Element } from '../data/types'

export interface BucketStat {
  key: Exclude<DamageBucket, 'all'>
  mult: number
  notes: string[]
}

export interface DamageReport {
  buckets: BucketStat[]
  critChance: number
  critNotes: string[]
  vulnPct: number
  vulnNotes: string[]
  trackedCount: number
}

const BUCKET_KEYS: Array<BucketStat['key']> = ['attack', 'special', 'cast', 'omega']

export function damageReport(pickedIds: string[], arcanaIds: string[] = [], hammerIds: string[] = []): DamageReport {
  const stats = new Map<
    Exclude<DamageBucket, 'all'>,
    { bonus: number; shots: number; notes: Set<string> }
  >(BUCKET_KEYS.map((key) => [key, { bonus: 0, shots: 1, notes: new Set<string>() }]))
  let critChance = 0
  const critNotes = new Set<string>()
  let vulnPct = 0
  const vulnNotes = new Set<string>()
  let trackedCount = 0

  const elementCounts: Record<Element, number> = { air: 0, water: 0, earth: 0, fire: 0 }
  const gods = new Set<string>()
  const tags: DamageTag[] = []

  for (const id of pickedIds) {
    const boon = BOON_BY_ID.get(id)
    if (!boon) continue
    if (boon.element) elementCounts[boon.element]++
    for (const g of boon.gods) gods.add(g)
    const boonTags = DAMAGE_TAGS[id]
    if (boonTags) {
      trackedCount += boonTags.length
      tags.push(...boonTags)
    }
  }
  for (const id of arcanaIds) {
    const arcanaTags = ARCANA_DAMAGE_TAGS[id]
    if (arcanaTags) {
      trackedCount += arcanaTags.length
      tags.push(...arcanaTags)
    }
  }
  for (const id of hammerIds) {
    const hammerTags = HAMMER_DAMAGE_TAGS[id]
    if (hammerTags) {
      trackedCount += hammerTags.length
      tags.push(...hammerTags)
    }
  }

  for (const tag of tags) {
    if (typeof tag.crit === 'number') {
      critChance += tag.crit
      if (tag.note) critNotes.add(tag.note)
    }
    if (typeof tag.vuln === 'number') {
      vulnPct += tag.vuln
      if (tag.note) vulnNotes.add(tag.note)
    }
    if (tag.bucket && BUCKET_KEYS.includes(tag.bucket as BucketStat['key'])) {
      const key = tag.bucket as BucketStat['key']
      const entry = stats.get(key)!
      let add = tag.pct ?? 0
      if (tag.perElement && tag.perPct) add += tag.perPct * elementCounts[tag.perElement]
      if (tag.perGodPct) add += tag.perGodPct * gods.size
      entry.bonus += add
      if (add > 0 && tag.note) entry.notes.add(tag.note)
      if (typeof tag.shots === 'number') {
        entry.shots *= tag.shots
        if (tag.note) entry.notes.add(tag.note)
      }
    }
  }

  const buckets = BUCKET_KEYS.map((key) => {
    const entry = stats.get(key)!
    return {
      key,
      mult: Math.max(1, (1 + entry.bonus) * entry.shots),
      notes: [...entry.notes],
    }
  })

  return {
    buckets,
    critChance,
    critNotes: [...critNotes],
    vulnPct,
    vulnNotes: [...vulnNotes],
    trackedCount,
  }
}
