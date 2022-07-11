import ts from 'unleashed-typescript';
import type { ErrorObject } from './types';
import type MagicString from 'magic-string';
import { newLine } from '../typescript/util';
import { testWrapperIdentifiers } from './identifiers';

export interface TestWrapper {
  name: string;
  handler: ts.Expression;
  expression: ts.Expression;
}

export function searchTestWrapperFromPosition(sourceFile: ts.SourceFile, position: number): TestWrapper | undefined {
  let wrapper: TestWrapper | undefined = undefined;

  function visit(node: ts.Node): void {
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

export function reportDiagnostics(diagnostics: readonly ts.Diagnostic[], newCode: MagicString, fileName: string): void {
  diagnostics.forEach(({ messageText, start, file }) => {
    if (file) {
      const startPosition = start ?? 0;
      const token = searchTestWrapperFromPosition(file, startPosition);
      const { line, character } = ts.getLineAndCharacterOfPosition(file, startPosition);
      const message = ts.flattenDiagnosticMessageText(messageText, newLine).replace(/`/g, '\\`');

      if (token) {
        const position = token.handler.getEnd() - 1;
        newCode.appendLeft(position, createErrorString({ message, file: fileName, line, column: character }));
      } else {
        newCode.append(createErrorString({ message, file: fileName, line, column: character }));
      }
    }
  });
}

export function createErrorString({ message, file, line, column }: ErrorObject): string {
  return `
// error generated by vite-plugin-vitest-typescript-assert
throw (() => {
  const err = new TypeError(\`${message}\`);
  err.name = "TypeError";
  err.stack = "";
  err.stackStr = "";
  err.stacks = [{
    file: "${file}",
    line: ${line + 1},
    column: ${column + 1},
    sourcePos: {
      source: "${file}",
      line: ${line + 1},
      column: ${column + 1}
    }
  }];
  return err;
})()
`;
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
