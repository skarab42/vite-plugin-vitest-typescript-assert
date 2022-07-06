import { expect, test } from 'vitest';

test('test-1', () => {
	expect(42).toBe(42);
	expect(42).toBe(25); // <- fail

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const prout = 'pouet'; // <- shoul fail
});
