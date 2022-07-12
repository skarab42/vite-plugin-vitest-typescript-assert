import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { ErrorCode } from '../../../common/error';
import type { Compiler } from '../../../typescript/types';
import { missingGeneric, missingArgument, typeError } from './util';

// https://github.dev/SamVerschueren/tsd/blob/e4a398c1b47a4d2f914446b662840e2be5994997/source/lib/assertions/handlers/assignability.ts#L12-L13
export function expectNotAssignable(
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

  if (typeChecker.isTypeAssignableTo(argumentType, expectedType)) {
    return typeError(ErrorCode.ASSERT_TYPE_ASSIGNABLE, typeChecker, expectedType, argumentType, sourceFile, node);
  }

  return;
}
