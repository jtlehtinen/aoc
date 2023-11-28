import fs from 'node:fs'
import path from 'node:path'

const basePath = 'input'

const readFile = (relativePath) => {
  return fs.readFileSync(path.join(basePath, relativePath)).toString()
}

export { readFile }
