import * as Internal from '@app/internal/index.ts'

/**
 * Square each element.
 * @description Multiplies every element by itself in nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Squared values matching the input nesting shape
 */
export default function square(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => scalar * scalar)
}
