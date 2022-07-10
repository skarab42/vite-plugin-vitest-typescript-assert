import { test, expect, describe } from 'vitest';

// import { expectType } from '../src/api/tsd';
import { expectType } from '../src/api/tssert';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const prout1 = 'plop';

test('test-1', () => {
  expect('Hello World').toBe(42);

  // const prout2 = 'plop';

  // expectType<string>('hello');
  // expectType<string>(42);

  expectType<true>().assignableTo('plop');
});

test('test-2', () => {
  // expectType<string>(42);
  expectType<true>().assignableTo('plop');
  // expect('Hello World').toBe(42);
});

describe('describe-1', () => {
  // const prout3 = 'plop';

  test('test-3', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const prout4 = 'plop';
    // expect('Hello World').toBe(24);
  });
});
