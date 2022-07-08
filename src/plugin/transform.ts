import type ts from 'byots';
import MagicString from 'magic-string';
import { reportDiagnostics } from './util';
import type { TransformResult } from 'vite';
import { program } from '../typescript/program';

export interface TransformOptions {
  code: string;
  fileName: string;
  tsconfig: ts.ParsedCommandLine;
  shouldReportDiagnostics?: boolean;
}

export function transform({ code, fileName, tsconfig, shouldReportDiagnostics }: TransformOptions): TransformResult {
  const { diagnostics } = program({ config: tsconfig, fileName });
  const newCode = new MagicString(code);

  if (shouldReportDiagnostics) {
    reportDiagnostics(diagnostics, newCode, fileName);
  }

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}
