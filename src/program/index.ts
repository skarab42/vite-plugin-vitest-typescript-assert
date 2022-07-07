import ts from 'typescript';
import { normalizePath } from 'vite';
import { getAssertions } from './assertions';
import { getCompilerOptions, loadConfig, type ConfigOptions } from './config';
import { fileExists, getCurrentDirectory, getDefaultLibLocation, newLine, readFile } from './util';

export interface Options extends ConfigOptions {
	input: { fileName: string; code: string };
}

export function typeCheck(options: Options) {
	const tsconfig = loadConfig(options);

	if (tsconfig.error) {
		throw tsconfig.error;
	}

	const compilerOptions = getCompilerOptions(options, tsconfig.config.options);

	compilerOptions.noEmit = false;
	compilerOptions.sourceMap = true;
	compilerOptions['suppressOutputPathCheck'] = true;

	const inputFileCode = options.input.code;
	const inputFileName = options.input.fileName;

	const target = compilerOptions.target ?? ts.ScriptTarget.Latest;
	const sourceFile = ts.createSourceFile(inputFileName, inputFileCode, target);

	const compilerHost: ts.CompilerHost = {
		...ts.sys,
		getNewLine: () => newLine,
		writeFile: () => undefined,
		getSourceFile: (fileName) => {
			if (fileName === normalizePath(inputFileName)) {
				return sourceFile;
			}

			return ts.createSourceFile(fileName, readFile(fileName) ?? '', target);
		},
		getDefaultLibFileName: () => 'lib.d.ts',
		getDefaultLibLocation: () => getDefaultLibLocation(),
		getCurrentDirectory: () => getCurrentDirectory(),
		getCanonicalFileName: (fileName) => fileName,
		useCaseSensitiveFileNames: () => true,
		fileExists: (fileName) => {
			return fileName === inputFileName || fileExists(fileName);
		},
	};

	const program = ts.createProgram([inputFileName], compilerOptions, compilerHost);
	const diagnostics = ts.getPreEmitDiagnostics(program);
	// const typeChecker = program.getTypeChecker();

	if (diagnostics.length) {
		return { diagnostics };
	}

	const assertions = getAssertions(sourceFile);

	return { assertions };
}
