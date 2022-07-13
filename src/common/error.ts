export enum ErrorCode {
  UNEXPECTED_ERROR,

  TSCONFIG_FILE_NOT_FOUND,
  TSCONFIG_FILE_NOT_READABLE,
  TSCONFIG_FILE_PARSE_ERROR,

  ASSERT_MISSING_GENERIC,
  ASSERT_MISSING_ARGUMENT,
  ASSERT_MISSING_METHOD,
  ASSERT_MISSING_TYPE_OR_VALUE,
  ASSERT_MIXED_TYPE_AND_VALUE,

  ASSERT_TYPE_NOT_ASSIGNABLE,
  ASSERT_TYPE_ASSIGNABLE,
  ASSERT_TYPE_NOT_IDENTICAL,
  ASSERT_TYPE_IDENTICAL,
  ASSERT_TYPE_TOO_WIDE,
  ASSERT_TYPE_NOT_SUBTYPE,
  ASSERT_TYPE_SUBTYPE,

  ASSERT_ERROR,
  ASSERT_DEPRECATED,
  ASSERT_NOT_DEPRECATED,
}

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.UNEXPECTED_ERROR]: 'Unexpected error: {message}',

  [ErrorCode.TSCONFIG_FILE_NOT_FOUND]: 'TS config file not found. File name: {configName} - Search path: {searchPath}',
  [ErrorCode.TSCONFIG_FILE_NOT_READABLE]: 'TS config file not readable or empty. File path: {filePath}',
  [ErrorCode.TSCONFIG_FILE_PARSE_ERROR]: 'An error occurred during the parsing of the TS config file. {message}',

  [ErrorCode.ASSERT_MISSING_GENERIC]: 'Missing generic at position {position}.',
  [ErrorCode.ASSERT_MISSING_ARGUMENT]: 'Missing argument at position {position}.',
  [ErrorCode.ASSERT_MISSING_METHOD]:
    "Missing right side methods, expected something like 'expectType('hello').assignableTo<string>()'.",
  [ErrorCode.ASSERT_MISSING_TYPE_OR_VALUE]: 'A type or value is missing.',
  [ErrorCode.ASSERT_MIXED_TYPE_AND_VALUE]: 'Do not define a type and value at the same time.',

  [ErrorCode.ASSERT_TYPE_NOT_ASSIGNABLE]: "Type '{expected}' is not assignable to type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_ASSIGNABLE]: "Type '{expected}' is assignable to type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_NOT_IDENTICAL]: "Type '{expected}' is not identical to argument type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_IDENTICAL]: "Type '{expected}' is identical to argument type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_TOO_WIDE]: "Type '{expected}' is declared too wide for argument type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_NOT_SUBTYPE]: "Type '{expected}' is not subtype of argument type '{argument}'.",
  [ErrorCode.ASSERT_TYPE_SUBTYPE]: "Type '{expected}' is subtype of argument type '{argument}'.",

  [ErrorCode.ASSERT_ERROR]: 'An error is expected.',
  [ErrorCode.ASSERT_DEPRECATED]: "Expected '{argument}' to be marked as '@deprecated'.",
  [ErrorCode.ASSERT_NOT_DEPRECATED]: "Expected '{argument}' to not be marked as '@deprecated'.",
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
