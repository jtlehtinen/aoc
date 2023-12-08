// https://adventofcode.com/2023/day/8
import { readFile } from '~/io.js'

const gcd = (a, b) => b ? gcd(b, a % b) : a
const lcm = (a, b) => (a * b) / gcd(a, b)
const lcmOfArray = (arr) => arr.reduce((a, b) => lcm(a, b))

const parse = (s) => {
  const [commands_, network_] = s.split('\n\n')
  return {
    commands: Array.from(commands_),
    network: Object.fromEntries(network_.split('\n').map(line => {
      const [node, left, right] = line.match(/\w+/g)
      return [node, { left, right }]
    }))
  }
}

const countSteps = (commands, network, location, endPredicate) => {
  let steps = 0
  while (!endPredicate(location)) {
    const command = commands[steps % commands.length]
    location = (command === 'L') ? network[location].left : network[location].right

    steps++
  }
  return steps
}

const part1 = (s) => {
  const { commands, network } = parse(s)
  return countSteps(commands, network, 'AAA', x => x === 'ZZZ')
}

const part2 = (s) => {
  const { commands, network } = parse(s)
  const locations = Object.keys(network).filter(n => n.at(-1) === 'A')
  const cycleLens = locations.map(location => countSteps(commands, network, location, x => x.at(-1) === 'Z'))
  return lcmOfArray(cycleLens)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/08.txt')
  it('part 1', () => expect(part1(input)).toBe(13301))
  it('part 2', () => expect(part2(input)).toBe(7309459565207))
}
