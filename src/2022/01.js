// https://adventofcode.com/2022/day/1
import { readFile } from '~/io.js'

// parse returns the number of calories carried by each elf
// @param {string} s
const parse = (s) => {
  return s.split('\n\n')
    .map(section => {
      return section
        .match(/\d+/g)
        .map(Number)
        .reduce((a, b) => a + b, 0)
    })
}

const part1 = (s) => {
  return Math.max(...parse(s))
}

const part2 = (s) => {
  return parse(s)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/01.txt')
  it('part 1', () => expect(part1(input)).toBe(69912))
  it('part 2', () => expect(part2(input)).toBe(208180))
}
