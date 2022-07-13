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
  | { type: ts.Type; position: number; argument: ts.Node; errorCode?: never; diagnostic?: never }
  | { errorCode: ErrorCode; diagnostic: ts.Diagnostic; type?: never; position?: never; argument?: never };

export function getTypes(node: ts.CallExpression, typeChecker: ts.TypeChecker): Types {
  let type = undefined;
  let value = undefined;

  let middlePosition = -1;

  const typeArgument = node.typeArguments?.[0];
  const valueArgument = node.arguments[0];

  if (typeArgument) {
    type = typeChecker.getTypeFromTypeNode(typeArgument);
    middlePosition = getMiddle(typeArgument);
  }

  if (valueArgument) {
    value = typeChecker.getTypeAtLocation(valueArgument);
    middlePosition = getMiddle(valueArgument);
  }

  if (type && value) {
    return {
      errorCode: ErrorCode.ASSERT_MIXED_TYPE_AND_VALUE,
      diagnostic: createAssertionDiagnostic(
        errorMessage(ErrorCode.ASSERT_MIXED_TYPE_AND_VALUE),
        node.getSourceFile(),
        getMiddle(typeArgument ?? node),
      ),
    };
  }

  if (type && typeArgument) {
    return { type, position: middlePosition, argument: typeArgument };
  }

  if (value && valueArgument) {
    return { type: value, position: middlePosition, argument: valueArgument };
  }

  return {
    errorCode: ErrorCode.ASSERT_MISSING_TYPE_OR_VALUE,
    diagnostic: createAssertionDiagnostic(
      errorMessage(ErrorCode.ASSERT_MISSING_TYPE_OR_VALUE),
      node.getSourceFile(),
      node.getEnd() - 2,
    ),
  };
}
