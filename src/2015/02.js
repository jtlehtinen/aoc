// https://adventofcode.com/2015/day/2
import { readFile } from '~/io.js'

/**
 * @param {string} s
 * @return {Array<number[]>} [l, w, h]
 */
const parseDimensions = (s) => s.split('\n').map(line => line.split('x').map(Number))

/**
 * @param {number[]} dimensions [l, w, h]
 * @return {number}
 */
const costWrapper = ([l, w, h]) => {
  const area = 2 * (l*w + w*h + h*l)
  const smallestSideArea = Math.min(l*w, w*h, h*l)
  return area + smallestSideArea
}

/**
 * @param {number[]} dimensions [l, w, h]
 * @return {number}
 */
const costRibbon = ([l, w, h]) => {
  const volume = l * w * h
  const smallestPerimeter = 2 * Math.min(l+w, w+h, h+l)
  return volume + smallestPerimeter
}

const cost = (dimensions, costFunc) =>
  dimensions
    .map(costFunc)
    .reduce((sum, cur) => sum + cur, 0)

const part1 = (s) => cost(parseDimensions(s), costWrapper)
const part2 = (s) => cost(parseDimensions(s), costRibbon)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/02.txt')
  it('part 1', () => expect(part1(input)).toBe(1586300))
  it('part 2', () => expect(part2(input)).toBe(3737498))
}
