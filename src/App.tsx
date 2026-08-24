import { useEffect, useMemo, useState } from 'react'
import type { Boon, BoonSlot, BuildState, GodId, WeaponId } from './data/types'
import { EMPTY_BUILD, MAX_KEEPSAKES, SEEDED_GOD_IDS } from './data/types'
import { GODS } from './data/gods'
import { WEAPON_BY_ID } from './data/weapons'
import { boonsForGod, BOON_BY_ID } from './data/boons'
import { ownedSet, pickedAugments, slotPick, swapImpact, toggleBoon, unmetGroups, unlockCandidates, suggestions } from './lib/build'
import { decodeBuild } from './lib/share'
import WeaponPanel from './components/WeaponPanel'
import KeepsakePanel from './components/KeepsakePanel'
import HexPicker from './components/HexPicker'
import CursePanel from './components/CursePanel'
import ArcanaPanel from './components/ArcanaPanel'
import SuggestionPanel from './components/SuggestionPanel'
import SlotBar from './components/SlotBar'
import HistoryStrip from './components/HistoryStrip'
import StatusPanel from './components/StatusPanel'
import BoonCard from './components/BoonCard'
import RunMode from './components/RunMode'

const STORAGE_KEY = 'boonforge.build.v1'

function loadBuild(): BuildState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_BUILD
    const parsed = JSON.parse(raw) as Partial<BuildState>
    return {
      weaponId: parsed.weaponId ?? null,
      aspectId: parsed.aspectId ?? null,
      picked: Array.isArray(parsed.picked) ? parsed.picked.filter((id) => typeof id === 'string') : [],
      keepsakes: Array.isArray(parsed.keepsakes) ? parsed.keepsakes.filter((id) => typeof id === 'string') : [],
      hexId: typeof parsed.hexId === 'string' ? parsed.hexId : null,
      pool: Array.isArray(parsed.pool)
        ? parsed.pool.filter((g): g is GodId => typeof g === 'string' && SEEDED_GOD_IDS.includes(g as GodId))
        : [],
      arcana: Array.isArray(parsed.arcana) ? parsed.arcana.filter((id) => typeof id === 'string') : [],
      hammers: Array.isArray(parsed.hammers) ? parsed.hammers.filter((id) => typeof id === 'string') : [],
      hexNodes: Array.isArray(parsed.hexNodes) ? parsed.hexNodes.filter((id) => typeof id === 'string') : [],
      focusPath: typeof parsed.focusPath === 'string' ? parsed.focusPath : null,
    }
  } catch {
    return EMPTY_BUILD
  }
}

function loadSharedBuild(): BuildState | null {
  const code = new URLSearchParams(window.location.search).get('b')
  if (!code) return null
  return decodeBuild(code)
}

