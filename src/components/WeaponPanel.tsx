import { useMemo, useState } from 'react'
import type { BuildState, WeaponId } from '../data/types'
import { WEAPONS, WEAPON_BY_ID } from '../data/weapons'
import { HAMMERS_BY_WEAPON } from '../data/hammers'
import Icon from './Icon'

interface Props {
  build: BuildState
  onSelectWeapon: (id: WeaponId) => void
  onSelectAspect: (id: string | null) => void
  onToggleHammer: (id: string) => void
}

export default function WeaponPanel({ build, onSelectWeapon, onSelectAspect, onToggleHammer }: Props) {
  const [showHammers, setShowHammers] = useState(false)
  const weapon = build.weaponId ? WEAPON_BY_ID.get(build.weaponId) : undefined
  const hammers = useMemo(() => (build.weaponId ? HAMMERS_BY_WEAPON[build.weaponId] ?? [] : []), [build.weaponId])

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Nocturnal Arms</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {WEAPONS.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => onSelectWeapon(w.id)}
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition ${
              build.weaponId === w.id
                ? 'border-amber-400/70 bg-amber-400/10 text-amber-100'
                : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600'
            }`}
          >
            <Icon id={w.id} alt={w.name} className="h-7 w-7" />
            {w.name}
          </button>
        ))}
      </div>

      {weapon ? (
        <div className="mt-4 space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-200/60">Aspects</h3>
          {weapon.aspects.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelectAspect(a.id)}
              className={`w-full rounded-lg border p-2.5 text-left transition ${
                build.aspectId === a.id
                  ? 'border-amber-400/70 bg-amber-400/10'
                  : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-600'
              }`}
            >
              <span className="flex items-center justify-between gap-2 text-sm font-medium text-zinc-200">
                {a.name}
                <span className="flex gap-1">
                  {a.hidden && (
                    <span className="rounded border border-violet-400/30 bg-violet-400/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-violet-300">
                      Hidden
                    </span>
                  )}
                  {!a.hidden && a.default && (
                    <span className="rounded border border-zinc-600/50 bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                      Default
                    </span>
                  )}
                </span>
              </span>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{a.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-xs italic text-zinc-600">Select a weapon to see its aspects.</p>
      )}

      {weapon && hammers.length > 0 && (
        <div className="mt-4 border-t border-zinc-800 pt-3">
          <button
            type="button"
            onClick={() => setShowHammers((v) => !v)}
            className="flex w-full items-baseline justify-between text-left"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-200/60">Daedalus Hammers</h3>
            <span className="text-[10px] uppercase tracking-wider text-zinc-600">
              {build.hammers.length} taken · {showHammers ? 'hide' : 'show'}
            </span>
          </button>
          {showHammers && (
            <>
              <p className="mt-1.5 text-[10px] italic text-zinc-700">You'll see 2 hammer offers per run — mark the ones you grabbed.</p>
              <div className="mt-2 max-h-72 space-y-1.5 overflow-y-auto pr-1">
                {hammers.map((hammer) => {
                  const active = build.hammers.includes(hammer.id)
                  return (
                    <button
                      key={hammer.id}
                      type="button"
                      onClick={() => onToggleHammer(hammer.id)}
                      title={hammer.effect}
                      className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs transition ${
                        active
                          ? 'border-orange-400/70 bg-orange-400/10 text-orange-100'
                          : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      <Icon id={hammer.id} alt={hammer.name} className="h-5 w-5" />
                      <span className="truncate">{hammer.name}</span>
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}
