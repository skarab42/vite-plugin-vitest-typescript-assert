import type ts from 'typescript';
import MagicString from 'magic-string';
import type { TransformResult } from 'vite';

export interface TransformOptions {
  code: string;
  fileName: string;
  tsconfig: ts.ParsedCommandLine;
}

export function transform({ code, fileName, tsconfig }: TransformOptions): TransformResult {
  const newCode = new MagicString(code);

  // eslint-disable-next-line no-console
  console.log({ fileName, tsconfig });

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}
