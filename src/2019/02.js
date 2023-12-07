// https://adventofcode.com/2019/day/2
import { readFile } from '~/io.js'

const execute = (code, noun, verb) => {
  code = [...code]
  code[1] = noun
  code[2] = verb
  const dispatch = [ null, (a, b) => a + b, (a, b) => a * b ]

  let ip = 0
  while (ip < code.length) {
    const opcode = code[ip++]
    if (opcode === 99) return code[0]
    const arg0 = code[code[ip++]]
    const arg1 = code[code[ip++]]
    code[code[ip++]] = dispatch[opcode](arg0, arg1)
  }
}

const part1 = (s) => {
  const code = s.split(',').map(Number)
  return execute(code, 12, 2)
}

const part2 = (s) => {
  const code = s.split(',').map(Number)
  for (let noun = 0; noun < 100; ++noun) {
    for (let verb = 0; verb < 100; ++verb) {
      if (execute(code, noun, verb) === 19690720)
        return 100 * noun + verb
    }
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2019/02.txt')
  it('part 1', () => expect(part1(input)).toBe(10566835))
  it('part 2', () => expect(part2(input)).toBe(2347))
}
