import type { GodInfo } from './types'

export const GODS: GodInfo[] = [
  { id: 'zeus', name: 'Zeus', title: 'God of Thunder', color: '#fde047' },
  { id: 'hera', name: 'Hera', title: 'Queen of the Gods', color: '#c084fc' },
  { id: 'poseidon', name: 'Poseidon', title: 'God of the Sea', color: '#38bdf8' },
  { id: 'aphrodite', name: 'Aphrodite', title: 'Goddess of Love', color: '#f472b6' },
  { id: 'ares', name: 'Ares', title: 'God of War', color: '#ef4444' },
  { id: 'demeter', name: 'Demeter', title: 'Goddess of Winter', color: '#67e8f9' },
  { id: 'hephaestus', name: 'Hephaestus', title: 'God of the Forge', color: '#fb923c' },
  { id: 'hestia', name: 'Hestia', title: 'Goddess of the Hearth', color: '#f87171' },
  { id: 'apollo', name: 'Apollo', title: 'God of Light', color: '#93c5fd' },
  { id: 'artemis', name: 'Artemis', title: 'Goddess of the Hunt', color: '#86efac' },
  { id: 'athena', name: 'Athena', title: 'Goddess of Wisdom', color: '#bef264' },
  { id: 'hermes', name: 'Hermes', title: 'God of Swiftness', color: '#e5e5e5' },
  { id: 'hades', name: 'Hades', title: 'God of the Underworld', color: '#a78bfa' },
  { id: 'dionysus', name: 'Dionysus', title: 'God of Wine', color: '#e879f9' },
]

export const GOD_BY_ID: Map<string, GodInfo> = new Map(GODS.map((g) => [g.id, g]))
