import * as Internal from '@app/internal/index.ts'

/**
 * Test whether left values are smaller.
 * @description Compares operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param inclusive - When true treats equal values as matching
 * @returns Match results matching the broadcast shape
 */
export default function less(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  inclusive = false
): boolean | boolean[] | boolean[][] {
  return Internal.compare(left, right, inclusive, 'less')
}
