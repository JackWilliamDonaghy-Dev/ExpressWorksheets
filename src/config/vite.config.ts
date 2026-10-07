import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, 
    environment: 'node',
    clearMocks: true,
    setupFiles: './src/tests/setup.ts',
    include: ['src/tests/**/*.test.ts'], 
    restoreMocks: true,
  },
});
