import type ts from 'byots';

export interface CompilerSettings {
  fileName: string;
  config: ts.ParsedCommandLine;
}
export interface Compiler {
  fileName: string;
  program: ts.Program;
  sourceFile: ts.SourceFile;
  typeChecker: ts.TypeChecker;
  compilerOptions: ts.CompilerOptions;
  diagnostics: readonly ts.Diagnostic[];
}

export interface TypeScriptConfigOptions {
  configName?: string;
  searchPath?: string;
  compilerOptions?: ts.CompilerOptions;
}
