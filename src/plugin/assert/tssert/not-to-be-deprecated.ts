import { getTypes } from './util';
import type ts from 'unleashed-typescript';
import { hasDeprecatedTag } from '../util';
import { argumentError } from '../tsd/util';
import type { Assertion } from '../../types';
import { ErrorCode } from '../../../common/error';
import type { Compiler } from '../../../typescript/types';

export function notToBeDeprecated(
  { node }: Assertion,
  { sourceFile, typeChecker }: Compiler,
): ts.Diagnostic | undefined {
  const expectedNode = node.expression.getChildAt(0).getChildAt(0) as ts.CallExpression;
  const expected = getTypes(expectedNode, typeChecker);

  if (expected.diagnostic) {
    return expected.diagnostic;
  }

  if (hasDeprecatedTag(expected.argument, typeChecker)) {
    return argumentError(ErrorCode.ASSERT_NOT_DEPRECATED, typeChecker, expected.argument, sourceFile, expectedNode);
  }

  return;
}
