import * as Internal from '@app/internal/index.ts'

/**
 * Test whether text has a prefix.
 * @description Checks the beginning of each string entry.
 * @param text - String or array of strings to test
 * @param start - Prefix expected at the beginning
 * @returns Match results matching the input shape
 */
export default function prefix(text: string | string[], start: string): boolean | boolean[] {
  return Internal.mapper(text, (value) => value.startsWith(start))
}
