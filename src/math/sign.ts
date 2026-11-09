import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the sign of each element.
 * @description Reports the sign as a magnitude, boolean, or bit pattern.
 * @param value - Scalar, vector, or matrix input values
 * @param method - Sign reporting variant applied to each element
 * @returns Sign values matching the input nesting shape
 */
export default function sign(
  value: Types.NumerixValue,
  method?: number | number[] | 'bit' | 'pos' | 'neg'
): Types.NumerixValue | boolean | boolean[] | boolean[][] {
  if (method === 'bit') {
    return Internal.unary(value as number | number[] | number[][], (scalar) => {
      Internal.bits.float[0] = scalar
      return ((Internal.bits.uint[0] ?? 0n) >> 63n) !== 0n
    })
  }
  if (method === 'pos' || method === 'neg') {
    const factor = method === 'neg' ? -1 : 1
    return Internal.traverse(
      value,
      (entry) =>
        Internal.shape(entry) ? { re: factor * entry.re, im: factor * entry.im } : factor * entry
    ) as Types.NumerixValue
  }
  if (typeof method === 'string') {
    throw new RangeError("mode must be 'bit', 'pos', 'neg', or a numeric copysign factor")
  }
  if (method !== undefined) {
    return Internal.broadcast(
      value as number | number[] | number[][],
      method,
      (magnitude, factor) => {
        Internal.bits.float[0] = factor
        return Math.abs(magnitude) * (((Internal.bits.uint[0] ?? 0n) >> 63n) !== 0n ? -1 : 1)
      }
    ) as number | number[] | number[][]
  }
  return Internal.traverse(value, (entry) => {
    if (Internal.shape(entry)) {
      const scale = Math.hypot(entry.re, entry.im)
      if (Number.isNaN(scale)) {
        return { re: NaN, im: NaN }
      }
      if (scale === 0) {
        return { re: 0, im: 0 }
      }
      if (scale === Infinity) {
        const first = Math.abs(entry.re) === Infinity
        const right = Math.abs(entry.im) === Infinity
        if (first && right) {
          return { re: NaN, im: NaN }
        }
        return {
          re: first ? (entry.re > 0 ? 1 : -1) : 0,
          im: right ? (entry.im > 0 ? 1 : -1) : 0
        }
      }
      return { re: entry.re / scale, im: entry.im / scale }
    }
    const marker = Math.sign(Number(entry))
    return Object.is(marker, -0) ? 0 : marker
  }) as Types.NumerixValue
}
