import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are not numbers.
 * @description Checks each element against the not a number value.
 * @param value - Scalar, vector, or matrix values to inspect
 * @returns Match results matching the input nesting shape
 */
export default function isnan(
  value: number | number[] | number[][]
): boolean | boolean[] | boolean[][] {
  return Internal.unary(value, Number.isNaN)
}
