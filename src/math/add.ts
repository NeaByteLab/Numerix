import * as Internal from '@app/internal/index.ts'

/**
 * Add two operands element-wise.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Sums matching the broadcast shape of the operands
 */
export default function add(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 0
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => first + second)
}
