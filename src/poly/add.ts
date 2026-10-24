import * as Internal from '@app/internal/index.ts'

/**
 * Add two polynomials.
 * @description Aligns coefficients and sums them entry by entry.
 * @param left - Coefficients of the first polynomial
 * @param right - Coefficients of the second polynomial
 * @returns Coefficients of the summed polynomial
 */
export default function add(left: number[], right: number[] | number): number[] {
  return Internal.combine(left, right, 1)
}
