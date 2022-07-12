import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';

// All credits go to tsd! Most of the logic here comme from their code:
// https://github.com/SamVerschueren/tsd/blob/main/source/lib/assertions/index.ts
// https://github.com/SamVerschueren/tsd/tree/main/source/lib/assertions/handlers

export * from './expect-type';
export * from './expect-not-type';
export * from './expect-assignable';
export * from './expect-not-assignable';
export * from './expect-error';
export * from './expect-deprecated';
export * from './expect-not-deprecated';

export function printType(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}
