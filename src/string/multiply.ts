import * as Internal from '@app/internal/index.ts'

/**
 * Repeat strings a fixed number of times.
 * @description Concatenates each string with itself repeatedly.
 * @param input - Array of strings to repeat
 * @param times - Number of repetitions for each string
 * @returns Repeated strings matching the input shape
 */
export default function multiply(
  input: string[],
  times: number | number[]
): string[]
/**
 * Repeat a string matrix across counts.
 * @description Concatenates each matrix string entry repeatedly.
 * @param input - Matrix of strings to repeat
 * @param times - Number, vector, or matrix of repetition counts
 * @returns Matrix of repeated strings
 */
export default function multiply(
  input: string[][],
  times: number | number[] | number[][]
): string[][]
/**
 * Repeat a string across a count array.
 * @description Concatenates the string for each repetition count.
 * @param input - String to repeat
 * @param times - Array of repetition counts
 * @returns Repeated strings matching the count array
 */
export default function multiply(
  input: string,
  times: number[]
): string[]
/**
 * Repeat a string a fixed number of times.
 * @description Concatenates the string with itself repeatedly.
 * @param input - String to repeat
 * @param times - Number of repetitions
 * @returns Repeated string
 */
export default function multiply(
  input: string,
  times: number
): string
/**
 * Repeat text a fixed number of times.
 * @description Concatenates each string with itself repeatedly.
 * @param input - String, vector, or matrix of strings to repeat
 * @param times - Number, vector, or matrix of repetitions for each string
 * @returns Repeated strings matching the input shape
 */
export default function multiply(
  input: string | string[] | string[][],
  times: number | number[] | number[][]
): string | string[] | string[][] {
  if (typeof times === 'number') {
    const count = times > 0 ? Math.trunc(times) : 0
    return Internal.mapper<string, string>(
      input,
      (entry) => (typeof entry === 'string' ? entry : '').repeat(count)
    )
  }
  return Internal.broadcast<string>(
    input,
    times,
    (entry, count) =>
      (typeof entry === 'string' ? entry : '').repeat(count > 0 ? Math.trunc(count) : 0)
  )
}
