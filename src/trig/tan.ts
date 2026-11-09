import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import tanh from '@app/trig/tanh.ts'

/**
 * Compute the tangent of each real element.
 * @description Applies the tangent across nested real numeric inputs.
 * @param input - Scalar, vector, or matrix angles in radians
 * @returns Tangent values matching the input nesting shape
 */
export default function tan(
  input: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real tangent.
 * @description Applies the tangent across nested complex or real inputs.
 * @param input - Complex or real angles
 * @returns Tangent values matching the input nesting shape
 */
export default function tan(
  input: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute the complex or real tangent.
 * @description Applies the tangent across nested complex or real inputs.
 * @param input - Complex or real angles
 * @returns Tangent values matching the input nesting shape
 */
export default function tan(
  input: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(input, (entry) => {
    if (Internal.shape(entry)) {
      const inner = tanh({
        re: -entry.im,
        im: entry.re
      }) as Types.NumerixComplex
      return {
        re: inner.im === 0 ? 0 : inner.im,
        im: inner.re === 0 ? 0 : -inner.re
      }
    }
    return Math.tan(Number(entry))
  }) as Types.NumerixValue
}
