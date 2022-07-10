import type ts from 'byots';

export interface ProcessCallExpressionReturn {
  success: boolean;
  skipped: boolean;
  diagnostic: ts.Diagnostic | undefined;
}

export type AssertionResult = ts.Diagnostic | undefined;

export type AssertionFunction = (
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
  checker: ts.TypeChecker,
) => AssertionResult;

export interface AssertionType {
  node: ts.CallExpression;
  type: ts.Type | undefined;
  position: number;
}

export interface AssertionTypes {
  source: AssertionType;
  target: AssertionType;
}
