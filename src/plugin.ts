import type { Plugin } from 'vite';
import { typeCheck } from './program';
import MagicString from 'magic-string';
import { createErrorString } from './error';

export function vitestTypescriptAssertPlugin(): Plugin {
	return {
		name: 'vitest:typescript-assert',
		apply: 'serve',
		enforce: 'pre',
		transform(code, fileName) {
			if (!fileName.endsWith('.test.ts')) {
				// TODO get from config, with glob pattern
				return;
			}

			// WTF is appening here ????
			code = code.replace(/\t/g, '        ');

			const result = typeCheck({
				configName: 'tsconfig.check.json',
				input: { fileName, code },
			});

			const newCode = new MagicString(code);

			result.assertionDiagnostics?.forEach((diagnostic) => {
				const column = diagnostic.position.character;
				const line = diagnostic.position.line;
				const message = diagnostic.message.replace(/"/g, '\\"');

				const lastBlockNode = diagnostic.path[diagnostic.path.length - 1]?.node;
				const lastBlockPosition = lastBlockNode?.getEnd() ?? newCode.length();
				newCode.appendLeft(lastBlockPosition - 2, createErrorString({ message, file: fileName, line, column }));
			});

			return {
				code: newCode.toString(),
				map: newCode.generateMap({ hires: true }),
			};
		},
	};
}
