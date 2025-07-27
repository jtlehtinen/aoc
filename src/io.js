import fs from 'node:fs'
import path from 'node:path'

const basePath = 'input'

export function readFile(relativePath) {
  return fs.readFileSync(path.join(basePath, relativePath)).toString()
}
