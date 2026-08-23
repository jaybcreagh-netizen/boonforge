import { BOON_BY_ID } from '../data/boons'
import { GODS } from '../data/gods'
import { HEX_BY_ID } from '../data/hexes'
import { KEEPSAKE_BY_ID } from '../data/keepsakes'
import type { BuildState, GodId, WeaponId } from '../data/types'
import { WEAPONS } from '../data/weapons'

interface WirePayload {
  w?: unknown
  a?: unknown
  p?: unknown
  k?: unknown
  h?: unknown
  g?: unknown
}

function encode(code: string): string {
  const bytes = new TextEncoder().encode(code)
  let bin = ''
  bytes.forEach((b) => {
    bin += String.fromCharCode(b)
  })
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decode(text: string): string {
  const bin = atob(text.replace(/-/g, '+').replace(/_/g, '/'))
  const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeBuild(build: BuildState): string {
  return encode(JSON.stringify({ w: build.weaponId, a: build.aspectId, p: build.picked, k: build.keepsakes, h: build.hexId, g: build.pool }))
}

export function decodeBuild(text: string): BuildState | null {
  try {
    const parsed = JSON.parse(decode(text)) as WirePayload
    if (typeof parsed !== 'object' || parsed === null) return null

    const weaponId =
      typeof parsed.w === 'string' && WEAPONS.some((w) => w.id === parsed.w) ? (parsed.w as WeaponId) : null

    let aspectId: string | null = null
    if (typeof parsed.a === 'string' && WEAPONS.some((w) => w.aspects.some((a) => a.id === parsed.a))) {
      aspectId = parsed.a
    }

    const picked = Array.isArray(parsed.p)
      ? parsed.p.filter((id): id is string => typeof id === 'string' && BOON_BY_ID.has(id))
      : []

    const keepsakes = Array.isArray(parsed.k)
      ? parsed.k.filter((id): id is string => typeof id === 'string' && KEEPSAKE_BY_ID.has(id))
      : []

    const hexId = typeof parsed.h === 'string' && HEX_BY_ID.has(parsed.h) ? parsed.h : null

    const validGodIds = new Set(GODS.map((g) => g.id as string))
    const pool = Array.isArray(parsed.g)
      ? parsed.g.filter((g): g is GodId => typeof g === 'string' && validGodIds.has(g))
      : []

    return { weaponId, aspectId, picked, keepsakes, hexId, pool }
  } catch {
    return null
  }
}
