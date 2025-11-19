// https://adventofcode.com/2016/day/5
import crypto from 'node:crypto'
import { readFile } from '~/io.js'

const generateHashes = (string, process) => {
  const template = crypto.createHash('md5')
  for (let suffix = 0;; ++suffix) {
    const hash = template.copy()
    const digest = hash.update(string+suffix).digest('hex')
    if (digest.startsWith('00000') && process(digest)) break
  }
}

const part1 = (s) => {
  let password = ''
  generateHashes(s, digest => {
    password += digest.charAt(5)
    return password.length === 8
  })
  return password
}

const part2 = (s) => {
  const password = new Array(8).fill('')
  generateHashes(s, digest => {
    const position = digest[5].charCodeAt(0) - '0'.charCodeAt(0)
    if (position < 0 || position > 7 || password[position] !== '') return false

    password[position] = digest.charAt(6)
    return password.every(c => c !== '')
  })
  return password.join('')
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2016/05.txt')
  it('part 1', () => expect(part1(input)).toBe('1a3099aa'))
  it('part 2', () => expect(part2(input)).toBe('694190cd'))
}
