import ts from 'byots';
import type { Reporter } from '.';
import MagicString from 'magic-string';
import type { TransformResult } from 'vite';
import { ErrorCode, errorMessage } from '../error';
import { createProgram } from '../typescript/program';
import type { TypeScriptConfigOptions } from '../typescript/config';
import { type APIName, reportDiagnostics, tryToGetAPINAme } from './util';

export interface TransformSettings {
  code: string;
  fileName: string;
  report: Reporter[];
  typescript: {
    config: ts.ParsedCommandLine;
    options: TypeScriptConfigOptions;
  };
}

export function transform({ code, fileName, report, typescript }: TransformSettings): TransformResult {
  const { diagnostics, checker, sourceFile, program } = createProgram({ config: typescript.config, fileName });
  const newCode = new MagicString(code);

  if (report.includes('type-error')) {
    reportDiagnostics(diagnostics, newCode, fileName);
  }

  if (report.includes('type-assertion')) {
    typeAssertion(fileName, sourceFile, program, checker);
  }

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}

function typeAssertion(fileName: string, sourceFile: ts.SourceFile, program: ts.Program, checker: ts.TypeChecker) {
  let apiName: APIName | undefined = undefined;

  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node)) {
      const moduleName = node.moduleSpecifier.getText().slice(1, -1);
      const moduleAPIName = tryToGetAPINAme(moduleName, fileName, program, checker);

      if (apiName && moduleAPIName && apiName !== moduleAPIName) {
        throw errorMessage(ErrorCode.MULTIPLE_ASSERTION_API_IN_SAME_FILE_NOT_ALLOWED, {
          apiNames: `${apiName}, ${moduleAPIName}`,
        });
      }

      apiName = moduleAPIName;

      // eslint-disable-next-line no-console
      console.log({ apiName });
    }

    if (ts.isCallExpression(node)) {
      // eslint-disable-next-line no-console
      console.log('>', node.getText());
    }

    node.forEachChild(visit);
  }

  visit(sourceFile);
}
