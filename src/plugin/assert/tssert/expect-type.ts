import ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

export function expectType({ node }: Assertion, { sourceFile }: Compiler): ts.Diagnostic | undefined {
  if (!ts.isCallExpression(node.parent.parent) && !ts.isCallExpression(node.parent.parent.parent)) {
    return createAssertionDiagnostic(errorMessage(ErrorCode.ASSERT_MISSING_METHOD), sourceFile, node.getEnd());
  }

  return;
}
