import * as Internal from '@app/internal/index.ts'

/**
 * Compute the spacing between representable values.
 * @description Measures the gap to the next floating-point number.
 * @param value - Scalar, vector, or matrix input values
 * @returns Spacing values matching the input nesting shape
 */
export default function spacing(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    if (!Number.isFinite(scalar)) {
      return NaN
    }
    if (scalar === 0) {
      return Number.MIN_VALUE
    }
    Internal.bits.float[0] = scalar
    Internal.bits.uint[0] = (Internal.bits.uint[0] ?? 0n) + 1n
    return (Internal.bits.float[0] ?? scalar) - scalar
  })
}
