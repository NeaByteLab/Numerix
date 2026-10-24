import * as Internal from '@app/internal/index.ts'

/**
 * Test whether operands are equal.
 * @description Compares matching entries of both operands.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param reduce - When true combines results into one boolean
 * @returns Match results matching the broadcast shape
 */
export default function equal(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  reduce = false
): boolean | boolean[] | boolean[][] {
  if (reduce) {
    return Internal.equals(left, right)
  }
  return Internal.broadcast(
    left,
    right,
    (first, second) => first === second,
    NaN
  ) as boolean | boolean[] | boolean[][]
}
