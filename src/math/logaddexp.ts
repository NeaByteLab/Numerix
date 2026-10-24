import * as Internal from '@app/internal/index.ts'

/**
 * Compute the log of summed exponentials.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param binary - When true computes the base two logarithm
 * @returns Logarithms matching the broadcast shape of the operands
 */
export default function logaddexp(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  binary = false
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => {
    if (first === second) {
      return first + (binary ? 1 : Math.LN2)
    }
    const larger = Math.max(first, second)
    const smaller = Math.min(first, second)
    if (binary) {
      return larger + Math.log2(1 + Math.pow(2, smaller - larger))
    }
    return larger + Math.log1p(Math.exp(smaller - larger))
  })
}
