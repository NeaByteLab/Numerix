/**
 * Copy a matrix for mutation.
 * @description Clones each row of the matrix.
 * @param matrix - Matrix to copy
 * @returns Independent copy of the matrix
 */
export default function working(matrix: number[][]): number[][] {
  return matrix.map((slice) => (slice ?? []).slice())
}
