import { readFileSync, writeFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'

const dedup = JSON.parse(readFileSync('/var/folders/3n/n1lnpkm55bsb86rrdsylj4t40000gn/T/opencode/hammers-dedup.json', 'utf8'))
const all = Object.values(dedup).flat()

const byTitle = new Map()
for (let batch = 0; batch < Math.ceil(all.length / 50); batch++) {
  const slice = all.slice(batch * 50, (batch + 1) * 50)
  const params = new URLSearchParams({
    action: 'query',
    titles: slice.map((h) => 'File:' + h.name.replace(/_/g, ' ') + '_II.png').join('|'),
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '96',
    format: 'json',
    formatversion: '2',
  })
  const res = await fetch('https://hades.fandom.com/api.php?' + params.toString())
  const json = await res.json()
  for (const p of json.query.pages) {
    if (p.imageinfo) byTitle.set(p.title, p.imageinfo[0].thumburl || p.imageinfo[0].url)
  }
}

let ok = 0
const missing = []
for (const h of all) {
  const url = byTitle.get('File:' + h.name + '_II.png') || byTitle.get('File:' + h.name + '.png')
  if (!url) {
    missing.push(h.id)
    continue
  }
  const img = await fetch(url, { headers: { Accept: 'image/png,image/*' } })
  if (!img.ok) {
    missing.push(h.id + ':HTTP' + img.status)
    continue
  }
  const buf = Buffer.from(await img.arrayBuffer())
  if (buf.length < 300) {
    missing.push(h.id + ':tiny')
    continue
  }
  await writeFile('public/icons/' + h.id + '.webp', buf)
  ok++
}
console.log('icons downloaded:', ok, '| missing:', missing.join(', ') || 'none')

const q = (s) => s.replace(/\\/g, '').replace(/'/g, "\\'")
const lines = [
  "import type { WeaponId } from './types'",
  '',
  'export interface Hammer {',
  '  id: string',
  '  name: string',
  '  effect: string',
  '}',
  '',
  'export const HAMMERS_BY_WEAPON: Record<WeaponId, Hammer[]> = {',
]
for (const [wid, hs] of Object.entries(dedup)) {
  lines.push(`  ${wid}: [`)
  for (const h of hs) {
    lines.push(`    { id: '${q(h.id)}', name: '${q(h.name)}', effect: '${q(h.effect)}' },`)
  }
  lines.push('  ],')
}
lines.push('}', '')
await writeFile('src/data/hammers.ts', lines.join('\n'))
console.log('wrote src/data/hammers.ts')
