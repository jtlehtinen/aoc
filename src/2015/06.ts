// https://adventofcode.com/2015/day/6
import { readFile } from '~/io.js'

const parse = (s, dispatch) => {
  return s.split('\n').map(line => {
    const [, op, minX, minY, maxX, maxY] = line.match(/^(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)$/)
    return { op: dispatch[op], minX: +minX, minY: +minY, maxX: +maxX, maxY: +maxY }
  })
}

const solve = (s, dispatch) => {
  const actions = parse(s, dispatch)

  const lights = new Uint8Array(1000*1000)
  for (const { op, minX, minY, maxX, maxY } of actions) {
    for (let y = minY; y <= maxY; ++y) {
      for (let x = minX; x <= maxX; ++x) {
        const index = x + y * 1000
        lights[index] = op(lights[index])
      }
    }
  }

  return lights.reduce((sum, cur) => sum + cur, 0)
}

const part1 = (s) => {
  const dispatch = {
    'turn on':  x => 1,
    'turn off': x => 0,
    'toggle':   x => x^1,
  }
  return solve(s, dispatch)
}

const part2 = (s) => {
  const dispatch = {
    'turn on':  x => x+1,
    'turn off': x => Math.max(0, x-1),
    'toggle':   x => x+2,
  }
  return solve(s, dispatch)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/06.txt')
  it('part 1', () => expect(part1(input)).toBe(543903))
  it('part 2', () => expect(part2(input)).toBe(14687245))
}
