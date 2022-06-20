import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

const root = process.cwd();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.join(root, 'src'),
    },
  },
});
