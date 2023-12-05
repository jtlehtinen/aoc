// https://adventofcode.com/2023/day/5
import { readFile } from '~/io.js'

const parse = (s) => {
  const [seeds, ...maps] = s.split('\n\n')
  return {
    seeds: seeds.match(/(\d+)/g).map(Number),
    maps: maps.map(s => {
      const [, srcCategory, dstCategory] =  s.match(/(\w+)-to-(\w+)/)
      return {
        srcCategory,
        dstCategory,
        mappings: s.split('\n').slice(1).map(line => {
          const [dst, src, len] = line.match(/\d+/g).map(Number)
          return { lower: src, upper: src + len - 1, delta: dst - src }
        }),
      }
    }),
  }
}

const solve = (ranges, maps) => {
  let minLocation = Number.MAX_SAFE_INTEGER
  const queue = ranges.map(r => ({ srcCategory: 'seed', ...r }))

  while (queue.length > 0) {
    const { srcCategory, r0, r1 } = queue.pop()
    if (srcCategory === 'location') {
      minLocation = Math.min(minLocation, r0)
      continue
    }

    const map = maps.find(m => m.srcCategory === srcCategory)
    const mapping = map.mappings.find(({ lower, upper }) => !(r1 < lower || r0 > upper))

    if (mapping) {
      const { lower, upper, delta } = mapping
      if (r0 < lower) queue.push({ srcCategory, r0, r1: lower-1 })
      if (r1 > upper) queue.push({ srcCategory, r0: upper+1, r1 })
      queue.push({
        srcCategory: map.dstCategory,
        r0: Math.max(r0, lower) + delta,
        r1: Math.min(r1, upper) + delta,
      })
    } else {
      queue.push({ srcCategory: map.dstCategory, r0, r1 })
    }
  }
  return minLocation
}

const part1 = (s) => {
  const { seeds, maps } = parse(s)
  const ranges = seeds.map(seed => ({ r0: seed, r1: seed }))
  return solve(ranges, maps)
}

const part2 = (s) => {
  const { seeds, maps } = parse(s)

  const ranges = []
  for (let i = 0; i < seeds.length; i += 2) {
    ranges.push({ r0: seeds[i], r1: seeds[i] + seeds[i+1] - 1 })
  }

  return solve(ranges, maps)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/05.txt')
  it('part 1', () => expect(part1(input)).toBe(806029445))
  it('part 2', () => expect(part2(input)).toBe(59370572))
}
