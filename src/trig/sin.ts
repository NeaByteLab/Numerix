import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import sinh from '@app/trig/sinh.ts'

/**
 * Compute the sine of each real element.
 * @description Applies the sine across nested real numeric inputs.
 * @param input - Scalar, vector, or matrix angles in radians
 * @returns Sine values matching the input nesting shape
 */
export default function sin(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real sine.
 * @description Applies the sine across nested complex or real inputs.
 * @param input - Complex or real angles
 * @returns Sine values matching the input nesting shape
 */
export default function sin(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real sine.
 * @description Applies the sine across nested complex or real inputs.
 * @param input - Complex or real angles
 * @returns Sine values matching the input nesting shape
 */
export default function sin(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const inner = sinh({
        re: -entry.im,
        im: entry.re
      }) as Types.NumerixComplex
      return {
        re: inner.im === 0 ? 0 : inner.im,
        im: inner.re === 0 ? 0 : -inner.re
      }
    }
    return Math.sin(Number(entry))
  }) as Types.NumerixValue
}
