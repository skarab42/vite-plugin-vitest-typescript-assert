import type ts from 'byots';
import type { TypeScriptConfigOptions } from '../typescript/types';

export interface IncludeExclude {
  include: string | string[];
  exclude: string | string[];
}

export type Reporter = 'type-error' | 'type-assertion';

export interface PluginOptions {
  report?: Reporter[];
  include?: IncludeExclude['include'];
  exclude?: IncludeExclude['exclude'];
  typescript?: TypeScriptConfigOptions;
}

export interface TransformSettings {
  code: string;
  fileName: string;
  report: Reporter[];
  typescript: {
    config: ts.ParsedCommandLine;
    options: TypeScriptConfigOptions;
  };
}

export interface ErrorObject {
  message: string;
  file: string;
  line: number;
  column: number;
}

export type APIName = 'tsd' | 'tssert';

export interface Assertion {
  apiName: APIName;
  functionName: string;
  node: ts.Node;
}
