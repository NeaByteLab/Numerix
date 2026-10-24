import * as Internal from '@app/internal/index.ts'

/**
 * Compute the greatest common divisor.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Divisors matching the broadcast shape of the operands
 */
export default function gcd(
  left: number | number[] | number[][],
  right: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => {
    let dividend = Math.abs(Math.trunc(first))
    let divisor = Math.abs(Math.trunc(second))
    if (!Number.isFinite(dividend) || !Number.isFinite(divisor)) {
      return 0
    }
    while (divisor !== 0) {
      const remainder = divisor
      divisor = dividend % divisor
      dividend = remainder
    }
    return dividend
  })
}
