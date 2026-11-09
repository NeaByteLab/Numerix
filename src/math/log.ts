import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the logarithm of each element.
 * @description Applies a logarithm variant across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @param radix - Logarithm base or natural logarithm variant
 * @returns Logarithms matching the input nesting shape
 */
export default function log(
  value: number | number[] | number[][],
  radix?: number | 'e' | '1p' | '2' | '10'
): number | number[] | number[][]
/**
 * Compute each complex logarithm.
 * @description Applies a logarithm variant across nested inputs.
 * @param value - Complex or real input values
 * @param radix - Logarithm base or natural logarithm variant
 * @returns Logarithms matching the input nesting shape
 */
export default function log(
  value: Types.NumerixValue,
  radix?: number | 'e' | '1p' | '2' | '10'
): Types.NumerixValue
/**
 * Compute each nested logarithm.
 * @description Applies a logarithm variant across nested inputs.
 * @param value - Complex or real input values
 * @param radix - Logarithm base or natural logarithm variant
 * @returns Logarithms matching the input nesting shape
 */
export default function log(
  value: Types.NumerixValue,
  radix: number | 'e' | '1p' | '2' | '10' = 'e'
): Types.NumerixValue {
  if (
    typeof radix !== 'number' &&
    radix !== 'e' &&
    radix !== '1p' &&
    radix !== '2' &&
    radix !== '10'
  ) {
    throw new RangeError("base must be a number, 'e', '1p', '2', or '10'")
  }
  const divide = radix === 'e' || radix === '1p'
    ? 1
    : radix === 2 || radix === '2'
    ? Math.LN2
    : radix === 10 || radix === '10'
    ? Math.LN10
    : Math.log(Number(radix))
  return Internal.traverse(value, (entry) => {
    if (Internal.shape(entry)) {
      const shifted = radix === '1p' ? entry.re + 1 : entry.re
      const extent = Math.max(Math.abs(shifted), Math.abs(entry.im))
      const radius = Math.hypot(shifted, entry.im)
      const reals = (
        radix === '1p' && Math.abs(entry.re) < 0.5 && Math.abs(entry.im) < 0.5
          ? 0.5 * Math.log1p(entry.re * (2 + entry.re) + entry.im * entry.im)
          : radius === Infinity && Number.isFinite(shifted) && Number.isFinite(entry.im)
          ? Math.LN2 + Math.log(Math.hypot(0.5 * shifted, 0.5 * entry.im))
          : extent > 0 && extent < 2.2250738585072014e-308
          ? Math.log(Math.hypot(shifted * 2 ** 54, entry.im * 2 ** 54)) - 54 * Math.LN2
          : Math.log(radius)
      ) / divide
      const imags = Math.atan2(entry.im, shifted) / divide
      return {
        re: reals === 0 ? 0 : reals,
        im: imags === 0 ? 0 : imags
      }
    }
    const numeric = Number(entry)
    return radix === '1p'
      ? Math.log1p(numeric)
      : radix === 'e'
      ? Math.log(numeric)
      : radix === 2 || radix === '2'
      ? Math.log2(numeric)
      : radix === 10 || radix === '10'
      ? Math.log10(numeric)
      : Math.log(numeric) / divide
  }) as Types.NumerixValue
}
