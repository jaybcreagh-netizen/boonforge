import { BOON_BY_ID, BOONS, boonsForGod } from '../data/boons'
import { KEEPSAKE_BY_ID } from '../data/keepsakes'
import { aspectById } from '../data/weapons'
import type { Boon, BoonSlot, BuildState, Element, GodId, Infusion } from '../data/types'
import { ELEMENTS, SEEDED_GOD_IDS } from '../data/types'

export function ownedSet(build: BuildState): Set<string> {
  return new Set(build.picked)
}

export function pickedAugments(build: BuildState): Boon[] {
  return build.picked.flatMap((id): Boon[] => {
    const boon = BOON_BY_ID.get(id)
    return boon?.augments ? [boon] : []
  })
}

/** Gods reachable this run: the declared pool plus gods pulled in via their keepsakes. */
export function effectivePool(build: BuildState): Set<GodId> {
  const pool = new Set<GodId>(build.pool)
  for (const id of build.keepsakes) {
    const keepsake = KEEPSAKE_BY_ID.get(id)
    if (keepsake) pool.add(keepsake.god)
  }
  return pool.size > 0 ? pool : new Set<GodId>(SEEDED_GOD_IDS)
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

export interface SwapImpact {
  displaced: Boon | null
  brokenPaths: Boon[]
}

export function swapImpact(build: BuildState, incoming: Boon): SwapImpact {
  if (incoming.slot === 'none') return { displaced: null, brokenPaths: [] }
  const displaced = slotPick(build, incoming.slot)
  if (!displaced || displaced.id === incoming.id) return { displaced: null, brokenPaths: [] }
  const withoutDisplaced = build.picked.filter((id) => id !== displaced.id)
  const nextSet = new Set([...withoutDisplaced, incoming.id])
  const owned = new Set(build.picked)
  const brokenPaths: Boon[] = []
  for (const boon of BOON_BY_ID.values()) {
    if (boon.type === 'core') continue
    if (isAvailable(boon, owned) && !isAvailable(boon, nextSet)) brokenPaths.push(boon)
  }
  return { displaced, brokenPaths }
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
    if (!pathFeasible(boon, owned, activeGods)) continue
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

/** Cores a god can actually offer right now: passives plus boons for empty slots. No overwrites mid-run. */
export function coreOffers(build: BuildState, godId: GodId): Boon[] {
  return boonsForGod(godId).filter(
    (b) => b.type === 'core' && (b.slot === 'none' || !slotPick(build, b.slot)),
  )
}

/** A path is completable this run when every OR-group contains something already owned, or offered by a pool god. */
export function pathFeasible(boon: Boon, owned: Set<string>, pool: Set<string>): boolean {
  return boon.requires.every((group) =>
    group.some((id) => {
      if (owned.has(id)) return true
      const prereq = BOON_BY_ID.get(id)
      return prereq ? prereq.gods.some((g) => pool.has(g)) : false
    }),
  )
}

export interface Suggestion {
  boon: Boon
  score: number
  unlocks: Boon[]
  progressCount: number
  infusionFills: Array<{ name: string; element: Element | 'any'; need: number }>
  fitsAspect?: string
  focus?: boolean
}

export function suggestionReason(item: Suggestion): string[] {
  const reasons: string[] = []
  if (item.focus) reasons.push('Focus path')
  for (const u of item.unlocks) reasons.push(`Unlocks ${u.name}`)
  if (item.progressCount > 0) {
    reasons.push(`Advances ${item.progressCount} path${item.progressCount > 1 ? 's' : ''}`)
  }
  for (const fill of item.infusionFills) {
    reasons.push(
      fill.element === 'any'
        ? `Any-element progress for ${fill.name}`
        : `${fill.element.charAt(0).toUpperCase()}${fill.element.slice(1)} for ${fill.name}`,
    )
  }
  if (item.fitsAspect) reasons.push(`Fits ${item.fitsAspect}`)
  return reasons
}

export function suggestions(pickedIds: string[], activeGods: Set<string>, aspectId?: string | null, focusPathId?: string | null, limit = 5): Suggestion[] {
  const owned = new Set(pickedIds)
  const counts = elementCounts(pickedIds)
  const infusions = pickedIds.flatMap((id): Boon[] => {
    const b = BOON_BY_ID.get(id)
    return b?.infusion ? [b] : []
  })
  const specials = [...BOON_BY_ID.values()].filter(
    (b) => b.type !== 'core' && !owned.has(b.id) && b.gods.some((g) => activeGods.has(g)) && pathFeasible(b, owned, activeGods),
  )
  const base = specials.map((boon) => ({ boon, missing: unmetGroups(boon, owned).length }))
  const aspect = aspectById(aspectId ?? null)

  const slotOccupied = new Set<string>()
  for (const id of pickedIds) {
    const b = BOON_BY_ID.get(id)
    if (b && b.slot !== 'none') slotOccupied.add(b.slot)
  }

  const out: Suggestion[] = []
  for (const cand of BOONS) {
    if (cand.type !== 'core' || owned.has(cand.id)) continue
    if (!cand.gods.some((g) => activeGods.has(g))) continue
    if (cand.slot !== 'none' && slotOccupied.has(cand.slot)) continue
    const next = new Set(owned)
    next.add(cand.id)
    const unlocks: Boon[] = []
    let progressCount = 0
    let focus = false
    for (const { boon, missing } of base) {
      const after = unmetGroups(boon, next).length
      if (after === 0) {
        unlocks.push(boon)
        if (focusPathId && boon.id === focusPathId) focus = true
      } else if (after < missing) {
        progressCount++
        if (focusPathId && boon.id === focusPathId) focus = true
      }
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
    if (focus) score += 25
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
    out.push({ boon: cand, score, unlocks, progressCount, infusionFills, fitsAspect, focus })
  }
  return out
    .sort(
      (a, b) =>
        Number(b.focus) - Number(a.focus) ||
        b.score - a.score ||
        a.boon.name.localeCompare(b.boon.name),
    )
    .slice(0, limit)
}
