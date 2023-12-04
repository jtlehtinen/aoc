// https://adventofcode.com/2023/day/4
import { readFile } from '~/io.js'

const parse = (s) => {
  // We only care about the matched numbers count. Everything else
  // is irrelevant.
  return s.split('\n').map((line) => {
    const [, right] = line.split(':')
    const [prize, player] = right.split('|')
      .map(s => s.trim().split(/\s+/).map(Number))

    return player.filter(n => prize.includes(n)).length
  })
}

const part1 = (s) => {
  const matchCounts = parse(s)
  return matchCounts
    .filter(count => count > 0)
    .map(count => 2**(count - 1))
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  const matchCounts = parse(s)
  const cardCounts = Array(matchCounts.length).fill(0)

  for (const [index, matchCount] of matchCounts.entries()) {
    cardCounts[index] += 1

    const endIndex = Math.min(index + matchCount, cardCounts.length - 1)
    for (let i = index + 1; i <= endIndex; ++i)
      cardCounts[i] += cardCounts[index]
  }

  return cardCounts.reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/04.txt')
  it('part 1', () => expect(part1(input)).toBe(21158))
  it('part 2', () => expect(part2(input)).toBe(6050769))
}
