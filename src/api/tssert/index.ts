export const VITE_PLUGIN_VITEST_TYPESCRIPT_ASSERT = 'tssert';

export function expectType<SourceType>(source?: unknown) {
  const dumbFunction = <TargetType>(target?: unknown) => {
    return [source, target] as [SourceType, TargetType];
  };

  return {
    assignableTo: dumbFunction,
  };
}
