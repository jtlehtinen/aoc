// https://adventofcode.com/2016/day/3
import { readFile } from '~/io.js'

const parse = (s) => s
  .split('\n')
  .map(line => line.match(/\d+/g).map(Number))
  .flat()

const transpose = (arr) => {
  const transposed = []
  for (let i = 0; i < arr.length; i += 3) transposed.push(arr[i])
  for (let i = 1; i < arr.length; i += 3) transposed.push(arr[i])
  for (let i = 2; i < arr.length; i += 3) transposed.push(arr[i])
  return transposed
}

const countValidTriangles = (arr) => {
  let count = 0
  for (let i = 0; i < arr.length; i += 3) {
    const a = arr[i]
    const b = arr[i+1]
    const c = arr[i+2]
    if (a + b > c && a + c > b && b + c > a) count++
  }
  return count
}

const part1 = (s) => countValidTriangles(parse(s))
const part2 = (s) => countValidTriangles(transpose(parse(s)))

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2016/03.txt')
  it('part 1', () => expect(part1(input)).toBe(993))
  it('part 2', () => expect(part2(input)).toBe(1849))
}
