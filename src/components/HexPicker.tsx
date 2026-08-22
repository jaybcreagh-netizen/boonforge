import { HEXES, HEX_BY_ID } from '../data/hexes'
import Icon from './Icon'

interface Props {
  selected: string | null
  onSelect: (id: string | null) => void
}

export default function HexPicker({ selected, onSelect }: Props) {
  const chosen = selected ? HEX_BY_ID.get(selected) : undefined
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Hex of the Moon</h2>
        {selected && (
          <button type="button" onClick={() => onSelect(null)} className="text-[10px] uppercase tracking-wider text-zinc-600 hover:text-red-300">
            Clear
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {HEXES.map((hex) => {
          const active = selected === hex.id
          return (
            <button
              key={hex.id}
              type="button"
              onClick={() => onSelect(active ? null : hex.id)}
              title={hex.effect}
              className={`flex min-w-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 text-left text-xs transition ${
                active ? 'border-violet-400/70 bg-violet-400/10 text-violet-100' : 'border-zinc-800 bg-zinc-900/70 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <Icon id={hex.id} alt={hex.name} className="h-6 w-6" />
              {hex.name}
            </button>
          )
        })}
      </div>
      {chosen && (
        <div className="mt-3 space-y-1 border-t border-zinc-800 pt-3">
          <p className="text-[11px] leading-relaxed text-zinc-400">{chosen.effect}</p>
          {chosen.godsent && <p className="text-[11px] leading-relaxed text-violet-300">Godsent — {chosen.godsent}</p>}
          {chosen.note && <p className="text-[10px] italic text-zinc-600">{chosen.note}</p>}
        </div>
      )}
    </section>
  )
}
