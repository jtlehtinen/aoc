// https://adventofcode.com/2022/day/5
import { readFile } from '~/io.js'

const parse = (s) => {
  const [buckets_, moves_] = s.split('\n\n')

  const buckets = Array(9).fill().map(() => [])
  for (const line of buckets_.slice(0, -1).split('\n')) {
    for (let i = 1; i < line.length; i += 4) {
      if (line[i] != ' ')
        buckets[(i - 1) / 4].push(line[i])
    }
  }
  buckets.forEach(bucket => bucket.reverse())

  return {
    buckets,
    moves: moves_.split('\n').map(line => {
      const [, count, from, to ] = line.match(/move (\d+) from (\d+) to (\d+)/)
      return { count: +count, from: +from, to: +to }
    }),
  }
}

const solve = (s, transform) => {
  const { buckets, moves } = parse(s)

  for (const { count, from, to } of moves) {
    const items = buckets[from - 1].splice(-count)
    buckets[to - 1].push(...transform(items))
  }

  return buckets.map(bucket => bucket.at(-1)).join('')
}

const part1 = (s) => solve(s, items => items.reverse())
const part2 = (s) => solve(s, items => items)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/05.txt')
  it('part 1', () => expect(part1(input)).toBe('QMBMJDFTD'))
  it('part 2', () => expect(part2(input)).toBe('NBTVTJNFJ'))
}
