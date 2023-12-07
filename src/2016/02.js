// https://adventofcode.com/2016/day/2
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map(line => line.split(''))

const solve = (numpad, s, x, y) => {
  const delta = {
    x: { 'U':  0, 'D': 0, 'L': -1 , 'R': 1},
    y: { 'U': -1, 'D': 1, 'L':  0 , 'R': 0},
  }

  let code = ''
  for (const moves of parse(s)) {
    for (const move of moves) {
      const testX = x + delta.x[move]
      const testY = y + delta.y[move]
      if (numpad[testY][testX] !== 'x') {
        x = testX
        y = testY
      }
    }
    code += numpad[y][x]
  }
  return code
}

const part1 = (s) => {
  const numpad = [
    ['x', 'x', 'x', 'x', 'x'],
    ['x', '1', '2', '3', 'x'],
    ['x', '4', '5', '6', 'x'],
    ['x', '7', '8', '9', 'x'],
    ['x', 'x', 'x', 'x', 'x'],
  ]
  return solve(numpad, s, 2, 2)
}

const part2 = (s) => {
  const numpad = [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', '1', 'x', 'x', 'x'],
    ['x', 'x', '2', '3', '4', 'x', 'x'],
    ['x', '5', '6', '7', '8', '9', 'x'],
    ['x', 'x', 'A', 'B', 'C', 'x', 'x'],
    ['x', 'x', 'x', 'D', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ]
  return solve(numpad, s, 1, 3)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2016/02.txt')
  it('part 1', () => expect(part1(input)).toBe('38961'))
  it('part 2', () => expect(part2(input)).toBe('46C92'))
}
