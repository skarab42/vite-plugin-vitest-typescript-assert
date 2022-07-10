import ts from 'byots';
import MagicString from 'magic-string';
import type { TransformResult } from 'vite';
import { reportDiagnostics } from './diagnostics';
import type { Compiler } from '../typescript/types';
import { API_PROPERTY_KEY } from '../common/internal';
import { createCompiler } from '../typescript/compiler';
import type { Assertion, TransformSettings } from './types';

export function transform({ code, fileName, report, typescript }: TransformSettings): TransformResult {
  const compiler = createCompiler({ config: typescript.config, fileName });
  const newCode = new MagicString(code);

  if (report.includes('type-error')) {
    reportDiagnostics(compiler.diagnostics, newCode, fileName);
  }

  if (report.includes('type-assertion')) {
    const assertions = getAssertions(compiler.sourceFile, compiler.typeChecker);
    const diagnostics = processAssertions(assertions, compiler);

    if (diagnostics.length) {
      reportDiagnostics(diagnostics, newCode, fileName);
    }
  }

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}

function getAssertions(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker): Assertion[] {
  const assertions: Assertion[] = [];

  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      const expressionType = typeChecker.getTypeAtLocation(expression);
      const assertionProperty = expressionType.getProperty(API_PROPERTY_KEY);

      if (!assertionProperty) {
        return;
      }

      const assertionPropertyType = typeChecker.getTypeOfSymbolAtLocation(assertionProperty, expression);
      const assertionPropertyValue = typeChecker.typeToString(assertionPropertyType).slice(1, -1);
      const [apiName, functionName] = assertionPropertyValue.split(':');

      if (!apiName || !functionName) {
        return;
      }

      assertions.push({ apiName, functionName, node });
    }

    node.forEachChild(visit);
  }

  visit(sourceFile);

  return assertions;
}

function processAssertions(assertions: Assertion[], compiler: Compiler): ts.Diagnostic[] {
  const diagnostics: ts.Diagnostic[] = [];

  // eslint-disable-next-line no-console
  console.log({ assertions, compiler });

  return diagnostics;
}
