import * as Internal from '@app/internal/index.ts'

/**
 * Test whether left values exceed right values.
 * @description Compares operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @param inclusive - When true, treats equal values as matching
 * @returns Match results matching the broadcast shape
 */
export default function greater(
  first: number | number[] | number[][],
  right: number | number[] | number[][],
  inclusive = false
): boolean | boolean[] | boolean[][] {
  return Internal.compare(first, right, inclusive, 'greater')
}
