import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['server/**/*.ts', 'shared/**/*.ts'],
      exclude: ['**/*.test.ts', '**/node_modules/**'],
    },
    include: ['tests/**/*.test.ts'],
    globals: true,
  },
});
