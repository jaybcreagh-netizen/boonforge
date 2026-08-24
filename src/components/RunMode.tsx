import { useMemo, useState } from 'react'
import type { Boon, BuildState, GodId } from '../data/types'
import { GODS } from '../data/gods'
import { BOON_BY_ID } from '../data/boons'
import { KEEPSAKE_BY_ID } from '../data/keepsakes'
import {
  coreOffers,
  effectivePool,
  ownedSet,
  slotPick,
  suggestionReason,
  suggestions,
  toggleBoon,
  unlockCandidates,
} from '../lib/build'
import SlotBar from './SlotBar'
import BoonCard from './BoonCard'
import SuggestionPanel from './SuggestionPanel'
import DamagePanel from './DamagePanel'
import Icon from './Icon'

interface Props {
  build: BuildState
  onBuildChange: (build: BuildState) => void
  pickCore: (boon: Boon) => void
}

const SLOT_ORDER: Record<string, number> = { attack: 0, special: 1, cast: 2, sprint: 3, none: 4 }

export default function RunMode({ build, onBuildChange, pickCore }: Props) {
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

  const suggs = useMemo(
    () => suggestions(build.picked, pool, build.aspectId, build.focusPath, 300),
    [build.picked, pool, build.aspectId, build.focusPath],
  )
  const suggById = useMemo(() => new Map(suggs.map((s) => [s.boon.id, s])), [suggs])
  const candidates = useMemo(() => unlockCandidates(build.picked, pool), [build.picked, pool])

  const picks = {
    attack: slotPick(build, 'attack'),
    special: slotPick(build, 'special'),
    cast: slotPick(build, 'cast'),
    sprint: slotPick(build, 'sprint'),
  }

  const activeSpawn = spawnGod && pool.has(spawnGod) ? spawnGod : null
  const offers: Boon[] = useMemo(() => {
    if (!activeSpawn) return []
    return coreOffers(build, activeSpawn).sort(
      (a, b) =>
        (suggById.get(b.id)?.score ?? 0) - (suggById.get(a.id)?.score ?? 0) ||
        SLOT_ORDER[a.slot] - SLOT_ORDER[b.slot] ||
        a.name.localeCompare(b.name),
    )
  }, [activeSpawn, build, suggById])

  const godSpecials = useMemo(() => {
    if (!activeSpawn) return []
    return candidates.filter((c) => c.boon.gods.includes(activeSpawn))
  }, [activeSpawn, candidates])

  const focusBoon = build.focusPath ? BOON_BY_ID.get(build.focusPath) : undefined
  const focusCandidate = focusBoon ? candidates.find((c) => c.boon.id === focusBoon.id) : undefined

  const readyPaths = candidates.filter((c) => c.ready && !owned.has(c.boon.id))
  const pickedPaths = candidates.filter((c) => owned.has(c.boon.id))
  const closePaths = candidates.filter((c) => !c.ready && !owned.has(c.boon.id)).slice(0, 3)

  const pickById = (id: string) => {
    const boon = BOON_BY_ID.get(id)
    if (boon) pickCore(boon)
  }

  const encounterGod = (id: GodId) => {
    if (pool.has(id)) {
      setSpawnGod(id === spawnGod ? null : id)
      return
    }
    const base = build.pool.length > 0 ? [...build.pool] : [...pool]
    if (!base.includes(id)) base.push(id)
    onBuildChange({ ...build, pool: base })
    setSpawnGod(id)
  }

  const togglePoolGod = (id: GodId) => {
    if (keepsakeGods.has(id)) return
    const next = build.pool.includes(id) ? build.pool.filter((g) => g !== id) : [...build.pool, id]
    onBuildChange({ ...build, pool: next })
  }

  const setFocus = (id: string) => {
    onBuildChange({ ...build, focusPath: build.focusPath === id ? null : id })
  }

  const poolGods = GODS.filter((g) => pool.has(g.id))
  const unseenGods = GODS.filter((g) => !pool.has(g.id))

  return (
    <div className="space-y-6">
      <SlotBar
        picks={picks}
        onClear={(slot) => {
          const boon = picks[slot]
          if (boon) onBuildChange(toggleBoon(build, boon))
        }}
      />

      {focusBoon && (
        <div className="rounded-xl border border-violet-400/40 bg-violet-400/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
              Focus Path
            </p>
            <button type="button" onClick={() => setFocus(focusBoon.id)} className="text-[10px] uppercase tracking-wider text-zinc-500 hover:text-red-300">
              Drop focus
            </button>
          </div>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-medium text-zinc-100">
            <Icon id={focusBoon.id} alt={focusBoon.name} className="h-6 w-6" />
            {focusBoon.name}
            <span className="text-[10px] font-normal uppercase tracking-wide text-violet-300/70">
              {focusBoon.gods.map((g) => GODS.find((x) => x.id === g)?.name).filter(Boolean).join(' × ')}
            </span>
          </p>
          {focusCandidate && focusCandidate.missing.length > 0 ? (
            <div className="mt-2 space-y-1">
              {focusCandidate.missing.map((group, i) => (
                <p key={i} className="text-xs text-zinc-400">
                  Need one:{' '}
                  {group.map((id) => {
                    const b = BOON_BY_ID.get(id)
                    const freeSlot = b && b.slot !== 'none' && !picks[b.slot as keyof typeof picks]
                    return (
                      <span key={id} className={freeSlot ? 'text-emerald-300' : 'text-zinc-400'}>
                        {b?.name ?? id}
                        {freeSlot ? ' ✓slot open' : ''}
                        {'  '}
                      </span>
                    )
                  })}
                </p>
              ))}
            </div>
          ) : focusCandidate ? (
            <p className="mt-2 text-xs text-emerald-300">Complete — it can appear in your next boon selection.</p>
          ) : (
            <p className="mt-2 text-xs text-amber-200">Taken.</p>
          )}
        </div>
      )}

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
              <>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">In pool</p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {poolGods.map((god) => (
                    <button
                      key={god.id}
                      type="button"
                      onClick={() => encounterGod(god.id)}
                      title={`See what ${god.name} offers`}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                        spawnGod === god.id
                          ? 'border-zinc-400 bg-zinc-700 text-zinc-50'
                          : 'border-zinc-700 bg-zinc-800/80 text-zinc-200 hover:border-zinc-500'
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: god.color }} />
                      {god.name}
                    </button>
                  ))}
                </div>
                {unseenGods.length > 0 && (
                  <>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-700">Not yet encountered</p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {unseenGods.map((god) => (
                        <button
                          key={god.id}
                          type="button"
                          onClick={() => encounterGod(god.id)}
                          title={`${god.name} joins your pool when first encountered`}
                          className="rounded-full border border-dashed border-zinc-800 px-3 py-1.5 text-sm text-zinc-600 transition hover:border-zinc-600 hover:text-zinc-400"
                        >
                          {god.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {keepsakeGods.size > 0 && (
                  <p className="mt-2 text-[10px] italic text-zinc-600">
                    {[...keepsakeGods].map((g) => GODS.find((x) => x.id === g)?.name).join(', ')} joined via keepsake.
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="mt-3 flex flex-wrap gap-2">
                  {GODS.map((god) => {
                    const member = pool.has(god.id)
                    const viaKeepsake = keepsakeGods.has(god.id)
                    return (
                      <button
                        key={god.id}
                        type="button"
                        onClick={() => togglePoolGod(god.id)}
                        disabled={viaKeepsake}
                        title={viaKeepsake ? `${god.name} stays while their keepsake is equipped` : `Toggle ${god.name}`}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                          member ? 'border-zinc-600 bg-zinc-800 text-zinc-100' : 'border-dashed border-zinc-800 bg-transparent text-zinc-600 hover:text-zinc-400'
                        } ${viaKeepsake ? 'cursor-not-allowed opacity-60' : ''}`}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: member ? god.color : '#3f3f46' }} />
                        {god.name}
                        {viaKeepsake && <span className="text-[9px] uppercase tracking-wide text-sky-300/80">ks</span>}
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2 text-[10px] italic text-zinc-700">
                  Removing a god hides their offerings and paths for the rest of this run's planning.
                </p>
              </>
            )}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            {activeSpawn ? (
              <>
                <h2 className="font-display text-lg text-zinc-100">
                  {GODS.find((g) => g.id === activeSpawn)?.name} offers:
                </h2>
                {offers.length === 0 && godSpecials.length === 0 ? (
                  <p className="mt-3 text-xs italic text-zinc-600">
                    Nothing left to take here — every slot they'd fill is already yours.
                  </p>
                ) : (
                  <>
                    {offers.length > 0 && (
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {offers.map((boon) => {
                          const sugg = suggById.get(boon.id)
                          return (
                            <BoonCard
                              key={boon.id}
                              boon={boon}
                              picked={false}
                              score={sugg?.score}
                              reason={sugg ? suggestionReason(sugg).slice(0, 2).join(' · ') : undefined}
                              onClick={() => pickCore(boon)}
                            />
                          )
                        })}
                      </div>
                    )}
                    {godSpecials.length > 0 && (
                      <div className="mt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-fuchsia-300/80">Special offerings</p>
                        <div className="mt-2 space-y-2">
                          {godSpecials.map(({ boon, missing, ready }) => {
                            const taken = owned.has(boon.id)
                            const interactive = ready || taken
                            return (
                              <button
                                key={boon.id}
                                type="button"
                                disabled={!interactive}
                                onClick={() => onBuildChange(toggleBoon(build, boon))}
                                className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                                  taken
                                    ? 'border-amber-400/70 bg-amber-400/10'
                                    : ready
                                      ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-400'
                                      : 'cursor-not-allowed border-zinc-800 bg-zinc-900/50'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <Icon id={boon.id} alt={boon.name} className="h-6 w-6" />
                                  <span className="text-sm text-zinc-200">{boon.name}</span>
                                  <span
                                    className={`ml-auto text-[10px] font-semibold uppercase tracking-wide ${
                                      taken ? 'text-amber-300' : ready ? 'text-emerald-300' : 'text-zinc-600'
                                    }`}
                                  >
                                    {taken ? 'Taken' : ready ? 'Offered now' : `${missing.length} step${missing.length > 1 ? 's' : ''} away`}
                                  </span>
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="py-2 text-center">
                <p className="font-display text-lg text-zinc-300">Who approaches?</p>
                <p className="mx-auto mt-1 max-w-md text-xs italic leading-relaxed text-zinc-600">
                  Tap a god above the moment they appear — you'll see only what they could actually offer you right now:
                  boons for your empty slots, passives, and any duo or legendary within reach.
                </p>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">All Paths</h2>
            {readyPaths.length === 0 && pickedPaths.length === 0 && closePaths.length === 0 && (
              <p className="mt-3 text-xs italic text-zinc-600">No reachable paths yet — they appear as your pool and picks develop.</p>
            )}
            <div className="mt-3 space-y-2">
              {focusCandidate && !owned.has(focusBoon?.id ?? '') && (
                <div className="rounded-lg border border-violet-400/40 bg-violet-400/5 px-3 py-2">
                  <PathRow boon={focusBoon!} state={focusCandidate.ready ? 'ready' : 'locked'} onFocus={setFocus} focused />
                  {focusCandidate.missing.length > 0 && (
                    <p className="pl-8 text-[11px] text-zinc-500">
                      Needs {focusCandidate.missing.map((group) => group.map((id) => BOON_BY_ID.get(id)?.name ?? id).join(' / ')).join(' + ')}
                    </p>
                  )}
                </div>
              )}
              {[...readyPaths, ...pickedPaths].filter((c) => c.boon.id !== build.focusPath).map(({ boon }) => (
                <button
                  key={boon.id}
                  type="button"
                  onClick={() => onBuildChange(toggleBoon(build, boon))}
                  className={`w-full text-left ${owned.has(boon.id) ? 'cursor-pointer' : ''}`}
                >
                  <PathRow boon={boon} state={owned.has(boon.id) ? 'taken' : 'ready'} onFocus={setFocus} focused={false} />
                </button>
              ))}
              {closePaths.filter((c) => c.boon.id !== build.focusPath).map(({ boon, missing }) => (
                <div key={boon.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
                  <PathRow boon={boon} state="locked" onFocus={setFocus} focused={false} />
                  <p className="pl-8 text-[11px] text-zinc-600">
                    Needs {missing.map((group) => group.map((id) => BOON_BY_ID.get(id)?.name ?? id).join(' / ')).join(' + ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <SuggestionPanel items={suggs.slice(0, 5)} onPick={pickById} />
          <DamagePanel pickedIds={build.picked} arcanaIds={build.arcana} hammerIds={build.hammers} />
        </div>
      </div>
    </div>
  )
}

function PathRow({
  boon,
  state,
  onFocus,
  focused,
}: {
  boon: Boon
  state: 'ready' | 'taken' | 'locked'
  onFocus: (id: string) => void
  focused: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon id={boon.id} alt={boon.name} className="h-7 w-7" />
      <span className="min-w-0 flex-1 truncate text-sm text-zinc-200">{boon.name}</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onFocus(boon.id)
        }}
        className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide transition ${
          focused ? 'border-violet-400/60 bg-violet-400/10 text-violet-300' : 'border-zinc-700 text-zinc-500 hover:border-violet-400/50 hover:text-violet-300'
        }`}
      >
        {focused ? 'Focused' : 'Focus'}
      </button>
      {state !== 'locked' && (
        <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide ${state === 'taken' ? 'text-amber-300' : 'text-emerald-300'}`}>
          {state === 'taken' ? 'Taken' : 'Ready'}
        </span>
      )}
    </div>
  )
}
