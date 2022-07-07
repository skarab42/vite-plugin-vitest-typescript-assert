import { describe, expect, test, it } from 'vitest';
import { expectType, expectTypeEqual } from '../src/assert';

// test('test-1', () => {
// 	expect(42).toBe(42);
// 	expect(42).toBe(25); // <- fail
// });

// test('test-2', () => {
// 	expect(true).toBe(false); // <- fail

// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	// const prout = 'pouet'; // <- should fail

// 	// eslint-disable-next-line no-console
// 	console.log('plop'); // <- should fail

// 	throw new Error('Prout'); // <- fail
// });

test('test-1', () => {
	expect(42).toBe(42);

	expectType<string>('life');
});

describe('describe-1', () => {
	it('it-1', () => {
		expect(42).toBe(42);

		expectType<string>('life');
	});

	test('test-2', () => {
		expect(42).toBe(42);

		expectType<string>('life');

		expectType<string>(42);

		const prout = () => {
			expectType<string>(42);
			// eslint-disable-next-line no-console
			console.log('prout');
		};

		expectTypeEqual<string>(42);

		prout();

		describe('describe-2', () => {
			it('test-3', () => {
				expect(42).toBe(42);

				expectType<string>('life');
			});
		});
	});
});
