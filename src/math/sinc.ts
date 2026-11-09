import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Trig from '@app/trig/index.ts'
import div from '@app/math/div.ts'

/**
 * Compute the normalized sinc function.
 * @description Evaluates the normalized sinc function across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Sinc values matching the input nesting shape
 */
export default function sinc(
  value: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex normalized sinc function.
 * @description Evaluates the normalized sinc function across nested inputs.
 * @param value - Complex or real input values
 * @returns Sinc values matching the input nesting shape
 */
export default function sinc(
  value: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the normalized sinc function for nested values.
 * @description Evaluates the normalized sinc function across nested inputs.
 * @param value - Complex or real input values
 * @returns Sinc values matching the input nesting shape
 */
export default function sinc(
  value: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(value, (entry) => {
    if (Internal.shape(entry)) {
      if (entry.re === 0 && entry.im === 0) {
        return { re: 1, im: 0 }
      }
      const scaled = { re: Math.PI * entry.re, im: Math.PI * entry.im }
      const quotient = div(Trig.sin(scaled) as Types.NumerixComplex, scaled) as Types.NumerixComplex
      return {
        re: quotient.re === 0 ? 0 : quotient.re,
        im: quotient.im === 0 ? 0 : quotient.im
      }
    }
    const scalar = Number(entry)
    if (scalar === 0) {
      return 1
    }
    const angle = Math.PI * scalar
    return Math.sin(angle) / angle
  }) as Types.NumerixValue
}
