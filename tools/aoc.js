// Contains utilities to encrypt and decrypt the input files for
// the Advent of Code challenges.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import dotenv from 'dotenv'

dotenv.config()

const INPUT_DIRECTORY = './input/'
const ENCRYPTED_FILENAME = 'input.enc'
const AOC_INPUT_ENCRYPTION_KEY = process.env.AOC_INPUT_ENCRYPTION_KEY

const args = process.argv.slice(2)

if (AOC_INPUT_ENCRYPTION_KEY == null || AOC_INPUT_ENCRYPTION_KEY.length !== 32) {
  const errorMessage = AOC_INPUT_ENCRYPTION_KEY == null
    ? 'AOC_INPUT_ENCRYPTION_KEY environment variable not set'
    : 'AOC_INPUT_ENCRYPTION_KEY must be 32 characters long (256 bits)'
  console.error(errorMessage)
  process.exit(1)
}

async function listFilesRecursive(directory) {
  const result = []
  for await (const dirent of await fs.promises.opendir(directory)) {
    const filename = path.join(directory, dirent.name)
    if (dirent.isDirectory()) result.push(...await listFilesRecursive(filename))
    else if (dirent.isFile()) result.push(filename)
  }
  return result
}

function readFiles(files) {
  return files.map(filename => {
    const content = fs.readFileSync(filename, { encoding: 'utf-8' })
    return { filename, content }
  })
}

function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory))
    fs.mkdirSync(directory, { recursive: true })
}

const IV_LENGTH = 16

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(AOC_INPUT_ENCRYPTION_KEY), iv)
  const encrypted = cipher.update(text)
  return Buffer.concat([iv, encrypted, cipher.final()])
}

function decrypt(buffer) {
  const iv = buffer.slice(0, IV_LENGTH)
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(AOC_INPUT_ENCRYPTION_KEY), iv)
  const decrypted = decipher.update(buffer.slice(IV_LENGTH))
  return Buffer.concat([ decrypted, decipher.final() ])
}

async function aocEncrypt(directory, outputFilename) {
  const files = await listFilesRecursive(directory)
  const fileContents = readFiles(files)
  const jsonContent = JSON.stringify(fileContents)
  const compressedContent = zlib.gzipSync(jsonContent, { level: 5 })
  const encryptedContent = encrypt(compressedContent)
  fs.writeFileSync(outputFilename, encryptedContent)
}

function aocDecrypt(inputFilename) {
  const fileContent = fs.readFileSync(inputFilename)
  const compressedContent = decrypt(fileContent)
  const jsonContent = zlib.gunzipSync(compressedContent)
  const jsContent = JSON.parse(jsonContent)
  for (const { filename, content } of jsContent) {
    ensureDirectoryExists(path.dirname(filename))
    fs.writeFileSync(filename, content, { encoding: 'utf-8' })
  }
}

if (args.includes('-enc')) {
  console.time('enc')
  await aocEncrypt(INPUT_DIRECTORY, ENCRYPTED_FILENAME)
  console.timeEnd('enc')
} else if (args.includes('-dec')) {
  console.time('dec')
  aocDecrypt(ENCRYPTED_FILENAME)
  console.timeEnd('dec')
} else {
  console.log('Usage:\n\tnode aoc.js <-enc|-dec>')
}
