// https://adventofcode.com/2020/day/1
import { readFile } from '~/io.js'

// Assumptions:
//  - All numbers are unique.

const part1 = (s) => {
  const numbers = s.split('\n').map(Number)
  const set = new Set([...numbers])

  for (const n of numbers) {
    const want = 2020 - n
    if (set.has(want)) return n * want
  }
}

const part2 = (s) => {
  const numbers = s.split('\n').map(Number)
  const set = new Set([...numbers])

  for (let i = 0; i < numbers.length; ++i) {
    for (let j = i + 1; j < numbers.length; ++j) {
      const a = numbers[i]
      const b = numbers[j]
      const want = 2020 - a - b
      if (set.has(want)) return a * b * want
    }
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2020/01.txt')
  it('part 1', () => expect(part1(input)).toBe(1007331))
  it('part 2', () => expect(part2(input)).toBe(48914340))
}
