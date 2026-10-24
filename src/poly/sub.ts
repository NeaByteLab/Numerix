import * as Internal from '@app/internal/index.ts'

/**
 * Subtract two polynomials.
 * @description Aligns coefficients and subtracts them entry by entry.
 * @param left - Coefficients of the minuend polynomial
 * @param right - Coefficients of the subtrahend polynomial
 * @returns Coefficients of the difference polynomial
 */
export default function sub(left: number[], right: number[] | number): number[] {
  return Internal.combine(left, right, -1)
}
