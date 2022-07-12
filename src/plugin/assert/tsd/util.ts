import type ts from 'unleashed-typescript';
import { getMiddle } from '../../../typescript/util';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

export function missingGeneric(node: ts.CallExpression, sourceFile: ts.SourceFile): ts.Diagnostic {
  return createAssertionDiagnostic(
    errorMessage(ErrorCode.ASSERT_MISSING_GENERIC, { position: 1 }),
    sourceFile,
    node.expression.getStart(),
  );
}

export function missingArgument(node: ts.CallExpression, sourceFile: ts.SourceFile): ts.Diagnostic {
  return createAssertionDiagnostic(
    errorMessage(ErrorCode.ASSERT_MISSING_ARGUMENT, { position: 1 }),
    sourceFile,
    node.expression.end,
  );
}

export function typeError(
  code: ErrorCode,
  typeChecker: ts.TypeChecker,
  expectedType: ts.Type,
  argumentType: ts.Type,
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
): ts.Diagnostic | undefined {
  return createAssertionDiagnostic(
    errorMessage(code, {
      expected: typeChecker.typeToString(expectedType),
      argument: typeChecker.typeToString(argumentType),
    }),
    sourceFile,
    getMiddle(node.typeArguments?.[0] ?? node),
  );
}
