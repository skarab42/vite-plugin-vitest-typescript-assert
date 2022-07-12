import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';

export * from './expect-type';
export * from './expect-not-type';
export * from './expect-assignable';
export * from './expect-not-assignable';

// All credits go to tsd! Most of the logic here comme from their code:
// https://github.com/SamVerschueren/tsd/blob/main/source/lib/assertions/index.ts
// https://github.com/SamVerschueren/tsd/tree/main/source/lib/assertions/handlers

export function expectError(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectDeprecated(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectNotDeprecated(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function printType(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}
