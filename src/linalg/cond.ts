import type * as Types from '@app/types.ts'
import inv from '@app/linalg/inv.ts'
import norm from '@app/linalg/norm.ts'
import svd from '@app/linalg/svd.ts'

/**
 * Compute a matrix condition number.
 * @description Uses singular value ratios or matrix norms.
 * @param matrix - Matrix whose conditioning is measured
 * @param order - Optional norm order used for the condition number
 * @returns Condition number of the input matrix
 */
export default function cond(
  matrix: (number | Types.NumerixComplex)[][],
  order?: number | 'fro' | 'nuc' | 'inf' | '-inf'
): number {
  const width = matrix[0]?.length ?? 0
  if (matrix.length === 0 || width === 0) {
    throw new RangeError('cond is not defined on empty arrays')
  }
  if (order === undefined || order === 2 || order === -2) {
    const singular = svd(matrix, true) as number[]
    const largest = singular[0] ?? 0
    const smallest = singular[singular.length - 1] ?? 0
    return order === -2
      ? (largest === 0 ? Infinity : smallest / largest)
      : (smallest === 0 ? Infinity : largest / smallest)
  }
  if (matrix.length !== width) {
    throw new RangeError('Last 2 dimensions of the array must be square')
  }
  const primary = norm(matrix as number[][], order)
  try {
    return primary * norm(inv(matrix as number[][]), order)
  } catch {
    return Number.isNaN(primary) ? NaN : Infinity
  }
}
