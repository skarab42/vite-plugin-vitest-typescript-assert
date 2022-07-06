import { expect, test } from 'vitest';

test('test-1', () => {
	expect(42).toBe(42);
	expect(42).toBe(25); // <- fail
});

test('test-2', () => {
	expect(true).toBe(false); // <- fail

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const prout = 'pouet'; // <- should fail

	// eslint-disable-next-line no-console
	console.log('plop'); // <- should fail

	throw new Error('Prout'); // <- fail
});
