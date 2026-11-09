import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import atanh from '@app/trig/atanh.ts'

/**
 * Compute the arctangent of each real element.
 * @description Computes the two-argument arctangent when both operands are supplied.
 * @param first - Numerator of the tangent ratio
 * @param second - Denominator of the tangent ratio when given
 * @returns Arctangent values matching the input nesting shape
 */
export default function atan(
  first: number | number[] | number[][],
  second?: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute the complex or real arctangent.
 * @description Applies the principal arctangent across nested inputs.
 * @param first - Complex or real tangent values
 * @param second - Optional real denominator for the two-argument arctangent
 * @returns Arctangent values matching the input nesting shape
 */
export default function atan(
  first: Types.NumerixValue,
  second?: number | number[] | number[][]
): Types.NumerixValue
/**
 * Compute the complex or real arctangent.
 * @description Applies the principal arctangent across nested inputs.
 * @param first - Complex or real tangent values
 * @param second - Optional real denominator for the two-argument arctangent
 * @returns Arctangent values matching the input nesting shape
 */
export default function atan(
  first: Types.NumerixValue,
  second?: number | number[] | number[][]
): Types.NumerixValue {
  if (second !== undefined) {
    if (typeof second === 'number' && Internal.classify(first, true, true) === false) {
      return typeof first === 'number'
        ? Math.atan2(first, second)
        : Internal.mapper(first as number[] | number[][], (leading) => Math.atan2(leading, second))
    }
    if (typeof first === 'number' && Internal.classify(second, true, true) === false) {
      return Internal.mapper(second, (trailing) => Math.atan2(first, trailing))
    }
    return Internal.broadcast(first as number, second, Math.atan2)
  }
  return Internal.traverse(first, (entry) => {
    if (Internal.shape(entry)) {
      const inner = atanh({
        re: -entry.im,
        im: entry.re
      }) as Types.NumerixComplex
      return {
        re: inner.im === 0 ? 0 : inner.im,
        im: inner.re === 0 ? 0 : -inner.re
      }
    }
    return Math.atan(Number(entry))
  }) as Types.NumerixValue
}
