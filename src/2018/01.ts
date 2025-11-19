// https://adventofcode.com/2018/day/1
import { readFile } from '~/io.js'

const parse = s => s.split('\n').map(Number)

const part1 = (s) => parse(s).reduce((a, b) => a + b, 0)

const part2 = (s) => {
  const deltas = parse(s)

  let frequency = 0
  const seen = new Set([ frequency ])
  for (;;) {
    for (const d of deltas) {
      frequency += d
      if (seen.has(frequency)) return frequency
      seen.add(frequency)
    }
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2018/01.txt')
  it('part 1', () => expect(part1(input)).toBe(513))
  it('part 2', () => expect(part2(input)).toBe(287))
}
