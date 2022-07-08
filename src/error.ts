export enum ErrorCode {
  TSCONFIG_FILE_NOT_FOUND,
  TSCONFIG_FILE_NOT_READABLE,
}

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.TSCONFIG_FILE_NOT_FOUND]: 'TS config file not found. File name: {configName} - Search path: {searchPath}',
  [ErrorCode.TSCONFIG_FILE_NOT_READABLE]: 'TS config file not readable or empty. File path: {filePath}',
};

export function errorMessage(code: ErrorCode, data?: Record<string, unknown>) {
  let message = errorMessages[code];

  Object.entries(data ?? {}).forEach(([index, value]) => {
    message = message.replace(new RegExp(`{${index}}`, 'g'), String(value));
  });

  return new Error(message);
}
