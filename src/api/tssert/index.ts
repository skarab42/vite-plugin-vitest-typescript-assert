/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_PROPERTY_KEY } from '../../common/internal';

// TODO: add docblock !!!
function assignableTo<TargetType>(_target?: unknown) {}
function notAssignableTo<TargetType>(_target?: unknown) {}

function identicalTo<TargetType>(_target?: unknown) {}
function notIdenticalTo<TargetType>(_target?: unknown) {}

function subtypeOf<TargetType>(_target?: unknown) {}
function notSubtypeOf<TargetType>(_target?: unknown) {}

function equalTo<TargetType>(_target?: unknown) {}

function toBeDeprecated<TargetType>(_target?: unknown) {}
function notToBeDeprecated<TargetType>(_target?: unknown) {}

function toThrowError<TargetType = undefined>(_target: unknown = undefined) {}

expectType[API_PROPERTY_KEY] = 'tssert:expectType' as const;

assignableTo[API_PROPERTY_KEY] = 'tssert:assignableTo' as const;
notAssignableTo[API_PROPERTY_KEY] = 'tssert:notAssignableTo' as const;

identicalTo[API_PROPERTY_KEY] = 'tssert:identicalTo' as const;
notIdenticalTo[API_PROPERTY_KEY] = 'tssert:notIdenticalTo' as const;

subtypeOf[API_PROPERTY_KEY] = 'tssert:subtypeOf' as const;
notSubtypeOf[API_PROPERTY_KEY] = 'tssert:notSubtypeOf' as const;

equalTo[API_PROPERTY_KEY] = 'tssert:equalTo' as const;

toBeDeprecated[API_PROPERTY_KEY] = 'tssert:toBeDeprecated' as const;
notToBeDeprecated[API_PROPERTY_KEY] = 'tssert:notToBeDeprecated' as const;

toThrowError[API_PROPERTY_KEY] = 'tssert:toThrowError' as const;

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

// TODO: add docblock !!!
export function expectType<SourceType>(_source?: unknown) {
  return api;
}
