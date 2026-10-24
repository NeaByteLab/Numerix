import * as Internal from '@app/internal/index.ts'

/**
 * Multiply by powers of two.
 * @description Combines operands with NumPy style broadcast.
 * @param left - Mantissa operand as scalar, vector, or matrix
 * @param right - Exponent operand as scalar, vector, or matrix
 * @returns Scaled values matching the broadcast shape of the operands
 */
export default function ldexp(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 0
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => first * Math.pow(2, second))
}
