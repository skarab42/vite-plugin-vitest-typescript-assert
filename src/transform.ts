import MagicString from 'magic-string';
import type { TransformResult } from 'vite';

export function transform({ code, fileName }: { code: string; fileName: string }): TransformResult {
  const newCode = new MagicString(code);

  // eslint-disable-next-line no-console
  console.log({ fileName });

  return {
    code: newCode.toString(),
    map: newCode.generateMap({ hires: true }),
  };
}
