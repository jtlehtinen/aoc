// https://adventofcode.com/2023/day/1
import { readFile } from '~/io.js'

const calibrationValue = (s, words) => {
  const digits = []
  for (let i = 0; i < s.length; ++i) {
    if (s[i] >= '0' && s[i] <= '9')
      digits.push(+s[i])

    for (const [index, word] of words.entries()) {
      if (s.startsWith(word, i))
        digits.push(index)
    }
  }
  return 10*digits[0] + digits.at(-1)
}

const sumCalibrationValues = (s, words) => {
  return s.split('\n')
    .map((line) => calibrationValue(line, words))
    .reduce((sum, cur) => sum + cur, 0)
}

const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const part1 = (s) => sumCalibrationValues(s, [])
const part2 = (s) => sumCalibrationValues(s, words)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/01.txt')
  it('part 1', () => expect(part1(input)).toBe(53651))
  it('part 2', () => expect(part2(input)).toBe(53894))
}
