import type * as Types from '@app/types.ts'

/**
 * Build a Vandermonde matrix.
 * @description Places powers of each sample into a matrix.
 * @param samples - Sample points used as matrix rows
 * @param degree - Highest power included in each row
 * @param basis - Polynomial basis of the generated rows
 * @returns Vandermonde matrix of the sample points
 */
export default function vander(
  samples: number[],
  degree: number,
  basis: Types.NumerixBasis = 'poly'
): number[][] {
  const length = samples.length
  const matrix = new Array<number[]>(length)
  for (let index = 0; index < length; index++) {
    const point = samples[index] ?? 0
    const row = new Array<number>(degree + 1)
    row[0] = 1
    if (degree > 0) {
      if (basis === 'poly') {
        let factor = 1
        for (let power = 1; power <= degree; power++) {
          factor *= point
          row[power] = factor
        }
      } else {
        row[1] = basis === 'herm' ? 2 * point : basis === 'lag' ? 1 - point : point
        for (let index = 1; index < degree; index++) {
          const current = row[index] ?? 0
          const previous = row[index - 1] ?? 0
          if (basis === 'cheb') {
            row[index + 1] = 2 * point * current - previous
          } else if (basis === 'leg') {
            row[index + 1] = ((2 * index + 1) * point * current - index * previous) / (index + 1)
          } else if (basis === 'herm') {
            row[index + 1] = 2 * point * current - 2 * index * previous
          } else if (basis === 'herme') {
            row[index + 1] = point * current - index * previous
          } else {
            row[index + 1] = ((2 * index + 1 - point) * current - index * previous) / (index + 1)
          }
        }
      }
    }
    matrix[index] = row
  }
  return matrix
}
