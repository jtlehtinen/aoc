// https://adventofcode.com/2023/day/1
import { readFile } from '~/io.js'

/**
 * @param {string} s
 * @param {(s: string) => number} calibrationValueFunc
 */
const sumCalibrationValues = (s, calibrationValueFunc) => {
  return s.split('\n')
    .map(calibrationValueFunc)
    .reduce((sum, cur) => sum + cur, 0)
}

const part1 = (s) => {
  const calibrationValue = (s) => {
    const digits = [...s].filter(c => c >= '0' && c <= '9')
    return Number(digits[0] + digits.at(-1))
  }
  return sumCalibrationValues(s, calibrationValue)
}

const part2 = (s) => {
  const calibrationValue = (s) => {
    const digits = []
    for (let i = 0; i < s.length; ++i) {
      if (s[i] >= '0' && s[i] <= '9')    digits.push(s[i])
      else if (s.startsWith('one', i))   digits.push('1')
      else if (s.startsWith('two', i))   digits.push('2')
      else if (s.startsWith('three', i)) digits.push('3')
      else if (s.startsWith('four', i))  digits.push('4')
      else if (s.startsWith('five', i))  digits.push('5')
      else if (s.startsWith('six', i))   digits.push('6')
      else if (s.startsWith('seven', i)) digits.push('7')
      else if (s.startsWith('eight', i)) digits.push('8')
      else if (s.startsWith('nine', i))  digits.push('9')
    }
    return Number(digits[0] + digits.at(-1))
  }
  return sumCalibrationValues(s, calibrationValue)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/01.txt')
  it('part 1', () => {
    expect(part1(`1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`)).toBe(142)
    expect(part1(input)).toBe(53651)
  })
  it('part 2', () => {
    expect(part2(`two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen`)).toBe(281)
    expect(part2(input)).toBe(53894)
  })
}
