import type { Boon, BoonSlot } from '../data/types'
import { GOD_BY_ID } from '../data/gods'
import { BOON_SLOTS } from '../data/types'
import Icon from './Icon'

interface Props {
  picks: Record<BoonSlot, Boon | null>
  onClear: (slot: BoonSlot) => void
}

const SLOT_LABELS: Record<BoonSlot, string> = {
  attack: 'Attack',
  special: 'Special',
  cast: 'Cast',
  sprint: 'Sprint',
}

export default function SlotBar({ picks, onClear }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {BOON_SLOTS.map((slot) => {
        const boon = picks[slot]
        return (
          <div
            key={slot}
            className={`min-h-[64px] rounded-xl border p-3 ${
              boon ? 'border-zinc-700 bg-zinc-900' : 'border-dashed border-zinc-800 bg-zinc-950'
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-200/60">{SLOT_LABELS[slot]}</p>
            {boon ? (
              <button type="button" onClick={() => onClear(slot)} className="group mt-1 flex items-center gap-1.5 text-left" title="Click to remove">
                <Icon id={boon.id} alt={boon.name} className="h-5 w-5" />
                {boon.gods.map((g) => {
                  const god = GOD_BY_ID.get(g)
                  return god ? <span key={g} className="h-2 w-2 rounded-full" style={{ backgroundColor: god.color }} /> : null
                })}
                <span className="text-sm font-medium text-zinc-100 group-hover:text-red-300">{boon.name}</span>
              </button>
            ) : (
              <p className="mt-1.5 text-sm italic text-zinc-700">Empty</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
