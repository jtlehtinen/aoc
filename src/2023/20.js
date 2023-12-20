// https://adventofcode.com/2023/day/20
import { readFile } from '~/io.js'

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
const lcm = (a, b) => a * b / gcd(a, b)

const parse = (s) => {
  const modules = { }

  const ensureModule = (name) => {
    modules[name] = modules[name] ?? { type: '?', inputs: [], outputs: [], memory: { }, value: 0 }
    return modules[name]
  }

  for (const line of s.split('\n')) {
    const [name_, outputs_] = line.split(' -> ')
    const name = '&%'.includes(name_[0]) ? name_.slice(1) : name_

    const module = ensureModule(name)
    module.type = name_[0]

    for (const output of outputs_.split(', ')) {
      module.outputs.push(output)
      const outputModule = ensureModule(output)
      outputModule.inputs.push(name)
      outputModule.memory[name] = 0
    }
  }
  return modules
}

const solve = (s) => {
  const modules = parse(s)

  const deps = modules['rx'].inputs.map(i => modules[i].inputs).flat()
  const first = new Map()
  const second = new Map()
  const counts = [0, 0]

  for (let press = 1; second.size < deps.length || press <= 1000; ++press) {
    const q = [{ from: 'button', to: 'broadcaster', value: 0 }]
    while (q.length > 0) {
      const { from, to, value } = q.shift()

      if (press <= 1000)
        counts[value]++

      const module = modules[to]
      module.memory[from] = value

      if (value === 0 && deps.includes(to)) {
        if (!first.has(to))       first.set(to, press)
        else if (!second.has(to)) second.set(to, press)
      }

      if (module.type === 'b') {

        module.value = value
        module.outputs.forEach(output => q.push({ from: to, to: output, value }))

      } else if (module.type === '%') {

        if (value === 1) continue // nothing happens
        module.value = module.value ^ 1
        module.outputs.forEach(output => q.push({ from: to, to: output, value: module.value }))

      } else if (module.type === '&') {

        module.value = Object.values(module.memory).some(v => v === 0) ? 1 : 0
        module.outputs.forEach(output => q.push({ from: to, to: output, value: module.value }))

      }
    }
  }

  return {
    p1: counts[0] * counts[1],
    p2: deps.reduce((m, dep) => lcm(m, second.get(dep) - first.get(dep)), 1),
  }
}

// Part 2: Manual inspection of module dependency graph starting from
// rx + trial and error. Parents of parents of rx was first level for
// which cycles where found "fast". rx needs 0, parent input must be 1,
// parent of parent input must be 0, etc. until the last parent of rx.
// This assumes the type of the parent is '&'.

const part1 = (s) => solve(s).p1
const part2 = (s) => solve(s).p2

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/20.txt')
  it('part 1', () => expect(part1(input)).toBe(807069600))
  it('part 2', () => expect(part2(input)).toBe(221453937522197))
}
