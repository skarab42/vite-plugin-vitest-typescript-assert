// import { test, expect, describe } from 'vitest';
// import { expectType, expectType as prout } from '../src/api/tssert';
// import * as tssert from '../src/api/tssert';

// describe('describe-1', () => {
//   test('test-1', () => {
//     prout<string>().assignableTo('hello');
//     expectType<string>().assignableTo('hello');
//     expectType<number>().not.assignableTo('hello');
//     tssert.expectType<number>().not.assignableTo('hello');

//     expect(42).toBe(42);
//     // expect("life").toBe(42);
//   });
// });

import { test } from 'vitest';
import * as tssert from '../src/api/tssert';
import { expectType, expectType as assertType } from '../src/api/tssert';

test('test-1', () => {
  expectType<string>('hello');
  assertType<string>('hello');
  tssert.expectType<string>('hello');

  expectType<string>().assignableTo('hello');
  expectType<number>().not.assignableTo('hello');
  tssert.expectType<number>().not.assignableTo('hello');
});
