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

export function getResolvedModuleExports(
  program: ts.Program,
  moduleName: string,
  fileName: string,
  checker: ts.TypeChecker,
) {
  const { resolvedModule } = program.getResolvedModuleWithFailedLookupLocationsFromCache(moduleName, fileName) ?? {};

  if (!resolvedModule) {
    return;
  }

  const moduleSourceFile = program.getSourceFile(resolvedModule.resolvedFileName);

  if (!moduleSourceFile) {
    return;
  }

  const moduleSourceFileSymbol = checker.getSymbolAtLocation(moduleSourceFile);

  if (!moduleSourceFileSymbol) {
    return;
  }

  return checker.getExportsOfModule(moduleSourceFileSymbol);
}
