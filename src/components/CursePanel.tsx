import { CURSES } from '../data/curses'

export default function CursePanel() {
  return (
    <details className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 open:pb-3">
      <summary className="cursor-pointer select-none list-none">
        <h2 className="inline text-xs font-semibold uppercase tracking-widest text-amber-200/80">Chaos Curses</h2>
        <span className="ml-2 text-[11px] text-zinc-600">{CURSES.length} curses · each becomes a Blessing</span>
      </summary>
      <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
        {CURSES.map((curse) => (
          <div key={curse.id} className="rounded-lg border border-zinc-800/70 bg-zinc-900/60 px-3 py-2">
            <p className="text-sm text-zinc-200">{curse.name}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500">{curse.bane}</p>
          </div>
        ))}
      </div>
    </details>
  )
}
