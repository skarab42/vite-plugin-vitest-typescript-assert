import type ts from 'byots';
import { getTypes } from './util';
import type { AssertionResult } from '../types';
import { createAssertionDiagnostic } from '../../util';

export function assignableTo(
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
  checker: ts.TypeChecker,
): AssertionResult {
  const { source, target } = getTypes(node, checker);

  if (!checker.isTypeAssignableTo(source.type, target.type)) {
    const sourceString = checker.typeToString(source.type);
    const targetString = checker.typeToString(target.type);

    return createAssertionDiagnostic(
      `Type \`${sourceString}\` is not assignable to type \`${targetString}\`.`,
      sourceFile,
      source.position,
    );
  }

  return undefined;
}
