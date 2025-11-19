// https://adventofcode.com/2016/day/4
import { readFile } from '~/io.js'

const parseRooms = (s) => s.split('\n')
  .map(line => {
    const [checksum, id, ...words] = line.match(/(\w+|\d+)/g).reverse()
    return { id: +id, checksum, words }
  })

const isValidRoom = (room) => {
  const charCounts = new Map()
  for (const word of room.words) {
    for (const char of word) {
      charCounts.set(char, 1 + (charCounts.get(char) ?? 0))
    }
  }

  const chars = [...charCounts.keys()]
  chars.sort((a, b) => charCounts.get(b) - charCounts.get(a) || a.charCodeAt(0) - b.charCodeAt(0))

  return chars.slice(0, 5).join('') === room.checksum
}

const A = 'a'.charCodeAt(0)
const rotate = (char, id) => String.fromCharCode((char.charCodeAt(0) - A + id) % 26 + A)

const decryptRoomName = (room) => {
  let name = ''
  for (const word of room.words) {
    for (const char of word)
      name += rotate(char, room.id)
  }
  return name
}

const part1 = (s) => parseRooms(s)
  .filter(isValidRoom)
  .map(room => room.id)
  .reduce((a, b) => a + b, 0)

const part2 = (s) => parseRooms(s)
  .find(room => decryptRoomName(room).includes('north')).id

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  const input = readFile('2016/04.txt')
  it('part 1', () => expect(part1(input)).toBe(185371))
  it('part 2', () => expect(part2(input)).toBe(984))
}