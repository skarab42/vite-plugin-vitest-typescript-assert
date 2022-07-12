import type ts from 'unleashed-typescript';
import { getMiddle } from '../../../typescript/util';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

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

type Types =
  | { type: ts.Type; position: number; diagnostic?: never }
  | { diagnostic: ts.Diagnostic; type?: never; position?: never };

export function getTypes(node: ts.CallExpression, typeChecker: ts.TypeChecker): Types {
  let type = undefined;
  let value = undefined;

  let middlePosition = -1;

  if (node.typeArguments?.[0]) {
    type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    middlePosition = getMiddle(node.typeArguments[0]);
  }

  if (node.arguments[0]) {
    value = typeChecker.getTypeAtLocation(node.arguments[0]);
    middlePosition = getMiddle(node.arguments[0]);
  }

  if (type && value) {
    return {
      diagnostic: createAssertionDiagnostic(
        errorMessage(ErrorCode.ASSERT_MIXED_TYPE_AND_VALUE),
        node.getSourceFile(),
        getMiddle(node.typeArguments?.[0] ?? node),
      ),
    };
  }

  if (type) {
    return { type, position: middlePosition };
  }

  if (value) {
    return { type: value, position: middlePosition };
  }

  return {
    diagnostic: createAssertionDiagnostic(
      errorMessage(ErrorCode.ASSERT_MISSING_TYPE_OR_VALUE),
      node.getSourceFile(),
      node.getEnd() - 2,
    ),
  };
}
