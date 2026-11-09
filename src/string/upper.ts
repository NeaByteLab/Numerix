import * as Internal from '@app/internal/index.ts'

/**
 * Convert text to uppercase.
 * @description Uppercases a single string entry.
 * @param input - String to convert
 * @returns Uppercase string
 */
export default function upper(input: string): string
/**
 * Convert a string vector to uppercase.
 * @description Uppercases every string in a vector.
 * @param input - Vector of strings to convert
 * @returns Vector of uppercase strings
 */
export default function upper(input: string[]): string[]
/**
 * Convert a string matrix to uppercase.
 * @description Uppercases every string in a matrix.
 * @param input - Matrix of strings to convert
 * @returns Matrix of uppercase strings
 */
export default function upper(input: string[][]): string[][]
/**
 * Convert text to uppercase.
 * @description Uppercases every string entry.
 * @param input - String, vector, or matrix of strings to convert
 * @returns Uppercase strings matching the input shape
 */
export default function upper(
  input: string | string[] | string[][]
): string | string[] | string[][]
/**
 * Convert text to uppercase.
 * @description Uppercases every string entry.
 * @param input - String, vector, or matrix of strings to convert
 * @returns Uppercase strings matching the input shape
 */
export default function upper(
  input: string | string[] | string[][]
): string | string[] | string[][] {
  return Internal.mapper(input, (value) => value.toUpperCase())
}
