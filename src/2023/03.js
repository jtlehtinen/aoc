// https://adventofcode.com/2023/day/3
import { readFile } from '~/io.js'

const adjacent = (numberEntity, symbolEntity) => {
  // Expand the number entity by one in each direction => point a in rectangle test.
  const x0 = numberEntity.x - 1
  const x1 = numberEntity.x + numberEntity.token.length
  const y0 = numberEntity.y - 1
  const y1 = numberEntity.y + 1
  return symbolEntity.x >= x0 && symbolEntity.x <= x1 && symbolEntity.y >= y0 && symbolEntity.y <= y1
}

const parse = (s) => {
  const entities = []
  for (const [y, line] of s.split('\n').entries()) {
    for (const m of line.matchAll(/\d+/g))
      entities.push({ type: 'number', x: m.index, y, token: m[0], value: parseInt(m[0]) })

    for (const m of line.matchAll(/[^0-9\.]/g))
      entities.push({ type: 'symbol', x: m.index, y, token: m[0] })
  }
  return entities
}

const part1 = (s) => {
  const entities = parse(s)
  const numbers = entities.filter(e => e.type === 'number')
  const symbols = entities.filter(e => e.type === 'symbol')

  return numbers
    .filter(n => symbols.some(s => adjacent(n, s)))
    .map(n => n.value)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  const entities = parse(s)
  const numbers = entities.filter(e => e.type === 'number')
  const symbols = entities.filter(e => e.type === 'symbol')
  const maybeGears = symbols.filter(s => s.token === '*')

  let gearRatioSum = 0
  for (const maybeGear of maybeGears) {
    const adjacentNumbers = []
    for (const number of numbers) {
      if (adjacent(number, maybeGear))
        adjacentNumbers.push(number.value)
    }
    if (adjacentNumbers.length !== 2) continue

    gearRatioSum += adjacentNumbers[0] * adjacentNumbers[1]
  }
  return gearRatioSum
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/03.txt')
  it('part 1', () => expect(part1(input)).toBe(557705))
  it('part 2', () => expect(part2(input)).toBe(84266818))
}
