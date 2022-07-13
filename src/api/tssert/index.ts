/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_PROPERTY_KEY } from '../../common/internal';

// TODO: add docblock !!!
function assignableTo<TargetType>(_target?: unknown) {}
function notAssignableTo<TargetType>(_target?: unknown) {}

function identicalTo<TargetType>(_target?: unknown) {}
function notIdenticalTo<TargetType>(_target?: unknown) {}

expectType[API_PROPERTY_KEY] = 'tssert:expectType' as const;

assignableTo[API_PROPERTY_KEY] = 'tssert:assignableTo' as const;
notAssignableTo[API_PROPERTY_KEY] = 'tssert:notAssignableTo' as const;

identicalTo[API_PROPERTY_KEY] = 'tssert:identicalTo' as const;
notIdenticalTo[API_PROPERTY_KEY] = 'tssert:notIdenticalTo' as const;

const api = {
  assignableTo,
  identicalTo,
  not: {
    assignableTo: notAssignableTo,
    identicalTo: notIdenticalTo,
  },
} as const;

// TODO: add docblock !!!
export function expectType<SourceType>(_source?: unknown) {
  return api;
}
