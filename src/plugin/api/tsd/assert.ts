import type ts from 'byots';
import { getTypes } from './util';
import type { AssertionResult } from '../types';
import { createAssertionDiagnostic } from '../../util';

export function expectType(
  sourceFile: ts.SourceFile,
  node: ts.CallExpression,
  checker: ts.TypeChecker,
): AssertionResult {
  const { source, target } = getTypes(node, checker);

  if (!source.type || !target.type) {
    throw new Error('Prout');
  }

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

// export function expectNotType(): AssertionResult {
//   return undefined;
// }

// export function expectAssignable(): AssertionResult {
//   return undefined;
// }

// export function expectNotAssignable(): AssertionResult {
//   return undefined;
// }

// export function expectError(): AssertionResult {
//   return undefined;
// }

// export function expectDeprecated(): AssertionResult {
//   return undefined;
// }

// export function expectNotDeprecated(): AssertionResult {
//   return undefined;
// }

// export function printType(): AssertionResult {
//   return undefined;
// }
