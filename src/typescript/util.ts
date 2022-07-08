import ts from 'byots';

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

export function getMiddle(node: ts.Node) {
  const diff = node.getEnd() - node.getStart();
  return node.getStart() + Math.round(diff / 2);
}
