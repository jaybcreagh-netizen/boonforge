import { BOON_BY_ID } from '../data/boons'
import { GOD_BY_ID } from '../data/gods'
import Icon from './Icon'

interface Props {
  picked: string[]
  onUndo: () => void
}

export default function HistoryStrip({ picked, onUndo }: Props) {
  if (picked.length === 0) return null
  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2">
      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-amber-200/60">Run Log</span>
      <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
        {picked.map((id, i) => {
          const boon = BOON_BY_ID.get(id)
          if (!boon) return null
          const god = GOD_BY_ID.get(boon.gods[0])
          return (
            <span
              key={`${id}-${i}`}
              title={boon.description}
              className="flex shrink-0 items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-[11px] text-zinc-300"
            >
              <span className="text-zinc-600">{i + 1}</span>
              <Icon id={boon.id} alt={boon.name} className="h-4 w-4" />
              {god && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: god.color }} />}
              {boon.name}
            </span>
          )
        })}
      </div>
      <button
        type="button"
        onClick={onUndo}
        className="shrink-0 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400 transition hover:border-red-400/60 hover:text-red-300"
      >
        Undo
      </button>
    </div>
  )
}
