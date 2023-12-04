// https://adventofcode.com/2023/day/4
import { readFile } from '~/io.js'

// parse returns the number of matches for each scratchcard.
// @param {string} s
const parse = (s) => {
  return s.split('\n').map(line => {
    const numbers = line.match(/\d+/g).slice(1)
    return numbers.length - new Set(numbers).size
  })
}

const part1 = (s) => {
  return parse(s)
    .filter(n => n > 0)
    .map(n => 2 ** (n - 1))
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  const matchCounts = parse(s)
  const cardCounts = Array(matchCounts.length).fill(0)

  for (const [i, matchCount] of matchCounts.entries()) {
    cardCounts[i] += 1

    const end = Math.min(i + matchCount, cardCounts.length - 1)
    for (let j = i + 1; j <= end; ++j)
      cardCounts[j] += cardCounts[i]
  }

  return cardCounts.reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/04.txt')
  it('part 1', () => expect(part1(input)).toBe(21158))
  it('part 2', () => expect(part2(input)).toBe(6050769))
}
