// https://adventofcode.com/2021/day/2
import { readFile } from '~/io.js'

const parse = (s) => {
  return s.split('\n').map(line => {
    const [action, count] = line.split(' ')
    return { action, count: +count }
  })
}

const simulate = (s, dispatch) => {
  let x = 0
  let d = 0
  let aim = 0
  for (const { action, count } of parse(s)) {
    [x, d, aim] = dispatch[action](count, x, d, aim)
  }
  return x * d
}

const part1 = (s) => {
  const dispatch = {
    'forward': (count, x, d, aim) => [x+count, d, aim],
    'down':    (count, x, d, aim) => [x, d+count, aim],
    'up':      (count, x, d, aim) => [x, d-count, aim],
  }
  return simulate(s, dispatch)
}

const part2 = (s) => {
  const dispatch = {
    'forward': (count, x, d, aim) => [x+count, d + aim*count, aim],
    'down':    (count, x, d, aim) => [x, d, aim+count],
    'up':      (count, x, d, aim) => [x, d, aim-count],
  }
  return simulate(s, dispatch)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2021/02.txt')
  it('part 1', () => expect(part1(input)).toBe(1670340))
  it('part 2', () => expect(part2(input)).toBe(1954293920))
}
