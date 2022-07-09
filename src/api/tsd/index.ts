export const VITE_PLUGIN_VITEST_TYPESCRIPT_ASSERT = 'tsd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExplicitAny = any;

export function expectType<T>(value: T) {
  return value;
}

export function expectNotType<T>(value: ExplicitAny) {
  return value as T;
}

export function expectAssignable<T>(value: T) {
  return value;
}

export function expectNotAssignable<T>(value: ExplicitAny) {
  return value as T;
}

export function expectError<T = ExplicitAny>(value: T) {
  return value;
}

export function expectDeprecated(expression: ExplicitAny) {
  return expression as unknown;
}

export function expectNotDeprecated(expression: ExplicitAny) {
  return expression as unknown;
}

export function printType(expression: ExplicitAny) {
  return expression as unknown;
}
