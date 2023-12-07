// https://adventofcode.com/2020/day/2
import { readFile } from '~/io.js'

const parse = (s) => {
  return s.split('\n').map(line => {
    const [, lo, hi, char, password] = line.match(/(\d+)-(\d+) (\w): (\w+)/)
    return { lo: +lo, hi: +hi, char, password }
  })
}

const part1 = (s) => {
  return parse(s)
    .filter(({ lo, hi, char, password }) => {
      const occurrences = [...password].filter(c => c === char).length
      return occurrences >= lo && occurrences <= hi
    }).length
}

const part2 = (s) => {
  return parse(s)
    .filter(({ lo, hi, char, password }) =>
      (password[lo-1] === char) !== (password[hi-1] === char))
    .length
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2020/02.txt')
  it('part 1', () => expect(part1(input)).toBe(580))
  it('part 2', () => expect(part2(input)).toBe(611))
}
