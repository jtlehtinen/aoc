// https://adventofcode.com/2015/day/7
import { readFile } from '~/io.js'

const tryParseInt = (x) => isNaN(+x) ? x : +x

const expressions = [
  { pattern: /^(\w+)$/,              evaluate: (args) => args[0] },
  { pattern: /^NOT (\w+)$/,          evaluate: (args) => ~args[0] },
  { pattern: /^(\w+) AND (\w+)$/,    evaluate: (args) => args[0] & args[1] },
  { pattern: /^(\w+) OR (\w+)$/,     evaluate: (args) => args[0] | args[1] },
  { pattern: /^(\w+) LSHIFT (\w+)$/, evaluate: (args) => args[0] << args[1] },
  { pattern: /^(\w+) RSHIFT (\w+)$/, evaluate: (args) => args[0] >> args[1] },
]

const parseLine = (s) => {
  const [expression, dest] = s.split(' -> ')
  for (const { pattern, evaluate } of expressions) {
    const m = expression.match(pattern)
    if (m)
      return { args: m.slice(1).map(tryParseInt), evaluate, dest }
  }
}

const execute = (code) => {
  const wires = { }
  const resolveArg = (x) => Number.isInteger(x) ? x : wires[x]

  code = [...code] // copy
  while (code.length > 0) {
    for (let i = 0; i < code.length; ++i) {
      const { args, dest, evaluate } = code[i]
      const resolvedArgs = args.map(resolveArg)
      if (resolvedArgs.every(Number.isInteger)) {
        wires[dest] = evaluate(resolvedArgs)
        code.splice(i, 1)
      }
    }
  }
  return wires
}

const part1 = (s) => {
  const code = s.split('\n').map(parseLine)
  return execute(code)['a']
}

const part2 = (s) => {
  const code = s.split('\n').map(parseLine)

  const b = code.find(c => c.dest === 'b')
  b.args[0] = execute(code)['a']

  return execute(code)['a']
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2015/07.txt')
  it('part 1', () => expect(part1(input)).toBe(16076))
  it('part 2', () => expect(part2(input)).toBe(2797))
}
