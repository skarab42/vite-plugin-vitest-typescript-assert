import ts from 'unleashed-typescript';
import { getCurrentDirectory, newLine } from './util';

export const diagnosticsHost: ts.FormatDiagnosticsHost = {
  getNewLine: () => newLine,
  getCurrentDirectory: () => getCurrentDirectory(),
  getCanonicalFileName: (fileName: string) => fileName,
};

export function formatDiagnostics(diagnostics: ts.Diagnostic[]): string {
  return ts.formatDiagnostics(diagnostics, diagnosticsHost);
}
