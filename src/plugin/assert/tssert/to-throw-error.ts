import { getTypes } from './util';
import ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import { isArgumentInDiagnostic } from '../util';
import { newLine } from '../../../typescript/util';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

export function toThrowError({ node }: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  const expectedNode = node.expression.getChildAt(0) as ts.CallExpression;
  const expected = getTypes(expectedNode, compiler.typeChecker);

  if (expected.diagnostic) {
    return expected.diagnostic;
  }

  const argument = getTypes(node, compiler.typeChecker);

  if (argument.diagnostic && argument.errorCode !== ErrorCode.ASSERT_MISSING_TYPE_OR_VALUE) {
    return argument.diagnostic;
  }

  if (!compiler.diagnostics.length) {
    return createAssertionDiagnostic(
      errorMessage(ErrorCode.ASSERT_ERROR),
      compiler.sourceFile,
      Number(expected.position),
    );
  }

  const diagnostic = compiler.diagnostics.find((diagnostic) => isArgumentInDiagnostic(expected.argument, diagnostic));

  if (!diagnostic) {
    return createAssertionDiagnostic(
      errorMessage(ErrorCode.ASSERT_ERROR),
      compiler.sourceFile,
      Number(expected.position),
    );
  }

  if (argument.argument) {
    if (ts.isStringLiteral(argument.argument)) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, newLine);

      if (!message.includes(argument.argument.text)) {
        return createAssertionDiagnostic(
          errorMessage(ErrorCode.ASSERT_ERROR_MESSAGE, { expected: argument.argument.text, received: message }),
          compiler.sourceFile,
          Number(expected.position),
        );
      }
    } else if (ts.isNumericLiteral(argument.argument)) {
      if (Number(argument.argument.text) !== diagnostic.code) {
        return createAssertionDiagnostic(
          errorMessage(ErrorCode.ASSERT_ERROR_CODE, { expected: argument.argument.text, received: diagnostic.code }),
          compiler.sourceFile,
          Number(expected.position),
        );
      }
    } else {
      // TODO: resolve value
      return createAssertionDiagnostic(
        errorMessage(ErrorCode.ASSERT_STRING_OR_NUMBER_LITERAL),
        compiler.sourceFile,
        argument.argument.getStart(),
      );
    }
  }

  compiler.diagnostics = compiler.diagnostics.filter((d) => d !== diagnostic);

  return;
}
