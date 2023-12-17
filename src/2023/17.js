// https://adventofcode.com/2023/day/17
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => Array.from(line).map(Number))
const pack = (x, y, dx, dy, turn) => (turn << 24) | ((dy + 1) << 20) | ((dx + 1) << 16) | (y << 8) | x // +1 to make non-negative

const findMinHeatLoss = (s, minMove, maxMove) => {
  const map = parse(s) // square
  const d = map.length

  const inBounds = (x, y) => x >= 0 && x < d && y >= 0 && y < d

  let minLoss = Infinity
  const lossMap = new Map()
  const q = [
    { x: 0, y: 0, dx: 1, dy: 0, loss: 0, turn: 0 },
    { x: 0, y: 0, dx: 0, dy: 1, loss: 0, turn: 0 },
  ]

  const tryEnqueue = (x, y, dx, dy, loss, turn) => {
    const state = pack(x, y, dx, dy, turn)
    if (loss < (lossMap.get(state) ?? Infinity)) {
      lossMap.set(state, loss)
      q.push({ x, y, dx, dy, loss, turn })
    }
  }

  while (q.length > 0) {
    q.sort((a, b) => b.loss - a.loss) // pop min loss first
    const { x, y, dx, dy, loss, turn } = q.pop()
    if (x === d-1 && y === d-1) {
      minLoss = Math.min(minLoss, loss)
      continue
    }

    if (turn) {
      tryEnqueue(x, y, dy, -dx, loss, 0) // left turn
      tryEnqueue(x, y, -dy, dx, loss, 0) // right turn
    } else {
      let lossToAdd = 0
      for (let move = 1; move <= maxMove; ++move) {
        const nx = x + move * dx
        const ny = y + move * dy
        if (!inBounds(nx, ny)) break

        lossToAdd += map[ny][nx]
        if (move >= minMove)
          tryEnqueue(nx, ny, dx, dy, loss + lossToAdd, 1)
      }
    }
  }
  return minLoss
}

const part1 = (s) => findMinHeatLoss(s, 1, 3)
const part2 = (s) => findMinHeatLoss(s, 4, 10)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/17.txt')
  it('part 1', () => expect(part1(input)).toBe(797))
  it('part 2', () => expect(part2(input)).toBe(914))
}
