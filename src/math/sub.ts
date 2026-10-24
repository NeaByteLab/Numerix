import * as Internal from '@app/internal/index.ts'

/**
 * Subtract two operands element-wise.
 * @description Combines operands with NumPy style broadcast.
 * @param left - Minuend as scalar, vector, or matrix
 * @param right - Subtrahend as scalar, vector, or matrix
 * @returns Differences matching the broadcast shape of the operands
 */
export default function sub(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 0
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => first - second)
}
