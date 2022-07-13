import ts from 'unleashed-typescript';

export function hasDeprecatedTag(argument: ts.Node, typeChecker: ts.TypeChecker): boolean {
  const signatureOrSymbol = ts.isCallLikeExpression(argument)
    ? typeChecker.getResolvedSignature(argument)
    : typeChecker.getSymbolAtLocation(argument);

  if (!signatureOrSymbol) {
    return false;
  }

  const tags = signatureOrSymbol.getJsDocTags();

  if (!tags.length) {
    return false;
  }

  return !!tags.find((tag) => tag.name === 'deprecated');
}
