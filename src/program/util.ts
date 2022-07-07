import path from 'path';
import ts from 'typescript';
import { normalizePath } from 'vite';

export const newLine = '\n';

export function getCurrentDirectory() {
	return ts.sys.getCurrentDirectory();
}

export function fileExists(fileName: string) {
	return ts.sys.fileExists(fileName);
}

export function readFile(fileName: string) {
	return ts.sys.readFile(fileName);
}

export function getDefaultLibLocation() {
	return path.dirname(normalizePath(ts.sys.getExecutingFilePath()));
}
