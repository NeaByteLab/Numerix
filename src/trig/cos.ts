import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import cosh from '@app/trig/cosh.ts'

/**
 * Compute the cosine of each real element.
 * @description Applies the cosine across nested real numeric inputs.
 * @param input - Scalar, vector, or matrix angles in radians
 * @returns Cosine values matching the input nesting shape
 */
export default function cos(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real cosine.
 * @description Applies the cosine across nested complex or real inputs.
 * @param input - Complex or real angles
 * @returns Cosine values matching the input nesting shape
 */
export default function cos(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real cosine.
 * @description Applies the cosine across nested complex or real inputs.
 * @param input - Complex or real angles
 * @returns Cosine values matching the input nesting shape
 */
export default function cos(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      return cosh({
        re: -entry.im,
        im: entry.re
      }) as Types.NumerixComplex
    }
    return Math.cos(Number(entry))
  }) as Types.NumerixValue
}
