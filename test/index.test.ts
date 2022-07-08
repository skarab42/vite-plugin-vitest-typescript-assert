import { test, expect, describe } from 'vitest';
import { expectType } from '../src';

test('test-1', () => {
	expect(42).toBe(42);

	expectType<string>().assignableTo<string>();
	expectType('life').assignableTo('42');
	expectType<string>().assignableTo('42');
	expectType('life').assignableTo<string>();
	expectType<string>().assignableTo<string>();

	// Do not define a type and an expected value at the same time.
	// expectType('life').toBe<string>('42'); // not valid
	// expectType<string>('life').toBe('42'); // not valid
	// expectType<string>('life').toBe<string>(); // not valid
	// prout
});

test('test-2', () => {
	expect(42).toBe(42);

	expectType('life').assignableTo('42');
});

test('test-3', () => {
	//plop
	expect(42).toBe(42);
	// pouet
	expectType('life').assignableTo('42');
});

test('test-4', () => {
	expect(42).toBe(42);
	expectType('life').assignableTo('42');
});

test('test-5', () => {
	expectType('life').assignableTo('42');
});

describe('describe-test-6', () => {
	test('test-6', () => {
		expectType('life').assignableTo('42');
	});
});

// test.skip('test.skip-1', () => {
// 	expect(42).toBe(42);
// 	expectType('life').toBe('42');
// });

// it('it-1', () => {
// 	expect(42).toBe(42);
// 	expectType('life').toBe('42');
// });

// describe('describe-1', () => {
// 	test('test-3', () => {
// 		expect(42).toBe(42);
// 		expectType('life').toBe('42');
// 	});

// 	describe('describe-2', () => {
// 		test('test-4', () => {
// 			expect(42).toBe(42);
// 			expectType('life').toBe('42');
// 		});

// 		test('test-5', () => {
// 			expect(42).toBe(42);
// 			expectType('life').toBe('42');
// 		});
// 	});
// });

// describe('describe-3', () => {
// 	test('test-6', () => {
// 		expect(42).toBe(42);
// 		expectType('life').toBe('42');
// 	});
// });
