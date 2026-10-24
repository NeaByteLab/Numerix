import svd from '@app/linalg/svd.ts'

/**
 * Compute a matrix condition number.
 * @description Divides the largest singular value by the smallest.
 * @param matrix - Matrix whose conditioning is measured
 * @returns Condition number of the input matrix
 */
export default function cond(matrix: number[][]): number {
  const singular = svd(matrix, true) as number[]
  const peak = singular[0] ?? 0
  const trough = singular[singular.length - 1] ?? 0
  return trough < 1e-15 ? Infinity : peak / trough
}
