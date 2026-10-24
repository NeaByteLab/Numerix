import type * as Types from '@app/types.ts'

/**
 * Compare two strings.
 * @description Applies the requested comparison operator.
 * @param left - First string to compare
 * @param right - Second string to compare
 * @param mode - Comparison operator applied to the pair
 * @returns Result of the comparison
 */
function compare(left: string, right: string, mode: Types.NumerixCompare): boolean {
  if (mode === 'not') {
    return left !== right
  }
  if (mode === 'less') {
    return left < right
  }
  if (mode === 'less_equal') {
    return left <= right
  }
  if (mode === 'greater') {
    return left > right
  }
  if (mode === 'greater_equal') {
    return left >= right
  }
  return left === right
}

/**
 * Compare two strings.
 * @description Compares matching entries using the requested operator.
 * @param left - First string or array of strings
 * @param right - Second string or array of strings
 * @param mode - Comparison operator applied to each pair
 * @returns Comparison results matching the input shape
 */
export default function equal(
  left: string | string[],
  right: string | string[],
  mode: Types.NumerixCompare = 'equal'
): boolean | boolean[] {
  const leftArray = Array.isArray(left)
  const rightArray = Array.isArray(right)
  if (!leftArray && !rightArray) {
    return compare(left, right, mode)
  }
  const leftCount = leftArray ? left.length : 1
  const rightCount = rightArray ? right.length : 1
  const length = Math.max(leftCount, rightCount)
  const result = new Array<boolean>(length)
  for (let index = 0; index < length; index++) {
    const first = leftArray ? (left[index] ?? '') : left
    const second = rightArray ? (right[index] ?? '') : right
    result[index] = compare(first, second, mode)
  }
  return result
}
