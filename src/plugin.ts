import type { Plugin } from 'vite';
import { transform } from './transform';
import { fileNameMatch, type IncludeExclude } from './util';

export interface PluginOptions {
  include?: IncludeExclude['include'];
  exclude?: IncludeExclude['exclude'];
}

const defaultOptions = {
  include: ['**/*.test.ts'],
  exclude: [],
};

export function vitestTypescriptAssertPlugin(options: PluginOptions = {}): Plugin {
  const { include, exclude } = { ...defaultOptions, ...options };

  return {
    name: 'vitest:typescript-assert',
    enforce: 'pre',
    transform(code, fileName) {
      if (!fileNameMatch(fileName, { include, exclude })) {
        return;
      }

      return transform({ code, fileName });
    },
  };
}
