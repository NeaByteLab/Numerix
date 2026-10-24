import * as Internal from '@app/internal/index.ts'

/**
 * Negate boolean or numeric values.
 * @description Inverts each element of the nested input.
 * @param value - Scalar, vector, or matrix values to negate
 * @returns Negated values matching the input nesting shape
 */
export default function not(
  value: boolean | number | (boolean | number)[] | (boolean | number)[][]
): boolean | boolean[] | boolean[][] {
  return Internal.negate(value)
}
