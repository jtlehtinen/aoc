// https://adventofcode.com/2023/day/12
import { readFile } from '~/io.js'

const parse = (s) => s.split('\n').map((line) => {
  const [pattern, csv] = line.split(' ')
  return [pattern, csv.split(',').map(Number)]
})

const substrCheck = (pattern, start, len, allowChars) => {
  if (!len || start + len > pattern.length) return false

  for (let i = start; i < start + len; ++i) {
    if (!allowChars.includes(pattern[i])) return false
  }
  return true
}

const recurse = (memo, pattern, lens, prev, pi, gi) => {
  if (pi === pattern.length)
    return Number(gi === lens.length)

  const key = (pi << 16) | (gi << 8) | prev.charCodeAt(0)
  if (memo.has(key)) return memo.get(key)

  let count = 0

  if (prev === '.' && substrCheck(pattern, pi, lens[gi], '#?'))
    count += recurse(memo, pattern, lens, '#', pi + lens[gi], gi + 1)

  if (pattern[pi] === '.' || pattern[pi] === '?')
    count += recurse(memo, pattern, lens, '.', pi + 1, gi)

  memo.set(key, count)
  return count
}

const sumArrangements = (s, repeat) => {
  return parse(s)
    .map(([pattern, lens]) => [
      Array(repeat).fill(pattern).join('?'),
      Array(repeat).fill(lens).flat(),
    ])
    .map(([pattern, lens]) => recurse(new Map(), pattern, lens, '.', 0, 0))
    .reduce((a, b) => a + b, 0)
}

const part1 = (s) => sumArrangements(s, 1)
const part2 = (s) => sumArrangements(s, 5)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/12.txt')
  it('part 1', () => expect(part1(input)).toBe(6871))
  it('part 2', () => expect(part2(input)).toBe(2043098029844))
}
