import type { Suggestion } from '../lib/build'
import { GOD_BY_ID } from '../data/gods'

interface Props {
  items: Suggestion[]
  onPick: (id: string) => void
}

function reasonLine(item: Suggestion): string[] {
  const reasons = item.unlocks.map((u) => `Unlocks ${u.name}`)
  if (item.progressCount > 0) {
    reasons.push(`Advances ${item.progressCount} locked path${item.progressCount > 1 ? 's' : ''}`)
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

export default function SuggestionPanel({ items, onPick }: Props) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Suggested Picks</h2>
      {items.length === 0 && (
        <p className="mt-3 text-xs italic text-zinc-600">
          No synergy suggestions yet — pick a few boons and paths will start lighting up.
        </p>
      )}
      <div className="mt-3 space-y-2">
        {items.map((item, i) => (
          <button
            key={item.boon.id}
            type="button"
            onClick={() => onPick(item.boon.id)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-left transition hover:border-emerald-400/60"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-4 shrink-0 text-[11px] tabular-nums text-zinc-600">{i + 1}</span>
              {item.boon.gods.map((g) => {
                const god = GOD_BY_ID.get(g)
                return god ? <span key={g} className="h-2 w-2 rounded-full" style={{ backgroundColor: god.color }} title={god.name} /> : null
              })}
              <span className="text-sm text-zinc-200">{item.boon.name}</span>
              <span className="ml-auto rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-emerald-300">
                +{item.score}
              </span>
            </span>
            <span className="mt-0.5 block pl-6 text-[11px] leading-relaxed text-zinc-500">{reasonLine(item).join(' · ')}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
