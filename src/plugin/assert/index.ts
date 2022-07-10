import * as tsd from './tsd';
import * as tssert from './tssert';

export const assert = new Map(Object.entries({ tsd, tssert }));
