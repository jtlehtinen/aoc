// https://adventofcode.com/2015/day/8
import { readFile } from '~/io.js'

const encode = (s) =>
  `"${s.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`

const decode = (s) =>
  s.substring(1, s.length-1)                // Leading and trailing quotes.
  .replaceAll('\\\\', '_')                  // \\   => _
  .replaceAll('\\"', '_')                   // \"   => _
  .replaceAll(/\\x[0-9a-fA-F]{2}/g, '_')    // \xhh => _

const diffSum = (s, f) =>
  s.split('\n')
    .map(line => Math.abs(f(line).length - line.length))
    .reduce((sum, cur) => sum + cur, 0)

const part1 = (s) => diffSum(s, decode)
const part2 = (s) => diffSum(s, encode)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/08.txt')
  it('part 1', () => expect(part1(input)).toBe(1342))
  it('part 2', () => expect(part2(input)).toBe(2074))
}
