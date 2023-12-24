// https://adventofcode.com/2023/day/23
import { readFile } from '~/io.js'

const pack = (x, y) => (y << 16) | x
const parse = (s) => s.split('\n').map(line => Array.from(line))

const canStep = (map, x, y) =>
  (x >= 0 && y >= 0 && x < map.length && y < map.length) && map[y][x] !== '#'

const removeSlopes = (map) => {
  for (let y = 0; y < map.length; ++y) {
    for (let x = 0; x < map.length; ++x) {
      if (map[y][x] !== '#')
        map[y][x] = '.'
    }
  }
}

const isIntersection = (map, x, y) =>
  map[y][x] !== '#' && (canStep(map,x-1,y) + canStep(map,x+1,y) + canStep(map,x,y-1) + canStep(map,x,y+1)) >= 3

const findIntersections = (map) => {
  const intersections = []
  for (let y = 0; y < map.length; ++y) {
    for (let x = 0; x < map.length; ++x) {
      if (isIntersection(map, x, y))
        intersections.push({ x, y, key: intersections.length, neighbors: [] })
    }
  }
  return intersections
}

const findNeighborIntersections = (map, startX, startY) => {
  const neighbors = []
  const visited = new Set([ pack(startX, startY) ])

  const tryEnqueue = (q, x, y, d) => {
    if (!canStep(map, x, y) || visited.has(pack(x, y))) return
    visited.add(pack(x, y))
    q.push({ x, y, d })
  }

  const q = [ { x: startX, y: startY, d: 0 }]
  while (q.length > 0) {
    const { x, y, d } = q.pop()
    if ((x !== startX || y !== startY) && isIntersection(map, x, y)) {
      neighbors.push({ x, y, d })
      continue
    }
    tryEnqueue(q, x - 1, y, d + 1)
    tryEnqueue(q, x + 1, y, d + 1)
    tryEnqueue(q, x, y - 1, d + 1)
    tryEnqueue(q, x, y + 1, d + 1)
  }
  return neighbors
}

const part1 = (s) => {
  const map = parse(s)
  const dim = map.length

  const x0 = 1
  const y0 = 0
  const x1 = dim - 2
  const y1 = dim - 1

  let visitedCount = 0
  const visited = new Array(dim).fill(0).map(_ => new Array(dim).fill(false))
  visited[y0][x0] = true

  const trydfs = (x, y) => {
    if (canStep(map, x, y) && !visited[y][x]) {
      visited[y][x] = true
      visitedCount++
      dfs(x, y)
      visited[y][x] = false
      visitedCount--
    }
  }

  let maxPath = 0
  const dfs = (x, y) => {
    if (x === x1 && y === y1) {
      maxPath = Math.max(maxPath, visitedCount)
      return
    }
    const c = map[y][x]
    if (c === '.' || c === '<') trydfs(x - 1, y)
    if (c === '.' || c === '>') trydfs(x + 1, y)
    if (c === '.' || c === '^') trydfs(x, y - 1)
    if (c === '.' || c === 'v') trydfs(x, y + 1)
  }
  dfs(x0, y0)
  return maxPath
}

const part2 = (s) => {
  const map = parse(s)
  const dim = map.length
  removeSlopes(map)

  const x0 = 1
  const y0 = 0
  const x1 = dim - 2
  const y1 = dim - 1

  const intersections = findIntersections(map)
  const { x: fx, y: fy, d: fd } = findNeighborIntersections(map, x0, y0)[0]
  const { x: lx, y: ly, d: ld } = findNeighborIntersections(map, x1, y1)[0]

  const firstIntersection = intersections.find(c => c.x === fx && c.y === fy)
  const lastIntersection = intersections.find(c => c.x === lx && c.y === ly)

  for (const intersection of intersections) {
    for (const { x, y, d } of findNeighborIntersections(map, intersection.x, intersection.y)) {
      const key = intersections.find(i => i.x === x && i.y === y).key
      intersection.neighbors.push({ key, d })
    }
  }

  let maxPath = 0
  let visitedCount = 0
  const visited = new Array(intersections.length).fill(false)
  visited[firstIntersection.key] = true

  const dfs = (intersection) => {
    if (intersection.key === lastIntersection.key) {
      maxPath = Math.max(maxPath, visitedCount)
      return
    }

    for (const { key, d } of intersection.neighbors) {
      if (!visited[key]) {
        visited[key] = true
        visitedCount += d
        dfs(intersections[key])
        visited[key] = false
        visitedCount -= d
      }
    }
  }
  dfs(firstIntersection)
  return maxPath + fd + ld
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/23.txt')
  it('part 1', () => expect(part1(input)).toBe(2114))
  it('part 2', () => expect(part2(input)).toBe(6322))
}
