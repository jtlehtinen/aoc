// https://adventofcode.com/2024/day/1
import { readFile } from '~/io.js'

/** @param {string} s */
const solve = (s) => {
  const n = s.match(/\d+/g).map(Number)
  const l = n.filter((_, i) => (i % 2) === 0).toSorted()
  const r = n.filter((_, i) => (i % 2) === 1).toSorted()
  const lset = new Set(l)
  const part1 = l.reduce((sum, x, i) => sum + Math.abs(x - r[i]), 0)
  const part2 = r.reduce((sum, x) => sum + (lset.has(x) && x), 0)
  return [part1, part2]
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2024/01.txt')
  it('part 1', () => expect(solve(input)[0]).toBe(2196996))
  it('part 2', () => expect(solve(input)[1]).toBe(23655822))
}
