import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { ErrorCode } from '../../../common/error';
import type { Compiler } from '../../../typescript/types';
import { missingGeneric, missingArgument, typeError } from './util';

// https://github.dev/SamVerschueren/tsd/blob/e4a398c1b47a4d2f914446b662840e2be5994997/source/lib/assertions/handlers/identicality.ts#L12
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
