// https://adventofcode.com/2019/day/1
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(Number)

const fuel = (mass) => Math.max(0, Math.floor(mass / 3) - 2)

const fuelRecursive = (mass) => {
  if (mass <= 0) return 0
  const f = fuel(mass)
  return f + fuelRecursive(f)
}

const part1 = (s) => parse(s).map(fuel).reduce((a, b) => a + b, 0)
const part2 = (s) => parse(s).map(fuelRecursive).reduce((a, b) => a + b, 0)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2019/01.txt')
  it('part 1', () => expect(part1(input)).toBe(3198599))
  it('part 2', () => expect(part2(input)).toBe(4795042))
}
