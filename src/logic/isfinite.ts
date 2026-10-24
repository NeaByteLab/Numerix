import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are finite.
 * @description Checks each element against infinity and not a number.
 * @param value - Scalar, vector, or matrix values to inspect
 * @returns Match results matching the input nesting shape
 */
export default function isfinite(
  value: number | number[] | number[][]
): boolean | boolean[] | boolean[][] {
  return Internal.unary(value, Number.isFinite)
}
