import * as Internal from '@app/internal/index.ts'

/**
 * Convert text to uppercase.
 * @description Uppercases every string entry.
 * @param text - String or array of strings to convert
 * @returns Uppercase strings matching the input shape
 */
export default function upper(text: string | string[]): string | string[] {
  return Internal.mapper(text, (value) => value.toUpperCase())
}
