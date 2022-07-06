import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	outDir: 'build',
	platform: 'node',
	splitting: true,
	sourcemap: true,
	minify: true,
	clean: true,
	dts: true,
});
