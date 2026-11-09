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
    if (!Number.isFinite(scalar)) {
      return 0
    }
    let integer = Math.abs(Math.trunc(scalar))
    if (integer <= 0xffffffff) {
      let chunk = integer >>> 0
      chunk -= (chunk >>> 1) & 0x55555555
      chunk = (chunk & 0x33333333) + ((chunk >>> 2) & 0x33333333)
      return (((chunk + (chunk >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24
    }
    let total = 0
    while (integer > 0) {
      total += integer % 2
      integer = Math.floor(integer / 2)
    }
    return total
  })
}
