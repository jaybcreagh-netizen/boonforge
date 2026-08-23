import { useMemo, useState } from 'react'
import type { Boon, BuildState, GodId } from '../data/types'
import { GODS } from '../data/gods'
import { BOON_BY_ID, boonsForGod } from '../data/boons'
import { KEEPSAKE_BY_ID } from '../data/keepsakes'
import { effectivePool, ownedSet, slotPick, suggestionReason, suggestions, toggleBoon, unlockCandidates, unmetGroups } from '../lib/build'
import SlotBar from './SlotBar'
import BoonCard from './BoonCard'
import SuggestionPanel from './SuggestionPanel'
import DamagePanel from './DamagePanel'
import Icon from './Icon'

interface Props {
  build: BuildState
  onBuildChange: (build: BuildState) => void
}

const SLOT_ORDER: Record<string, number> = { attack: 0, special: 1, cast: 2, sprint: 3, none: 4 }

export default function RunMode({ build, onBuildChange }: Props) {
  const [spawnGod, setSpawnGod] = useState<GodId | null>(null)
  const [editingPool, setEditingPool] = useState(false)
  const owned = ownedSet(build)

  const pool = useMemo(() => effectivePool(build), [build])
  const keepsakeGods = useMemo(() => {
    const set = new Set<GodId>()
    for (const id of build.keepsakes) {
      const keepsake = KEEPSAKE_BY_ID.get(id)
      if (keepsake && !build.pool.includes(keepsake.god)) set.add(keepsake.god)
    }
    return set
  }, [build.keepsakes, build.pool])

  const activeSpawn = spawnGod && pool.has(spawnGod) ? spawnGod : null

  const suggs = useMemo(
    () => suggestions(build.picked, pool, build.aspectId, 300),
    [build.picked, pool, build.aspectId],
  )
  const suggById = useMemo(() => new Map(suggs.map((s) => [s.boon.id, s])), [suggs])
  const candidates = useMemo(() => unlockCandidates(build.picked, pool), [build.picked, pool])

  const picks = {
    attack: slotPick(build, 'attack'),
    special: slotPick(build, 'special'),
    cast: slotPick(build, 'cast'),
    sprint: slotPick(build, 'sprint'),
  }
  const readyPaths = candidates.filter((c) => c.ready && !owned.has(c.boon.id))
  const pickedPaths = candidates.filter((c) => owned.has(c.boon.id))
  const closePaths = candidates.filter((c) => !c.ready && !owned.has(c.boon.id)).slice(0, 3)

  const offers: Boon[] = useMemo(() => {
    if (!activeSpawn) return []
    return boonsForGod(activeSpawn)
      .filter((b) => b.type === 'core')
      .sort(
        (a, b) =>
          (suggById.get(b.id)?.score ?? 0) - (suggById.get(a.id)?.score ?? 0) ||
          SLOT_ORDER[a.slot] - SLOT_ORDER[b.slot],
      )
  }, [activeSpawn, suggById])

  const pickById = (id: string) => {
    const boon = BOON_BY_ID.get(id)
    if (boon) onBuildChange(toggleBoon(build, boon))
  }

  const togglePoolGod = (id: GodId) => {
    if (keepsakeGods.has(id)) return
    const next = build.pool.includes(id) ? build.pool.filter((g) => g !== id) : [...build.pool, id]
    onBuildChange({ ...build, pool: next })
  }

  return (
    <div className="space-y-6">
      <SlotBar
        picks={picks}
        onClear={(slot) => {
          const boon = picks[slot]
          if (boon) onBuildChange(toggleBoon(build, boon))
        }}
      />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Run Pool</h2>
              <button type="button" onClick={() => setEditingPool((v) => !v)} className="text-[10px] uppercase tracking-wider text-zinc-500 hover:text-zinc-300">
                {editingPool ? 'Done' : 'Edit'}
              </button>
            </div>
            {!editingPool ? (
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
                {pool.size === GODS.length
                  ? 'Full roster — narrow this to the gods actually in your run for honest suggestions.'
                  : `${pool.size} god${pool.size === 1 ? '' : 's'} in play${keepsakeGods.size > 0 ? ` (incl. ${keepsakeGods.size} via keepsake${keepsakeGods.size > 1 ? 's' : ''})` : ''}.`}
              </p>
            ) : null}
            {(editingPool || pool.size < GODS.length || keepsakeGods.size > 0) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {GODS.map((god) => {
                  const member = pool.has(god.id)
                  const viaKeepsake = keepsakeGods.has(god.id)
                  if (!editingPool && !member) return null
                  return (
                    <button
                      key={god.id}
                      type="button"
                      onClick={() => togglePoolGod(god.id)}
                      disabled={!editingPool}
                      title={viaKeepsake ? `${god.name} — in pool via keepsake` : editingPool ? `Toggle ${god.name} in pool` : god.name}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                        member ? 'border-zinc-600 bg-zinc-800 text-zinc-100' : 'border-dashed border-zinc-800 bg-transparent text-zinc-600 hover:text-zinc-400'
                      } ${!editingPool ? 'cursor-default' : ''}`}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: member ? god.color : '#3f3f46' }} />
                      {god.name}
                      {viaKeepsake && <span className="text-[9px] uppercase tracking-wide text-sky-300/80">ks</span>}
                    </button>
                  )
                })}
              </div>
            )}
            {editingPool && (
              <p className="mt-2 text-[10px] italic text-zinc-700">
                Gods joined via their keepsakes stay locked in while that keepsake is equipped.
              </p>
            )}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">What spawned?</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {GODS.filter((g) => pool.has(g.id)).map((god) => {
                const active = spawnGod === god.id
                return (
                  <button
                    key={god.id}
                    type="button"
                    onClick={() => setSpawnGod(active ? null : god.id)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                      active ? 'border-zinc-500 bg-zinc-800 text-zinc-100' : 'border-zinc-800 bg-transparent text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: god.color }} />
                    {god.name}
                  </button>
                )
              })}
            </div>

            {activeSpawn ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {offers.map((boon) => {
                  const sugg = suggById.get(boon.id)
                  const missing = unmetGroups(boon, owned)
                  const reason = sugg ? suggestionReason(sugg).slice(0, 2).join(' · ') : undefined
                  return (
                    <BoonCard
                      key={boon.id}
                      boon={boon}
                      picked={owned.has(boon.id)}
                      dimmed={missing.length > 0}
                      missingGroups={missing}
                      score={sugg?.score}
                      reason={reason}
                      onClick={() => onBuildChange(toggleBoon(build, boon))}
                    />
                  )
                })}
              </div>
            ) : (
              <p className="mt-4 text-xs italic text-zinc-600">
                Tap a pool god whose screen you're on — offerings are sorted with the strongest synergy picks first.
              </p>
            )}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Duo &amp; Legendary Paths</h2>
            {readyPaths.length === 0 && pickedPaths.length === 0 && (
              <p className="mt-3 text-xs italic text-zinc-600">No paths ready yet — keep an eye on Suggestions.</p>
            )}
            <div className="mt-3 space-y-2">
              {[...readyPaths, ...pickedPaths].map(({ boon }) => (
                <button
                  key={boon.id}
                  type="button"
                  onClick={() => onBuildChange(toggleBoon(build, boon))}
                  className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left transition ${
                    owned.has(boon.id) ? 'border-amber-400/70 bg-amber-400/10' : 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-400'
                  }`}
                >
                  <Icon id={boon.id} alt={boon.name} className="h-7 w-7" />
                  <span className="text-sm text-zinc-200">{boon.name}</span>
                  <span className={`ml-auto text-[10px] font-semibold uppercase tracking-wide ${owned.has(boon.id) ? 'text-amber-300' : 'text-emerald-300'}`}>
                    {owned.has(boon.id) ? 'Taken' : 'Take it'}
                  </span>
                </button>
              ))}
              {closePaths.map(({ boon, missing }) => (
                <div key={boon.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
                  <span className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon id={boon.id} alt={boon.name} className="h-6 w-6 opacity-50" />
                    {boon.name}
                  </span>
                  <span className="mt-0.5 block pl-8 text-[11px] text-zinc-600">
                    Needs {missing.map((group) => group.map((id) => id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(' / ')).join(' + ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <SuggestionPanel items={suggs.slice(0, 5)} onPick={pickById} />
          <DamagePanel pickedIds={build.picked} arcanaIds={build.arcana} />
        </div>
      </div>
    </div>
  )
}
