import * as Internal from '@app/internal/index.ts'

/**
 * Rotate a matrix by quarter-turns.
 * @description Turns the matrix in the plane specified by axes.
 * @param matrix - Matrix to rotate
 * @param turns - Number of quarter-turns to apply
 * @param plane - Two-element tuple of axes defining the rotation plane
 * @returns Rotated matrix
 */
export default function rotate(
  matrix: unknown[][],
  turns = 1,
  plane: [number, number] = [0, 1]
): unknown[][] {
  if (!Array.isArray(matrix) || (matrix.length > 0 && !Array.isArray(matrix[0]))) {
    throw new RangeError('Input must be >= 2-d.')
  }
  const first = plane[0] < 0 ? plane[0] + 2 : plane[0]
  const second = plane[1] < 0 ? plane[1] + 2 : plane[1]
  if (first < 0 || first > 1 || second < 0 || second > 1 || first === second) {
    throw new RangeError('axes must be two distinct axes in [0, 1]')
  }
  const quarter = (((first === 1 && second === 0 ? -turns : turns) % 4) + 4) % 4
  const complex = Internal.classify(matrix, true, true) === true
  if (quarter === 0) {
    return complex
      ? (Internal.nested(matrix) as unknown[][])
      : matrix.map((slice) => (slice ?? []).slice())
  }
  const height = matrix.length
  const width = matrix[0]?.length ?? 0
  if (quarter === 2) {
    const result = Array.from({ length: height }, (_outer, outer) => {
      const slice = matrix[height - 1 - outer] ?? []
      return Array.from({ length: width }, (_inner, inner) => slice[width - 1 - inner])
    })
    return complex ? (Internal.nested(result) as unknown[][]) : result
  }
  const result = quarter === 1
    ? Array.from(
      { length: width },
      (_outer, outer) =>
        Array.from({ length: height }, (_inner, inner) => matrix[inner]?.[width - 1 - outer])
    )
    : Array.from(
      { length: width },
      (_outer, outer) =>
        Array.from({ length: height }, (_inner, inner) => matrix[height - 1 - inner]?.[outer])
    )
  return complex ? (Internal.nested(result) as unknown[][]) : result
}
