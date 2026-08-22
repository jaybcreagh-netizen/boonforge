import { GODS } from '../data/gods'
import { KEEPSAKES, KEEPSAKE_BY_ID } from '../data/keepsakes'
import { MAX_KEEPSAKES } from '../data/types'
import type { Keepsake } from '../data/types'
import Icon from './Icon'

interface Props {
  selected: string[]
  onToggle: (id: string) => void
}

export default function KeepsakePanel({ selected, onToggle }: Props) {
  const byGod = new Map(KEEPSAKES.map((k) => [k.god, k]))
  const full = selected.length >= MAX_KEEPSAKES
  const chosen = selected.flatMap((id): Keepsake[] => {
    const k = KEEPSAKE_BY_ID.get(id)
    return k ? [k] : []
  })

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Keepsakes</h2>
        <span className="text-[10px] uppercase tracking-wider text-zinc-600">
          {selected.length}/{MAX_KEEPSAKES}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {GODS.map((god) => {
          const keepsake = byGod.get(god.id)
          if (!keepsake) return null
          const active = selected.includes(keepsake.id)
          const disabled = full && !active
          return (
            <button
              key={keepsake.id}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(keepsake.id)}
              title={keepsake.description}
              className={`flex min-w-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 text-left text-xs transition ${
                active
                  ? 'border-amber-400/70 bg-amber-400/10 text-amber-100'
                  : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600'
              } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
            >
              <Icon id={keepsake.id} alt={keepsake.name} className="h-6 w-6" />
              <span className="truncate">{keepsake.name}</span>
            </button>
          )
        })}
      </div>
      {chosen.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-zinc-800 pt-3">
          {chosen.map((k) => (
            <p key={k.id} className="text-[11px] leading-relaxed text-zinc-500">
              <span className="text-zinc-300">{k.name}:</span> {k.description}
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
