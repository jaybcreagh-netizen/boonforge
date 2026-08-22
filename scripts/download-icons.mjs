import { readFile, mkdir, writeFile } from 'node:fs/promises'

const boons = JSON.parse(await readFile(new URL('./icon-urls-boons.json', import.meta.url), 'utf8'))
const extras = JSON.parse(await readFile(new URL('./icon-urls-extras.json', import.meta.url), 'utf8'))
const map = { ...boons, ...extras }

await mkdir(new URL('../public/icons/', import.meta.url), { recursive: true })

const queue = Object.entries(map)
let ok = 0
const failed = []

async function worker() {
  while (queue.length > 0) {
    const [id, url] = queue.shift()
    try {
      const res = await fetch(url, { headers: { Accept: 'image/png,image/jpeg,image/*;q=0.8' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 300) throw new Error(`suspiciously small (${buf.length}B)`)
      await writeFile(new URL(`../public/icons/${id}.png`, import.meta.url), buf)
      ok++
    } catch (err) {
      failed.push(`${id}: ${err.message}`)
    }
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()))
console.log(`downloaded ${ok}/${Object.keys(map).length}`)
if (failed.length > 0) console.log(`FAILED:\n${failed.join('\n')}`)
