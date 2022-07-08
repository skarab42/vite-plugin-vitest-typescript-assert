import { defineConfig } from 'vitest/config';
import { vitestTypescriptAssertPlugin } from './src';

export default defineConfig({
  plugins: [
    vitestTypescriptAssertPlugin({
      typescript: { shouldReportDiagnostics: true },
    }),
  ],
});