export default function App() {
  const [build, setBuild] = useState<BuildState>(() => loadSharedBuild() ?? loadBuild())
  const [activeGods, setActiveGods] = useState<Set<GodId>>(() => new Set<GodId>(['zeus', 'hestia', 'apollo']))
  const [mode, setMode] = useState<'plan' | 'run'>('plan')

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('b')) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(build))
    } catch {
      /* storage unavailable */
    }
  }, [build])

  const picks = useMemo(
    () => ({
      attack: slotPick(build, 'attack'),
      special: slotPick(build, 'special'),
      cast: slotPick(build, 'cast'),
      sprint: slotPick(build, 'sprint'),
    }),
    [build],
  )

  const owned = useMemo(() => ownedSet(build), [build])
  const candidates = useMemo(() => unlockCandidates(build.picked, activeGods), [build, activeGods])
  const suggs = useMemo(() => suggestions(build.picked, activeGods, build.aspectId, null), [build.picked, activeGods, build.aspectId])

  const pickById = (id: string) => {
    const boon = BOON_BY_ID.get(id)
    if (boon) setBuild(toggleBoon(build, boon))
  }

  const attemptPick = (boon: Boon) => {
    if (build.picked.includes(boon.id)) {
      setBuild(toggleBoon(build, boon))
      return
    }
    const impact = swapImpact(build, boon)
    if (impact.displaced && impact.brokenPaths.length > 0) {
      setSwapPrompt({ incoming: boon, impact })
      return
    }
    setBuild(toggleBoon(build, boon))
  }

  const confirmSwap = () => {
    if (!swapPrompt) return
    setBuild(toggleBoon(build, swapPrompt.incoming))
    setSwapPrompt(null)
  }

  const [confirmNewRun, setConfirmNewRun] = useState(false)
  const [swapPrompt, setSwapPrompt] = useState<{ incoming: Boon; impact: ReturnType<typeof swapImpact> } | null>(null)

  useEffect(() => {
    if (!confirmNewRun) return
    const timer = setTimeout(() => setConfirmNewRun(false), 2500)
    return () => clearTimeout(timer)
  }, [confirmNewRun])

  const startNewRun = () => {
    if (!confirmNewRun) {
      setConfirmNewRun(true)
      return
    }
    setConfirmNewRun(false)
    setBuild({ ...EMPTY_BUILD, weaponId: build.weaponId, aspectId: build.aspectId, arcana: build.arcana })
  }

  const selectWeapon = (id: WeaponId) => {
    const keepsAspect = WEAPON_BY_ID.get(id)?.aspects.some((a) => a.id === build.aspectId) ?? false
    setBuild({ ...build, weaponId: id, aspectId: keepsAspect ? build.aspectId : null })
  }

  const selectAspect = (id: string | null) => {
    if (id === null) {
      setBuild({ ...build, aspectId: null })
      return
    }
    setBuild({ ...build, aspectId: build.aspectId === id ? null : id })
  }

  const clearSlot = (slot: BoonSlot) => {
    const boon = slotPick(build, slot)
    if (!boon) return
    setBuild(toggleBoon(build, boon))
  }

  const toggleGod = (id: GodId) => {
    setActiveGods((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleKeepsake = (id: string) => {
    if (build.keepsakes.includes(id)) {
      setBuild({ ...build, keepsakes: build.keepsakes.filter((k) => k !== id) })
    } else if (build.keepsakes.length < MAX_KEEPSAKES) {
      setBuild({ ...build, keepsakes: [...build.keepsakes, id] })
    }
  }

  const selectHex = (id: string | null) => {
    setBuild({ ...build, hexId: id, hexNodes: [] })
  }

  const toggleArcana = (id: string) => {
    if (build.arcana.includes(id)) {
      setBuild({ ...build, arcana: build.arcana.filter((a) => a !== id) })
    } else {
      setBuild({ ...build, arcana: [...build.arcana, id] })
    }
  }

  const toggleHammer = (id: string) => {
    if (build.hammers.includes(id)) {
      setBuild({ ...build, hammers: build.hammers.filter((h) => h !== id) })
    } else {
      setBuild({ ...build, hammers: [...build.hammers, id] })
    }
  }

  const toggleHexNode = (name: string) => {
    if (build.hexNodes.includes(name)) {
      setBuild({ ...build, hexNodes: build.hexNodes.filter((n) => n !== name) })
    } else {
      setBuild({ ...build, hexNodes: [...build.hexNodes, name] })
    }
  }

  const seededGods = GODS.filter((g) => SEEDED_GOD_IDS.includes(g.id))
  const visibleGods = seededGods.filter((g) => activeGods.has(g.id))

  return (
    <div className="min-h-screen text-zinc-200">
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-[0.12em] text-amber-100">BoonForge</h1>
            <p className="mt-0.5 text-sm text-zinc-500">
              {mode === 'plan' ? 'Hades II build companion — plan boons, chase duos, forge your run.' : 'Live run — log what spawns, follow the highlights.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-1">
              {(['plan', 'run'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition ${
                    mode === m ? 'bg-amber-400/15 text-amber-100' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={startNewRun}
              title="Keeps your weapon, aspect and Wheel of Fate — clears everything else"
              className={`rounded-lg border px-4 py-2 text-sm font-semibold tracking-wide transition ${
                confirmNewRun
                  ? 'border-red-400/60 bg-red-400/10 text-red-200'
                  : 'border-amber-400/40 bg-gradient-to-b from-amber-400/15 to-transparent text-amber-200 hover:border-amber-300/70'
              }`}
            >
              {confirmNewRun ? 'Certain?' : 'New Run'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        {mode === 'run' ? (
          <RunMode build={build} onBuildChange={setBuild} pickCore={attemptPick} />
        ) : (
          <>
            <SlotBar picks={picks} augments={pickedAugments(build)} onClear={clearSlot} />
            <HistoryStrip picked={build.picked} onUndo={() => setBuild({ ...build, picked: build.picked.slice(0, -1) })} />

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <WeaponPanel
              build={build}
              onSelectWeapon={selectWeapon}
              onSelectAspect={selectAspect}
              onToggleHammer={toggleHammer}
            />
            <KeepsakePanel selected={build.keepsakes} onToggle={toggleKeepsake} />
            <HexPicker selected={build.hexId} onSelect={selectHex} onToggleNode={toggleHexNode} pickedNodes={build.hexNodes} />

            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Boon Givers</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {seededGods.map((god) => {
                  const active = activeGods.has(god.id)
                  return (
                    <button
                      key={god.id}
                      type="button"
                      onClick={() => toggleGod(god.id)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition ${
                        active ? 'border-zinc-600 bg-zinc-800 text-zinc-100' : 'border-zinc-800 bg-transparent text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: active ? god.color : '#52525b' }} />
                      {god.name}
                    </button>
                  )
                })}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {visibleGods.length === 0 && (
              <p className="rounded-xl border border-dashed border-zinc-800 p-10 text-center text-sm italic text-zinc-600">
                Select at least one god to browse their boons.
              </p>
            )}
            {visibleGods.map((god) => {
              const cores = boonsForGod(god.id).filter((b) => b.type === 'core')
              return (
                <section key={god.id}>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="relative top-[-2px] h-2.5 w-2.5 rounded-full" style={{ backgroundColor: god.color }} />
                    <h2 className="font-serif text-lg text-zinc-100">{god.name}</h2>
                    <span className="text-[11px] uppercase tracking-widest text-zinc-600">{god.title}</span>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {cores.map((boon: Boon) => {
                      const missing = unmetGroups(boon, owned)
                      return (
                        <BoonCard
                          key={boon.id}
                          boon={boon}
                          picked={owned.has(boon.id)}
                          dimmed={missing.length > 0}
                          missingGroups={missing}
                          onClick={() => attemptPick(boon)}
                        />
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>

          <div className="space-y-4">
            <SuggestionPanel items={suggs} onPick={pickById} />
            <StatusPanel
              build={build}
              activeGods={activeGods}
              candidates={candidates}
              onBuildChange={setBuild}
              onReset={() => setBuild(EMPTY_BUILD)}
            />
            <ArcanaPanel selected={build.arcana} onToggle={toggleArcana} />
            <CursePanel />
          </div>
        </div>
          </>
        )}

        {swapPrompt && (
          <div className="fixed inset-x-0 bottom-4 z-30 mx-auto flex max-w-xl flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-amber-400/50 bg-zinc-900/95 px-4 py-3 shadow-xl backdrop-blur">
            <p className="min-w-0 flex-1 text-xs leading-relaxed text-zinc-300">
              Taking <span className="font-semibold text-amber-200">{swapPrompt.incoming.name}</span> replaces{' '}
              <span className="font-semibold text-zinc-100">{swapPrompt.impact.displaced?.name}</span>
              {swapPrompt.impact.brokenPaths.length > 0 && (
                <>
                  {' '}—{' '}
                  <span className="text-red-300">
                    {swapPrompt.impact.brokenPaths.map((b) => b.name).join(', ')} go{swapPrompt.impact.brokenPaths.length > 1 ? '' : 'es'} back to Locked
                  </span>
                </>
              )}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSwapPrompt(null)}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSwap}
                className="rounded-lg border border-amber-400/50 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:border-amber-300"
              >
                Take anyway
              </button>
            </div>
          </div>
        )}

        <div className="ornament mx-auto max-w-md" />
        <footer className="pt-4 text-center text-[11px] leading-relaxed text-zinc-700">
          Forged in the House of Hades — seed data v0.5, transcribed from hades.fandom.com.
          Common-rarity approximations throughout; re-verify after game patches.
        </footer>
      </main>
    </div>
  )
}
