import ts from 'unleashed-typescript';
import { createError, ErrorCode } from '../common/error';
import type { CompilerSettings, Compiler } from './types';

export function createCompiler({ fileName, config }: CompilerSettings): Compiler {
  const compilerOptions = { ...ts.getDefaultCompilerOptions(), ...config.options };
  const program = ts.createProgram([fileName], compilerOptions);
  const diagnostics = ts.getPreEmitDiagnostics(program) as ts.Diagnostic[];
  const sourceFile = program.getSourceFile(fileName);
  const typeChecker = program.getTypeChecker();

  if (!sourceFile) {
    throw createError(ErrorCode.UNEXPECTED_ERROR, {
      message: `The source file is unreachable. File path: ${fileName})`,
    });
  }

  return { fileName, compilerOptions, program, diagnostics, sourceFile, typeChecker };
}
