import { loadConfig } from './config';

const config = loadConfig({
	configName: 'tsconfig.check.json',
});

// eslint-disable-next-line no-console
console.log(config);
