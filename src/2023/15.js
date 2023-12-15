// https://adventofcode.com/2023/day/15
import { readFile } from '~/io.js'

/**
 * @param {string} s
 */
const hash = (s) => {
  let h = 0
  for (let i = 0; i < s.length; ++i) {
    h = (h + s.charCodeAt(i)) * 17
    h %= 256
  }
  return h
}

const part1 = (s) => s
  .split(',')
  .map(hash)
  .reduce((a, b) => a + b, 0)

const part2 = (s) => {
  const boxes = Array.from({ length: 256 }, () => [])

  for (const kv of s.split(',')) {
    if (kv.includes('=')) {
      const [k, v] = kv.split('=')
      const box = boxes[hash(k)]
      const boxIdx = box.findIndex(({ key }) => key === k)

      if (boxIdx !== -1) {
        box[boxIdx] = { key: k, value: Number(v) }
      } else {
        box.push({ key: k, value: Number(v) })
      }
    } else {
      const k = kv.slice(0, -1) // remove trailing '-'
      const h = hash(k)
      boxes[h] = boxes[h].filter(({ key }) => key !== k)
    }
  }

  return boxes
    .map((box, boxIdx) => {
      return box
        .map(({ value }, lensIdx) => (boxIdx + 1) * (lensIdx + 1) * value)
        .reduce((a, b) => a + b, 0)
    })
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/15.txt')
  it('part 1', () => expect(part1(input)).toBe(518107))
  it('part 2', () => expect(part2(input)).toBe(303404))
}
