import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the exponential of each element.
 * @description Applies an exponential variant across nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @param method - Exponential variant to apply to each element
 * @returns Exponentials matching the input nesting shape
 */
export default function exp(
  value: number | number[] | number[][],
  method?: 'e' | '2' | 'm1' | 2
): number | number[] | number[][]
/**
 * Compute each complex exponential.
 * @description Applies an exponential variant across nested inputs.
 * @param value - Complex or real input values
 * @param method - Exponential variant to apply to each element
 * @returns Exponentials matching the input nesting shape
 */
export default function exp(
  value: Types.NumerixValue,
  method?: 'e' | '2' | 'm1' | 2
): Types.NumerixValue
/**
 * Compute each nested exponential.
 * @description Applies an exponential variant across nested inputs.
 * @param value - Complex or real input values
 * @param method - Exponential variant to apply to each element
 * @returns Exponentials matching the input nesting shape
 */
export default function exp(
  value: Types.NumerixValue,
  method: 'e' | '2' | 'm1' | 2 = 'e'
): Types.NumerixValue {
  const factor = method === '2' || method === 2 ? Math.LN2 : 1
  return Internal.traverse(value, (entry) => {
    if (Internal.shape(entry)) {
      const scaled = entry.re * factor
      const scale = Math.exp(scaled)
      if (method !== 'm1') {
        if (entry.im === 0) {
          return { re: scale === 0 ? 0 : scale, im: 0 }
        }
        if (scale === 0) {
          if (entry.re === -Infinity || Number.isFinite(entry.im)) {
            return { re: 0, im: 0 }
          }
          return { re: NaN, im: NaN }
        }
        if (entry.re === Infinity && (entry.im === Infinity || Number.isNaN(entry.im))) {
          return { re: Infinity, im: NaN }
        }
      }
      const angle = entry.im * factor
      const cosine = Math.cos(angle)
      const sines = Math.sin(angle)
      let reals: number
      let imags: number
      if (!Number.isFinite(scale) && scale > 0 && method !== 'm1' && Number.isFinite(entry.re)) {
        const split = Math.exp(0.5 * scaled)
        reals = split * cosine * split
        imags = split * sines * split
      } else {
        reals = method === 'm1'
          ? Math.expm1(scaled) * cosine - 2 * Math.sin(0.5 * angle) ** 2
          : scale * cosine
        imags = scale * sines
      }
      return {
        re: reals === 0 ? 0 : reals,
        im: imags === 0 ? 0 : imags
      }
    }
    const numeric = Number(entry)
    return method === '2' || method === 2
      ? Math.pow(2, numeric)
      : method === 'm1'
      ? Math.expm1(numeric)
      : Math.exp(numeric)
  }) as Types.NumerixValue
}
