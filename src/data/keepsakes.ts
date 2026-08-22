import type { Keepsake } from './types'

export const KEEPSAKES: Keepsake[] = [
  { id: 'cloud-bangle', god: 'zeus', name: 'Cloud Bangle', donor: 'Zeus', description: "Zeus' boons are prioritized as rewards; once this night, Rarify one of his Common/Rare/Epic boons." },
  { id: 'iridescent-fan', god: 'hera', name: 'Iridescent Fan', donor: 'Hera', description: "Hera's boons are prioritized as rewards; once this night, Rarify one of her Common/Rare/Epic boons." },
  { id: 'vivid-sea', god: 'poseidon', name: 'Vivid Sea', donor: 'Poseidon', description: "Poseidon's boons are prioritized as rewards; once this night, Rarify one of his Common/Rare/Epic boons." },
  { id: 'beautiful-mirror', god: 'aphrodite', name: 'Beautiful Mirror', donor: 'Aphrodite', description: "Aphrodite's boons are prioritized as rewards; once this night, Rarify one of her Common/Rare/Epic boons." },
  { id: 'sword-hilt', god: 'ares', name: 'Sword Hilt', donor: 'Ares', description: "Ares' boons are prioritized as rewards; once this night, Rarify one of his Common/Rare/Epic boons." },
  { id: 'barley-sheaf', god: 'demeter', name: 'Barley Sheaf', donor: 'Demeter', description: "Demeter's boons are prioritized as rewards; once this night, Rarify one of her Common/Rare/Epic boons." },
  { id: 'adamant-shard', god: 'hephaestus', name: 'Adamant Shard', donor: 'Hephaestus', description: "Hephaestus' boons are prioritized as rewards; once this night, Rarify one of his Common/Rare/Epic boons." },
  { id: 'everlasting-ember', god: 'hestia', name: 'Everlasting Ember', donor: 'Hestia', description: "Hestia's boons are prioritized as rewards; once this night, Rarify one of her Common/Rare/Epic boons." },
  { id: 'harmonic-photon', god: 'apollo', name: 'Harmonic Photon', donor: 'Apollo', description: "Apollo's boons are prioritized as rewards; once this night, Rarify one of his Common/Rare/Epic boons." },
  { id: 'white-antler', god: 'artemis', name: 'White Antler', donor: 'Artemis', description: 'Next region grants +20-50% Critical chance, scaling with rarity, but caps your max health at 30.' },
  { id: 'gorgon-amulet', god: 'athena', name: 'Gorgon Amulet', donor: 'Athena', description: 'While you have no Death Defiance, Athena may appear once this night with higher-rarity boons.' },
  { id: 'metallic-droplet', god: 'hermes', name: 'Metallic Droplet', donor: 'Hermes', description: 'Move, strike, and channel 20% faster for 200-400 sec (duration scales with rarity; ranks up via Encounters).' },
]

export const KEEPSAKE_BY_ID: Map<string, Keepsake> = new Map(KEEPSAKES.map((k) => [k.id, k]))
