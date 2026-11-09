import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the hyperbolic tangent of each real element.
 * @description Applies the hyperbolic tangent across nested numeric inputs.
 * @param input - Scalar, vector, or matrix input values
 * @returns Hyperbolic tangent values matching the input shape
 */
export default function tanh(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real hyperbolic tangent.
 * @description Applies the hyperbolic tangent across nested inputs.
 * @param input - Complex or real input values
 * @returns Hyperbolic tangent values matching the input shape
 */
export default function tanh(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real hyperbolic tangent.
 * @description Applies the hyperbolic tangent across nested inputs.
 * @param input - Complex or real input values
 * @returns Hyperbolic tangent values matching the input shape
 */
export default function tanh(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      if (Math.abs(entry.re) > 350) {
        if (!Number.isFinite(entry.im) && Math.abs(entry.re) !== Infinity) {
          return { re: NaN, im: NaN }
        }
        return { re: entry.re < 0 ? -1 : 1, im: 0 }
      }
      const doubled = 2 * entry.im
      const horizontal = 2 * entry.re
      const finite = Number.isFinite(doubled)
      const cosine = finite ? 0 : Math.cos(entry.im)
      const sines = finite ? 0 : Math.sin(entry.im)
      const denom = Math.cosh(horizontal) +
        (finite ? Math.cos(doubled) : cosine * cosine - sines * sines)
      return {
        re: Math.sinh(horizontal) / denom,
        im: entry.im === 0 ? 0 : (finite ? Math.sin(doubled) : 2 * sines * cosine) / denom
      }
    }
    return Math.tanh(Number(entry))
  }) as Types.NumerixValue
}
