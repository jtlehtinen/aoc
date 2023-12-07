// https://adventofcode.com/2022/day/2
import { readFile } from '~/io.js'

// A,B,C = foe choice [rock,paper,scissors]
// X,Y,Z = player choice [rock,paper,scissors]
const playerChoiceScore = {
  'X': 1, 'Y': 2, 'Z': 3,
};
const outcomeScore = {
  // 0 = lose, 3 = draw, 6 = win
  'AX': 3, 'AY': 6,'AZ': 0,
  'BX': 0, 'BY': 3,'BZ': 6,
  'CX': 6, 'CY': 0,'CZ': 3,
}
const outcomeToChoice = {
  // '<foe><wanted-outcome>': player choice
  // X,Y,Z = lose,draw,win
  'AX': 'Z', 'AY': 'X', 'AZ': 'Y',
  'BX': 'X', 'BY': 'Y', 'BZ': 'Z',
  'CX': 'Y', 'CY': 'Z', 'CZ': 'X',
};

const part1 = (s) => {
  return s.split('\n')
    .map(line => {
      const [foe, me] = line.split(/\s/)
      return playerChoiceScore[me] + outcomeScore[foe+me]
    })
    .reduce((a, b) => a + b, 0)
}

const part2 = (s) => {
  return s.split('\n')
    .map(line => {
      const [foe, outcome] = line.split(/\s/)
      const me = outcomeToChoice[foe+outcome]
      return playerChoiceScore[me] + outcomeScore[foe+me]
    })
    .reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2022/02.txt')
  it('part 1', () => expect(part1(input)).toBe(14827))
  it('part 2', () => expect(part2(input)).toBe(13889))
}
