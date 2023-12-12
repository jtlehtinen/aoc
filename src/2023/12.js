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

const setAndReturn = (memo, key, value) => {
  memo.set(key, value)
  return value
}

const recurse = (memo, pattern, lens, prev, pi, gi) => {
  if (pi === pattern.length)
    return Number(gi === lens.length)

  const key = `${prev}:${pi}:${gi}`
  if (memo.has(key)) return memo.get(key)

  const curr = pattern[pi]
  if (curr === '#' && prev === '#')
    return 0

  if (curr === '#' && prev === '.') {
    return substrCheck(pattern, pi, lens[gi], '#?')
      ? setAndReturn(memo, key, recurse(memo, pattern, lens, '#', pi + lens[gi], gi + 1))
      : setAndReturn(memo, key, 0)
  }

  if (curr === '.')
    return setAndReturn(memo, key, recurse(memo, pattern, lens, '.', pi + 1, gi))

  if (curr === '?') {
    let count = recurse(memo, pattern, lens, '.', pi + 1, gi)

    if (prev === '.' && substrCheck(pattern, pi, lens[gi], '#?'))
      count += recurse(memo, pattern, lens, '#', pi + lens[gi], gi + 1)

    return setAndReturn(memo, key, count)
  }
}

const countArrangements = (pattern, lens) => {
  const memo = new Map()

  let count = 0
  const canStartWithHash = substrCheck(pattern, 0, lens[0], '#?')
  if (canStartWithHash)   count += recurse(memo, pattern, lens, '#', lens[0], 1)
  if (pattern[0] === '.') count += recurse(memo, pattern, lens, '.', 1, 0)
  if (pattern[0] === '?') count += recurse(memo, pattern, lens, '.', 1, 0)
  return count
}

const part1 = (s) => {
  return parse(s)
    .map(([pattern, lens]) => countArrangements(pattern, lens))
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  return parse(s)
    .map(([pattern, lens]) => [
      Array(5).fill(pattern).join('?'),
      Array(5).fill(lens).flat(),
    ])
    .map(([pattern, lens]) => countArrangements(pattern, lens))
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/12.txt')
  it('part 1', () => expect(part1(input)).toBe(6871))
  it('part 2', () => expect(part2(input)).toBe(2043098029844))
}
