// https://adventofcode.com/2024/day/7
import { readFile } from '~/io.js'

/**
 * @param {number[]} row
 * @param {((a: number, b: number) => number)[]} ops
 */
const accept = (row, ops) => {
  const q = ops.map(op => ([op(row[1], row[2]), 3]))
  while (q.length) {
    const [got, idx] = q.pop()
    if (idx === row.length && got === row[0]) return 1
    if (idx < row.length && got <= row[0])
      ops.forEach(op => q.push([op(got, row[idx]), idx + 1]))
  }
  return 0
}

/** @param {string} s */
const solve = (s) => {
  const rows = s.split('\n').map(x => x.match(/\d+/g).map(Number))
  const add = (a, b) => a + b
  const mul = (a, b) => a * b
  const cat = (a, b) => 10 ** Math.floor(Math.log10(b) + 1) * a + b

  const r = [0, 0]
  for (const row of rows) {
    r[0] += row[0] * accept(row, [add, mul])
    r[1] += row[0] * accept(row, [add, mul, cat])
  }
  return r
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2024/07.txt')
  it('2024/07', () => {
    const [part1, part2] = solve(input)
    expect(part1).toBe(5030892084481)
    expect(part2).toBe(91377448644679)
  })
}
