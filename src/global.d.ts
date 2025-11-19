// For TypeScript to recognize 'import.meta.vitest'
interface ImportMeta {
  readonly vitest?: typeof import('vitest')
}
