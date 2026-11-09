import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import asinh from '@app/trig/asinh.ts'

/**
 * Compute the arcsine of each real element.
 * @description Applies the arcsine across nested real numeric inputs.
 * @param input - Scalar, vector, or matrix values within the domain
 * @returns Arcsine values matching the input nesting shape
 */
export default function asin(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real arcsine.
 * @description Applies the principal arcsine across nested inputs.
 * @param input - Complex or real input values
 * @returns Arcsine values matching the input nesting shape
 */
export default function asin(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real arcsine.
 * @description Applies the principal arcsine across nested inputs.
 * @param input - Complex or real input values
 * @returns Arcsine values matching the input nesting shape
 */
export default function asin(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const inner = asinh({
        re: -entry.im,
        im: entry.re
      }) as Types.NumerixComplex
      const imags = Number.isNaN(entry.im) && Math.abs(entry.re) === Infinity
        ? Math.abs(inner.re)
        : -inner.re
      return {
        re: inner.im === 0 ? 0 : inner.im,
        im: imags === 0 ? 0 : imags
      }
    }
    return Math.asin(Number(entry))
  }) as Types.NumerixValue
}
