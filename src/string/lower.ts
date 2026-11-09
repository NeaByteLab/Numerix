import * as Internal from '@app/internal/index.ts'

/**
 * Convert text to lowercase.
 * @description Lowercases a single string entry.
 * @param input - String to convert
 * @returns Lowercase string
 */
export default function lower(input: string): string
/**
 * Convert a string vector to lowercase.
 * @description Lowercases every string in a vector.
 * @param input - Vector of strings to convert
 * @returns Vector of lowercase strings
 */
export default function lower(input: string[]): string[]
/**
 * Convert a string matrix to lowercase.
 * @description Lowercases every string in a matrix.
 * @param input - Matrix of strings to convert
 * @returns Matrix of lowercase strings
 */
export default function lower(input: string[][]): string[][]
/**
 * Convert text to lowercase.
 * @description Lowercases every string entry.
 * @param input - String, vector, or matrix of strings to convert
 * @returns Lowercase strings matching the input shape
 */
export default function lower(
  input: string | string[] | string[][]
): string | string[] | string[][]
/**
 * Convert text to lowercase.
 * @description Lowercases every string entry.
 * @param input - String, vector, or matrix of strings to convert
 * @returns Lowercase strings matching the input shape
 */
export default function lower(
  input: string | string[] | string[][]
): string | string[] | string[][] {
  return Internal.mapper(input, (value) => value.toLowerCase())
}
