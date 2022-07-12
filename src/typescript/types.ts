import type ts from 'unleashed-typescript';

export interface CompilerSettings {
  fileName: string;
  config: ts.ParsedCommandLine;
}
export interface Compiler {
  fileName: string;
  program: ts.Program;
  sourceFile: ts.SourceFile;
  typeChecker: ts.TypeChecker;
  diagnostics: ts.Diagnostic[];
  compilerOptions: ts.CompilerOptions;
}

export interface TypeScriptConfigOptions {
  configName?: string;
  searchPath?: string;
  compilerOptions?: ts.CompilerOptions;
}
