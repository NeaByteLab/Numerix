import * as Internal from '@app/internal/index.ts'
import * as Numerix from '@app/math/index.ts'

/**
 * Compute the least common multiple.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Multiples matching the broadcast shape of the operands
 */
export default function lcm(
  left: number | number[] | number[][],
  right: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => {
    const dividend = Math.abs(Math.trunc(first))
    const divisor = Math.abs(Math.trunc(second))
    if (dividend === 0 || divisor === 0) {
      return 0
    }
    return (dividend / (Numerix.gcd(dividend, divisor) as number)) * divisor
  })
}
