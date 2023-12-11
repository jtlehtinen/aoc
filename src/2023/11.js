// https://adventofcode.com/2023/day/11
import { readFile } from '~/io.js'

const sumShortestPath = (map, expansion) => {
  const w = map[0].length
  const h = map.length

  const galaxies = []
  const galaxyRows = new Set()
  const galaxyCols = new Set()

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (map[y][x] === '#') {
        galaxies.push({ x, y })
        galaxyCols.add(x)
        galaxyRows.add(y)
      }
    }
  }

  const cumEmptyCols = new Array(w).fill(0)
  const cumEmptyRows = new Array(h).fill(0)
  for (let x = 0; x < w; ++x) cumEmptyCols[x] = cumEmptyCols.at(x - 1) + (galaxyCols.has(x) ? 0 : 1)
  for (let y = 0; y < h; ++y) cumEmptyRows[y] = cumEmptyRows.at(y - 1) + (galaxyRows.has(y) ? 0 : 1)

  const n = galaxies.length
  const distances = new Array(n * n).fill(0)

  for (let i = 0; i < galaxies.length; ++i) {
    const a = galaxies[i]

    for (let j = i + 1; j < galaxies.length; ++j) {
      const b = galaxies[j]
      const dx = Math.abs(a.x - b.x)
      const dy = Math.abs(a.y - b.y)

      const emptyCols = Math.abs(cumEmptyCols[a.x] - cumEmptyCols[b.x])
      const emptyRows = Math.abs(cumEmptyRows[a.y] - cumEmptyRows[b.y])

      distances[i + j * n] = dx + dy + (emptyCols + emptyRows) * (expansion - 1)
    }
  }
  return distances.reduce((a, b) => a + b, 0)
}

const parse = (s) => s.split('\n').map(line => Array.from(line))
const part1 = (s) => sumShortestPath(parse(s), 2)
const part2 = (s) => sumShortestPath(parse(s), 1000000)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/11.txt')
  it('part 1', () => expect(part1(input)).toBe(9274989))
  it('part 2', () => expect(part2(input)).toBe(357134560737))
}
