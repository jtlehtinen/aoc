// Contains utilities to encrypt and decrypt the input files for
// the Advent of Code challenges.

import type { PathLike } from 'node:fs'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import dotenv from 'dotenv'

interface FileEntry {
  filename: string
  content: string
}

type FileEntries = FileEntry[]

dotenv.config({ quiet: true })

const INPUT_DIRECTORY = './input/'
const ENCRYPTED_FILENAME = 'input.enc'
const AOC_INPUT_ENCRYPTION_KEY = process.env.AOC_INPUT_ENCRYPTION_KEY
const IV_LENGTH = 16

function ensureDirectoryExists(directory: PathLike): void {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }
}

async function listFilesRecursive(directory: string): Promise<string[]> {
  const files: string[] = []
  for await (const dirent of await fs.promises.opendir(directory)) {
    const filename = path.join(directory, dirent.name)
    if (dirent.isDirectory()) files.push(...await listFilesRecursive(filename))
    else if (dirent.isFile()) files.push(filename)
  }
  return files
}

function readFiles(filenames: string[]): FileEntries {
  return filenames.map(filename => {
    const content = fs.readFileSync(filename, { encoding: 'utf-8' })
    return { filename, content }
  })
}

function encrypt(data: Buffer, encryptionKey: string): Buffer {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv)
  const ciphertext = cipher.update(data)
  return Buffer.concat([iv, ciphertext, cipher.final()])
}

function decrypt(data: Buffer, encryptionKey: string): Buffer {
  const iv = data.subarray(0, IV_LENGTH)
  const ciphertext = data.subarray(IV_LENGTH)
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv)
  const plaintext = decipher.update(ciphertext)
  return Buffer.concat([ plaintext, decipher.final() ])
}

async function aocEncrypt(directory: string, outputFilename: string, encryptionKey: string): Promise<void> {
  const files = await listFilesRecursive(directory)
  const entries = readFiles(files)
  const jsonEntries = JSON.stringify(entries)
  const compressedEntries = zlib.gzipSync(jsonEntries, { level: 5 })
  const encryptedEntries = encrypt(compressedEntries, encryptionKey)
  fs.writeFileSync(outputFilename, encryptedEntries)
}

function aocDecrypt(inputFilename: string, encryptionKey: string): void {
  const encryptedEntries = fs.readFileSync(inputFilename) as Buffer
  const compressedEntries = decrypt(encryptedEntries, encryptionKey)
  const jsonEntries = zlib.gunzipSync(compressedEntries) as Buffer
  const entries = JSON.parse(jsonEntries.toString('utf-8')) as FileEntries

  for (const { filename, content } of entries) {
    ensureDirectoryExists(path.dirname(filename))
    fs.writeFileSync(filename, content, { encoding: 'utf-8' })
  }
}

async function run(args: string[]): Promise<void> {
  if (AOC_INPUT_ENCRYPTION_KEY == null || AOC_INPUT_ENCRYPTION_KEY.length !== 32) {
    const errorMessage = AOC_INPUT_ENCRYPTION_KEY == null
      ? 'AOC_INPUT_ENCRYPTION_KEY environment variable not set'
      : 'AOC_INPUT_ENCRYPTION_KEY must be 32 characters long (256 bits)'
    console.error(errorMessage)
    process.exit(1)
  }

  if (args.includes('-enc')) {
    console.time('enc')
    await aocEncrypt(INPUT_DIRECTORY, ENCRYPTED_FILENAME, AOC_INPUT_ENCRYPTION_KEY)
    console.timeEnd('enc')
  } else if (args.includes('-dec')) {
    console.time('dec')
    aocDecrypt(ENCRYPTED_FILENAME, AOC_INPUT_ENCRYPTION_KEY)
    console.timeEnd('dec')
  } else {
    console.log('Usage:\n\ttsx aoc.ts <-enc|-dec>')
  }
}

run(process.argv.slice(2))
