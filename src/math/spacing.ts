import * as Internal from '@app/internal/index.ts'

/**
 * Compute the spacing between representable values.
 * @description Measures the gap to the next floating point number.
 * @param value - Scalar, vector, or matrix input values
 * @returns Spacing values matching the input nesting shape
 */
export default function spacing(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    const magnitude = Math.abs(scalar)
    if (!Number.isFinite(magnitude)) {
      return NaN
    }
    Internal.bits.float[0] = magnitude
    Internal.bits.uint[0] = (Internal.bits.uint[0] ?? 0n) + 1n
    return ((Internal.bits.float[0] ?? magnitude) - magnitude) * (scalar < 0 ? -1 : 1)
  })
}
