import type { Boon, BoonSlot } from '../data/types'
import { AUGMENT_LABELS } from '../data/types'
import { GOD_BY_ID } from '../data/gods'
import { BOON_SLOTS } from '../data/types'
import Icon from './Icon'

interface Props {
  picks: Record<BoonSlot, Boon | null>
  augments?: Boon[]
  onClear: (slot: BoonSlot) => void
}

const SLOT_LABELS: Record<BoonSlot, string> = {
  attack: 'Attack',
  special: 'Special',
  cast: 'Cast',
  sprint: 'Sprint',
}

export default function SlotBar({ picks, augments = [], onClear }: Props) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BOON_SLOTS.map((slot) => {
          const boon = picks[slot]
          const boosted = augments.filter((a) => a.augments === slot)
          return (
            <div
              key={slot}
              className={`min-h-[64px] rounded-xl border p-3 ${
                boon ? 'border-zinc-700 bg-zinc-900' : 'border-dashed border-zinc-800 bg-zinc-950/60'
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-200/60">
                {SLOT_LABELS[slot]}
                {boosted.length > 0 && <span className="ml-1 normal-case tracking-normal text-teal-400/80">+{boosted.length}</span>}
              </p>
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
      {augments.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-teal-400/20 bg-teal-400/5 px-3 py-2">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-widest text-teal-300/80">Augments</span>
          {augments.map((a) => (
            <span
              key={a.id}
              title={a.description}
              className="flex items-center gap-1 rounded-full border border-teal-400/25 bg-zinc-900 px-2 py-0.5 text-[11px] text-zinc-300"
            >
              <Icon id={a.id} alt={a.name} className="h-4 w-4" />
              {a.name}
              <span className="text-teal-400/70">→ {AUGMENT_LABELS[a.augments as keyof typeof AUGMENT_LABELS]}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
