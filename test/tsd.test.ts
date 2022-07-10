// import { test, expect, describe } from 'vitest';
// import { expectType, expectType as pouet, expectNotType } from '../src/api/tsd';
// import * as tsd from '../src/api/tsd';

// describe('describe-1', () => {
//   test('test-1', () => {
//     pouet<string>('hello');
//     expectType<string>('hello');
//     expectNotType<number>('hello');
//     tsd.expectType<string>('hello');

//     expect(42).toBe(42);
//     // expect("life").toBe(42);
//   });
// });

import { test } from 'vitest';
import * as tsd from '../src/api/tsd';
import { expectType, expectType as assertType } from '../src/api/tsd';

test('test-1', () => {
  expectType<string>('hello');
  assertType<string>('hello');
  tsd.expectType<string>('hello');
});
