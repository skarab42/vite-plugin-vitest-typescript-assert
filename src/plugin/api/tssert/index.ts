import type ts from 'byots';
import { createAssertionDiagnostic } from '../../util';
import type { ProcessCallExpressionReturn } from '../types';

export function processCallExpression(
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
  checker: ts.TypeChecker,
): ProcessCallExpressionReturn {
  let diagnostic: ts.Diagnostic | undefined = undefined;

  const identifier = node.expression.getText();

  // eslint-disable-next-line no-console
  console.log('> tssert', { identifier, checker, sourceFile });

  if (identifier.length < 0) {
    diagnostic = createAssertionDiagnostic(`No implemented....`, sourceFile, 0);
  }

  return { success: !diagnostic, skipped: true, diagnostic };
}
