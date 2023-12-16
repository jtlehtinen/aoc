// https://adventofcode.com/2023/day/16
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => Array.from(line))
const pack2 = (x, y) => (y << 16) | x
const pack4 = (x, y, dx, dy) => ((dy + 1) << 24) | ((dx + 1) << 16) | (y << 8) | x // +1 to make non-negative

const simulate = (map, startX, startY, dx, dy) => {
  const vis = new Set([pack2(startX, startY)]) // visited tiles
  const his = new Set()                        // visited states

  const q = [{ x: startX, y: startY, dx, dy }]
  while (q.length > 0) {
    const { x, y, dx, dy } = q.pop()
    const state = pack4(x, y, dx, dy)
    if (x < 0 || x >= map.length || y < 0 || y >= map.length || his.has(state)) continue

    his.add(state)
    vis.add(pack2(x, y))

    const c = map[y][x]
    if (c === '.') {
      q.push({ x: x + dx, y: y + dy, dx, dy })
    } else if (c === '/') {
      if (dx ===  1)      q.push({ x: x, y: y - 1, dx:  0, dy: -1 })
      else if (dx === -1) q.push({ x: x, y: y + 1, dx:  0, dy:  1 })
      else if (dy ===  1) q.push({ x: x - 1, y: y, dx: -1, dy:  0 })
      else if (dy === -1) q.push({ x: x + 1, y: y, dx:  1, dy:  0 })
    } else if (c === '\\') {
      if (dx ===  1)      q.push({ x: x, y: y + 1, dx:  0, dy:  1 })
      else if (dx === -1) q.push({ x: x, y: y - 1, dx:  0, dy: -1 })
      else if (dy ===  1) q.push({ x: x + 1, y: y, dx:  1, dy:  0 })
      else if (dy === -1) q.push({ x: x - 1, y: y, dx: -1, dy:  0 })
    } else if (c === '|') {
      if (dy === 1 || dy === -1) {
        q.push({ x: x + dx, y: y + dy, dx, dy })
      } else {
        q.push({ x: x, y: y - 1, dx: 0, dy: -1 })
        q.push({ x: x, y: y + 1, dx: 0, dy:  1 })
      }
    } else if (c === '-') {
      if (dx === 1 || dx === -1) {
        q.push({ x: x + dx, y: y + dy, dx, dy })
      } else {
        q.push({ x: x - 1, y: y, dx: -1, dy: 0 })
        q.push({ x: x + 1, y: y, dx:  1, dy: 0 })
      }
    }
  }
  return vis.size
}

const part1 = (s) => {
  const map = parse(s)
  return simulate(map, 0, 0, 1, 0)
}

const part2 = (s) => {
  const map = parse(s)
  const d = map.length // map is square

  let max = 0
  for (let y = 0; y < d; y++) max = Math.max(max, simulate(map,     0,     y,  1,  0))
  for (let y = 0; y < d; y++) max = Math.max(max, simulate(map, d - 1,     y, -1,  0))
  for (let x = 0; x < d; x++) max = Math.max(max, simulate(map,     x,     0,  0,  1))
  for (let x = 0; x < d; x++) max = Math.max(max, simulate(map,     x, d - 1,  0, -1))
  return max
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/16.txt')
  it('part 1', () => expect(part1(input)).toBe(6361))
  it('part 2', () => expect(part2(input)).toBe(6701))
}
