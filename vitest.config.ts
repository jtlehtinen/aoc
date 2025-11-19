import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 2 * 60 * 1_000,
      globals: false,
      root: import.meta.dirname,
      includeSource: ['src/**/*.{js,ts}'],
      exclude: [
        'src/**/*.d.ts',
        'src/io.ts',
      ],
    },
  }),
)
