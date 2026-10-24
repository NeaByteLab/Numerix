import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are infinite.
 * @description Checks each element against positive and negative infinity.
 * @param value - Scalar, vector, or matrix values to inspect
 * @param sign - Restricts the check to one infinity sign
 * @returns Match results matching the input nesting shape
 */
export default function isinf(
  value: number | number[] | number[][],
  sign?: 1 | -1
): boolean | boolean[] | boolean[][] {
  return Internal.unary(value, (scalar) => {
    if (sign === 1) {
      return scalar === Infinity
    }
    if (sign === -1) {
      return scalar === -Infinity
    }
    return scalar === Infinity || scalar === -Infinity
  })
}
