import * as Internal from '@app/internal/index.ts'

/**
 * Count the set bits per element.
 * @description Counts the active bits in each nested entry.
 * @param value - Scalar, vector, or matrix values to inspect
 * @returns Bit counts matching the input nesting shape
 */
export default function count(
  value: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    let bits = Math.abs(Math.trunc(scalar)) >>> 0
    bits -= (bits >>> 1) & 0x55555555
    bits = (bits & 0x33333333) + ((bits >>> 2) & 0x33333333)
    return (((bits + (bits >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24
  })
}
