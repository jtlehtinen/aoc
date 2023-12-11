// https://adventofcode.com/2023/day/11
import { readFile } from '~/io.js'

const sumShortestPath = (map, expansion) => {
  const w = map[0].length
  const h = map.length

  const galaxiesX = []
  const galaxiesY = []
  const galaxyRows = new Array(h).fill(1) // 1 empty, 0 galaxy
  const galaxyCols = new Array(w).fill(1) // 1 empty, 0 galaxy

  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      if (map[y][x] === '#') {
        galaxiesX.push(x)
        galaxiesY.push(y)
        galaxyCols[x] = 0
        galaxyRows[y] = 0
      }
    }
  }

  const cumEmptyCols = new Array(w).fill(0) // first col doesn't matter
  const cumEmptyRows = new Array(h).fill(0) // first row doesn't matter
  for (let x = 1; x < w; ++x) cumEmptyCols[x] = cumEmptyCols[x - 1] + galaxyCols[x]
  for (let y = 1; y < h; ++y) cumEmptyRows[y] = cumEmptyRows[y - 1] + galaxyRows[y]

  let emptyColSum = 0
  let emptyRowSum = 0
  let lenSum = 0

  const N = galaxiesX.length
  for (let i = 0; i < N - 1; ++i) {
    const ax = galaxiesX[i]
    const ay = galaxiesY[i]

    const emptyColsAx = cumEmptyCols[ax]
    const emptyRowsAy = cumEmptyRows[ay]

    for (let j = i + 1; j < N; ++j) {
      const bx = galaxiesX[j]
      const by = galaxiesY[j]
      emptyColSum += Math.abs(emptyColsAx - cumEmptyCols[bx])
      emptyRowSum += Math.abs(emptyRowsAy - cumEmptyRows[by])
      lenSum += Math.abs(ax - bx) + Math.abs(ay - by)
    }
  }
  return lenSum + (emptyColSum + emptyRowSum) * (expansion - 1)
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
