import type * as Types from '@app/types.ts'
import * as Reduce from '@app/reduce/index.ts'
import svd from '@app/linalg/svd.ts'

/**
 * Compute the numerical rank of matrices.
 * @description Counts significant singular values within a tolerance.
 * @param matrix - Matrix whose rank is computed
 * @param tolerance - Threshold below which values count as zero
 * @returns Number of significant dimensions in the matrix
 */
export default function rank(
  matrix:
    | number
    | Types.NumerixComplex
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  tolerance?: number
): number {
  if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
    return Reduce.any((Array.isArray(matrix) ? matrix : [matrix]) as number[]) ? 1 : 0
  }
  const singular = svd(matrix as (number | Types.NumerixComplex)[][], true) as number[]
  let count = 0
  for (let index = 0; index < singular.length; index++) {
    if (
      (singular[index] ?? 0) >
        (tolerance ??
          (singular[0] ?? 0) *
            Math.max(matrix.length, ((matrix[0] as unknown[]) ?? []).length) *
            Number.EPSILON)
    ) {
      count++
    }
  }
  return count
}
