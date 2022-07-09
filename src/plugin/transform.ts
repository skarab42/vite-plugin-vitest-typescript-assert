import type ts from 'byots';
import type { Reporter } from '.';
import MagicString from 'magic-string';
import { reportDiagnostics } from './util';
import type { TransformResult } from 'vite';
import { program } from '../typescript/program';
import type { TypeScriptConfigOptions } from '../typescript/config';

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
  const { diagnostics } = program({ config: typescript.config, fileName });
  const newCode = new MagicString(code);

  if (report.includes('type-error')) {
    reportDiagnostics(diagnostics, newCode, fileName);
  }

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}
