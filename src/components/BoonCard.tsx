import type { Boon } from '../data/types'
import { GOD_BY_ID } from '../data/gods'
import { boonName } from '../data/boons'
import Icon from './Icon'

const ELEMENT_STYLE: Record<string, string> = {
  air: 'text-sky-300 border-sky-400/30 bg-sky-400/10',
  water: 'text-blue-300 border-blue-400/30 bg-blue-400/10',
  earth: 'text-amber-300 border-amber-400/30 bg-amber-400/10',
  fire: 'text-orange-300 border-orange-400/30 bg-orange-400/10',
}

const TYPE_STYLE: Record<string, string> = {
  duo: 'text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10',
  legendary: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/10',
}

interface Props {
  boon: Boon
  picked?: boolean
  dimmed?: boolean
  missingGroups?: string[][]
  score?: number
  reason?: string
  onClick?: () => void
}

export default function BoonCard({ boon, picked = false, dimmed = false, missingGroups, score, reason, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border p-3 text-left transition ${
        picked ? 'border-amber-400/70 bg-amber-400/10' : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-600'
      } ${dimmed ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex flex-wrap items-center gap-1.5 font-medium text-zinc-100">
          <Icon id={boon.id} alt={boon.name} className="h-7 w-7" />
          {boon.gods.map((g) => {
            const god = GOD_BY_ID.get(g)
            return god ? (
              <span key={g} className="h-2 w-2 rounded-full" style={{ backgroundColor: god.color }} title={god.name} />
            ) : null
          })}
          {boon.name}
        </span>
        <span className="flex shrink-0 items-center gap-1">
          {typeof score === 'number' && score > 0 && (
            <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-emerald-300">
              +{score}
            </span>
          )}
          {boon.infusion && (
            <span className="rounded border border-zinc-600/50 bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-zinc-300">
              Infusion
            </span>
          )}
          {boon.type !== 'core' && (
            <span className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${TYPE_STYLE[boon.type]}`}>
              {boon.type}
            </span>
          )}
          {boon.element && (
            <span className={`rounded border px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${ELEMENT_STYLE[boon.element]}`}>
              {boon.element}
            </span>
          )}
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">{boon.description}</p>
      {reason && <p className="mt-1 text-[11px] font-medium leading-relaxed text-emerald-300/90">{reason}</p>}
      {missingGroups && missingGroups.length > 0 && (
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
          Needs{' '}
          {missingGroups.map((group, i) => (
            <span key={i}>
              {i > 0 && ' + '}
              <span className="text-zinc-400">{group.map(boonName).join(' / ')}</span>
            </span>
          ))}
        </p>
      )}
    </button>
  )
}
