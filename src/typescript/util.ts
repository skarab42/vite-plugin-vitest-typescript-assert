import ts from 'typescript';

export const newLine = '\r\n';

export function getCurrentDirectory() {
  return ts.sys.getCurrentDirectory();
}

export function fileExists(fileName: string) {
  return ts.sys.fileExists(fileName);
}

export function readFile(fileName: string) {
  return ts.sys.readFile(fileName);
}
