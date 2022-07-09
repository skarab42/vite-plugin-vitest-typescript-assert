import ts from 'byots';
import { ErrorCode, errorMessage } from '../error';

export function createProgram({ fileName, config }: { fileName: string; config: ts.ParsedCommandLine }) {
  const compilerOptions = { ...ts.getDefaultCompilerOptions(), ...config.options };
  const program = ts.createProgram([fileName], compilerOptions);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const sourceFile = program.getSourceFile(fileName);
  const checker = program.getTypeChecker();

  if (!sourceFile) {
    throw errorMessage(ErrorCode.UNEXPECTED_ERROR, {
      message: `The source file is unreachable. File path: ${fileName})`,
    });
  }

  return { compilerOptions, program, diagnostics, sourceFile, checker };
}
