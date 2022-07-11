export enum ErrorCode {
  UNEXPECTED_ERROR,

  TSCONFIG_FILE_NOT_FOUND,
  TSCONFIG_FILE_NOT_READABLE,
  TSCONFIG_FILE_PARSE_ERROR,

  ASSERT_MISSING_GENERIC,
  ASSERT_MISSING_ARGUMENT,
  ASSERT_TYPE_NOT_ASSIGNABLE,
  ASSERT_TYPE_TOO_WIDE,
  ASSERT_TYPE_NOT_IDENTICAL,
}

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.UNEXPECTED_ERROR]: 'Unexpected error: {message}',

  [ErrorCode.TSCONFIG_FILE_NOT_FOUND]: 'TS config file not found. File name: {configName} - Search path: {searchPath}',
  [ErrorCode.TSCONFIG_FILE_NOT_READABLE]: 'TS config file not readable or empty. File path: {filePath}',
  [ErrorCode.TSCONFIG_FILE_PARSE_ERROR]: 'An error occurred during the parsing of the TS config file. {message}',

  [ErrorCode.ASSERT_MISSING_GENERIC]: 'Missing generic at position {position}',
  [ErrorCode.ASSERT_MISSING_ARGUMENT]: 'Missing argument at position {position}',
  [ErrorCode.ASSERT_TYPE_NOT_ASSIGNABLE]: "Type '{expected}' is not assignable to type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_TOO_WIDE]: "Type '{expected}' is declared too wide for argument type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_NOT_IDENTICAL]: "Type '${expected}' is not identical to argument type '${argument}'.",
};

export function errorMessage(code: ErrorCode, data?: Record<string, unknown>): string {
  let message = errorMessages[code];

  Object.entries(data ?? {}).forEach(([index, value]) => {
    message = message.replace(new RegExp(`{${index}}`, 'g'), String(value));
  });

  return message;
}

export function createError(code: ErrorCode, data?: Record<string, unknown>): Error {
  return new Error(errorMessage(code, data));
}

export function throwError(code: ErrorCode, data?: Record<string, unknown>): never {
  throw createError(code, data);
}
