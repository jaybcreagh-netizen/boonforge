import { BOON_BY_ID, BOONS } from '../data/boons'
import { aspectById } from '../data/weapons'
import type { Boon, BoonSlot, BuildState, Element, Infusion } from '../data/types'
import { ELEMENTS } from '../data/types'

export function ownedSet(build: BuildState): Set<string> {
  return new Set(build.picked)
}

export function slotPick(build: BuildState, slot: BoonSlot): Boon | null {
  for (const id of build.picked) {
    const boon = BOON_BY_ID.get(id)
    if (boon && boon.slot === slot) return boon
  }
  return null
}

export function unmetGroups(boon: Boon, owned: Set<string>): string[][] {
  return boon.requires.filter((group) => !group.some((id) => owned.has(id)))
}

export function isAvailable(boon: Boon, owned: Set<string>): boolean {
  return unmetGroups(boon, owned).length === 0
}

export function toggleBoon(build: BuildState, target: Boon): BuildState {
  if (build.picked.includes(target.id)) {
    return { ...build, picked: build.picked.filter((id) => id !== target.id) }
  }
  let picked = [...build.picked, target.id]
  if (target.slot !== 'none') {
    picked = picked.filter((id) => {
      if (id === target.id) return true
      const other = BOON_BY_ID.get(id)
      return !(other && other.slot === target.slot)
    })
  }
  return { ...build, picked }
}

export function elementCounts(pickedIds: string[]): Record<Element, number> {
  const counts: Record<Element, number> = { air: 0, water: 0, earth: 0, fire: 0 }
  for (const id of pickedIds) {
    const boon = BOON_BY_ID.get(id)
    if (boon?.element) counts[boon.element]++
  }
  return counts
}

export function infusionProgress(infusion: Infusion, counts: Record<Element, number>): { have: number; need: number } {
  if (infusion.element === 'any') {
    const have = ELEMENTS.reduce((sum, el) => sum + counts[el], 0)
    return { have, need: infusion.count }
  }
  return { have: counts[infusion.element], need: infusion.count }
}

export interface UnlockCandidate {
  boon: Boon
  missing: string[][]
  ready: boolean
}

export function unlockCandidates(pickedIds: string[], activeGods: Set<string>): UnlockCandidate[] {
  const owned = new Set(pickedIds)
  const list: UnlockCandidate[] = []
  for (const boon of BOON_BY_ID.values()) {
    if (boon.type === 'core') continue
    if (!boon.gods.some((g) => activeGods.has(g))) continue
    const missing = unmetGroups(boon, owned)
    list.push({ boon, missing, ready: missing.length === 0 })
  }
  return list.sort(
    (a, b) =>
      Number(b.ready) - Number(a.ready) ||
      a.missing.length - b.missing.length ||
      a.boon.name.localeCompare(b.boon.name),
  )
}

export interface Suggestion {
  boon: Boon
  score: number
  unlocks: Boon[]
  progressCount: number
  infusionFills: Array<{ name: string; element: Element | 'any'; need: number }>
  fitsAspect?: string
}

export function suggestions(pickedIds: string[], activeGods: Set<string>, aspectId?: string | null, limit = 5): Suggestion[] {
  const owned = new Set(pickedIds)
  const counts = elementCounts(pickedIds)
  const infusions = pickedIds.flatMap((id): Boon[] => {
    const b = BOON_BY_ID.get(id)
    return b?.infusion ? [b] : []
  })
  const specials = [...BOON_BY_ID.values()].filter((b) => b.type !== 'core' && !owned.has(b.id))
  const base = specials.map((boon) => ({ boon, missing: unmetGroups(boon, owned).length }))
  const aspect = aspectById(aspectId ?? null)

  const out: Suggestion[] = []
  for (const cand of BOONS) {
    if (cand.type !== 'core' || owned.has(cand.id)) continue
    if (!cand.gods.some((g) => activeGods.has(g))) continue
    const next = new Set(owned)
    next.add(cand.id)
    const unlocks: Boon[] = []
    let progressCount = 0
    for (const { boon, missing } of base) {
      const after = unmetGroups(boon, next).length
      if (after === 0) unlocks.push(boon)
      else if (after < missing) progressCount++
    }
    const infusionFills: Suggestion['infusionFills'] = []
    for (const inf of infusions) {
      if (!inf.infusion) continue
      const prog = infusionProgress(inf.infusion, counts)
      if (prog.have >= prog.need) continue
      if (inf.infusion.element === 'any' ? Boolean(cand.element) : cand.element === inf.infusion.element) {
        infusionFills.push({ name: inf.name, element: inf.infusion.element, need: prog.need })
      }
    }
    let score = unlocks.length * 10 + progressCount * 3 + infusionFills.length * 4
    let fitsAspect: string | undefined
    if (aspect?.synergy) {
      let bonus = 0
      if (cand.slot !== 'none' && aspect.synergy.slots?.includes(cand.slot)) bonus += 3
      if (aspect.synergy.keywords) {
        const desc = cand.description.toLowerCase()
        for (const keyword of aspect.synergy.keywords) {
          if (desc.includes(keyword)) bonus += 2
        }
      }
      if (bonus > 0) {
        score += bonus
        fitsAspect = aspect.name
      }
    }
    if (score <= 0) continue
    out.push({ boon: cand, score, unlocks, progressCount, infusionFills, fitsAspect })
  }
  return out.sort((a, b) => b.score - a.score || a.boon.name.localeCompare(b.boon.name)).slice(0, limit)
}
