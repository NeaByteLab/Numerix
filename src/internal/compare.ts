import type * as Types from '@app/types.ts'
import broadcast from '@app/internal/broadcast.ts'

/**
 * Compare operands with NumPy style broadcast.
 * @description Matches entries of both operands against the requested direction.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param inclusive - When true treats equal values as matching
 * @param direction - Side the entries are compared against
 * @returns Match results matching the broadcast shape
 */
export default function compare(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  inclusive: boolean,
  direction: Types.NumerixSide
): boolean | boolean[] | boolean[][] {
  return broadcast(
    left,
    right,
    (first, second) =>
      direction === 'greater'
        ? inclusive ? first >= second : first > second
        : inclusive
        ? first <= second
        : first < second
  ) as boolean | boolean[] | boolean[][]
}
