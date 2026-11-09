import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the hyperbolic sine of each real element.
 * @description Applies the hyperbolic sine across nested numeric inputs.
 * @param input - Scalar, vector, or matrix input values
 * @returns Hyperbolic sine values matching the input shape
 */
export default function sinh(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real hyperbolic sine.
 * @description Applies the hyperbolic sine across nested inputs.
 * @param input - Complex or real input values
 * @returns Hyperbolic sine values matching the input shape
 */
export default function sinh(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real hyperbolic sine.
 * @description Applies the hyperbolic sine across nested inputs.
 * @param input - Complex or real input values
 * @returns Hyperbolic sine values matching the input shape
 */
export default function sinh(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const hyper = Math.sinh(entry.re)
      const cosine = Math.cosh(entry.re)
      const angle = Math.cos(entry.im)
      const sines = Math.sin(entry.im)
      const magnitude = Math.abs(entry.re)
      let reals: number
      let imags: number
      if (
        (!Number.isFinite(hyper) || !Number.isFinite(cosine)) &&
        Number.isFinite(entry.re) &&
        entry.im !== 0
      ) {
        const factor = Math.exp(0.5 * magnitude)
        reals = (entry.re < 0 ? -0.5 : 0.5) * factor * angle * factor
        imags = 0.5 * factor * sines * factor
      } else {
        reals = entry.re === 0 ? 0 : entry.im === 0 ||
            (entry.im === Infinity || Number.isNaN(entry.im)) && magnitude === Infinity
          ? hyper
          : hyper * angle
        imags = entry.im === 0 ? 0 : entry.re === 0 ? sines : cosine * sines
      }
      return {
        re: reals === 0 ? 0 : reals,
        im: imags === 0 ? 0 : imags
      }
    }
    return Math.sinh(Number(entry))
  }) as Types.NumerixValue
}
