// https://adventofcode.com/2023/day/13
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n\n').map(section => section.split('\n'))

const hammingDistance = (a, b) => {
  let d = 0
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) d++
  }
  return d
}

const reflectLen = (sequence, pivot, expectErrors) => {
  let L = pivot
  let R = pivot + 1
  let errors = 0

  while (L >= 0 && R < sequence.length && errors <= expectErrors) {
    errors += hammingDistance(sequence[L], sequence[R])
    L--
    R++
  }

  return (errors === expectErrors) ? pivot - L : 0
}

const summarize = (s, expectErrors) => {
  let hor = 0
  let ver = 0

  for (const map of parse(s)) {
    const w = map[0].length
    const h = map.length

    const rows = new Array(h).fill(0).map((_, y) => map[y])
    const cols = new Array(w).fill(0).map((_, x) => map.map(row => row[x]).join(''))

    hor += rows.findIndex((_, i) => reflectLen(rows, i, expectErrors) !== 0) + 1
    ver += cols.findIndex((_, i) => reflectLen(cols, i, expectErrors) !== 0) + 1
  }

  return 100 * hor + ver
}

const part1 = (s) => summarize(s, 0)
const part2 = (s) => summarize(s, 1)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/13.txt')
  it('part 1', () => expect(part1(input)).toBe(27664))
  it('part 2', () => expect(part2(input)).toBe(33991))
}
