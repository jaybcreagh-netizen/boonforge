import { ARCANA_CARDS, ARCANA_BY_ID, BOON_ODDS_CARD_IDS, MAX_GRASP } from '../data/arcana'
import Icon from './Icon'

interface Props {
  selected: string[]
  onToggle: (id: string) => void
}

export default function ArcanaPanel({ selected, onToggle }: Props) {
  const valid = selected.filter((id) => ARCANA_BY_ID.has(id))
  const used = valid.reduce((sum, id) => sum + (ARCANA_BY_ID.get(id)?.grasp ?? 0), 0)
  const remaining = MAX_GRASP - used

  return (
    <details className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 open:pb-3" open>
      <summary className="cursor-pointer select-none list-none">
        <h2 className="inline text-xs font-semibold uppercase tracking-widest text-amber-200/80">Wheel of Fate</h2>
        <span className={`ml-2 text-[11px] tabular-nums ${remaining < 0 ? 'text-red-400' : remaining === 0 ? 'text-amber-200' : 'text-zinc-600'}`}>
          {used}/{MAX_GRASP} grasp
        </span>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div
            className={`h-full rounded-full transition-all ${used > MAX_GRASP ? 'bg-red-500' : 'bg-sky-500'}`}
            style={{ width: `${Math.min((used / MAX_GRASP) * 100, 100)}%` }}
          />
        </div>
      </summary>
      <div className="mt-3 max-h-96 space-y-2 overflow-y-auto pr-1">
        {ARCANA_CARDS.map((card) => {
          const active = valid.includes(card.id)
          const wouldOverflow = !active && card.grasp > remaining
          return (
            <button
              key={card.id}
              type="button"
              disabled={wouldOverflow}
              onClick={() => onToggle(card.id)}
              title={card.effect}
              className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                active
                  ? 'border-sky-400/70 bg-sky-400/10'
                  : wouldOverflow
                    ? 'cursor-not-allowed border-zinc-800/60 bg-zinc-900/40 opacity-40'
                    : 'border-zinc-800/70 bg-zinc-900/60 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon id={card.id} alt={card.name} className="h-8 w-8 rounded" />
                <span className={`w-7 shrink-0 text-right text-xs tabular-nums ${active ? 'text-sky-200' : 'text-zinc-600'}`}>{card.numeral}</span>
                <span className={`text-sm ${active ? 'text-sky-100' : BOON_ODDS_CARD_IDS.has(card.id) ? 'text-emerald-200' : 'text-zinc-200'}`}>{card.name}</span>
                <span className="ml-auto flex shrink-0 gap-1">
                  {BOON_ODDS_CARD_IDS.has(card.id) && (
                    <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-emerald-300">
                      Boons
                    </span>
                  )}
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${
                      active ? 'border-sky-400/40 bg-sky-400/10 text-sky-300' : 'border-sky-400/20 bg-sky-400/5 text-sky-400/70'
                    }`}
                    title="Grasp cost"
                  >
                    {card.grasp === 0 ? 'Awakened' : `${card.grasp} grasp`}
                  </span>
                </span>
              </div>
              <p className="mt-0.5 pl-[3.4rem] text-[11px] leading-relaxed text-zinc-500">{card.effect}</p>
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-[10px] italic leading-relaxed text-zinc-700">
        Tap to equip within your grasp limit. Awakened cards activate via their unlock conditions and cost no grasp.
      </p>
    </details>
  )
}
