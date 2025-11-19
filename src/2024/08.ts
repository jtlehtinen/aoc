// https://adventofcode.com/2024/day/8
import { readFile } from '~/io.js'

/** @param {string} s */
const solve = (s) => {
  const m = s.split('\n').map(x => x.split(''))
  const tryAdd = (m, set, x, y) => m[y]?.[x] != null && set.add((x << 20) | y)

  const antennas = []
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== '.') antennas.push([x, y])
    }
  }

  const r = [new Set(), new Set()]
  for (let i = 0; i < antennas.length; ++i) {
    for (let j = i + 1; j < antennas.length; ++j) {
      const [x0, y0] = antennas[i]
      const [x1, y1] = antennas[j]
      if (m[y0][x0] !== m[y1][x1]) continue

      let dx = x1 - x0
      let dy = y1 - y0
      tryAdd(m, r[0], x0 - dx, y0 - dy)
      tryAdd(m, r[0], x1 + dx, y1 + dy)
      for (let k =  0; tryAdd(m, r[1], x0 + k*dx, y0 + k*dy); ++k);
      for (let k = -1; tryAdd(m, r[1], x0 + k*dx, y0 + k*dy); --k);
    }
  }
  return r.map(x => x.size)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2024/08.txt')
  it('2024/08', () => {
    const [part1, part2] = solve(input)
    expect(part1).toBe(293)
    expect(part2).toBe(934)
  })
}
