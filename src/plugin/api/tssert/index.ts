import type ts from 'byots';

export function processCallExpression(node: ts.CallExpression) {
  const identifier = node.expression.getText();

  // eslint-disable-next-line no-console
  console.log('> tssert', { identifier });
}
