import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { getTypes, typeError } from './util';
import { ErrorCode } from '../../../common/error';
import type { Compiler } from '../../../typescript/types';

export function identicalTo({ node }: Assertion, { sourceFile, typeChecker }: Compiler): ts.Diagnostic | undefined {
  const expectedNode = node.expression.getChildAt(0) as ts.CallExpression;
  const expected = getTypes(expectedNode, typeChecker);

  if (expected.diagnostic) {
    return expected.diagnostic;
  }

  const argument = getTypes(node, typeChecker);

  if (argument.diagnostic) {
    return argument.diagnostic;
  }

  if (!typeChecker.isTypeIdenticalTo(argument.type, expected.type)) {
    return typeError(
      ErrorCode.ASSERT_TYPE_NOT_IDENTICAL,
      typeChecker,
      argument.type,
      expected.type,
      sourceFile,
      expectedNode,
    );
  }

  return;
}
