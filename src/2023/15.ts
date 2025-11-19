// https://adventofcode.com/2023/day/15
import { readFile } from '~/io.js'

/**
 * @param {string} s
 */
const hash = (s) => Array
  .from(s)
  .reduce((h, c) => ((h + c.charCodeAt(0)) * 17) & 0xff, 0)

const part1 = (s) => s
  .split(',')
  .map(hash)
  .reduce((a, b) => a + b, 0)

const part2 = (s) => {
  const boxes = Array.from({ length: 256 }, () => new Map())

  for (const kv of s.split(',')) {
    if (kv.includes('=')) {
      const [k, v] = kv.split('=')
      boxes[hash(k)].set(k, Number(v))
    } else {
      const k = kv.slice(0, -1) // remove trailing '-'
      boxes[hash(k)].delete(k)
    }
  }

  return boxes
    .map((box, i) =>
      Array.from(box.keys())
        .map((key, j) => (i + 1) * (j + 1) * box.get(key))
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/15.txt')
  it('part 1', () => expect(part1(input)).toBe(518107))
  it('part 2', () => expect(part2(input)).toBe(303404))
}
