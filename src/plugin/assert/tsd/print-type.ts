import { missingArgument } from '../util';
import type ts from 'unleashed-typescript';
import type { Assertion } from '../../types';
import type { Compiler } from '../../../typescript/types';
import { createAssertionDiagnostic } from '../../diagnostics';

export function printType({ node }: Assertion, { sourceFile, typeChecker }: Compiler): ts.Diagnostic | undefined {
  const argument = node.arguments[0];

  if (!argument) {
    return missingArgument(node, sourceFile);
  }

  const argumentExpression = argument.getText();
  const argumentType = typeChecker.getTypeAtLocation(argument);
  const argumentString = typeChecker.typeToString(argumentType);

  return createAssertionDiagnostic(
    `Type for expression \`${argumentExpression}\` is: \`${argumentString}\``,
    sourceFile,
    node.getStart(),
  );
}
