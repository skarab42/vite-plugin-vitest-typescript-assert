export enum ErrorCode {
  UNEXPECTED_ERROR,
  TSCONFIG_FILE_NOT_FOUND,
  TSCONFIG_FILE_NOT_READABLE,
  MULTIPLE_ASSERTION_API_IN_SAME_FILE_NOT_ALLOWED,
}

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.UNEXPECTED_ERROR]: 'Unexpected error: {message}',
  [ErrorCode.TSCONFIG_FILE_NOT_FOUND]: 'TS config file not found. File name: {configName} - Search path: {searchPath}',
  [ErrorCode.TSCONFIG_FILE_NOT_READABLE]: 'TS config file not readable or empty. File path: {filePath}',
  [ErrorCode.MULTIPLE_ASSERTION_API_IN_SAME_FILE_NOT_ALLOWED]:
    'The use of multiple type assertion APIs in the same file is not allowed. The APIs detected are [{apiNames}], please review your test.',
};

export function errorMessage(code: ErrorCode, data?: Record<string, unknown>) {
  let message = errorMessages[code];

  Object.entries(data ?? {}).forEach(([index, value]) => {
    message = message.replace(new RegExp(`{${index}}`, 'g'), String(value));
  });

  return new Error(message);
}
