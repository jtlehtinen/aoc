// https://adventofcode.com/2023/day/14
import { readFile } from '~/io.js'

const parse = (s) => { // wrap map with '#'
  const map = s.split('\n').map(line => ['#', ...line, '#'])
  const len = map[0].length
  return [ Array(len).fill('#'), ...map, Array(len).fill('#') ]
}

const moveRoundRock = (map, x, y, dx, dy) => {
  while (map[y + dy][x + dx] === '.') {
    map[y + dy][x + dx] = 'O'
    map[y][x] = '.'
    x += dx
    y += dy
  }
}

const rockMoves = { 'N': [0, -1], 'S': [0, +1], 'W': [-1, 0], 'E': [+1, 0] }
const roll = (map, dir) => {
  const w = map[0].length
  const h = map.length
  const x0 = dir === 'E' ? w - 1 : 0
  const x1 = dir === 'E' ?    -1 : w
  const y0 = dir === 'S' ? h - 1 : 0
  const y1 = dir === 'S' ?    -1 : h
  const sx = dir === 'E' ? -1 : 1
  const sy = dir === 'S' ? -1 : 1
  const [dx, dy] = rockMoves[dir]

  for (let y = y0; y !== y1; y += sy) {
    for (let x = x0; x !== x1; x += sx) {
      if (map[y][x] === 'O')
        moveRoundRock(map, x, y, dx, dy)
    }
  }
}

const calcLoad = (map) => {
  return map
    .map((row, y) => row.filter(c => c === 'O').length * (map.length - 1 - y))
    .reduce((a, b) => a + b, 0)
}

const part1 = (s) => {
  const map = parse(s)
  roll(map, 'N')
  return calcLoad(map)
}

const part2 = (s) => {
  const map = parse(s)
  const cache = new Map()

  for (let cycle = 1; cycle <= 1000000000; ++cycle) {
    roll(map, 'N')
    roll(map, 'W')
    roll(map, 'S')
    roll(map, 'E')

    const key = JSON.stringify(map)
    if (cache.has(key)) {
      const period = cycle - cache.get(key)
      while (cycle + period <= 1000000000) cycle += period
    }
    cache.set(key, cycle)
  }
  return calcLoad(map)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/14.txt')
  it('part 1', () => expect(part1(input)).toBe(112048))
  it('part 2', () => expect(part2(input)).toBe(105606))
}
