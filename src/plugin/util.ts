import ts from 'byots';
import type MagicString from 'magic-string';
import { createErrorString } from './error';
import { testWrapperIdentifiers } from './identifiers';
import { getResolvedModuleExports, newLine } from '../typescript/util';

export type APIName = 'tsd' | 'tssert';

export const API_MODULE_KEY = 'VITE_PLUGIN_VITEST_TYPESCRIPT_ASSERT';
export const API_NAMES: readonly APIName[] = ['tsd', 'tssert'] as const;

export function searchTestWrapperFromPosition(file: ts.SourceFile, position: number) {
  const token = ts.getTokenAtPosition(file, position);

  let parent: ts.Node | undefined = token.parent;

  while (parent) {
    if (ts.isCallExpression(parent)) {
      const expression = parent.expression;
      const identifier = expression.getText();

      if (testWrapperIdentifiers.includes(identifier)) {
        const name = parent.arguments[0]?.getText().slice(1, -1);
        const handler = parent.arguments[1];

        if (name && handler) {
          return { name, expression, handler };
        }
      }

      parent = undefined;
    }

    parent = parent?.parent;
  }

  return undefined;
}

export function reportDiagnostics(diagnostics: readonly ts.Diagnostic[], newCode: MagicString, fileName: string) {
  if (diagnostics[0]) {
    const { messageText, start, file } = diagnostics[0];

    if (file) {
      const startPosition = start ?? -1;
      const message = ts.flattenDiagnosticMessageText(messageText, newLine);
      const { line, character } = ts.getLineAndCharacterOfPosition(file, startPosition);
      const token = searchTestWrapperFromPosition(file, startPosition);

      if (token) {
        const position = token.handler.getEnd() - 1;
        newCode.appendLeft(position, createErrorString({ message, file: fileName, line, column: character }));
      } else {
        newCode.append(createErrorString({ message, file: fileName, line, column: character }));
      }
    }
  }
}

// Probably the most disgusting function name I've ever written in my life. Pushing the limits!
export function tryToGetAPINAme(moduleName: string, fileName: string, program: ts.Program, checker: ts.TypeChecker) {
  const resolvedExports = getResolvedModuleExports(program, moduleName, fileName, checker);

  if (!resolvedExports) {
    return;
  }

  const apiKey = resolvedExports.find((e) => e.escapedName === API_MODULE_KEY);

  if (!apiKey?.declarations?.[0]) {
    return;
  }

  const apiType = checker.getTypeOfSymbolAtLocation(apiKey, apiKey.declarations[0]);
  const apiName = checker.typeToString(apiType).slice(1, -1) as APIName;

  return API_NAMES.includes(apiName) ? apiName : undefined;
}
