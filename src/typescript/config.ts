import ts from 'unleashed-typescript';
import path from 'path';
import { formatDiagnostics } from './diagnostic';
import type { TypeScriptConfigOptions } from './types';
import { createError, ErrorCode } from '../common/error';
import { getCurrentDirectory, fileExists, readFile } from './util';

export function findConfigFile(options: TypeScriptConfigOptions = {}): string {
  const configName = options.configName ?? 'tsconfig.json';
  const searchPath = options.searchPath ?? getCurrentDirectory();
  const filePath = ts.findConfigFile(searchPath, fileExists, configName);

  if (!filePath) {
    throw createError(ErrorCode.TSCONFIG_FILE_NOT_FOUND, { searchPath, configName });
  }

  return filePath;
}

export function readConfigFile(filePath: string): string {
  try {
    const jsonText = readFile(filePath);

    if (!jsonText) {
      throw createError(ErrorCode.TSCONFIG_FILE_NOT_READABLE, { filePath });
    }

    return jsonText;
  } catch (_err) {
    throw createError(ErrorCode.TSCONFIG_FILE_NOT_READABLE, { filePath });
  }
}

export function parseConfigFile(
  fileName: string,
  jsonText: string,
  compilerOptions?: ts.CompilerOptions,
): ts.ParsedCommandLine {
  const configObject = ts.parseConfigFileTextToJson(fileName, jsonText);

  if (configObject.error) {
    throw createError(ErrorCode.TSCONFIG_FILE_PARSE_ERROR, { message: formatDiagnostics([configObject.error]) });
  }

  const config = ts.parseJsonConfigFileContent(configObject.config, ts.sys, path.dirname(fileName), compilerOptions);

  if (config.errors.length > 0) {
    throw createError(ErrorCode.TSCONFIG_FILE_PARSE_ERROR, { message: formatDiagnostics(config.errors) });
  }

  return config;
}

export function loadConfig(options?: TypeScriptConfigOptions): ts.ParsedCommandLine {
  const configFilePath = findConfigFile(options);
  const configFileContent = readConfigFile(configFilePath);

  return parseConfigFile(configFilePath, configFileContent, options?.compilerOptions);
}
