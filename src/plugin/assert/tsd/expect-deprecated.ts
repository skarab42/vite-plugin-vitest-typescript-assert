import type ts from 'unleashed-typescript';
import { hasDeprecatedTag } from '../util';
import type { Assertion } from '../../types';
import { ErrorCode } from '../../../common/error';
import { argumentError, missingArgument } from './util';
import type { Compiler } from '../../../typescript/types';

// https://github.dev/SamVerschueren/tsd/blob/e4a398c1b47a4d2f914446b662840e2be5994997/source/lib/assertions/handlers/expect-deprecated.ts#L11
export function expectDeprecated(
  { node }: Assertion,
  { sourceFile, typeChecker }: Compiler,
): ts.Diagnostic | undefined {
  const argument = node.arguments[0];

  if (!argument) {
    return missingArgument(node, sourceFile);
  }

  if (!hasDeprecatedTag(argument, typeChecker)) {
    return argumentError(ErrorCode.ASSERT_DEPRECATED, typeChecker, argument, sourceFile, node);
  }

  return;
}
