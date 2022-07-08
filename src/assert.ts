export function expectType<SourceType>(source?: unknown) {
	const dumbFunction = <TargetType>(target?: unknown) => {
		return [source, target] as [SourceType, TargetType];
	};

	return {
		assignableTo: dumbFunction,
	};
}
