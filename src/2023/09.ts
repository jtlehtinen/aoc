// https://adventofcode.com/2023/day/9
import { readFile } from '~/io.js'

const parse = (s) => s
  .split('\n')
  .map(line => line.split(/\s+/).map(Number))

const completeSequences = (sequence) => {
  const result = [sequence]

  while (sequence.length > 1 && sequence.some(x => x !== 0)) {
    const nextSequence = []
    for (let i = 1; i < sequence.length; ++i)
      nextSequence.push(sequence[i] - sequence[i - 1])
    sequence = nextSequence

    result.push(sequence)
  }

  return result
}

const extrapolateLast = (sequence) => {
  return completeSequences(sequence)
    .map(s => s.at(-1))
    .reduce((a, b) => a + b, 0)
}

const extrapolateFirst = (sequence) => {
  return completeSequences(sequence)
    .reverse()
    .map(s => s[0])
    .reduce((a, b) => b - a, 0)
}

const part1 = (s) => {
  return parse(s)
    .map(extrapolateLast)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  return parse(s)
    .map(extrapolateFirst)
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/09.txt')
  it('part 1', () => expect(part1(input)).toBe(2038472161))
  it('part 2', () => expect(part2(input)).toBe(1091))
}
