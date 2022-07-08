import type { Plugin } from 'vite';
import { transform } from './transform';
import { fileNameMatch, type IncludeExclude } from '../util';
import { TypeScriptConfigOptions, loadConfig } from '../typescript/config';

export interface PluginOptions {
  include?: IncludeExclude['include'];
  exclude?: IncludeExclude['exclude'];
  typescript?: TypeScriptConfigOptions;
}

const defaultOptions = {
  include: ['**/*.test.ts'],
  exclude: [],
};

export function vitestTypescriptAssertPlugin(options: PluginOptions = {}): Plugin {
  const { include, exclude, typescript } = { ...defaultOptions, ...options };

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

      return transform({ code, fileName, tsconfig: tsconfig.config });
    },
  };
}
