// https://adventofcode.com/2022/day/3
import { readFile } from '~/io.js'

const priority = (c) => {
  if (c >= 'a' && c <= 'z') return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1
  if (c >= 'A' && c <= 'Z') return c.charCodeAt(0) - 'A'.charCodeAt(0) + 27
  return 0
}

const commonChar = (...strings) => {
  const [first, ...rest] = strings.map(s => new Set(Array.from(s)))
  for (const c of first) {
    if (rest.every(s => s.has(c)))
      return c
  }
}

const part1 = (s) => {
  return s.split('\n')
    .map(line => commonChar(line.slice(0, line.length / 2), line.slice(line.length / 2)))
    .map(priority)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  const lines = s.split('\n')

  let sum = 0
  for (let i = 0; i < lines.length; i += 3) {
    const c = commonChar(lines[i], lines[i+1], lines[i+2])
    sum += priority(c)
  }
  return sum
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/03.txt')
  it('part 1', () => expect(part1(input)).toBe(8401))
  it('part 2', () => expect(part2(input)).toBe(2641))
}
