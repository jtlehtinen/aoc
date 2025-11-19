// https://adventofcode.com/2021/day/1
import { readFile } from '~/io.js'

// solve returns the number of times the sum of the sliding
// window increases when moving from left to right through
// the array of numbers parsed from s.
const solve = (s, window) => {
  const numbers = s.split('\n').map(Number)

  let count = 0
  for (let i = window; i < numbers.length; ++i) {
    if (numbers[i] > numbers[i - window]) count++
  }
  return count
}

const part1 = (s) => solve(s, 1)
const part2 = (s) => solve(s, 3)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2021/01.txt')
  it('part 1', () => expect(part1(input)).toBe(1195))
  it('part 2', () => expect(part2(input)).toBe(1235))
}
