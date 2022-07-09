import ts from 'byots';
import type MagicString from 'magic-string';
import { createErrorString } from './error';
import { testWrapperIdentifiers } from './identifiers';
import { getResolvedModuleExports, newLine } from '../typescript/util';

export type APIName = 'tsd' | 'tssert';

export const API_MODULE_KEY = 'VITE_PLUGIN_VITEST_TYPESCRIPT_ASSERT';
export const API_NAMES: readonly APIName[] = ['tsd', 'tssert'] as const;

export interface TestWrapper {
  name: string;
  expression: ts.Expression;
  handler: ts.Expression;
}

export function searchTestWrapperFromPosition(sourceFile: ts.SourceFile, position: number): TestWrapper | undefined {
  let wrapper: TestWrapper | undefined = undefined;

  function visit(node: ts.Node) {
    if (node.getStart() > position) {
      return;
    }

    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      const identifier = expression.getText();

      if (testWrapperIdentifiers.includes(identifier)) {
        const name = node.arguments[0]?.getText().slice(1, -1);
        const handler = node.arguments[1];

        if (name && handler) {
          wrapper = { name, expression, handler };
        }
      }
    }

    node.forEachChild(visit);
  }

  visit(sourceFile);

  return wrapper;
}

export function createAssertionDiagnostic(message: string, file: ts.SourceFile, start: number): ts.Diagnostic {
  return {
    category: ts.DiagnosticCategory.Error,
    code: -42,
    file,
    start,
    length: undefined,
    messageText: message,
  };
}

export function reportDiagnostics(diagnostics: readonly ts.Diagnostic[], newCode: MagicString, fileName: string) {
  diagnostics.forEach(({ messageText, start, file }) => {
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
  });
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
