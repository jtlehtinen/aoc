// https://adventofcode.com/2023/day/7
import { readFile } from '~/io.js'

const pack = (counts) => counts[0] << 15 | counts[1] << 12 | counts[2] << 9 | counts[3] << 6 | counts[4] << 3 | counts[5]

const kind = (hand) => {
  const counts = Array(15).fill(0)
  hand.forEach(c => counts[c]++)

  const jokers = counts[0]
  counts[0] = 0

  counts.sort((a, b) => b - a)
  counts[0] += jokers

  return pack(counts)
}

const totalWinnings = (s, withJokers) => {
  const handBids = []
  for (const line of s.split('\n')) {
    const [hand_, bid_] = line.split(' ')
    const hand = hand_.split('').map(c => {
      if (c === 'T') return 10
      if (c === 'J') return withJokers ? 0 : 11
      if (c === 'Q') return 12
      if (c === 'K') return 13
      if (c === 'A') return 14
      return +c
    })
    handBids.push({ hand, bid: +bid_, kind: kind(hand) })
  }

  handBids.sort((a, b) => {
    if (a.kind !== b.kind)
      return a.kind - b.kind

    for (let i = 0; i < 5; ++i) {
      if (a.hand[i] !== b.hand[i])
        return a.hand[i] - b.hand[i]
    }
    return 0
  })

  return handBids
    .map((hb, index) => hb.bid * (index + 1))
    .reduce((a, b) => a + b, 0)
}

const part1 = (s) => totalWinnings(s, false)
const part2 = (s) => totalWinnings(s, true)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/07.txt')
  it('part 1', () => expect(part1(input)).toBe(251121738))
  it('part 2', () => expect(part2(input)).toBe(251421071))
}

/*

upgrades:
  five of a kind    =>
  four of a kind    => five of a kind
  full house        =>
  three of a kind   => four of a kind => five of a kind
  two pair          => full house
  one pair          => three of a kind => four of a kind => five of a kind
  high card         => one pair => three of a kind => four of a kind => five of a kind

*/
