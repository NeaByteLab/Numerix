import * as Internal from '@app/internal/index.ts'

/**
 * Combine operands with logical conjunction.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @returns Conjunction results matching the broadcast shape
 */
export default function and(
  first: boolean | number | (boolean | number)[] | (boolean | number)[][],
  right: boolean | number | (boolean | number)[] | (boolean | number)[][]
): boolean | boolean[] | boolean[][] {
  return Internal.boolean(first, right, (leading, trailing) => leading && trailing)
}
