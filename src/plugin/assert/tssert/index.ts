import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';

export function expectType(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function assignableTo(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function notAssignableTo(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}
