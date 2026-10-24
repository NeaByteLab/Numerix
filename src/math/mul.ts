import * as Internal from '@app/internal/index.ts'

/**
 * Multiply two operands element-wise.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Products matching the broadcast shape of the operands
 */
export default function mul(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 1
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => first * second, 1)
}
