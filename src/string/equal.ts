import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compare two strings.
 * @description Compares two strings using the requested operator.
 * @param first - First string to compare
 * @param second - Second string to compare
 * @param method - Comparison operator applied to each pair
 * @returns Comparison result
 */
export default function equal(
  first: string,
  second: string,
  method?: Types.NumerixCompare
): boolean
/**
 * Compare string vectors element-wise.
 * @description Compares matching vector entries using the operator.
 * @param first - First string or vector of strings
 * @param second - Second string or vector of strings
 * @param method - Comparison operator applied to each pair
 * @returns Vector of comparison results
 */
export default function equal(
  first: string | string[],
  second: string | string[],
  method?: Types.NumerixCompare
): boolean[]
/**
 * Compare string arrays element-wise.
 * @description Compares matching entries using the requested operator.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @param method - Comparison operator applied to each pair
 * @returns Comparison results matching the input shape
 */
export default function equal(
  first: string | string[] | string[][],
  second: string | string[] | string[][],
  method?: Types.NumerixCompare
): boolean | boolean[] | boolean[][]
/**
 * Compare two strings.
 * @description Compares matching entries using the requested operator.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @param method - Comparison operator applied to each pair
 * @returns Comparison results matching the input shape
 */
export default function equal(
  first: string | string[] | string[][],
  second: string | string[] | string[][],
  method: Types.NumerixCompare = 'equal'
): boolean | boolean[] | boolean[][] {
  if (
    method !== 'equal' &&
    method !== 'not' &&
    method !== 'less' &&
    method !== 'less_equal' &&
    method !== 'greater' &&
    method !== 'greater_equal'
  ) {
    throw new RangeError(
      "mode must be one of 'equal', 'not', 'less', 'less_equal', 'greater', or 'greater_equal'"
    )
  }
  if (typeof second === 'string' && (method === 'equal' || method === 'not')) {
    return Internal.mapper<string, boolean>(
      first,
      method === 'equal'
        ? (leading) => String(leading ?? '') === second
        : (leading) => String(leading ?? '') !== second
    )
  }
  if (typeof first === 'string' && (method === 'equal' || method === 'not')) {
    return Internal.mapper<string, boolean>(
      second,
      method === 'equal'
        ? (trailing) => first === String(trailing ?? '')
        : (trailing) => first !== String(trailing ?? '')
    )
  }
  return Internal.broadcast<boolean>(
    first,
    second,
    (leading, trailing) => {
      if (method === 'equal') {
        return String(leading) === String(trailing)
      }
      if (method === 'not') {
        return String(leading) !== String(trailing)
      }
      const alpha = String(leading)
      const omega = String(trailing)
      let first = 0
      let second = 0
      while (first < alpha.length && second < omega.length) {
        const prior = alpha.codePointAt(first) ?? 0
        const later = omega.codePointAt(second) ?? 0
        if (prior !== later) {
          return method === 'less' || method === 'less_equal' ? prior < later : prior > later
        }
        first += prior > 0xffff ? 2 : 1
        second += later > 0xffff ? 2 : 1
      }
      const order = (alpha.length - first) - (omega.length - second)
      return method === 'less'
        ? order < 0
        : method === 'less_equal'
        ? order <= 0
        : method === 'greater'
        ? order > 0
        : order >= 0
    },
    '' as unknown as number
  )
}
