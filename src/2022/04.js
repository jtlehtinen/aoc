// https://adventofcode.com/2022/day/4
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => line.match(/\d+/g).map(Number))

const part1 = (s) => {
  return parse(s)
    .filter(([a, b, c, d]) => (a >= c && b <= d) || (c >= a && d <= b))
    .length
}

const part2 = (s) => {
  return parse(s)
    .filter(([a, b, c, d]) => (b >= c && a <= d))
    .length
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/04.txt')
  it('part 1', () => expect(part1(input)).toBe(569))
  it('part 2', () => expect(part2(input)).toBe(936))
}
