// https://adventofcode.com/2025/day/1
import { readFile } from '~/io.js'

const MAX = 100

function solve(s: string) {
  let dial = 50
  let allZeroHits = 0
  let endZeroHits = 0

  for (const [_, dir, countStr] of s.matchAll(/^(R|L)(\d+)/mg)) {
    const count = Number(countStr)
    for (let i = 0; i < count; ++i) {
      const delta = dir === 'R' ? 1 : -1
      dial = (dial + delta + MAX) % MAX
      if (dial === 0) allZeroHits++
    }
    if (dial === 0) endZeroHits += 1
  }

  return { part1: endZeroHits, part2: allZeroHits }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2025/01.txt')
  const { part1, part2 } = solve(input)
  it('part 1', () => expect(part1).toBe(1182))
  it('part 2', () => expect(part2).toBe(6907))
}
