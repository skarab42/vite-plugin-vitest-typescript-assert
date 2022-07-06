import type { Plugin } from 'vite';
import { typeCheck, type DiagnosticMessage } from './compiler';

export function vitestTypescriptAssertPlugin(): Plugin {
	return {
		name: 'vitest:typescript-assert',
		apply: 'serve',
		enforce: 'pre',
		transform(code, id) {
			if (!id.endsWith('.test.ts')) {
				// TODO get from config, with glob pattern
				return;
			}

			return `${code}${error(typeCheck(id))}`;
		},
	};
}

function error(messages?: DiagnosticMessage[]) {
	const fistMessage = messages ? messages[0] : undefined;

	if (!fistMessage) {
		return '';
	}

	const file = String(fistMessage.file);
	const line = Number(fistMessage.line) + 1;
	const column = Number(fistMessage.column) * 2;

	return `\ntest.concurrent('type-check', () => {throw error()});

		function error() {
			const err = new TypeError("${fistMessage.message} ts(${fistMessage.code})");
		
			err.name = "TypeError";
			err.nameStr = "TypeError";

			// err.showDiff = true;
			// err.actual = "life";
			// err.expected = "42";

			// err.stackStr = "???";
			// err.operator = "???";
			// err.type = "???";
			
			err.stacks = [{
				method: "",
				file: "${file}",
				line: ${line},
				column: ${column},
				sourcePos: {
					source: "${file}",
					line: ${line},
					column: ${column},
				}
			}]

			// console.log(err.stack)
			// console.log(err.stacks)

			return err;
		}
	`;
}
