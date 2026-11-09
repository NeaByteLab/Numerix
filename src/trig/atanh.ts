import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the real inverse hyperbolic tangent.
 * @description Applies the inverse hyperbolic tangent across nested numeric inputs.
 * @param input - Scalar, vector, or matrix input values
 * @returns Inverse hyperbolic tangent values matching the input shape
 */
export default function atanh(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real inverse hyperbolic tangent.
 * @description Applies the principal inverse hyperbolic tangent across nested inputs.
 * @param input - Complex or real input values
 * @returns Inverse hyperbolic tangent values matching the input shape
 */
export default function atanh(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real inverse hyperbolic tangent.
 * @description Applies the principal inverse hyperbolic tangent across nested inputs.
 * @param input - Complex or real input values
 * @returns Inverse hyperbolic tangent values matching the input shape
 */
export default function atanh(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const sense = entry.re < 0 || Object.is(entry.re, -0) ? -1 : 1
      const sided = entry.im < 0 || Object.is(entry.im, -0) ? -1 : 1
      const reals = Math.abs(entry.re)
      const imags = Math.abs(entry.im)
      const missing = Number.isNaN(reals) || Number.isNaN(imags)
      if (Math.hypot(reals, imags) === Infinity) {
        return {
          re: missing ? NaN : 0,
          im: (Number.isNaN(imags) ? sense : sided) * 0.5 * Math.PI
        }
      }
      if (
        missing &&
        (reals > 3.351951982485649e153 || imags > 3.351951982485649e153)
      ) {
        return {
          re: NaN,
          im: (Number.isNaN(imags) ? sense : sided) * 0.5 * Math.PI
        }
      }
      const crest = Math.max(reals, imags)
      let total: number
      let other: number
      if (crest > 1e8) {
        const cosine = reals / crest
        const sines = imags / crest
        const denom = crest * (cosine * cosine + sines * sines)
        total = sense * (cosine / denom)
        other = sided * (0.5 * Math.PI - sines / denom)
      } else {
        const lower = 1 - reals
        const scale = lower * lower + imags * imags
        total = sense *
          (lower === 0 && imags > 0 && scale === 0
            ? 0.5 * (Math.LN2 - Math.log(imags))
            : scale === 0
            ? Infinity
            : 0.25 * Math.log1p((4 * reals) / scale))
        other = sided *
          (lower === 0 && imags === 0
            ? 0.25 * Math.PI
            : 0.5 * Math.atan2(2 * imags, (1 + reals) * lower - imags * imags))
      }
      return { re: total === 0 ? 0 : total, im: other === 0 ? 0 : other }
    }
    return Math.atanh(Number(entry))
  }) as Types.NumerixValue
}
