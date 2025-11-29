// https://adventofcode.com/2015/day/2
import { readFile } from '~/io.js'

type Dimension = [length: number, width: number, height: number]
type Dimensions = Dimension[]
type CostFunc = (dim: Dimension) => number

function parseDimensions(s: string): Dimensions {
  return s.split('\n').map(line => line.split('x').map(Number)) as Dimensions
}

function costWrapper([l, w, h]: Dimension) {
  const area = 2 * (l*w + w*h + h*l)
  const smallestSideArea = Math.min(l*w, w*h, h*l)
  return area + smallestSideArea
}

function costRibbon([l, w, h]: Dimension) {
  const volume = l * w * h
  const smallestPerimeter = 2 * Math.min(l+w, w+h, h+l)
  return volume + smallestPerimeter
}

function cost(dimensions: Dimensions, costFunc: CostFunc) {
  return dimensions
    .map(costFunc)
    .reduce((sum, cur) => sum + cur, 0)
}

const part1 = (s: string) => cost(parseDimensions(s), costWrapper)
const part2 = (s: string) => cost(parseDimensions(s), costRibbon)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/02.txt')
  it('part 1', () => expect(part1(input)).toBe(1586300))
  it('part 2', () => expect(part2(input)).toBe(3737498))
}
