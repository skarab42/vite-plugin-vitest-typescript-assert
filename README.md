<h1 align="center">TypeScript assertion plugin for vitest.</h1>

<p align="center">
  <img src="https://user-images.githubusercontent.com/62928763/178766707-5dd3b80f-b20f-474b-b8d4-623c00b5eac1.PNG" alt="vite-plugin-vitest-typescript-assert : TypeScript assertion (test) plugin for vitest">
</p>

> 📌 This plugin is in **alpha** version, and will probably stay that way for a long time, it lacks tests (a bit ironic) and real documentation! **But I can't stop myself from publishing it**. Moreover this plugin is a succession of tricks to integrate it to vitest (it would be incredible that vitest offer an official plugin system 💜). But it **seems to work** for my use cases and maybe **for you too?** I'm thinking of continuing to evolve it if I need it or if others start using it. Feel free to [contribute](contributing) or [give feedback](https://github.com/skarab42/vite-plugin-vitest-typescript-assert/issues) if you encounter any issues. **Thank you**.

# Installation

Install the dependencies.

```bash
pnpm add -D vitest typescript vite-plugin-vitest-typescript-assert
# yarn and npm also works
```

Setup the plugin in `vitest.config.ts` file.

```ts
import { defineConfig } from 'vite';
import { vitestTypescriptAssertPlugin } from 'vite-plugin-vitest-typescript-assert';

export default defineConfig({
  plugins: [vitestTypescriptAssertPlugin()],
});
```

# Assertions APIs

This plugin was more than inspired by the [tsd](https://github.com/SamVerschueren/tsd) project, much of the assertion logic comes from their code.

That's why two APIs are available:

```ts
// Exactly the same behaviour as tsd (plus any bugs I might have introduced 🙈)
import * as tsd from 'vite-plugin-vitest-typescript-assert/tsd';
```

```ts
// A more descriptive/flexible API with some additions.
import * as tssert from 'vite-plugin-vitest-typescript-assert/tssert';
```

Named imports, alias imports and named exports are supported in both API.

```ts
import { expectType } from 'vite-plugin-vitest-typescript-assert/tsd';
import { expectType as assertType } from 'vite-plugin-vitest-typescript-assert/tsd';

export { expectType as assertType } from 'vite-plugin-vitest-typescript-assert/tsd';
```

## tsd [docs](https://github.com/SamVerschueren/tsd#assertions)

```ts
expectType<ExpectedType>(value);
expectNotType<ExpectedType>(value);
expectAssignable<ExpectedType>(value);
expectNotAssignable<ExpectedType>(value);
expectError(value);
expectDeprecated(expression);
expectNotDeprecated(expression);
printType(expression);
```

## tssert

`tssert` supports 4 signatures for each method. You can either specify the type in the generic or the value in the first argument, but never both at the same time. But don't worry, if this happens the plugin will send you an error.

```ts
expectType<string>().assignableTo<string>();
expectType<string>().assignableTo('nyan');
expectType('nyan').assignableTo<string>();
expectType('nyan').assignableTo('nyan');
```

```ts
expectType<ExpectedType>().assignableTo(value);
expectType<ExpectedType>().identicalTo(value);
expectType<ExpectedType>().subtypeOf(value);
expectType<ExpectedType>().equalTo(value);
expectType<ExpectedType>().toBeDeprecated();
expectType<ExpectedType>().toThrowError();
expectType<ExpectedType>().toThrowError(code);
expectType<ExpectedType>().toThrowError(message);

expectType<ExpectedType>().not.assignableTo(value);
expectType<ExpectedType>().not.identicalTo(value);
expectType<ExpectedType>().not.subtypeOf(value);
expectType<ExpectedType>().not.equalTo(value);
expectType<ExpectedType>().not.toBeDeprecated();
```

# Options

```ts
vitestTypescriptAssertPlugin(options?: PluginOptions);
```

By default the plugin applies the following configuration.

```ts
const defaultOptions: PluginOptions = {
  report: ['type-error', 'type-assertion'],
  include: ['**/*.test.ts'],
  exclude: [],
  typescript: {
    configName: 'tsconfig.json',
    searchPath: process.cwd(),
    compilerOptions: {},
  },
};
```

- `type-error`: Report the errors raised by the TS compiler.
- `type-assertion`: Report the errors raised by the assertion library.

```ts
export interface PluginOptions {
  report?: 'type-error' | 'type-assertion';
  include?: string | string[];
  exclude?: string | string[];
  typescript?: TypeScriptConfigOptions;
}

interface TypeScriptConfigOptions {
  configName?: string;
  searchPath?: string;
  compilerOptions?: ts.CompilerOptions;
}
```

# Contributing 💜

See [CONTRIBUTING.md](https://github.com/skarab42/vite-plugin-vitest-typescript-assert/blob/main/CONTRIBUTING.md)
