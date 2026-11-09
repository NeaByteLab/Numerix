import type * as Types from '@app/types.ts'
import * as Poly from '@app/poly/index.ts'

/**
 * Build a Vandermonde matrix.
 * @description Places powers of each sample into a matrix.
 * @param samples - Sample points used as matrix rows
 * @param degree - Highest power included in each row
 * @param increasing - When true, orders powers from lowest to highest
 * @returns Vandermonde matrix of the sample points
 */
export default function vander(
  samples: number[] | Types.NumerixComplex[],
  degree: number | boolean = samples.length,
  increasing = false
): number[][] | Types.NumerixComplex[][] {
  const total = typeof degree === 'number' ? degree : samples.length
  if (total < 0 || !Number.isInteger(total)) {
    throw new RangeError('N must be a non-negative integer')
  }
  if (total === 0) {
    return Array.from({ length: samples.length }, () => [])
  }
  const matrix = Poly.vander(samples, total - 1, 'poly')
  if (!(typeof degree === 'boolean' ? degree : increasing)) {
    for (let index = 0; index < matrix.length; index++) {
      matrix[index]?.reverse()
    }
  }
  return matrix
}
