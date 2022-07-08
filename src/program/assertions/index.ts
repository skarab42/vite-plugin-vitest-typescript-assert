import ts from 'typescript';
import * as checkers from './checkers';
import type { AssertionDiagnostic } from './diagnostic';

export interface AssertionNode {
	name: string;
	node: ts.Node;
}

export interface Assertion {
	identifier: string;
	assertionName: string;
	path: AssertionNode[];
	node: ts.CallExpression;
}

export interface AssertionResult {
	pass: boolean;
	fail: boolean;
	source: string;
	target: string;
	diagnostic: AssertionDiagnostic | undefined;
}

export type AssertionChecker = (
	path: AssertionNode[],
	target: ts.CallExpression,
	typeChecker: ts.TypeChecker,
) => AssertionResult;

export const assertionCheckers = new Map<string, AssertionChecker>(Object.entries(checkers));

// TODO: should be set by user config?!
export const vitestBlockIdentifiers = [
	'it',
	'it.skip',
	'it.skipIf',
	'it.runIf',
	'it.only',
	'it.concurrent',
	'it.todo',
	'it.fails',
	'it.each',
	'test',
	'test.skip',
	'test.skipIf',
	'test.runIf',
	'test.only',
	'test.concurrent',
	'test.todo',
	'test.fails',
	'test.each',
	'describe',
	'describe.skip',
	'describe.only',
	'describe.concurrent',
	'describe.shuffle',
	'describe.todo',
	'describe.each',
];

export function getAssertions(node: ts.Node) {
	const assertions: Assertion[] = [];
	const sourceFile = node.getSourceFile();
	const rootPath = { name: 'root', node, endPosition: { line: 0, character: 0 } };

	function walkNodes(node: ts.Node, path = [rootPath]) {
		const currentPath = [...path];

		if (ts.isCallExpression(node)) {
			const identifier = node.expression.getText();

			// TODO: handle skip, only, runif, etc...
			if (vitestBlockIdentifiers.includes(identifier)) {
				const vitestBlockName = node.arguments[0];
				const vitestTestFunction = node.arguments[1];

				if (vitestBlockName && vitestTestFunction) {
					const endPosition = sourceFile.getLineAndCharacterOfPosition(vitestTestFunction.getEnd());
					currentPath.push({ name: vitestBlockName.getText().slice(1, -1), node, endPosition });
				} // TODO: handle the case when is not a string? (this should never append...)
			} else if (identifier.startsWith('expectType')) {
				const assertionName = identifier.split('.').pop();

				if (assertionName && assertionCheckers.has(assertionName)) {
					assertions.push({ identifier, path: currentPath, assertionName, node });
				}
			}
		}

		ts.forEachChild(node, (child) => walkNodes(child, currentPath));
	}

	walkNodes(node);

	return assertions;
}

function getMiddle(node: ts.Node) {
	const diff = node.getEnd() - node.getStart();
	return node.getStart() + Math.round(diff / 2);
}

export function getTypes(target: ts.CallExpression, typeChecker: ts.TypeChecker) {
	const source = target.expression.getChildAt(0) as ts.CallExpression;

	let sourceType = undefined;
	let targetType = undefined;
	let sourceValue = undefined;
	let targetValue = undefined;

	let sourceMiddle = -1;
	let targetMiddle = -1;

	if (source.typeArguments?.[0]) {
		sourceType = typeChecker.getTypeFromTypeNode(source.typeArguments[0]);
		sourceMiddle = getMiddle(source.typeArguments[0]);
	}

	if (target.typeArguments?.[0]) {
		targetType = typeChecker.getTypeFromTypeNode(target.typeArguments[0]);
		targetMiddle = getMiddle(target.typeArguments[0]);
	}

	if (source.arguments[0]) {
		sourceValue = typeChecker.getTypeAtLocation(source.arguments[0]);
		sourceMiddle = getMiddle(source.arguments[0]);
	}

	if (target.arguments[0]) {
		targetValue = typeChecker.getTypeAtLocation(target.arguments[0]);
		targetMiddle = getMiddle(target.arguments[0]);
	}

	if ((sourceType && sourceValue) || (targetType && targetValue)) {
		// TODO: create and add to diagnostics output and do not throw
		throw new Error('Do not define a type and value at the same time, please review the arguments of your test.');
	}

	sourceType = sourceType ?? sourceValue;
	targetType = targetType ?? targetValue;

	if (!sourceType || !targetType) {
		// TODO: create and add to diagnostics output and do not throw
		throw new Error('A type or value is missing, please review the arguments of your test.');
	}

	return {
		source: { node: source, position: sourceMiddle, type: sourceType },
		target: { node: target, position: targetMiddle, type: targetType },
	};
}

export function processAssertions(assertions: Assertion[], typeChecker: ts.TypeChecker) {
	const diagnostics: AssertionDiagnostic[] = [];

	assertions.forEach(({ assertionName, node, path }) => {
		const assertion = assertionCheckers.get(assertionName);

		if (assertion) {
			const result = assertion(path, node, typeChecker);

			if (result.diagnostic) {
				diagnostics.push(result.diagnostic);
			}
		}
	});

	return diagnostics;
}
