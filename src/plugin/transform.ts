import { assert } from './assert';
import ts from 'unleashed-typescript';
import { getTag } from './assert/util';
import MagicString from 'magic-string';
import type { TransformResult } from 'vite';
import { reportDiagnostics } from './diagnostics';
import type { Compiler } from '../typescript/types';
import { createCompiler } from '../typescript/compiler';
import { createError, ErrorCode } from '../common/error';
import type { APIName, Assertion, TransformSettings } from './types';

export function transform({ code, fileName, report, typescript }: TransformSettings): TransformResult {
  const compiler = createCompiler({ config: typescript.config, fileName });
  const newCode = new MagicString(code);

  if (report.includes('type-assertion')) {
    const assertions = getAssertions(compiler.sourceFile, compiler.typeChecker);
    const diagnostics = processAssertions(assertions, compiler);

    if (diagnostics.length) {
      reportDiagnostics(diagnostics, newCode, fileName);
    }
  }

  if (report.includes('type-error')) {
    reportDiagnostics(compiler.diagnostics, newCode, fileName);
  }

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}

export function getAssertion(node: ts.Node, typeChecker: ts.TypeChecker): Assertion | undefined {
  if (!ts.isCallExpression(node)) {
    return;
  }

  const apiName = getTag('apiName', node, typeChecker);

  if (!apiName || !apiName.text?.[0]) {
    return;
  }

  const functionName = getTag('functionName', node, typeChecker);

  if (!functionName || !functionName.text?.[0]) {
    return;
  }

  return { apiName: apiName.text[0].text as APIName, functionName: functionName.text[0].text, node };
}

function getAssertions(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker): Assertion[] {
  const assertions: Assertion[] = [];

  function visit(node: ts.Node): void {
    const assertion = getAssertion(node, typeChecker);

    if (assertion) {
      assertions.push(assertion);
    }

    node.forEachChild(visit);
  }

  visit(sourceFile);

  return assertions;
}

function processAssertions(assertions: Assertion[], compiler: Compiler): ts.Diagnostic[] {
  const diagnostics: ts.Diagnostic[] = [];

  assertions.forEach((assertion) => {
    const api = assert.get(assertion.apiName);

    if (!api) {
      throw createError(ErrorCode.UNEXPECTED_ERROR, {
        message: `The ${assertion.apiName} API could not be loaded.`,
      });
    }

    const diagnostic = api[assertion.functionName as keyof typeof api](assertion, compiler);

    if (diagnostic) {
      diagnostics.push(diagnostic);
    }
  });

  return diagnostics;
}
