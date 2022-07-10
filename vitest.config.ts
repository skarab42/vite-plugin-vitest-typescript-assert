import { defineConfig } from 'vite';
import { vitestTypescriptAssertPlugin } from './src';

export default defineConfig({
  plugins: [vitestTypescriptAssertPlugin()],
});
