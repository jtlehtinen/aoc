// https://adventofcode.com/2017/day/1
import { readFile } from '~/io.js'

const captcha = (s, step) => {
  const digits = [...s].map(Number)
  return digits
    .filter((d, i) => d === digits[(i + step) % digits.length])
    .reduce((a, b) => a + b, 0)
}

const part1 = (s) => captcha(s, 1)
const part2 = (s) => captcha(s, Math.floor(s.length/2))

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2017/01.txt')
  it('part 1', () => expect(part1(input)).toBe(1175))
  it('part 2', () => expect(part2(input)).toBe(1166))
}
