import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const BASE_PATH = 'input'

export function readFile(relativePath: string): string {
  return readFileSync(join(BASE_PATH, relativePath), 'utf8')
}