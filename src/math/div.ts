import * as Internal from '@app/internal/index.ts'

/**
 * Divide two operands element-wise.
 * @description Combines operands with NumPy style broadcast.
 * @param left - Numerator as scalar, vector, or matrix
 * @param right - Denominator as scalar, vector, or matrix
 * @param floor - When true rounds results toward negative infinity
 * @returns Quotients matching the broadcast shape of the operands
 */
export default function div(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 1,
  floor = false
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => {
    const quotient = first / second
    return floor ? Math.floor(quotient) : quotient
  }, 1)
}
