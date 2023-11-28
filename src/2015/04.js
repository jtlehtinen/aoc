// https://adventofcode.com/2015/day/4
import crypto from 'node:crypto'
import { readFile } from '~/io.js'

/**
 * @param {string} s
 * @param {string} prefix
 * @returns {number}
 */
const findKey = (s, prefix) => {
  const template = crypto.createHash('md5')
  for (let suffix = 0;; ++suffix) {
    const hash = template.copy()
    const digest = hash.update(s + suffix).digest('hex')
    if (digest.startsWith(prefix)) return suffix
  }
}

const part1 = (s) => findKey(s, '00000')
const part2 = (s) => findKey(s, '000000')

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/04.txt')
  it('part 1', () => expect(part1(input)).toBe(282749))
  it('part 2', () => expect(part2(input)).toBe(9962624))
}
