// https://adventofcode.com/2024/day/3
import { readFile } from '~/io.js'

/** @param {string} s */
const solve = (s) => {
  const r = [0, 0]
  for (const x of s.matchAll(/(mul\(\d+,\d+\))/g)) {
    const m = x[0].match(/\d+/g).map(Number).reduce((a, b) => a * b)
    const f = s.slice(0, x.index).match(/(do\(\)|don't\(\))/g)?.at(-1) !== `don't()`
    r[0] += m
    r[1] += f * m
  }
  return r
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2024/03.txt')
  it('part 1', () => expect(solve(input)[0]).toBe(167650499))
  it('part 2', () => expect(solve(input)[1]).toBe(95846796))
}
