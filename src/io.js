import fs from 'node:fs'
import path from 'node:path'

const BASE_PATH = 'input'

/**
 * @param {string} relativePath
 * @return {string}
 */
export function readFile(relativePath) {
  return fs.readFileSync(path.join(BASE_PATH, relativePath)).toString()
}
