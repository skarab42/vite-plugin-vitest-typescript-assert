import ts from 'byots';

export const newLine = '\n';

export function getCurrentDirectory(): string {
  return ts.sys.getCurrentDirectory();
}

export function fileExists(fileName: string): boolean {
  return ts.sys.fileExists(fileName);
}

export function readFile(fileName: string): string | undefined {
  return ts.sys.readFile(fileName);
}

export function getMiddle(node: ts.Node): number {
  const diff = node.getEnd() - node.getStart();
  return node.getStart() + Math.round(diff / 2);
}
