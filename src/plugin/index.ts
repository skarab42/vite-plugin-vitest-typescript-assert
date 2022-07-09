import type { Plugin } from 'vite';
import { transform } from './transform';
import { fileNameMatch, type IncludeExclude } from '../util';
import { type TypeScriptConfigOptions, loadConfig } from '../typescript/config';

export type Reporter = 'type-error' | 'type-assertion';

export interface PluginOptions {
  report?: Reporter[];
  include?: IncludeExclude['include'];
  exclude?: IncludeExclude['exclude'];
  typescript?: TypeScriptConfigOptions;
}

const defaultOptions: PluginOptions = {
  report: ['type-error', 'type-assertion'],
  include: ['**/*.test.ts'],
  exclude: [],
  typescript: {},
};

export function vitestTypescriptAssertPlugin(options: PluginOptions = {}): Plugin {
  const { include, exclude, typescript, report } = { ...defaultOptions, ...options } as Required<PluginOptions>;

  const tsconfig = loadConfig(typescript);

  if (tsconfig.error) {
    throw tsconfig.error;
  }

  return {
    name: 'vitest:typescript-assert',
    enforce: 'pre',
    transform(code, fileName) {
      if (!fileNameMatch(fileName, { include, exclude })) {
        return;
      }

      return transform({ code, fileName, report, typescript: { config: tsconfig.config, options: typescript } });
    },
  };
}
