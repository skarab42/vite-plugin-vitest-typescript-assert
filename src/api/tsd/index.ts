/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_PROPERTY_KEY } from '../../common/internal';

// TODO: add docblock !!!
export function expectType<ExpectedType>(_value: ExpectedType) {}
export function expectNotType<ExpectedType>(_value: any) {}
export function expectAssignable<ExpectedType>(_value: ExpectedType) {}
export function expectNotAssignable<ExpectedType>(_value: any) {}
export function expectError<ExpectedType = any>(_value: ExpectedType) {}
export function expectDeprecated(_expression: any) {}
export function expectNotDeprecated(_expression: any) {}
export function printType(_expression: any) {}

expectType[API_PROPERTY_KEY] = 'tsd:expectType' as const;
expectNotType[API_PROPERTY_KEY] = 'tsd:expectNotType' as const;
expectAssignable[API_PROPERTY_KEY] = 'tsd:expectAssignable' as const;
expectNotAssignable[API_PROPERTY_KEY] = 'tsd:expectNotAssignable' as const;
expectError[API_PROPERTY_KEY] = 'tsd:expectError' as const;
expectDeprecated[API_PROPERTY_KEY] = 'tsd:expectDeprecated' as const;
expectNotDeprecated[API_PROPERTY_KEY] = 'tsd:expectNotDeprecated' as const;
printType[API_PROPERTY_KEY] = 'tsd:printType' as const;
