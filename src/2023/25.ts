// https://adventofcode.com/2023/day/25
import { readFile } from '~/io.js'

class Xorshift { // Math.random doesn't allow seeding.
  constructor(seed = 1) {
    this.state = seed
  }
  next() {
    this.state ^= this.state << 13
    this.state ^= this.state >> 17
    this.state ^= this.state << 5
    return this.state >>> 0 // ensure non-negative
  }
}

const parse = (s) => {
  const edges = []
  for (const line of s.split('\n')) {
    const [component, ...neighbors] = line.match(/\w+/g)
    neighbors.forEach(n => edges.push([component, n]))
  }
  return edges
}

const karger = (verts, edges, seed) => {
  verts = structuredClone(verts)
  edges = structuredClone(edges)

  const random = new Xorshift(seed)

  const superNodeMap = new Map() // map from "super-node" to set of original vertices
  verts.forEach(v => superNodeMap.set(v, new Set([ v ])))

  while (verts.length > 2) {
    const randomEdgeIndex = random.next() % edges.length
    const [u, v] = edges[randomEdgeIndex]

    // merge, i.e. all vertices of u are now in v
    superNodeMap.get(u).forEach(vert => superNodeMap.get(v).add(vert))
    superNodeMap.delete(u)

    // contract the edge, remove u and all edges between u and v,
    // v is the new merged vertex
    verts = verts.filter(vertex => vertex !== u)
    edges = edges.filter(edge => !(edge.includes(u) && edge.includes(v)))

    // all edges to u are now edges to v
    for (const edge of edges) {
      if (edge[0] === u) edge[0] = v
      if (edge[1] === u) edge[1] = v
    }
  }

  const [subgraph1, subgraph2] = Array.from(superNodeMap.values())

  return {
    cuts: edges.length,
    subgraph1,
    subgraph2,
  }
}

const part1 = (s) => {
  const edges = parse(s)
  const verts = Array.from(new Set(edges.flat()))

  const { subgraph1, subgraph2 } = karger(verts, edges, 3103839491)
  return subgraph1.size * subgraph2.size

  /*
  for (;;) {
    const seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) >>> 0
    const { cuts, subgraph1, subgraph2 } = karger(verts, edges, seed)
    if (cuts === 3) {
      console.log(`A "correct" seed is ${seed}`)
      return subgraph1.size * subgraph2.size
    }
  }
  */
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/25.txt')
  it('part 1', () => expect(part1(input)).toBe(551196))
}
