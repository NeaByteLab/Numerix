import * as Internal from '@app/internal/index.ts'

/**
 * Raise each element to a power.
 * @description Combines operands with NumPy style broadcast.
 * @param left - Base operand as scalar, vector, or matrix
 * @param right - Exponent operand as scalar, vector, or matrix
 * @returns Powers matching the broadcast shape of the operands
 */
export default function pow(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 2
): number | number[] | number[][] {
  return Internal.broadcast(left, right, Math.pow)
}
