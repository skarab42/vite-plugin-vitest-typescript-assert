import type { Plugin } from 'vite';

export function vitestTypescriptAssertPlugin(): Plugin {
	return {
		name: 'vitest:typescript-assert',
		apply: 'serve',
		enforce: 'pre',
	};
}
