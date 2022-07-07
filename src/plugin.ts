import type { Plugin } from 'vite';
import { typeCheck } from './program';

export function vitestTypescriptAssertPlugin(): Plugin {
	return {
		name: 'vitest:typescript-assert',
		apply: 'serve',
		enforce: 'pre',
		// configureServer(server) {
		// 	const prout = (path: string) => {
		// 		setTimeout(() => {
		// 			console.log('>>>>>>>>>>', path);
		// 		}, 2000);
		// 	};

		// 	server.watcher.on('add', prout);
		// 	server.watcher.on('change', prout);
		// 	server.watcher.on('unlink', prout);
		// },
		transform(code, fileName) {
			if (!fileName.endsWith('.test.ts')) {
				// TODO get from config, with glob pattern
				return;
			}

			const result = typeCheck({
				configName: 'tsconfig.check.json',
				input: { fileName, code },
			});

			// eslint-disable-next-line no-console
			console.log(result);

			return code;
		},
	};
}
