import { test, expect, describe } from 'vitest';

test('test-1', () => {
  expect('Hello World').toBe(42);
});

describe('test-2', () => {
  test('test-2', () => {
    expect('Hello World').toBe(24);
  });
});
