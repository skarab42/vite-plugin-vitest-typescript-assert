import { missingArgument } from './util';
import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

function inRange(argument: ts.Expression, diagnostic: ts.Diagnostic): boolean {
  return !!diagnostic.start && argument.getStart() <= diagnostic.start && diagnostic.start <= argument.getEnd();
}

// https://github.dev/SamVerschueren/tsd/blob/e4a398c1b47a4d2f914446b662840e2be5994997/source/lib/compiler.ts#L54-L55
export function expectError({ node }: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  const argument = node.arguments[0];

  if (!argument) {
    return missingArgument(node, compiler.sourceFile);
  }

  if (!compiler.diagnostics.length) {
    return createAssertionDiagnostic(errorMessage(ErrorCode.ASSERT_ERROR), compiler.sourceFile, argument.getStart());
  }

  const diagnostic = compiler.diagnostics.find((diagnostic) => inRange(argument, diagnostic));

  if (diagnostic) {
    compiler.diagnostics = compiler.diagnostics.filter((d) => d !== diagnostic);
    return;
  }

  return createAssertionDiagnostic(errorMessage(ErrorCode.ASSERT_ERROR), compiler.sourceFile, argument.getStart());
}
