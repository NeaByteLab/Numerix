import * as Internal from '@app/internal/index.ts'

/**
 * Combine operands with exclusive disjunction.
 * @description Combines operands with NumPy style broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @returns Exclusive disjunction results matching the broadcast shape
 */
export default function xor(
  left: boolean | number | (boolean | number)[] | (boolean | number)[][],
  right: boolean | number | (boolean | number)[] | (boolean | number)[][]
): boolean | boolean[] | boolean[][] {
  return Internal.boolean(left, right, (first, second) => first !== second)
}
