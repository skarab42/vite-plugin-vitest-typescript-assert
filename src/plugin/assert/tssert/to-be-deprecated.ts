import { getTypes } from './util';
import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { ErrorCode } from '../../../common/error';
import type { Compiler } from '../../../typescript/types';
import { hasDeprecatedTag, argumentError } from '../util';

export function toBeDeprecated({ node }: Assertion, { sourceFile, typeChecker }: Compiler): ts.Diagnostic | undefined {
  const expectedNode = node.expression.getChildAt(0) as ts.CallExpression;
  const expected = getTypes(expectedNode, typeChecker);

  if (expected.diagnostic) {
    return expected.diagnostic;
  }

  if (!hasDeprecatedTag(expected.argument, typeChecker)) {
    return argumentError(ErrorCode.ASSERT_DEPRECATED, typeChecker, expected.argument, sourceFile, expectedNode);
  }

  return;
}
