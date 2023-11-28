// https://adventofcode.com/2015/day/3
import { readFile } from '~/io.js'

const pack = (x, y) => (x + 256) | ((y + 256) << 16)

const deliverPresents = (s, actorCount) => {
  const x = new Int32Array(actorCount)
  const y = new Int32Array(actorCount)
  const visitedHouses = new Set([pack(0, 0)])

  for (const [index, c] of [...s].entries()) {
    const actor = index % actorCount
    switch (c) {
      case '^': y[actor] += 1; break
      case 'v': y[actor] -= 1; break
      case '<': x[actor] -= 1; break
      case '>': x[actor] += 1; break
    }
    visitedHouses.add(pack(x[actor], y[actor]))
  }
  return visitedHouses.size
}

const part1 = (s) => deliverPresents(s, 1)
const part2 = (s) => deliverPresents(s, 2)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/03.txt')
  it('part 1', () => expect(part1(input)).toBe(2081))
  it('part 2', () => expect(part2(input)).toBe(2341))
}
