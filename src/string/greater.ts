import equal from '@app/string/equal.ts'

/**
 * Compare strings for ordering.
 * @description Reports whether the left string sorts after the right.
 * @param first - First string to compare
 * @param second - Second string to compare
 * @param inclusive - When true, treats equal strings as matching
 * @returns Comparison result
 */
export default function greater(
  first: string,
  second: string,
  inclusive?: boolean
): boolean
/**
 * Compare string vectors for ordering.
 * @description Reports whether the left strings sort after the right strings.
 * @param first - First string or vector of strings
 * @param second - Second string or vector of strings
 * @param inclusive - When true, treats equal strings as matching
 * @returns Vector of comparison results
 */
export default function greater(
  first: string | string[],
  second: string | string[],
  inclusive?: boolean
): boolean[]
/**
 * Compare string arrays for ordering.
 * @description Reports whether the left string sorts after the right.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @param inclusive - When true, treats equal strings as matching
 * @returns Comparison results matching the input shape
 */
export default function greater(
  first: string | string[] | string[][],
  second: string | string[] | string[][],
  inclusive?: boolean
): boolean | boolean[] | boolean[][]
/**
 * Compare strings for ordering.
 * @description Reports whether the left string sorts after the right.
 * @param first - First string, vector, or matrix of strings
 * @param second - Second string, vector, or matrix of strings
 * @param inclusive - When true, treats equal strings as matching
 * @returns Comparison results matching the input shape
 */
export default function greater(
  first: string | string[] | string[][],
  second: string | string[] | string[][],
  inclusive: boolean = false
): boolean | boolean[] | boolean[][] {
  return equal(first, second, inclusive ? 'greater_equal' : 'greater')
}
