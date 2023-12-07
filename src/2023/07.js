// https://adventofcode.com/2023/day/7
import { readFile } from '~/io.js'

const upgrades = {
  'five of a kind':  ['five of a kind'],
  'four of a kind':  ['four of a kind', 'five of a kind'],
  'full house':      ['full house'],
  'three of a kind': ['three of a kind', 'four of a kind', 'five of a kind'],
  'two pair':        ['two pair', 'full house'],
  'one pair':        ['one pair', 'three of a kind', 'four of a kind', 'five of a kind'],
  'high card':       ['high card', 'one pair', 'three of a kind', 'four of a kind', 'five of a kind', 'five of a kind']
}
const kinds = Object.keys(upgrades)

const kind = (hand, upgrades) => {
  const counts = Array(15).fill(0)
  hand.forEach(v => counts[v]++)

  const jokers = counts[0]
  counts[0] = 0

  if (counts.includes(5)) return 'five of a kind'
  if (counts.includes(4)) return upgrades['four of a kind'][jokers]
  if (counts.includes(3)) return counts.includes(2) ? 'full house' : upgrades['three of a kind'][jokers]

  const pairs = counts.filter(c => c === 2)
  if (pairs.length === 2) return upgrades['two pair'][jokers]
  if (pairs.length === 1) return upgrades['one pair'][jokers]

  return upgrades['high card'][jokers]
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
    handBids.push({ hand, bid: +bid_, kind: kind(hand, upgrades) })
  }

  handBids.sort((a, b) => {
    if (a.kind === b.kind) {
      for (let i = 0; i < 5; ++i) {
        if (a.hand[i] !== b.hand[i]) return a.hand[i] - b.hand[i]
      }
      return 0
    } else {
      for (const kind of kinds) {
        if (a.kind === kind) return 1
        if (b.kind === kind) return -1
      }
    }
    throw new Error('unreachable')
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
