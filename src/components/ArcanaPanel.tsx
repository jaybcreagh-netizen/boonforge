import { ARCANA_CARDS, BOON_ODDS_CARD_IDS, MAX_GRASP } from '../data/arcana'

export default function ArcanaPanel() {
  return (
    <details className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 open:pb-3">
      <summary className="cursor-pointer select-none list-none">
        <h2 className="inline text-xs font-semibold uppercase tracking-widest text-amber-200/80">Wheel of Fate</h2>
        <span className="ml-2 text-[11px] text-zinc-600">
          {ARCANA_CARDS.length} cards · {MAX_GRASP} grasp
        </span>
      </summary>
      <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1">
        {ARCANA_CARDS.map((card) => (
          <div key={card.id} className="rounded-lg border border-zinc-800/70 bg-zinc-900/60 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-right text-xs tabular-nums text-zinc-600">{card.numeral}</span>
              <span className={`text-sm ${BOON_ODDS_CARD_IDS.has(card.id) ? 'text-emerald-200' : 'text-zinc-200'}`}>{card.name}</span>
              <span className="ml-auto flex shrink-0 gap-1">
                {BOON_ODDS_CARD_IDS.has(card.id) && (
                  <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-emerald-300">
                    Boons
                  </span>
                )}
                <span
                  className="rounded border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-sky-300"
                  title="Grasp cost"
                >
                  {card.grasp === 0 ? 'Awakened' : `${card.grasp} grasp`}
                </span>
              </span>
            </div>
            <p className="mt-0.5 pl-10 text-[11px] leading-relaxed text-zinc-500">{card.effect}</p>
          </div>
        ))}
      </div>
    </details>
  )
}
