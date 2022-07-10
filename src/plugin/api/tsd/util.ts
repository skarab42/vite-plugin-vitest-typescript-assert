import type ts from 'byots';
import type { AssertionTypes } from '../types';
import { getMiddle } from '../../../typescript/util';

export function getTypes(node: ts.CallExpression, checker: ts.TypeChecker): AssertionTypes {
  let targetType = undefined;
  let sourceType = undefined;

  let targetMiddle = -1;
  let sourceMiddle = -1;

  if (node.typeArguments?.[0]) {
    targetType = checker.getTypeFromTypeNode(node.typeArguments[0]);
    targetMiddle = getMiddle(node.typeArguments[0]);
  }

  if (node.arguments[0]) {
    sourceType = checker.getTypeAtLocation(node.arguments[0]);
    sourceMiddle = getMiddle(node.arguments[0]);
  }

  return {
    source: { node, type: sourceType, position: sourceMiddle },
    target: { node, type: targetType, position: targetMiddle },
  };
}
