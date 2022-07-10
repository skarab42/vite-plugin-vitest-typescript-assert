/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_PROPERTY_KEY } from '../../common/internal';

// TODO: add docblock !!!
function assignableTo<TargetType>(_target?: unknown) {}
function notAssignableTo<TargetType>(_target?: unknown) {}

expectType[API_PROPERTY_KEY] = 'tssert:expectType' as const;
assignableTo[API_PROPERTY_KEY] = 'tssert:assignableTo' as const;
notAssignableTo[API_PROPERTY_KEY] = 'tssert:notAssignableTo' as const;

const api = {
  assignableTo,
  not: {
    assignableTo: notAssignableTo,
  },
} as const;

// TODO: add docblock !!!
export function expectType<SourceType>(_source?: unknown) {
  return api;
}
