import ts from 'typescript';
import * as assertions from '../../assert';

export const assertionNames = Object.keys(assertions);

// TODO: should be set by user config?!
export const vitestBlockIdentifiers = ['describe', 'test', 'it'];

export interface AssertionNode {
	name: string;
	node: ts.Node;
}

export interface Assertion {
	identifier: string;
	path: AssertionNode[];
	node: ts.CallExpression;
}

export function getAssertions(node: ts.Node) {
	const assertions: Assertion[] = [];

	function walkNodes(node: ts.Node, path = [{ name: 'root', node }]) {
		if (ts.isCallExpression(node)) {
			const identifier = node.expression.getText();

			if (vitestBlockIdentifiers.includes(identifier)) {
				const firstArgument = node.arguments[0];

				if (firstArgument) {
					path.push({ name: firstArgument.getText().slice(1, -1), node });
				} // TODO: handle the case when is not a string? (this should never append...)
			} else if (assertionNames.includes(identifier)) {
				// console.log('> assert:', path, ':', identifier);
				assertions.push({ identifier, path, node });
			}
		}

		ts.forEachChild(node, (child) => walkNodes(child, path));
	}

	walkNodes(node);

	return assertions;
}
