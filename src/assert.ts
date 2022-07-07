export function expectType<T = undefined>(value: unknown): T {
	return value as T;
}

export function expectTypeEqual<T = undefined>(value: unknown): T {
	return value as T;
}
