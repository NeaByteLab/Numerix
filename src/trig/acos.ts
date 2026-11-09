import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import asin from '@app/trig/asin.ts'

/**
 * Compute the arccosine of each real element.
 * @description Applies the arccosine across nested real numeric inputs.
 * @param input - Scalar, vector, or matrix values within the domain
 * @returns Arccosine values matching the input nesting shape
 */
export default function acos(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real arccosine.
 * @description Applies the principal arccosine across nested inputs.
 * @param input - Complex or real input values
 * @returns Arccosine values matching the input nesting shape
 */
export default function acos(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real arccosine.
 * @description Applies the principal arccosine across nested inputs.
 * @param input - Complex or real input values
 * @returns Arccosine values matching the input nesting shape
 */
export default function acos(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const inner = asin(entry) as Types.NumerixComplex
      const reals = 0.5 * Math.PI - inner.re
      return {
        re: reals === 0 ? 0 : reals,
        im: inner.im === 0 ? 0 : -inner.im
      }
    }
    return Math.acos(Number(entry))
  }) as Types.NumerixValue
}
