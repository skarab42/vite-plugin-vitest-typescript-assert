import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { ErrorCode } from '../../../common/error';
import type { Compiler } from '../../../typescript/types';
import { missingGeneric, missingArgument, typeError } from './util';

// In tsd this is handled directlly by TypeScript.
export function expectAssignable(
  { node }: Assertion,
  { sourceFile, typeChecker }: Compiler,
): ts.Diagnostic | undefined {
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

  return;
}
