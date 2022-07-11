import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { getMiddle } from '../../../typescript/util';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

// All credits go to tsd! Most of the logic here comme from their code:
// https://github.com/SamVerschueren/tsd/blob/main/source/lib/assertions/index.ts
// https://github.com/SamVerschueren/tsd/tree/main/source/lib/assertions/handlers

function missingGeneric(node: ts.CallExpression, sourceFile: ts.SourceFile): ts.Diagnostic {
  return createAssertionDiagnostic(
    errorMessage(ErrorCode.ASSERT_MISSING_GENERIC, { position: 1 }),
    sourceFile,
    node.expression.getStart(),
  );
}

function missingArgument(node: ts.CallExpression, sourceFile: ts.SourceFile): ts.Diagnostic {
  return createAssertionDiagnostic(
    errorMessage(ErrorCode.ASSERT_MISSING_ARGUMENT, { position: 1 }),
    sourceFile,
    node.expression.end,
  );
}

function typeError(
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

// https://github.com/SamVerschueren/tsd/blob/main/source/lib/assertions/handlers/identicality.ts#L12
export function expectType({ node }: Assertion, { sourceFile, typeChecker }: Compiler): ts.Diagnostic | undefined {
  if (!node.typeArguments?.[0]) {
    return missingGeneric(node, sourceFile);
  }

  if (!node.arguments[0]) {
    return missingArgument(node, sourceFile);
  }

  const expectedType = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
  const argumentType = typeChecker.getTypeAtLocation(node.arguments[0]);

  if (!typeChecker.isTypeAssignableTo(argumentType, expectedType)) {
    return typeError(ErrorCode.ASSERT_TYPE_NOT_ASSIGNABLE, typeChecker, expectedType, argumentType, sourceFile, node);
  }

  if (!typeChecker.isTypeAssignableTo(expectedType, argumentType)) {
    return typeError(ErrorCode.ASSERT_TYPE_TOO_WIDE, typeChecker, expectedType, argumentType, sourceFile, node);
  }

  if (!typeChecker.isTypeIdenticalTo(expectedType, argumentType)) {
    return typeError(ErrorCode.ASSERT_TYPE_NOT_IDENTICAL, typeChecker, expectedType, argumentType, sourceFile, node);
  }

  return;
}

export function expectNotType({ node }: Assertion, { sourceFile, typeChecker }: Compiler): ts.Diagnostic | undefined {
  if (!node.typeArguments?.[0]) {
    return missingGeneric(node, sourceFile);
  }

  if (!node.arguments[0]) {
    return missingArgument(node, sourceFile);
  }

  const expectedType = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
  const argumentType = typeChecker.getTypeAtLocation(node.arguments[0]);

  if (!typeChecker.isTypeIdenticalTo(expectedType, argumentType)) {
    return typeError(ErrorCode.ASSERT_TYPE_IDENTICAL, typeChecker, expectedType, argumentType, sourceFile, node);
  }

  return;
}

export function expectAssignable(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectNotAssignable(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectError(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectDeprecated(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectNotDeprecated(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function printType(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}
