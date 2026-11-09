import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the real inverse hyperbolic sine.
 * @description Applies the inverse hyperbolic sine across nested numeric inputs.
 * @param input - Scalar, vector, or matrix input values
 * @returns Inverse hyperbolic sine values matching the input shape
 */
export default function asinh(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real inverse hyperbolic sine.
 * @description Applies the principal inverse hyperbolic sine across nested inputs.
 * @param input - Complex or real input values
 * @returns Inverse hyperbolic sine values matching the input shape
 */
export default function asinh(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real inverse hyperbolic sine.
 * @description Applies the principal inverse hyperbolic sine across nested inputs.
 * @param input - Complex or real input values
 * @returns Inverse hyperbolic sine values matching the input shape
 */
export default function asinh(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const sense = entry.re < 0 || Object.is(entry.re, -0) ? -1 : 1
      const sided = entry.im < 0 || Object.is(entry.im, -0) ? -1 : 1
      const reals = Math.abs(entry.re)
      const imags = Math.abs(entry.im)
      if (imags === 0 && Number.isNaN(reals)) {
        return { re: NaN, im: 0 }
      }
      const radius = Math.hypot(reals, imags)
      let total: number
      let other: number
      if (radius > 1e8) {
        total = sense *
          (radius === Infinity && Number.isFinite(reals) && Number.isFinite(imags)
            ? 2 * Math.LN2 + Math.log(Math.hypot(0.5 * reals, 0.5 * imags))
            : Math.LN2 + Math.log(radius))
        other = sided * Math.atan2(imags, reals)
      } else {
        const alpha = reals * reals - imags * imags + 1
        const scale = Math.hypot(alpha, 2 * reals * imags)
        const first = reals + Math.sqrt(0.5 * (scale + alpha))
        const right = imags + Math.sqrt(Math.max(0, 0.5 * (scale - alpha)))
        total = reals === 0 && imags <= 1 ? 0 : sense * Math.log(Math.hypot(first, right))
        other = sided * Math.atan2(right, first)
      }
      return { re: total === 0 ? 0 : total, im: other === 0 ? 0 : other }
    }
    return Math.asinh(Number(entry))
  }) as Types.NumerixValue
}
