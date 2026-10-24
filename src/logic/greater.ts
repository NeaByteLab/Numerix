import * as Internal from '@app/internal/index.ts'

/**
 * Test whether left values exceed right.
 * @description Compares operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param inclusive - When true treats equal values as matching
 * @returns Match results matching the broadcast shape
 */
export default function greater(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  inclusive = false
): boolean | boolean[] | boolean[][] {
  return Internal.compare(left, right, inclusive, 'greater')
}
