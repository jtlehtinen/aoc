// https://adventofcode.com/2023/day/24
import { readFile } from '~/io.js'
import { init } from 'z3-solver'

const dot = (x0, y0, x1, y1) => x0 * x1 + y0 * y1
const parse = (s) => s.split('\n').map(line => {
  const [ px, py, pz, vx, vy, vz ] = line.match(/-?\d+/g).map(BigInt)
  return { px, py, pz, vx, vy, vz }
})

const part1 = (s) => {
  const hailstones = parse(s)
  const min = BigInt(200000000000000)
  const max = BigInt(400000000000000)

  let count = 0
  for (let i = 0; i < hailstones.length; ++i) {
    for (let j = i + 1; j < hailstones.length; ++j) {
      const a = hailstones[i]
      const b = hailstones[j]

      const ax1 = a.px
      const ay1 = a.py
      const ax2 = a.px + a.vx
      const ay2 = a.py + a.vy

      const bx1 = b.px
      const by1 = b.py
      const bx2 = b.px + b.vx
      const by2 = b.py + b.vy
      // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
      const bottom = (ax1 - ax2) * (by1 - by2) - (ay1 - ay2) * (bx1 - bx2)
      if (bottom !== BigInt(0)) { // If bottom === 0 then parallel or coincident
        const x = ((ax1 * ay2 - ay1 * ax2) * (bx1 - bx2) - (ax1 - ax2) * (bx1 * by2 - by1 * bx2)) / bottom
        const y = ((ax1 * ay2 - ay1 * ax2) * (by1 - by2) - (ay1 - ay2) * (bx1 * by2 - by1 * bx2)) / bottom

        const futureA = dot(a.vx, a.vy, x - a.px, y - a.py) >= 0 // is in the direction of the velocity vector?
        const futureB = dot(b.vx, b.vy, x - b.px, y - b.py) >= 0 // is in the direction of the velocity vector?

        if (x >= min && x <= max && y >= min && y <= max && futureA && futureB)
          count++
      }
    }
  }
  return count
}

const part2 = async (s) => {
  // System of linear equations:
  // xr + ti * vxr == xi + ti * vxi
  // yr + ti * vyr == yi + ti * vyi
  // zr + ti * vzr == zi + ti * vzi

  // #unknowns = (6 + hailstones.length)
  // #equations = 3 * hailstones.length
  // required equations = #unknowns - #equations = (6 + n) - 3 * n  = 0? => 3
  // => considering only the first 3 hailstones shoud be enough

  const hailstones = parse(s)

  const { Context } = await init()
  const z3 = Context('main')

  const xr = z3.Real.const('xr')
  const yr = z3.Real.const('yr')
  const zr = z3.Real.const('zr')

  const vxr = z3.Real.const('vxr')
  const vyr = z3.Real.const('vyr')
  const vzr = z3.Real.const('vzr')

  const solver = new z3.Solver()

  let i = 0
  for (const { px, py, pz, vx, vy, vz } of hailstones) {
    const t = z3.Real.const(`t${i++}`)
    solver.add(t.mul(vxr).add(xr).eq(t.mul(vx).add(px)))
    solver.add(t.mul(vyr).add(yr).eq(t.mul(vy).add(py)))
    solver.add(t.mul(vzr).add(zr).eq(t.mul(vz).add(pz)))
  }

  const sat = await solver.check()
  if (sat !== 'sat') throw new Error('unsat')

  const model = solver.model()
  const rockX = +model.get(xr).toString()
  const rockY = +model.get(yr).toString()
  const rockZ = +model.get(zr).toString()
  return rockX + rockY + rockZ
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/24.txt')
  it('part 1', () => expect(part1(input)).toBe(18651))
  it('part 2', async () => expect(await part2(input)).toBe(546494494317645), Infinity)
}
