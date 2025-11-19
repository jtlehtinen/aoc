// https://adventofcode.com/2023/day/18
import { readFile } from '~/io.js'

const mapDir = { '0': 'R', '1': 'D', '2': 'L', '3': 'U' }
const parseCommands = (s) => s.split('\n')
  .map(line => {
    const [, dist, dir] = line.match(/\(#([0-9a-fA-F]{5})([0-9a-fA-F]{1})\)/)
    return { dir: mapDir[dir], dist: parseInt(dist, 16) }
  })

const parseCommandsWithBug = (s) => s.split('\n')
  .map(line => {
    const [, dir, dist] = line.match(/(L|R|U|D) (\d+)/)
    return { dir, dist: +dist }
  })

const vertsFromCommands = (commands) => {
  const dirdx = { 'L': -1, 'R':  1, 'U':  0, 'D':  0 }
  const dirdy = { 'L':  0, 'R':  0, 'U': -1, 'D':  1 }

  const verts = [{ x: 0, y: 0 }]
  for (const { dir, dist } of commands) {
    const dx = dirdx[dir] * dist
    const dy = dirdy[dir] * dist
    verts.push({ x: verts.at(-1).x + dx, y: verts.at(-1).y + dy })
  }
  return verts
}

const polyArea = (verts) => { // cross-product
  let area = 0
  for (let i = 1; i < verts.length; ++i)
    area += verts[i-1].x * verts[i].y - verts[i-1].y * verts[i].x
  return Math.abs(area) / 2
}

const solve = (s, parseFunc) => {
  const verts = vertsFromCommands(parseFunc(s))

  let edgeLen = 0
  for (let i = 1; i < verts.length; ++i) {
    edgeLen += Math.abs(verts[i].x - verts[i-1].x)
    edgeLen += Math.abs(verts[i].y - verts[i-1].y)
  }

  // To make this work for other thicknesses use the following formula:
  // (edgeLen * thickness / 2) + (thickness / 2) ** 2 * 4

  return polyArea(verts) + edgeLen / 2 + 1
}

const part1 = (s) => solve(s, parseCommandsWithBug)
const part2 = (s) => solve(s, parseCommands)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/18.txt')
  it('part 1', () => expect(part1(input)).toBe(92758))
  it('part 2', () => expect(part2(input)).toBe(62762509300678))
}
