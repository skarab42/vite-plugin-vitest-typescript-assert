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

test('test-7', () => {
  tsd.printType(prout);
});

test('test-8', () => {
  tsd.expectType<typeof prout>({
    hello: 'you',
    life: 42,
    data: {
      id: '385643984',
      items: [1, 2, 3],
    },
  });
});

// test('test-9', () => {
//   const plop = 42;
//   tsd.expectError(true);
// });

// test('test-10', () => {
//   const plop = 42;
// });

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

export const prout = {
  hello: 'world',
  life: 42,
  data: {
    id: 385643984,
    items: [1, 2, 3],
  },
};
