import ts from 'unleashed-typescript';
import { getMiddle } from '../../../typescript/util';
import { createAssertionDiagnostic } from '../../diagnostics';
import { ErrorCode, errorMessage } from '../../../common/error';

export function missingGeneric(node: ts.CallExpression, sourceFile: ts.SourceFile): ts.Diagnostic {
  return createAssertionDiagnostic(
    errorMessage(ErrorCode.ASSERT_MISSING_GENERIC, { position: 1 }),
    sourceFile,
    node.expression.getStart(),
  );
}

export function missingArgument(node: ts.CallExpression, sourceFile: ts.SourceFile): ts.Diagnostic {
  return createAssertionDiagnostic(
    errorMessage(ErrorCode.ASSERT_MISSING_ARGUMENT, { position: 1 }),
    sourceFile,
    node.expression.end,
  );
}

export function typeError(
  code: ErrorCode,
  typeChecker: ts.TypeChecker,
  expectedType: ts.Type,
  argumentType: ts.Type,
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
): ts.Diagnostic | undefined {
  return createAssertionDiagnostic(
    errorMessage(code, {
      expected: typeChecker.typeToString(expectedType),
      argument: typeChecker.typeToString(argumentType),
    }),
    sourceFile,
    getMiddle(node.typeArguments?.[0] ?? node),
  );
}

export function argumentError(
  code: ErrorCode,
  typeChecker: ts.TypeChecker,
  argument: ts.Expression,
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
): ts.Diagnostic | undefined {
  return createAssertionDiagnostic(
    errorMessage(code, {
      argument: expressionToString(typeChecker, argument),
    }),
    sourceFile,
    getMiddle(node.arguments[0] ?? node),
  );
}

export function hasDeprecatedTag(argument: ts.Expression, typeChecker: ts.TypeChecker): boolean {
  const signatureOrSymbol = ts.isCallLikeExpression(argument)
    ? typeChecker.getResolvedSignature(argument)
    : typeChecker.getSymbolAtLocation(argument);

  if (!signatureOrSymbol) {
    return false;
  }

  const tags = signatureOrSymbol.getJsDocTags();

  if (!tags.length) {
    return false;
  }

  return !!tags.find((tag) => tag.name === 'deprecated');
}

export function expressionToString(typeChecker: ts.TypeChecker, expression: ts.Expression): string | undefined {
  if (ts.isCallLikeExpression(expression)) {
    const signature = typeChecker.getResolvedSignature(expression);

    if (signature) {
      return typeChecker.signatureToString(signature);
    }

    return;
  }

  const symbol = typeChecker.getSymbolAtLocation(expression);

  if (symbol) {
    return typeChecker.symbolToString(symbol, expression);
  }

  return;
}
