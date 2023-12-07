// https://adventofcode.com/2017/day/2
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => line.split(/\s+/).map(Number))

const findEvenlyDivisibleValues = (array) => {
  for (let i = 0; i < array.length; ++i) {
    for (let j = i + 1; j < array.length; ++j) {
      const a = array[i]
      const b = array[j]
      if (a % b === 0) return [a, b]
      if (b % a === 0) return [b, a]
    }
  }
}

const part1 = (s) => {
  return parse(s)
    .map(nums => Math.max(...nums) - Math.min(...nums))
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  return parse(s)
    .map(nums => {
      const [a, b] = findEvenlyDivisibleValues(nums)
      return a / b
    })
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2017/02.txt')
  it('part 1', () => expect(part1(input)).toBe(41919))
  it('part 2', () => expect(part2(input)).toBe(303))
}
