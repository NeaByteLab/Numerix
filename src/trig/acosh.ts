import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'

/**
 * Compute the real inverse hyperbolic cosine.
 * @description Applies the inverse hyperbolic cosine across nested numeric inputs.
 * @param input - Scalar, vector, or matrix input values
 * @returns Inverse hyperbolic cosine values matching the input shape
 */
export default function acosh(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real inverse hyperbolic cosine.
 * @description Applies the principal inverse hyperbolic cosine across nested inputs.
 * @param input - Complex or real input values
 * @returns Inverse hyperbolic cosine values matching the input shape
 */
export default function acosh(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real inverse hyperbolic cosine.
 * @description Applies the principal inverse hyperbolic cosine across nested inputs.
 * @param input - Complex or real input values
 * @returns Inverse hyperbolic cosine values matching the input shape
 */
export default function acosh(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const radius = Math.hypot(entry.re, entry.im)
      let width: number
      let phase: number
      if (radius > 1e8) {
        width = radius === Infinity && Number.isFinite(entry.re) && Number.isFinite(entry.im)
          ? 2 * Math.LN2 + Math.log(Math.hypot(0.5 * entry.re, 0.5 * entry.im))
          : Math.LN2 + Math.log(radius)
        phase = (entry.im < 0 || Object.is(entry.im, -0) ? -1 : 1) *
          Math.atan2(Math.abs(entry.im), entry.re)
      } else {
        const upper = Maths.sqrt({
          re: 0.5 * (entry.re + 1),
          im: 0.5 * entry.im
        }) as Types.NumerixComplex
        const lower = Maths.sqrt({
          re: 0.5 * (entry.re - 1),
          im: 0.5 * entry.im
        }) as Types.NumerixComplex
        const total = upper.re + lower.re
        const other = upper.im + lower.im
        width = entry.im === 0 && entry.re >= -1 && entry.re <= 1
          ? 0
          : 2 * Math.log(Math.hypot(total, other))
        phase = 2 * Math.atan2(other, total)
      }
      return { re: width === 0 ? 0 : width, im: phase === 0 ? 0 : phase }
    }
    return Math.acosh(Number(entry))
  }) as Types.NumerixValue
}
