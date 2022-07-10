import { isMatch } from 'micromatch';
import type { IncludeExclude } from './types';

const fileNameMatchCache = new Map<string, boolean>();

export function fileNameMatch(fileName: string, options: IncludeExclude): boolean {
  if (fileNameMatchCache.get(fileName)) {
    return true;
  }

  const { include, exclude } = options;

  if (!isMatch(fileName, include) || isMatch(fileName, exclude)) {
    fileNameMatchCache.set(fileName, false);

    return false;
  }

  fileNameMatchCache.set(fileName, true);

  return true;
}
