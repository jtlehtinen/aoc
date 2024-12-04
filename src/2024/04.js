// https://adventofcode.com/2024/day/4
import { readFile } from '~/io.js'

/** @param {string} s */
const solve = (s) => {
  const test = (g, x, y, dx, dy, str) => Array.from(str).every((c, i) => c === g[x+i*dx]?.[y+i*dy])
  const g = s.split('\n').map(x => Array.from(x))
  const r = [0, 0]
  for (let y = 0; y < g.length; ++y) {
    for (let x = 0; x < g[0].length; ++x) {
      r[0] += test(g, x, y,  1, 0, 'XMAS') || test(g, x, y,  1, 0, 'SAMX')
      r[0] += test(g, x, y,  0, 1, 'XMAS') || test(g, x, y,  0, 1, 'SAMX')
      r[0] += test(g, x, y,  1, 1, 'XMAS') || test(g, x, y,  1, 1, 'SAMX')
      r[0] += test(g, x, y, -1, 1, 'XMAS') || test(g, x, y, -1, 1, 'SAMX')
      r[1] += (test(g, x, y, 1, 1, 'MAS') || test(g, x, y, 1, 1, 'SAM')) &&
        (test(g, x+2, y, -1, 1, 'MAS') || test(g, x+2, y, -1, 1, 'SAM'))
    }
  }
  return r
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2024/04.txt')
  it('part 1', () => expect(solve(input)[0]).toBe(2468))
  it('part 2', () => expect(solve(input)[1]).toBe(1864))
}
