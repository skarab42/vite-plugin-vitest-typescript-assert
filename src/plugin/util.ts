import ts from 'byots';
import type MagicString from 'magic-string';
import { createErrorString } from './error';
import { newLine } from '../typescript/util';
import { testWrapperIdentifiers } from './identifiers';

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
