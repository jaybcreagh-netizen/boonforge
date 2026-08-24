import { damageReport } from '../lib/damage'
import type { DamageReport } from '../lib/damage'

const BUCKET_LABELS: Record<DamageReport['buckets'][number]['key'], string> = {
  attack: 'Attack',
  special: 'Special',
  cast: 'Cast',
  omega: 'Omega Moves',
}

export default function DamagePanel({
  pickedIds,
  arcanaIds = [],
  hammerIds = [],
}: {
  pickedIds: string[]
  arcanaIds?: string[]
  hammerIds?: string[]
}) {
  const report = damageReport(pickedIds, arcanaIds, hammerIds)
  const maxMult = Math.max(...report.buckets.map((b) => b.mult), 1.5)

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-200/80">Damage Estimate</h2>
        <span className="text-[10px] uppercase tracking-wider text-zinc-600">{report.trackedCount} tagged boons</span>
      </div>

      <div className="mt-3 space-y-2">
        {report.buckets.map((b) => (
          <div key={b.key}>
            <div className="flex items-center gap-2">
              <span className="w-20 text-xs capitalize text-zinc-400">{BUCKET_LABELS[b.key]}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-600 to-amber-400"
                  style={{ width: `${Math.min((b.mult / maxMult) * 100, 100)}%` }}
                />
              </div>
              <span className={`w-14 text-right text-xs tabular-nums ${b.mult > 1 ? 'text-amber-200' : 'text-zinc-500'}`}>
                ×{b.mult.toFixed(2)}
              </span>
            </div>
            {b.notes.length > 0 && (
              <p className="mt-0.5 pl-[5.5rem] text-[10px] leading-relaxed text-zinc-600">{[...b.notes].join(' · ')}</p>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 border-t border-zinc-800 pt-2">
          <span className="w-20 text-xs text-zinc-400">Crit</span>
          <span className="flex-1 text-xs tabular-nums text-zinc-300">+{Math.round(report.critChance * 100)}%</span>
          <span className="w-14 text-right text-xs tabular-nums text-zinc-500">
            ~×{(1 + report.critChance * 0.5).toFixed(2)}
          </span>
        </div>

        {report.vulnPct > 0 && (
          <div className="flex items-center gap-2">
            <span className="w-20 text-xs text-zinc-400">Foes take</span>
            <span className="flex-1 text-xs tabular-nums text-emerald-300">+{Math.round(report.vulnPct * 100)}%</span>
          </div>
        )}
      </div>

      {(report.critNotes.length > 0 || report.vulnNotes.length > 0) && (
        <p className="mt-2 text-[10px] leading-relaxed text-zinc-600">
          {[...report.critNotes, ...report.vulnNotes].join(' · ')}
        </p>
      )}
      <p className="mt-2 text-[10px] italic leading-relaxed text-zinc-700">
        Relative multipliers at common-rarity values (crit assumed ×1.5). Weapon base damage, hammers and aspect ranks not modeled.
      </p>
    </section>
  )
}
