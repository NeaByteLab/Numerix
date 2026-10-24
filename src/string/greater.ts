import * as Text from '@app/string/index.ts'

/**
 * Compare strings for ordering.
 * @description Reports whether the left string sorts after the right.
 * @param left - First string or array of strings
 * @param right - Second string or array of strings
 * @param inclusive - When true treats equal strings as matching
 * @returns Comparison results matching the input shape
 */
export default function greater(
  left: string | string[],
  right: string | string[],
  inclusive: boolean = false
): boolean | boolean[] {
  return Text.equal(left, right, inclusive ? 'greater_equal' : 'greater')
}
