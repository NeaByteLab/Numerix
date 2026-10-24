import * as Internal from '@app/internal/index.ts'

/**
 * Compute the remainder of a division.
 * @description Combines operands with NumPy style broadcast.
 * @param left - Dividend as scalar, vector, or matrix
 * @param right - Divisor as scalar, vector, or matrix
 * @param mode - Remainder convention applied to each quotient
 * @returns Remainders matching the broadcast shape of the operands
 */
export default function mod(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 1,
  mode: boolean | 'fmod' | 'remainder' = false
): number | number[] | number[][] {
  const truncating = mode === true || mode === 'fmod'
  return Internal.broadcast(
    left,
    right,
    (dividend, divisor) =>
      truncating ? dividend % divisor : ((dividend % divisor) + divisor) % divisor,
    1
  )
}
