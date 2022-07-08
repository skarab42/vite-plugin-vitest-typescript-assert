import ts from 'byots';

export function program({ fileName, config }: { fileName: string; config: ts.ParsedCommandLine }) {
  const compilerOptions = { ...ts.getDefaultCompilerOptions(), ...config.options };
  const program = ts.createProgram([fileName], compilerOptions);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const checker = program.getTypeChecker();

  return { program, diagnostics, checker };
}
