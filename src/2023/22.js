// https://adventofcode.com/2023/day/22
import { readFile } from '~/io.js'

const xmin = 0, ymin = 1, zmin = 2, xmax = 3, ymax = 4, zmax = 5
const parse = (s) => s.split('\n').map(line => line.match(/\d+/g).map(Number))

const intersect2d = (a, b) => {
  if (a[xmax] < b[xmin] || a[xmin] > b[xmax]) return false
  if (a[ymax] < b[ymin] || a[ymin] > b[ymax]) return false
  return true
}

const fall = (bricks) => {
  for (let i = 0; i < bricks.length; ++i) {
    let zfall = bricks[i][zmin]
    for (let j = i - 1; j >= 0; --j) {
      if (intersect2d(bricks[i], bricks[j]))
        zfall = Math.min(zfall, bricks[i][zmin] - bricks[j][zmax] - 1)
    }
    bricks[i][zmin] -= zfall
    bricks[i][zmax] -= zfall
  }
}

const supporters = (bricks, i) => {
  let supportedBy = []
  for (let j = i - 1; j >= 0; --j) {
    if (intersect2d(bricks[i], bricks[j]) && bricks[i][zmin] - 1 === bricks[j][zmax])
      supportedBy.push(j)
  }
  return supportedBy
}

const part1 = (s) => {
  const bricks = parse(s)
  bricks.sort((a, b) => a[zmin] - b[zmin])
  fall(bricks)

  const keep = new Set()
  for (let i = 0; i < bricks.length; ++i) {
    const supportedBy = supporters(bricks, i)
    if (supportedBy.length === 1)
      keep.add(supportedBy[0])
  }
  return bricks.length - keep.size
}

const part2 = (s) => {
  const bricks = parse(s)
  bricks.sort((a, b) => a[zmin] - b[zmin])
  fall(bricks)

  const support = new Map()
  bricks.forEach((_, i) => support.set(i, supporters(bricks, i)))

  let sum = 0
  for (let i = 0; i < bricks.length; ++i) {
    const disintegrated = new Set([i])
    for (let j = i + 1; j < bricks.length; ++j) {
      const supportedBy = support.get(j)
      if (bricks[j][zmin] !== 0 && (supportedBy.length === 0 || supportedBy.every(k => disintegrated.has(k))))
        disintegrated.add(j)
    }
    sum += disintegrated.size - 1
  }
  return sum
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/22.txt')
  it('part 1', () => expect(part1(input)).toBe(485))
  it('part 2', () => expect(part2(input)).toBe(74594))
}
