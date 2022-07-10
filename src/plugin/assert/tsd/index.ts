import type ts from 'byots';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';

export function expectType(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectNotType(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectAssignable(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

export function expectNotAssignable(assertion: Assertion, compiler: Compiler): ts.Diagnostic | undefined {
  return createAssertionDiagnostic('Not yet implemented.', compiler.sourceFile, assertion.node.getStart());
}

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
