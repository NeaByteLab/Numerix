import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Add two polynomials.
 * @description Aligns coefficients and sums them entry by entry.
 * @param first - Coefficients of the first polynomial
 * @param right - Coefficients of the second polynomial
 * @returns Coefficients of the summed polynomial
 */
export default function add(
  first: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  right: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex
): number[] | Types.NumerixComplex[] {
  return Internal.combine(first, right, 1)
}
