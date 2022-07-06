import path from 'path';
import ts from 'typescript';

const fileExists = (path: string) => ts.sys.fileExists(path);
const readFile = (path: string) => ts.sys.readFile(path);

export function parseConfigFile(fileName: string, compilerOptions: ts.CompilerOptions = {}) {
	const configFile = readFile(fileName);

	if (!configFile) {
		// TODO better error handling, create diagnostic ?
		throw new Error('tsconfig.json not readable');
	}

	const configObject = ts.parseConfigFileTextToJson(fileName, configFile);

	return ts.parseJsonConfigFileContent(configObject.config, ts.sys, path.dirname(fileName), compilerOptions);
}

export interface DiagnosticMessage {
	file?: string | undefined;
	line?: number;
	column?: number;
	message: string;
	code: number;
	category: number;
}

export function typeCheck(fileName: string) {
	const configFile = ts.findConfigFile(__dirname, fileExists, 'tsconfig.json');

	if (!configFile) {
		// TODO better error handling, create diagnostic ?
		throw new Error('tsconfig.json not found');
	}

	const config = parseConfigFile(configFile);
	const program = ts.createProgram([fileName], {
		...ts.getDefaultCompilerOptions(),
		...config.options,
	});

	const messages: DiagnosticMessage[] = [];

	ts.getPreEmitDiagnostics(program).forEach((diagnostic) => {
		const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
		const payload = { code: diagnostic.code, category: diagnostic.category, message };

		if (!diagnostic.file) {
			messages.push(payload);
			return;
		}

		const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, Number(diagnostic.start));

		messages.push({ ...payload, file: diagnostic.file.fileName, line, column: character });
	});

	return messages;
}
