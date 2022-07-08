import type ts from 'typescript';
import { AssertionNode, getTypes } from '../index';
import { createAssertionDiagnostic } from '../diagnostic';

export function assignableTo(path: AssertionNode[], target: ts.CallExpression, typeChecker: ts.TypeChecker) {
	const types = getTypes(target, typeChecker);

	const sourceString = typeChecker.typeToString(types.source.type);
	const targetString = typeChecker.typeToString(types.target.type);

	// @ts-expect-error access to internal API
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const pass = typeChecker.isTypeAssignableTo(types.source.type, types.target.type) as boolean;

	const position = types.source.node.getSourceFile().getLineAndCharacterOfPosition(types.source.position);

	let diagnostic = undefined;

	if (!pass) {
		diagnostic = createAssertionDiagnostic({
			message: `Type \`${sourceString}\` is not assignable to type \`${targetString}\`.`,
			position,
			path,
		});
	}

	return {
		pass,
		fail: !pass,
		source: sourceString,
		target: targetString,
		diagnostic,
	};
}
