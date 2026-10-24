import * as Internal from '@app/internal/index.ts'

/**
 * Compute Euclidean distance of two operands.
 * @description Combines operands element-wise with stable square roots.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Distances matching the broadcast shape of the operands
 */
export default function hypot(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 0
): number | number[] | number[][] {
  return Internal.broadcast(left, right, Math.hypot)
}
