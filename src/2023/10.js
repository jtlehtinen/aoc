// https://adventofcode.com/2023/day/10
import { readFile } from '~/io.js'

const pack = (x, y) => y << 16 | x
const unpack = (xy) => [xy & 0xffff, xy >> 16]
const parse = (s) => s.split('\n').map((s) => Array.from(s))

const findStart = (map) => {
  for (let y = 0; y < map.length; ++y) {
    for (let x = 0; x < map[y].length; ++x) {
      if (map[y][x] === 'S') return [x, y]
    }
  }
  throw new Error('no start')
}

const findLongestLoop = (map) => {
  const maxX = map[0].length - 1
  const maxY = map.length - 1

  const [startX, startY] = findStart(map)
  const startPack = pack(startX, startY)

  const loops = []
  const queue = [{ x: startX, y: startY, path: [startPack], pipe: 'S'}]

  while (queue.length > 0) {
    const { x, y, path, pipe } = queue.pop()
    if (path.at(-1) === startPack && path.length > 1) {
      loops.push(path)
      continue
    }

    const lpack = pack(x - 1, y)
    const rpack = pack(x + 1, y)
    const upack = pack(x, y - 1)
    const dpack = pack(x, y + 1)

    if (x > 0 && (!path.includes(lpack) || lpack === startPack)) {    // left
      if (pipe === '-' || pipe === 'J' || pipe === '7' || pipe === 'S')
        queue.push({ x: x - 1, y, path: [...path, lpack], pipe: map[y][x - 1] })
    }
    if (x < maxX && (!path.includes(rpack) || rpack === startPack)) { // right
      if (pipe === '-' || pipe === 'L' || pipe === 'F' || pipe === 'S')
        queue.push({ x: x + 1, y, path: [...path, rpack], pipe: map[y][x + 1] })
    }
    if (y > 0 && (!path.includes(upack) || upack === startPack)) {    // up
      if (pipe === '|' || pipe === 'L' || pipe === 'J' || pipe === 'S')
        queue.push({ x, y: y - 1, path: [...path, upack], pipe: map[y - 1][x] })
    }
    if (y < maxY && (!path.includes(dpack) || dpack === startPack)) { // down
      if (pipe === '|' || pipe === '7' || pipe === 'F' || pipe === 'S')
        queue.push({ x, y: y + 1, path: [...path, dpack], pipe: map[y + 1][x] })
    }
  }

  return loops
    .reduce((longest, path) => path.length > longest.length ? path : longest)
}

const part1 = (s) => {
  const map = parse(s)
  const loop = findLongestLoop(map)
  return Math.ceil(loop.length / 2) - 1
}

const part2 = (s) => {
  const map = parse(s)
  const loop = findLongestLoop(map)
  const loopPoints = new Set(loop)

  // Vertical line cast from point to upward. Count
  // crossings LTR and RTL. Inside if LTR != RTL.

  const maxX = map[0].length - 1
  const maxY = map.length - 1

  let insideCount = 0
  for (let y = 1; y < maxY; ++y) {
    for (let x = 1; x < maxX; ++x) {
      if (loopPoints.has(pack(x, y))) continue

      let inside = 0
      for (let i = 1; i < loop.length; ++i) {
        const [x1, y1] = unpack(loop[i-1])
        const [x2, y2] = unpack(loop[i])

        const horizontal = y1 === y2
        const above = y1 < y
        if (!horizontal || !above) continue

        if (x-1 === x1 && x === x2) inside++
        if (x-1 === x2 && x === x1) inside--
      }
      if (inside !== 0)
        insideCount++
    }
  }
  return insideCount
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/10.txt')
  it('part 1', () => expect(part1(input)).toBe(6820))
  it('part 2', () => expect(part2(input)).toBe(337))
}
