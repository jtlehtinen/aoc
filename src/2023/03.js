// https://adventofcode.com/2023/day/3
import { readFile } from '~/io.js'

const pow2 = (x) => x * x

const distance = (x0, x1, y, tx, ty) => {
  if (tx < x0) return Math.sqrt(pow2(tx - x0) + pow2(ty - y))
  if (tx > x1) return Math.sqrt(pow2(tx - x1) + pow2(ty - y))
  return Math.abs(ty - y)
}

const getAdjacentNumbers = (numbers, x, y) => {
  return numbers
    .filter((n) => distance(n.x0, n.x1, n.y, x, y) < 2)
    .map(n => n.value)
}

const parse = (s) => {
  const lines = s.split('\n')
  const charAt = (x, y) => lines[y]?.[x] ?? '.'

  const adjToSymbol = (x, y) => {
    for (let tx = x-1; tx <= x+1; ++tx) {
      for (let ty = y-1; ty <= y+1; ++ty) {
        const c = charAt(tx, ty)
        if ((c < '0' || c > '9') && c !== '.') return true
      }
    }
  }

  const isPart = (x0, x1, y) => {
    for (let x = x0; x <= x1; ++x) {
      if (adjToSymbol(x, y)) return true
    }
    return false
  }

  const numbers = []
  for (const [y, line] of lines.entries()) {
    for (const m of line.matchAll(/\d+/g)) {
      const x0 = m.index
      const x1 = x0 + m[0].length - 1
      numbers.push({ x0, x1, y, value: +m[0], part: isPart(x0, x1, y) })
    }
  }

  const gears = []
  for (const [y, line] of lines.entries()) {
    for (const m of line.matchAll(/\*/g)) {
      const x = m.index
      const nums = getAdjacentNumbers(numbers, x, y)
      if (nums.length === 2) {
        gears.push({ x, y, ratio: nums[0] * nums[1] })
      }
    }
  }

  return { numbers, gears }
}

const part1 = (s) => {
  return parse(s).numbers
    .filter(({ part }) => part)
    .map(({ value }) => value)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  return parse(s).gears
    .map(g => g.ratio)
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/03.txt')
  it('part 1', () => expect(part1(input)).toBe(557705))
  it('part 2', () => expect(part2(input)).toBe(84266818))
}
