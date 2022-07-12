import { missingArgument } from './util';
import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

// https://github.dev/SamVerschueren/tsd/blob/e4a398c1b47a4d2f914446b662840e2be5994997/source/lib/compiler.ts#L54-L55
export function expectError({ node }: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  const argument = node.arguments[0];

  if (!argument) {
    return missingArgument(node, compiler.sourceFile);
  }

  let assertDiagnostic: ts.Diagnostic | undefined = undefined;

  if (!compiler.diagnostics.length) {
    return createAssertionDiagnostic(errorMessage(ErrorCode.ASSERT_ERROR), compiler.sourceFile, argument.getStart());
  }

  // TODO: Create a method in Compiler for cleanly removing/filter a diagnostic.
  compiler.diagnostics = compiler.diagnostics.filter((diagnostic) => {
    if (assertDiagnostic || !diagnostic.start) {
      return true;
    }

    if (diagnostic.start < argument.getStart() || diagnostic.start > argument.getEnd()) {
      assertDiagnostic = createAssertionDiagnostic(
        errorMessage(ErrorCode.ASSERT_ERROR),
        compiler.sourceFile,
        diagnostic.start,
      );

      return true;
    }

    return false;
  });

  return assertDiagnostic;
}
