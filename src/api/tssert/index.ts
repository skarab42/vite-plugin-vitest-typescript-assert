/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Test that TargetType is assignable to SourceType.
 *
 * @apiName tssert
 * @functionName assignableTo
 */
function assignableTo<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that TargetType is not assignable to SourceType.
 *
 * @apiName tssert
 * @functionName notAssignableTo
 */
function notAssignableTo<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that TargetType is identical to SourceType.
 *
 * @apiName tssert
 * @functionName identicalTo
 */
function identicalTo<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that TargetType is not identical to SourceType.
 *
 * @apiName tssert
 * @functionName notIdenticalTo
 */
function notIdenticalTo<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that TargetType is subtype of SourceType.
 *
 * @apiName tssert
 * @functionName subtypeOf
 */
function subtypeOf<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that TargetType is not subtype of to SourceType.
 *
 * @apiName tssert
 * @functionName notSubtypeOf
 */
function notSubtypeOf<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that TargetType is equal to SourceType.
 *
 * @apiName tssert
 * @functionName equalTo
 */
function equalTo<TargetType>(_target?: TargetType): undefined {
  return;
}

/**
 * Test that SourceType is marked as deprecated.
 *
 * @apiName tssert
 * @functionName toBeDeprecated
 */
function toBeDeprecated(): undefined {
  return;
}

/**
 * Test that SourceType is not marked as deprecated.
 *
 * @apiName tssert
 * @functionName notToBeDeprecated
 */
function notToBeDeprecated(): undefined {
  return;
}

/**
 * Test that TargetType throw an type error.
 *
 * @apiName tssert
 * @functionName toThrowError
 */
function toThrowError<TargetType>(_target?: TargetType): undefined {
  return;
}

const api = {
  assignableTo,
  identicalTo,
  subtypeOf,
  equalTo,
  toBeDeprecated,
  toThrowError,
  not: {
    assignableTo: notAssignableTo,
    identicalTo: notIdenticalTo,
    subtypeOf: notSubtypeOf,
    equalTo: notIdenticalTo,
    toBeDeprecated: notToBeDeprecated,
  },
} as const;

/**
 * SourceType holder to test with.
 *
 * @apiName tssert
 * @functionName expectType
 */

export function expectType<SourceType>(_source?: SourceType): typeof api {
  return api;
}
