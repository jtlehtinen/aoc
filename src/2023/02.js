// https://adventofcode.com/2023/day/2
import { readFile } from '~/io.js'

const parseCubeSet = (s) => {
  const set = { r: 0, g: 0, b: 0 }
  for (const [, count, color] of s.matchAll(/(\d+) (\w+)/g)) {
    set[color[0]] += +count
  }
  return set
}

const parseGames = (s) => {
  return s.split('\n').map((line) => {
    const [game, ...sets] = line.split(/:|;/)
    return {
      id: +game.match(/Game (\d+)/)[1],
      sets: sets.map(parseCubeSet)
    }
  })
}

const part1 = (s) => {
  const possible = ({ r, g, b }) => r <= 12 && g <= 13 && b <= 14
  return parseGames(s)
    .filter((game) => game.sets.every(possible))
    .map((game) => game.id)
    .reduce((sum, id) => sum + id, 0)
}

const part2 = (s) => {
  return parseGames(s).map(({ sets }) => ({
      r: Math.max(...sets.map(set => set.r)),
      g: Math.max(...sets.map(set => set.g)),
      b: Math.max(...sets.map(set => set.b)),
    }))
    .map(({ r, g, b }) => r * g * b)
    .reduce((sum, p) => sum + p, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/02.txt')
  it('part 1', () => expect(part1(input)).toBe(2204))
  it('part 2', () => expect(part2(input)).toBe(71036))
}
