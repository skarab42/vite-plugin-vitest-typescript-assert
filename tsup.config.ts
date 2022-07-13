import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/api/tsd/index.ts', 'src/api/tssert/index.ts'],
  format: ['cjs', 'esm'],
  outDir: 'build',
  platform: 'node',
  splitting: false,
  sourcemap: true,
  minify: false,
  clean: true,
  dts: true,
});
