import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the trace of a matrix.
 * @description Sums diagonal entries along the requested offset and axes.
 * @param matrix - Matrix whose diagonal entries are summed
 * @param offset - Diagonal offset used for the summation
 * @param first - First axis of the two-dimensional plane
 * @param second - Second axis of the two-dimensional plane
 * @returns Sum of the selected diagonal entries
 */
export default function trace(
  matrix: number[][] | Types.NumerixComplex[][] | (number | Types.NumerixComplex)[][],
  offset = 0,
  first = 0,
  second = 1
): number | Types.NumerixComplex {
  const primary = first < 0 ? first + 2 : first
  const secondary = second < 0 ? second + 2 : second
  if (primary < 0 || primary > 1 || secondary < 0 || secondary > 1 || primary === secondary) {
    throw new RangeError('axis1 and axis2 must be two distinct axes in [0, 1]')
  }
  const shift = primary === 1 ? -offset : offset
  const range = Internal.bounds(matrix.length, matrix[0]?.length ?? 0, shift)
  if (Internal.classify(matrix, true, true) !== true) {
    let reals = 0
    for (let index = range.start; index < range.end; index++) {
      reals += Number((matrix[index] as number[] | undefined)?.[index + shift] ?? 0)
    }
    return reals
  }
  let reals = 0
  let imags = 0
  for (let index = range.start; index < range.end; index++) {
    const entry = matrix[index]?.[index + shift]
    reals += Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    imags += Internal.shape(entry) ? entry.im : 0
  }
  return { re: reals, im: imags }
}
