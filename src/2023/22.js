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
    const a = bricks[i]

    let zfall = a[zmin]
    for (let j = i - 1; j >= 0; --j) {
      const b = bricks[j]
      if (intersect2d(a, b))
        zfall = Math.min(zfall, a[zmin] - b[zmax] - 1)
    }
    a[zmin] -= zfall
    a[zmax] -= zfall
  }
}

// @returns {number} The number of other bricks that would disintegrate.
const disintegrate = (bricks, omit, startIdx) => {
  for (let i = startIdx; i < bricks.length; ++i) {
    const a = bricks[i]

    let supported = (bricks[i][zmin] === 0)
    for (let j = i - 1; j >= 0 && !supported; --j) {
      const b = bricks[j]
      if (!omit.has(j) && intersect2d(a, b) && a[zmin] - 1 === b[zmax])
        supported = true
    }

    if (!supported)
      omit.add(i)
  }
  return omit.size - 1
}

const part1 = (s) => {
  const bricks = parse(s)

  bricks.sort((a, b) => a[zmin] - b[zmin])
  fall(bricks)
  bricks.sort((a, b) => a[zmin] - b[zmin])

  const cantRemove = new Set()
  for (let i = 0; i < bricks.length; ++i) {
    const a = bricks[i]

    let supportedBy = []
    for (let j = i - 1; j >= 0 && supportedBy.length < 2; --j) {
      const b = bricks[j]
      if (intersect2d(a, b) && a[zmin] - 1 === b[zmax])
        supportedBy.push(j)
    }

    if (supportedBy.length === 1)
      cantRemove.add(supportedBy[0])
  }
  return bricks.length - cantRemove.size
}

const part2 = (s) => {
  const bricks = parse(s)

  bricks.sort((a, b) => a[zmin] - b[zmin])
  fall(bricks)
  bricks.sort((a, b) => a[zmin] - b[zmin])

  return bricks
    .map((_, idx) => disintegrate(bricks, new Set([idx]), idx + 1))
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/22.txt')
  it('part 1', () => expect(part1(input)).toBe(485))
  it('part 2', () => expect(part2(input)).toBe(74594))
}
