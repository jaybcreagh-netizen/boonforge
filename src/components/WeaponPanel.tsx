import type { BuildState, WeaponId } from '../data/types'
import { WEAPONS, WEAPON_BY_ID } from '../data/weapons'

interface Props {
  build: BuildState
  onSelectWeapon: (id: WeaponId) => void
  onSelectAspect: (id: string | null) => void
}

export default function WeaponPanel({ build, onSelectWeapon, onSelectAspect }: Props) {
  const weapon = build.weaponId ? WEAPON_BY_ID.get(build.weaponId) : undefined

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Nocturnal Arms</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {WEAPONS.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => onSelectWeapon(w.id)}
            className={`rounded-lg border px-2.5 py-2 text-sm transition ${
              build.weaponId === w.id
                ? 'border-amber-400/70 bg-amber-400/10 text-amber-100'
                : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600'
            }`}
          >
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
    </section>
  )
}
