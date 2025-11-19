// https://adventofcode.com/2024/day/5
import { readFile } from '~/io.js'

/** @param {string} s */
const solve = (s) => {
  const numbers = x => x.match(/\d+/g).map(Number)
  const next = (nums, rules) => nums.find(x => !rules.some(r => x === r[1]))
  const [rules, updates] = s.split('\n\n').map(x => x.split('\n').map(numbers))

  const result = [0, 0]
  for (const update of updates) {
    let n = update
    let r = rules.filter(([a, b]) => n.includes(a) && n.includes(b))

    const order = []
    for (let x = next(n, r); x != null; x = next(n, r)) {
      order.push(x)
      n = n.filter(y => y !== x)
      r = r.filter(([a]) => a !== x)
    }
    const correct = update.every((u, i) => u === order[i]);
    result[correct^1] += order[(order.length-1) / 2]
  }
  return result
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2024/05.txt')
  it('part 1', () => expect(solve(input)[0]).toBe(7074))
  it('part 2', () => expect(solve(input)[1]).toBe(4828))
}
