import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Subtract two polynomials.
 * @description Aligns coefficients and subtracts them entry by entry.
 * @param first - Coefficients of the minuend polynomial
 * @param right - Coefficients of the subtrahend polynomial
 * @returns Coefficients of the difference polynomial
 */
export default function sub(
  first: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  right: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex
): number[] | Types.NumerixComplex[] {
  return Internal.combine(first, right, -1)
}
