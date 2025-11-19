// https://adventofcode.com/2018/day/2
import { readFile } from '~/io.js'

const part1 = (s) => {
  let two = 0
  let three = 0

  s.split('\n').forEach(line => {
    const charToCount = new Map()
    Array.from(line).forEach(c => charToCount.set(c, (charToCount.get(c) ?? 0) + 1))

    const counts = Array.from(charToCount.values())
    if (counts.some(c => c === 2)) two++
    if (counts.some(c => c === 3)) three++
  })

  return two * three
}

const part2 = (s) => {
  const sets = s.split('\n').map(id => {
    const set = new Set()
    Array.from(id).forEach((c , i) => set.add(c.charCodeAt(0) | (i << 8)))
    return set
  })

  for (let i = 0; i < sets.length; ++i) {
    for (let j = i + 1; j < sets.length; ++j) {
      const setA = sets[i]
      const setB = sets[j]

      let common = ''
      setA.forEach(value => {
        if (setB.has(value)) common += String.fromCharCode(value & 0xff)
      })
      if (common.length === setA.size-1) return common
    }
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2018/02.txt')
  it('part 1', () => expect(part1(input)).toBe(6972))
  it('part 2', () => expect(part2(input)).toBe('aixwcbzrmdvpsjfgllthdyoqe'))
}
