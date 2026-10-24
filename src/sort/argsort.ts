import * as Internal from '@app/internal/index.ts'

/**
 * Compute the sorting indices of values.
 * @description Reports positions that would sort the values.
 * @param values - Values whose sorting order is computed
 * @param descending - When true sorts from largest to smallest
 * @param lexical - When true compares values as text
 * @returns Sorting indices matching the input shape
 */
export default function argsort(
  values: number[] | number[][],
  descending = false,
  lexical = false
): number[] | number[][] {
  if (Array.isArray(values[0])) {
    const matrix = values as number[][]
    if (lexical) {
      const width = matrix[0]?.length ?? 0
      const indices = new Array<number>(width)
      for (let index = 0; index < width; index++) {
        indices[index] = index
      }
      return indices.sort((first, second) => {
        for (let row = matrix.length - 1; row >= 0; row--) {
          const difference = (matrix[row]?.[first] ?? 0) - (matrix[row]?.[second] ?? 0)
          if (difference !== 0) {
            return descending ? -difference : difference
          }
        }
        return first - second
      })
    }
    const height = matrix.length
    const result = new Array<number[]>(height)
    for (let row = 0; row < height; row++) {
      result[row] = argsort(matrix[row] ?? [], descending, false) as number[]
    }
    return result
  }
  const flattened = values as number[]
  const indices = Internal.indices(flattened)
  return descending ? indices.reverse() : indices
}
