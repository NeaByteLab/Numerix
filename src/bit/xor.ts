import * as Internal from '@app/internal/index.ts'

/**
 * Combine operands with bitwise exclusive disjunction.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Exclusive disjunction results matching the broadcast shape
 */
export default function xor(
  left: number | number[] | number[][],
  right: number | number[] | number[][] = 0
): number | number[] | number[][] {
  return Internal.broadcast(left, right, (first, second) => first ^ second)
}
