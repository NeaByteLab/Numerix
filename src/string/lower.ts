import * as Internal from '@app/internal/index.ts'

/**
 * Convert text to lowercase.
 * @description Lowercases every string entry.
 * @param text - String or array of strings to convert
 * @returns Lowercase strings matching the input shape
 */
export default function lower(text: string | string[]): string | string[] {
  return Internal.mapper(text, (value) => value.toLowerCase())
}
