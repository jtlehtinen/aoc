// https://adventofcode.com/2022/day/6
import { readFile } from '~/io.js'

const firstMarker = (s, window) => {
  for (let i = window; i <= s.length; ++i) {
    const ss = s.substring(i - window, i)
    if (new Set(Array.from(ss)).size == window)
      return i
  }
}

const part1 = (s) => firstMarker(s, 4)
const part2 = (s) => firstMarker(s, 14)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/06.txt')
  it('part 1', () => expect(part1(input)).toBe(1804))
  it('part 2', () => expect(part2(input)).toBe(2508))
}
