import * as Internal from '@app/internal/index.ts'

/**
 * Test whether text has a suffix.
 * @description Checks the end of each string entry.
 * @param text - String or array of strings to test
 * @param end - Suffix expected at the end
 * @returns Match results matching the input shape
 */
export default function suffix(text: string | string[], end: string): boolean | boolean[] {
  return Internal.mapper(text, (value) => value.endsWith(end))
}
