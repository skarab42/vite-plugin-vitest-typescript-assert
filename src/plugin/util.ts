import micromatch from 'micromatch';
import type { IncludeExclude } from './types';

const fileNameMatchCache = new Map<string, boolean>();

export function fileNameMatch(fileName: string, options: IncludeExclude): boolean {
  if (fileNameMatchCache.get(fileName)) {
    return true;
  }

  const { include, exclude } = options;

  if (!micromatch.isMatch(fileName, include) || micromatch.isMatch(fileName, exclude)) {
    fileNameMatchCache.set(fileName, false);

    return false;
  }

  fileNameMatchCache.set(fileName, true);

  return true;
}
