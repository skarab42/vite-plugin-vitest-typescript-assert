import ts from 'byots';
import path from 'path';
import { formatDiagnostics } from './diagnostic';
import { errorMessage, ErrorCode } from '../error';
import { getCurrentDirectory, fileExists, readFile } from './util';

export interface TypeScriptConfigOptions {
  configName?: string;
  searchPath?: string;
  compilerOptions?: ts.CompilerOptions;
}

export function findConfigFile(options: TypeScriptConfigOptions = {}) {
  const configName = options.configName ?? 'tsconfig.json';
  const searchPath = options.searchPath ?? getCurrentDirectory();
  const filePath = ts.findConfigFile(searchPath, fileExists, configName);

  // TODO: allow fallback to default config with a warning?
  if (!filePath) {
    return {
      error: errorMessage(ErrorCode.TSCONFIG_FILE_NOT_FOUND, { searchPath, configName }),
    };
  }

  return { filePath };
}

export function readConfigFile(filePath: string) {
  try {
    const jsonText = readFile(filePath);

    if (!jsonText) {
      return {
        error: errorMessage(ErrorCode.TSCONFIG_FILE_NOT_READABLE, { filePath }),
      };
    }

    return { filePath, jsonText };
  } catch (_err) {
    return {
      error: errorMessage(ErrorCode.TSCONFIG_FILE_NOT_READABLE, { filePath }),
    };
  }
}

export function parseConfigFile(fileName: string, jsonText: string, compilerOptions?: ts.CompilerOptions) {
  const configObject = ts.parseConfigFileTextToJson(fileName, jsonText);

  if (configObject.error) {
    return { error: new Error(formatDiagnostics([configObject.error])) };
  }

  const config = ts.parseJsonConfigFileContent(configObject.config, ts.sys, path.dirname(fileName), compilerOptions);

  if (config.errors.length > 0) {
    return { error: new Error(formatDiagnostics(config.errors)) };
  }

  return { fileName, config };
}

export function loadConfig(options?: TypeScriptConfigOptions) {
  try {
    const configFile = findConfigFile(options);

    if (configFile.error) {
      throw configFile.error;
    }

    const configFileContent = readConfigFile(configFile.filePath);

    if (configFileContent.error) {
      throw configFileContent.error;
    }

    const parsedConfig = parseConfigFile(
      configFileContent.filePath,
      configFileContent.jsonText,
      options?.compilerOptions,
    );

    if (parsedConfig.error) {
      throw parsedConfig.error;
    }

    return { config: parsedConfig.config };
  } catch (error) {
    return { error: error as Error };
  }
}
