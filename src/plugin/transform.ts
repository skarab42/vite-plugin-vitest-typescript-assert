import type { TransformResult } from 'vite';
import type { TransformSettings } from './types';

export function transform({ code, fileName, report, typescript }: TransformSettings): TransformResult {
  // eslint-disable-next-line no-console
  console.log({ code, fileName, report, typescript });

  return { code, map: null };
}
