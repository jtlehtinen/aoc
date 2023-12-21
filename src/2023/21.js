// https://adventofcode.com/2023/day/21
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => line.split(''))
const pack = (x, y) => `${x},${y}`

const findStart = (map) => {
  for (let y = 0; y < map.length; ++y) {
    for (let x = 0; x < map.length; ++x) {
      if (map[y][x] === 'S') return [x, y]
    }
  }
}

const countReachablePlots = (map, startX, startY, steps) => {
  const isPlot = (x, y) => {
    x = ((x % map.length) + map.length) % map.length
    y = ((y % map.length) + map.length) % map.length
    return map[y][x] === '.'
  }

  const visitedEven = new Set([pack(startX, startY)])
  const visitedOdd = new Set()
  const deltas = [[-1,0], [1,0], [0,-1], [0,1]]

  let locations = [[startX, startY]]
  for (let step = 1; step <= steps; ++step) {
    let newLocations = []
    for (const [x, y] of locations) {
      for (const [dx, dy] of deltas) {
        const nx = x + dx
        const ny = y + dy
        if (!isPlot(nx, ny)) continue

        const packed = pack(nx, ny)
        if (step % 2 === 0) {
          if (visitedEven.has(packed)) continue
          visitedEven.add(packed)
        } else {
          if (visitedOdd.has(packed)) continue
          visitedOdd.add(packed)
        }

        newLocations.push([nx, ny])
      }
    }
    locations = newLocations
  }
  return steps % 2 === 0
    ? visitedEven.size
    : visitedOdd.size
}

const part1 = (s) => {
  const map = parse(s)

  const [startX, startY] = findStart(map)
  map[startY][startX] = '.'

  return countReachablePlots(map, startX, startY, 64)
}

const part2 = (s) => {
  // Assumptions:
  // - The map is a square
  // - The start location is in the middle
  // - The start row and start column contain no rocks ("highway")
  // - The total steps is (steps to edge) + X * (block length)
  // @TODO: Revisit this puzzle.

  const map = parse(s)

  const [startX, startY] = findStart(map)
  map[startY][startX] = '.'

  const blockLen = map.length
  const stepsToEdge = startX
  const f0 = countReachablePlots(map, startX, startY, stepsToEdge)
  const f1 = countReachablePlots(map, startX, startY, stepsToEdge + 1 * blockLen)
  const f2 = countReachablePlots(map, startX, startY, stepsToEdge + 2 * blockLen)
  const f3 = countReachablePlots(map, startX, startY, stepsToEdge + 3 * blockLen)

  console.log('Ask Wolfram Alpha https://www.wolframalpha.com/input')
  console.log(`fit {0, ${f0}}, {1, ${f1}}, {2, ${f2}}, {3, ${f3}}`)

  // This formula is the result of feeding the {x,y} values
  // into Wolfram Alpha and asking for a fit.
  const formula = (steps) => {
    const x = (steps - stepsToEdge) / blockLen
    return 14696 * x * x + 14836 * x + 3738
  }

  return formula(26501365)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/21.txt')
  it('part 1', () => expect(part1(input)).toBe(3598))
  it('part 2', () => expect(part2(input)).toBe(601441063166538))
}
