import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(import.meta.dirname, 'src')}/`
    }
  },
  clearScreen: true,
  test: {
    globals: false,
    threads: false,
    includeSource: ['src/**/*.js']
  },
})
