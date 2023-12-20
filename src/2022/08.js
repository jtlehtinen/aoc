// https://adventofcode.com/2022/day/8
import { readFile } from '~/io.js'

const vdl = (map, x, y) => {
  for (let i = x-1; i >= 0; --i) {
    if (map[y][i] >= map[y][x]) return x - i
  }
  return x
}

const vdr = (map, x, y) => {
  for (let i = x+1; i < map.length; ++i) {
    if (map[y][i] >= map[y][x]) return i - x
  }
  return (map.length - 1) - x
}

const vdu = (map, x, y) => {
  for (let i = y-1; i >= 0; --i) {
    if (map[i][x] >= map[y][x]) return y - i
  }
  return y
}

const vdd = (map, x, y) => {
  for (let i = y+1; i < map.length; ++i) {
    if (map[i][x] >= map[y][x]) return i - y
  }
  return (map.length - 1) - y
}

const isVisibleFromOutside = (map, x, y, dx, dy) => {
  const h = map[y][x]
  x += dx
  y += dy
  while (x >= 0 && x < map.length && y >= 0 && y < map.length) {
    if (map[y][x] >= h) return false
    x += dx
    y += dy
  }
  return true
}

const part1 = (s) => {
  const map = s.split('\n').map(line => Array.from(line).map(Number))
  const deltas = [[-1,0], [1,0], [0,-1], [0,1]]

  let count = 0
  for (let y = 0; y < map.length; ++y) {
    for (let x = 0; x < map.length; ++x) {
      if (deltas.some(([dx, dy]) => isVisibleFromOutside(map, x, y, dx, dy)))
        count++
    }
  }
  return count
}

const part2 = (s) => {
  const map = s.split('\n').map(line => Array.from(line).map(Number))

  let maxScore = 0
  for (let y = 1; y < map.length - 1; ++y) {
    for (let x = 1; x < map.length - 1; ++x) {
      const score = vdl(map, x, y) * vdr(map, x, y) * vdu(map, x, y) * vdd(map, x, y)
      maxScore = Math.max(maxScore, score)
    }
  }
  return maxScore
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/08.txt')
  it('part 1', () => expect(part1(input)).toBe(1814))
  it('part 2', () => expect(part2(input)).toBe(330786))
}
