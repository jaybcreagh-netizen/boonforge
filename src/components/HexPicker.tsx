import { HEXES, HEX_BY_ID } from '../data/hexes'
import { HEX_TREES } from '../data/hex-trees'
import Icon from './Icon'

interface Props {
  selected: string | null
  pickedNodes: string[]
  onSelect: (id: string | null) => void
  onToggleNode: (name: string) => void
}

const TIER_LABELS: Array<{ key: 'regular' | 'bright' | 'sublime' | 'duo'; label: string; color: string }> = [
  { key: 'regular', label: 'Regular', color: 'text-zinc-400' },
  { key: 'bright', label: 'Bright', color: 'text-amber-300/90' },
  { key: 'sublime', label: 'Sublime', color: 'text-sky-300/90' },
  { key: 'duo', label: 'Duo / Godsent', color: 'text-violet-300' },
]

export default function HexPicker({ selected, pickedNodes, onSelect, onToggleNode }: Props) {
  const chosen = selected ? HEX_BY_ID.get(selected) : undefined
  const tree = selected ? HEX_TREES[selected] : undefined

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
              <span className="truncate">{hex.name}</span>
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

      {tree && (
        <div className="mt-3 border-t border-zinc-800 pt-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-200/60">Path of Stars</h3>
            <span className="text-[10px] uppercase tracking-wider text-zinc-600">
              {pickedNodes.length} node{pickedNodes.length === 1 ? '' : 's'} marked
            </span>
          </div>
          <p className="mt-1 text-[10px] italic leading-relaxed text-zinc-700">
            A run offers a random subset (3 picks, or up to 7 with Gleaming/Moonglow). Mark the nodes you grabbed.
          </p>
          <div className="mt-2 space-y-2">
            {TIER_LABELS.map(({ key, label, color }) => {
              const tierNodes = tree.nodes.filter((n) => n.tier === key)
              if (tierNodes.length === 0) return null
              return (
                <div key={key}>
                  <p className={`text-[10px] font-semibold uppercase tracking-widest ${color}`}>{label}</p>
                  <div className="mt-1 space-y-1">
                    {tierNodes.map((node) => {
                      const active = pickedNodes.includes(node.name)
                      return (
                        <button
                          key={node.name}
                          type="button"
                          onClick={() => onToggleNode(node.name)}
                          title={node.effect}
                          className={`flex w-full items-start gap-2 rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition ${
                            active
                              ? 'border-violet-400/70 bg-violet-400/10 text-violet-100'
                              : 'border-zinc-800 bg-zinc-900/70 text-zinc-400 hover:border-zinc-600'
                          }`}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="font-medium">{node.name}</span>
                            <span className="block leading-relaxed text-zinc-500">{node.effect}</span>
                          </span>
                          {node.name === tree.godsentNode && (
                            <span className="shrink-0 rounded border border-violet-400/30 bg-violet-400/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-violet-300">
                              Godsent
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          {tree.notes && <p className="mt-2 text-[10px] italic leading-relaxed text-zinc-600">{tree.notes}</p>}
        </div>
      )}
    </section>
  )
}
