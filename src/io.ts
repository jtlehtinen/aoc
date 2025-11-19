import fs from 'node:fs'
import path from 'node:path'

const BASE_PATH = 'input'

export function readFile(relativePath: string): string {
  return fs.readFileSync(path.join(BASE_PATH, relativePath)).toString()
}
