// https://adventofcode.com/2023/day/11
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => Array.from(line))

const sumShortestPath = (map, expansion) => {
  const width = map[0].length
  const height = map.length

  const galaxies = []
  const galaxyRows = new Set()
  const galaxyCols = new Set()

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      if (map[y][x] === '#') {
        galaxies.push({ x, y })
        galaxyCols.add(x)
        galaxyRows.add(y)
      }
    }
  }

  const n = galaxies.length
  const distances = new Array(n).fill(0).map(() => new Array(n).fill(0))

  for (let i = 0; i < galaxies.length; ++i) {
    const a = galaxies[i]

    for (let j = i + 1; j < galaxies.length; ++j) {
      const b = galaxies[j]
      const dx = Math.abs(a.x - b.x)
      const dy = Math.abs(a.y - b.y)

      let emptyRows = 0
      for (let y = Math.min(a.y, b.y) + 1; y < Math.max(a.y, b.y); ++y) {
        if (!galaxyRows.has(y))
        emptyRows++
      }

      let emptyCols = 0
      for (let x = Math.min(a.x, b.x) + 1; x < Math.max(a.x, b.x); ++x) {
        if (!galaxyCols.has(x))
          emptyCols++
      }

      distances[i][j] = dx + dy + (emptyRows + emptyCols) * (expansion - 1)
    }
  }

  return distances
    .flat()
    .reduce((a, b) => a + b, 0)
}

const part1 = (s) => sumShortestPath(parse(s), 2)
const part2 = (s) => sumShortestPath(parse(s), 1000000)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/11.txt')
  it('part 1', () => expect(part1(input)).toBe(9274989))
  it('part 2', () => expect(part2(input)).toBe(357134560737))
}
