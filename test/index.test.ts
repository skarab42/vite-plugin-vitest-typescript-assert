import { test, expect, describe } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prout1 = 'plop';

test('test-1', () => {
  expect('Hello World').toBe(42);

  // const prout2 = 'plop';
});

describe('describe-1', () => {
  // const prout3 = 'plop';

  test('test-3', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prout4 = 'plop';

    // expect('Hello World').toBe(24);
  });
});
