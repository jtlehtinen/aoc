// https://adventofcode.com/2023/day/2
import { readFile } from '~/io.js'

const parseGames = (s) => {
  return s.split('\n').map((line) => {
    return {
      id: +line.match(/Game (\d+)/)[1],
      r: Math.max(...Array.from(line.matchAll(/(\d+) red/g),   m => Number(m[1]))),
      g: Math.max(...Array.from(line.matchAll(/(\d+) green/g), m => Number(m[1]))),
      b: Math.max(...Array.from(line.matchAll(/(\d+) blue/g),  m => Number(m[1]))),
    }
  })
}

const part1 = (s) => {
  return parseGames(s)
    .filter(({ r, g, b }) => r <= 12 && g <= 13 && b <= 14)
    .map(({ id }) => id)
    .reduce((sum, id) => sum + id, 0)
}

const part2 = (s) => {
  return parseGames(s)
    .map(({ r, g, b }) => r * g * b)
    .reduce((sum, p) => sum + p, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/02.txt')
  it('part 1', () => expect(part1(input)).toBe(2204))
  it('part 2', () => expect(part2(input)).toBe(71036))
}
