import broadcast from '@app/internal/broadcast.ts'

/**
 * Combine operands with a logical operator.
 * @description Applies a logical operator element-wise with broadcast.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param combine - Logical operator applied to each element pair
 * @returns Logical results matching the broadcast shape
 */
export default function boolean(
  left: boolean | number | (boolean | number)[] | (boolean | number)[][],
  right: boolean | number | (boolean | number)[] | (boolean | number)[][],
  combine: (first: boolean, second: boolean) => boolean
): boolean | boolean[] | boolean[][] {
  return broadcast(
    left,
    right,
    (first, second) => combine(Boolean(first), Boolean(second)),
    0
  ) as boolean | boolean[] | boolean[][]
}
