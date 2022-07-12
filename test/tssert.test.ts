import { test } from 'vitest';
import * as tssert from '../src/api/tssert';
import { expectType, expectType as assertType } from '../src/api/tssert';

test('test-1', () => {
  expectType<string>('hello');
});

test('test-2', () => {
  assertType<string>().assignableTo('hello');
});

test('test-3', () => {
  expectType<string>().assignableTo('hello');
  expectType<string>().assignableTo(42);
  // expectType<number>().not.assignableTo('hello');
  // tssert.expectType<number>().not.assignableTo('hello');
});

test('test-4', () => {
  // expectType<number>().not.assignableTo('hello');
  tssert.expectType<number>().not.assignableTo('hello');
  tssert.expectType<number>().not.assignableTo(42);
});

test('test-5', () => {
  expectType<string>('hello').assignableTo('world');
});

test('test-6', () => {
  expectType('hello').assignableTo<string>('world');
});

test('test-7', () => {
  expectType().assignableTo<string>('world');
});

test('test-8', () => {
  expectType('hello').assignableTo();
});
