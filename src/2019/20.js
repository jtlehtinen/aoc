// https://adventofcode.com/2019/day/20
import { readFile } from '~/io.js'

const part1 = (s) => {
  return 0
}

const part2 = (s) => {
  return 0
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2019/20.txt')
  it('part 1', () => expect(part1(input)).toBe(0))
  it('part 2', () => expect(part2(input)).toBe(0))
}
