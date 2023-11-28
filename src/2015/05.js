// https://adventofcode.com/2015/day/5
import { readFile } from '~/io.js'

const part1 = (s) => {
  return s.split('\n')
    .filter(s =>  s.match(/([aeiou].*){3,}/)) // At least 3 vowels
    .filter(s =>  s.match(/([a-z])\1/))       // Any letter twice in a row
    .filter(s => !s.match(/(ab|cd|pq|xy)/))   // No [ab, cd, pq, xy]
    .length
}

const part2 = (s) => {
  return s.split('\n')
    .filter(s => s.match(/([a-z]).\1/))       // Any letter twice with a letter between
    .filter(s => s.match(/([a-z]{2}).*\1/))   // Any two letters twice
    .length
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/05.txt')
  it('part 1', () => expect(part1(input)).toBe(236))
  it('part 2', () => expect(part2(input)).toBe(51))
}
