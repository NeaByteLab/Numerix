import * as Internal from '@app/internal/index.ts'

/**
 * Measure the length of text.
 * @description Counts characters in a single string.
 * @param input - String to measure
 * @returns Character count
 */
export default function length(input: string): number
/**
 * Measure string vector lengths.
 * @description Counts characters in each vector string entry.
 * @param input - Vector of strings to measure
 * @returns Vector of character counts
 */
export default function length(input: string[]): number[]
/**
 * Measure string matrix lengths.
 * @description Counts characters in each matrix string entry.
 * @param input - Matrix of strings to measure
 * @returns Matrix of character counts
 */
export default function length(input: string[][]): number[][]
/**
 * Measure the length of text.
 * @description Counts characters in each string entry.
 * @param input - String, vector, or matrix of strings to measure
 * @returns Character counts matching the input shape
 */
export default function length(
  input: string | string[] | string[][]
): number | number[] | number[][]
/**
 * Measure the length of text.
 * @description Counts characters in each string entry.
 * @param input - String, vector, or matrix of strings to measure
 * @returns Character counts matching the input shape
 */
export default function length(
  input: string | string[] | string[][]
): number | number[] | number[][] {
  return Internal.mapper(input, (value) => {
    const source = value ?? ''
    let count = 0
    for (let cursor = 0; cursor < source.length; cursor++) {
      const point = source.charCodeAt(cursor)
      if (point >= 0xd800 && point <= 0xdbff && cursor + 1 < source.length) {
        const trailing = source.charCodeAt(cursor + 1)
        if (trailing >= 0xdc00 && trailing <= 0xdfff) {
          cursor++
        }
      }
      count++
    }
    return count
  })
}
