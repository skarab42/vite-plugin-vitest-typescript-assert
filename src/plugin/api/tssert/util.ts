import type ts from 'byots';
import { getMiddle } from '../../../typescript/util';

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
    source: { node: source, type: sourceType, position: sourceMiddle },
    target: { node: target, type: targetType, position: targetMiddle },
  };
}
