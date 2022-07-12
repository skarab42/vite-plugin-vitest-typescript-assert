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
});

test('test-2', () => {
  assertType<string>('hello');
});

test('test-3', () => {
  tsd.expectNotType<string>('hello');
});

test('test-4', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  tsd.expectError(42 === 'life');
});

test('test-5', () => {
  tsd.expectError(true);
});

test('test-6', () => {
  tsd.expectDeprecated(UnicornClass);
  tsd.expectNotDeprecated(UnicornClass);
});

/**
 * @deprecated
 */
export class UnicornClass {
  readonly key = '🦄';
}

export class RainbowClass {
  readonly key = '🌈';
}

export interface Options {
  /**
   * @deprecated
   */
  readonly separator: string;
  readonly delimiter: string;
}
