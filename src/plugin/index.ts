import { fileNameMatch } from './util';
import { transform } from './transform';
import type { PluginOptions } from './types';
import { loadConfig } from '../typescript/config';
import type { Plugin, TransformResult } from 'vite';

const defaultOptions: PluginOptions = {
  report: ['type-error', 'type-assertion'],
  include: ['**/*.test.ts'],
  exclude: [],
  typescript: {},
};

export function vitestTypescriptAssertPlugin(options: PluginOptions = {}): Plugin {
  const { include, exclude, typescript, report } = { ...defaultOptions, ...options } as Required<PluginOptions>;

  const tsconfig = loadConfig(typescript);

  return {
    name: 'vitest:typescript-assert',
    enforce: 'pre',
    transform(code, fileName): TransformResult {
      if (!fileNameMatch(fileName, { include, exclude })) {
        return { code, map: null };
      }

      return transform({ code, fileName, report, typescript: { config: tsconfig, options: typescript } });
    },
  };
}
