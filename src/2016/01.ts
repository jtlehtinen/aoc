// https://adventofcode.com/2016/day/1
import { readFile } from '~/io.js'

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

const parse = (s) => {
  return s.split(', ')
    .map(s => ({ turn: s[0], count: +s.substring(1) }))
}

function *walk(s) {
  let facing = 0
  let x = 0
  let y = 0

  yield [x, y]
  for (const { turn, count } of parse(s)) {
    const d = turn === 'R' ? 1 : -1
    facing = (facing + d + dirs.length) % dirs.length

    for (let i = 0; i < count; ++i) {
      x += dirs[facing][0]
      y += dirs[facing][1]
      yield [x, y]
    }
  }
}

const part1 = (s) => {
  const [x, y] = [...walk(s)].at(-1)
  return Math.abs(x) + Math.abs(y)
}

const part2 = (s) => {
  const seen = new Set()

  for (const [x, y] of walk(s)) {
    const key = `${x},${y}`
    if (seen.has(key))
      return Math.abs(x) + Math.abs(y)
    seen.add(key)
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2016/01.txt')
  it('part 1', () => expect(part1(input)).toBe(353))
  it('part 2', () => expect(part2(input)).toBe(152))
}
