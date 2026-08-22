import { useState } from 'react'
import type { Boon, BuildState, Element } from '../data/types'
import { ELEMENTS } from '../data/types'
import { GOD_BY_ID } from '../data/gods'
import { BOON_BY_ID, boonName } from '../data/boons'
import { KEEPSAKE_BY_ID } from '../data/keepsakes'
import { encodeBuild } from '../lib/share'
import { elementCounts, infusionProgress, ownedSet, toggleBoon } from '../lib/build'
import type { UnlockCandidate } from '../lib/build'
import Icon from './Icon'

interface Props {
  build: BuildState
  activeGods: Set<string>
  candidates: UnlockCandidate[]
  onBuildChange: (build: BuildState) => void
  onReset: () => void
}

const ELEMENT_ACCENT: Record<Element, string> = {
  air: 'bg-sky-400',
  water: 'bg-blue-500',
  earth: 'bg-amber-600',
  fire: 'bg-orange-500',
}

function Requirements({ missing }: { missing: string[][] }) {
  return (
    <span className="mt-1 block text-[11px] leading-relaxed text-zinc-500">
      Needs{' '}
      {missing.map((group, i) => (
        <span key={i}>
          {i > 0 && ' + '}
          <span className="text-zinc-400">{group.map(boonName).join(' / ')}</span>
        </span>
      ))}
    </span>
  )
}

export default function StatusPanel({ build, activeGods, candidates, onBuildChange, onReset }: Props) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const owned = ownedSet(build)
  const counts = elementCounts(build.picked)
  const infusions = build.picked
    .map((id) => BOON_BY_ID.get(id))
    .filter((b): b is Boon => Boolean(b?.infusion))

  const copyBuild = async () => {
    const payload = JSON.stringify(
      {
        weapon: build.weaponId,
        aspect: build.aspectId,
        keepsakes: build.keepsakes.map((id) => KEEPSAKE_BY_ID.get(id)?.name ?? id),
        boons: build.picked.map((id) => BOON_BY_ID.get(id)?.name ?? id),
      },
      null,
      2,
    )
    await navigator.clipboard.writeText(payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const shareLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}?b=${encodeBuild(build)}`
    await navigator.clipboard.writeText(url)
    setShared(true)
    setTimeout(() => setShared(false), 1500)
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Elements</h2>
        <div className="mt-3 space-y-2">
          {ELEMENTS.map((el) => (
            <div key={el} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${ELEMENT_ACCENT[el]}`} />
              <span className="w-12 text-xs capitalize text-zinc-400">{el}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className={`h-full rounded-full ${ELEMENT_ACCENT[el]} transition-all`}
                  style={{ width: `${Math.min(counts[el] * 16.6, 100)}%` }}
                />
              </div>
              <span className="w-4 text-right text-xs tabular-nums text-zinc-500">{counts[el]}</span>
            </div>
          ))}
        </div>

        {infusions.length > 0 && (
          <div className="mt-3 border-t border-zinc-800 pt-3">
            {infusions.map((b) => {
              if (!b.infusion) return null
              const p = infusionProgress(b.infusion, counts)
              return (
                <p key={b.id} className={`text-xs ${p.have >= p.need ? 'text-emerald-300' : 'text-zinc-400'}`}>
                  {b.name}: {p.have}/{p.need} {b.infusion.element}
                </p>
              )
            })}
            <p className="mt-1.5 text-[10px] leading-relaxed text-zinc-600">
              Infusions activate on elemental counts once the Divination of the Elements incantation is cast — no arcana card needed.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Duo &amp; Legendary Paths</h2>
        <div className="mt-3 max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {candidates.length === 0 && <p className="text-xs italic text-zinc-600">No duos tracked for the selected gods.</p>}
          {candidates.map(({ boon, missing, ready }) => {
            const picked = owned.has(boon.id)
            const interactive = ready || picked
            return (
              <button
                key={boon.id}
                type="button"
                disabled={!interactive}
                onClick={() => onBuildChange(toggleBoon(build, boon))}
                className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                  picked
                    ? 'border-amber-400/70 bg-amber-400/10'
                    : ready
                      ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-400'
                      : 'cursor-not-allowed border-zinc-800 bg-zinc-900/50'
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-200">
                    <Icon id={boon.id} alt={boon.name} className="h-6 w-6" />
                    {boon.gods.map((g) => {
                      const god = GOD_BY_ID.get(g)
                      return god && activeGods.has(g) ? (
                        <span key={g} className="h-2 w-2 rounded-full" style={{ backgroundColor: god.color }} title={god.name} />
                      ) : null
                    })}
                    {boon.name}
                  </span>
                  <span
                    className={`shrink-0 text-[10px] font-semibold uppercase tracking-wide ${
                      picked ? 'text-amber-300' : ready ? 'text-emerald-300' : 'text-zinc-600'
                    }`}
                  >
                    {picked ? 'Picked' : ready ? 'Ready' : 'Locked'}
                  </span>
                </span>
                {!ready && !picked && missing.length > 0 && <Requirements missing={missing} />}
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={copyBuild}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-amber-400/60 hover:text-amber-100"
          >
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>
          <button
            type="button"
            onClick={shareLink}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 transition hover:border-amber-400/60 hover:text-amber-100"
          >
            {shared ? 'Link copied!' : 'Share link'}
          </button>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 transition hover:border-red-400/60 hover:text-red-300"
        >
          Reset run
        </button>
      </section>
    </div>
  )
}
