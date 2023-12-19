// https://adventofcode.com/2023/day/19
import { readFile } from '~/io.js'

const parseWorkflows = (s) => {
  const wfs = {}
  s.split('\n').forEach(line => {
    const [name, rules_] = line.split(/\{|\}/)
    wfs[name] = rules_.split(',').map(rule => {
      if (rule.includes(':')) {
        const [ expr, dest ] = rule.split(':')
        const [, left, op, right ] = expr.match(/(\w)(<|>)(\d+)/)
        return { left, op, right: +right, dest }
      }
      return { dest: rule }
    })
  })
  return wfs
}

const parse = (s) => {
  const [workflows_, parts_] = s.split('\n\n')
  return {
    parts: parts_.split('\n').map(line => {
      const [x, m, a, s] = line.match(/\d+/g).map(Number)
      return { x, m, a, s }
    }),
    wfs: parseWorkflows(workflows_)
  }
}

const accept = (part, wfs, wf) => {
  for (const { left, op, right, dest } of wf) {
    if (op === '<' && part[left] >= right) continue // next rule
    if (op === '>' && part[left] <= right) continue // next rule
    if (dest === 'R') return false                  // reject
    if (dest === 'A') return true                   // accept
    return accept(part, wfs, wfs[dest])             // next workflow
  }
}

const len = ({ min, max }) => max - min + 1
const comb = (part, wfs, wfname, ruleIdx) => {
  if (wfname === 'R') return 0 // reject
  if (wfname === 'A') return len(part.x) * len(part.m) * len(part.a) * len(part.s) // accept

  const wf = wfs[wfname]
  if (ruleIdx >= wf.length) return 0 // rule out of bounds

  const rule = wf[ruleIdx]
  if (!rule.op) return comb(part, wfs, rule.dest, 0)

  if (rule.op === '<' && part[rule.left].min < rule.right) { // rule match
    const partIn = structuredClone(part)
    const partOut = structuredClone(part)
    partIn[rule.left].max = rule.right - 1
    partOut[rule.left].min = rule.right
    return comb(partIn, wfs, rule.dest, 0) + comb(partOut, wfs, wfname, ruleIdx + 1)
  }
  if (rule.op === '>' && part[rule.left].max > rule.right) { // rule match
    const partIn = structuredClone(part)
    const partOut = structuredClone(part)
    partIn[rule.left].min = rule.right + 1
    partOut[rule.left].max = rule.right
    return comb(partIn, wfs, rule.dest, 0) + comb(partOut, wfs, wfname, ruleIdx + 1)
  }
  return comb(part, wfs, wfname, ruleIdx + 1) // no rule match
}

const part1 = (s) => {
  const { parts, wfs } = parse(s)
  return parts
    .filter(part => accept(part, wfs, wfs['in']))
    .map(({ x, m, a, s }) => x + m + a + s)
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  const { wfs } = parse(s)
  return comb({ x: { min: 1, max: 4000 }, m: { min: 1, max: 4000 }, a: { min: 1, max: 4000 }, s: { min: 1, max: 4000 } }, wfs, 'in', 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2023/19.txt')
  it('part 1', () => expect(part1(input)).toBe(331208))
  it('part 2', () => expect(part2(input)).toBe(121464316215623))
}
