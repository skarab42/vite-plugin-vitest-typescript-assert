import type ts from 'byots';
import * as assert from './assert';
import type { ProcessCallExpressionReturn } from '../types';

const names = new Map(Object.entries(assert));

export function processCallExpression(
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
  checker: ts.TypeChecker,
): ProcessCallExpressionReturn {
  let diagnostic: ts.Diagnostic | undefined = undefined;

  const identifier = node.expression.getText();
  const assertFunction = names.get(identifier);

  if (assertFunction) {
    diagnostic = assertFunction(sourceFile, node, checker);
  }

  return { success: !diagnostic, skipped: !assertFunction, diagnostic };
}
