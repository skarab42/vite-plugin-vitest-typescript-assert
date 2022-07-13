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

test('test-9', () => {
  expectType('hello').identicalTo('hello');
  expectType('hello').not.identicalTo('hello');
});

test('test-9', () => {
  expectType<string>().subtypeOf('hello');
  expectType<string>().not.subtypeOf('hello');
});

test('test-9', () => {
  expectType<'hello'>().equalTo('hello');
  expectType<'hello'>().not.equalTo('hello');
});

test('test-9', () => {
  // expectType<UnicornClass>().toBeDeprecated();
  // expectType<UnicornClass>().not.toBeDeprecated();
  expectType(UnicornClass).toBeDeprecated();
  expectType(UnicornClass).not.toBeDeprecated();
});

test('test-9', () => {
  expectType<RainbowClass>().toBeDeprecated();
  expectType<RainbowClass>().not.toBeDeprecated();
});

test('test-4', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  expectType(42 === 'life').toThrowError();
});

test('test-5', () => {
  expectType(true).toThrowError();
});

test('test-4', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  expectType(42 === 'life').toThrowError(2367);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  expectType(42 === 'life').toThrowError('Prout');
});

test('test-4', () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  expectType(42 === 'life').toThrowError(42);
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
