// https://adventofcode.com/2022/day/7
import { readFile } from '~/io.js'

const parseDirSizes = (s) => {
  const sizes = {}
  let wd = ['/']

  for (const line of s.split('\n')) {
    if (line.startsWith('$ cd')) {
      if (line.startsWith('$ cd ..'))     wd.pop()
      else if (line.startsWith('$ cd /')) wd = ['/']
      else if (line.startsWith('$ cd'))   wd.push(`${wd.at(-1)}${line.split(' ')[2]}/`)
      sizes[wd.at(-1)] = sizes[wd.at(-1)] ?? 0 // ensure initialized
    } else if (/\d/.test(line)) {
      const size = parseInt(line.split(' ')[0])
      wd.forEach(p => sizes[p] += size)
    }
  }
  return Object.values(sizes)
}

const part1 = (s) => {
  return parseDirSizes(s)
    .filter(size => size <= 100000)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  const sizes = parseDirSizes(s)
  const free = Math.max(...sizes) - 40000000
  return free <= 0 ? 0 : Math.min(...sizes.filter(size => size >= free))
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/07.txt')
  it('part 1', () => expect(part1(input)).toBe(1206825))
  it('part 2', () => expect(part2(input)).toBe(9608311))
}
