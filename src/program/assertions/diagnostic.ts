import type ts from 'typescript';
import type { AssertionNode } from '.';

export interface AssertionDiagnostic {
	message: string;
	position: ts.LineAndCharacter;
	path: AssertionNode[];
}

export function createAssertionDiagnostic(diagnostic: AssertionDiagnostic): AssertionDiagnostic {
	return { ...diagnostic };
}
