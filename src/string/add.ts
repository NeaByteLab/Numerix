import * as Internal from '@app/internal/index.ts'

/**
 * Concatenate two strings element-wise.
 * @description Joins matching entries of two string inputs.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @returns Concatenated strings matching the broadcast shape
 */
export default function add(
  first: string,
  second: string
): string
/**
 * Concatenate string vectors element-wise.
 * @description Joins matching entries of two string vectors.
 * @param first - First string or vector of strings
 * @param second - Second string or vector of strings
 * @returns Vector of concatenated strings
 */
export default function add(
  first: string | string[],
  second: string | string[]
): string[]
/**
 * Concatenate string arrays element-wise.
 * @description Joins matching entries of two string inputs.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @returns Concatenated strings matching the broadcast shape
 */
export default function add(
  first: string | string[] | string[][],
  second: string | string[] | string[][]
): string | string[] | string[][]
/**
 * Concatenate two strings element-wise.
 * @description Joins matching entries of two string inputs.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @returns Concatenated strings matching the broadcast shape
 */
export default function add(
  first: string | string[] | string[][],
  second: string | string[] | string[][]
): string | string[] | string[][] {
  if (typeof second === 'string') {
    return Internal.mapper<string, string>(first, (leading) => String(leading ?? '') + second)
  }
  if (typeof first === 'string') {
    return Internal.mapper<string, string>(second, (trailing) => first + String(trailing ?? ''))
  }
  return Internal.broadcast<string>(
    first,
    second,
    (leading, trailing) => String(leading) + String(trailing),
    '' as unknown as number
  )
}
