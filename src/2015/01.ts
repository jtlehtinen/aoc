// https://adventofcode.com/2015/day/1
import { readFile } from '~/io.js'

function floors(s: string): number[] {
  const r = [0]
  for (const c of s) {
    const delta = c === '(' ? 1 : -1
    r.push(r.at(-1)! + delta)
  }
  return r
}

const part1 = (s: string) => floors(s).at(-1)
const part2 = (s: string) => floors(s).indexOf(-1)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/01.txt')
  it('part 1', () => expect(part1(input)).toBe(232))
  it('part 2', () => expect(part2(input)).toBe(1783))
}
