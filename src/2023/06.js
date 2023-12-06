// https://adventofcode.com/2023/day/6
import { readFile } from '~/io.js'

/*
// Brute force
const countWaysToWin = (time, record) => {
  let r = 0
  for (let i = 0; i <= time; ++i) {
    if (i * (time - i) > record) r++
  }
  return r
}
*/

const countWaysToWin = (time, record) => {
  // Symmetry + binary search with jumps
  let i = 0
  for (let jump = time >> 1; jump >= 1; jump >>= 1) {
    for (let inext = i + jump; inext * (time - inext) <= record; inext += jump) {
      i = inext
    }
  }

  // The total number of outcomes is (remember 0) time+1
  // Subtract twice the number of outcomes that didn't
  // beat the record. (remember symmetry and 0 => 2*(i+1)).
  return Math.max(0, (time + 1) - 2 * (i + 1))
}

const part1 = (s) => {
  const lines = s.split('\n')
  const times = lines[0].match(/\d+/g).map(Number)
  const dists = lines[1].match(/\d+/g).map(Number)
  return times.reduce((r, t, i) => r * countWaysToWin(t, dists[i]), 1)
}

const part2 = (s) => {
  const lines = s.split('\n')
  const time = +lines[0].match(/\d+/g).join('')
  const dist = +lines[1].match(/\d+/g).join('')
  return countWaysToWin(time, dist)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/06.txt')
  it('part 1', () => expect(part1(input)).toBe(1710720))
  it('part 2', () => expect(part2(input)).toBe(35349468))
}
