import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Sort values into order.
 * @description Sorts numbers or complex values along an axis.
 * @param values - Values to sort
 * @param descending - When true sorts from largest to smallest
 * @param axis - Axis along which the values are sorted
 * @returns Sorted values matching the input shape
 */
export default function order(
  values: number[] | number[][] | Types.NumerixComplex[],
  descending = false,
  axis: number = -1
): number[] | number[][] | Types.NumerixComplex[] {
  if (values.length > 0 && typeof values[0] === 'object' && !Array.isArray(values[0])) {
    const complex = values as Types.NumerixComplex[]
    return complex.slice().sort((first, second) => {
      const difference = first.re !== second.re ? first.re - second.re : first.im - second.im
      return descending ? -difference : difference
    })
  }
  if (Array.isArray(values[0])) {
    const matrix = values as number[][]
    const rows = matrix.length
    if (axis === 1 || axis === -1) {
      const result = new Array<number[]>(rows)
      for (let row = 0; row < rows; row++) {
        const values = Internal.values(matrix[row] ?? [])
        result[row] = descending ? values.reverse() : values
      }
      return result
    }
    if (axis === 0 || axis === -2) {
      const columns = matrix[0]?.length ?? 0
      const result = new Array<number[]>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = new Array<number>(columns)
      }
      const buffer = new Array<number>(rows)
      for (let column = 0; column < columns; column++) {
        const sorted = Internal.values(
          Internal.column(matrix, rows, column, buffer, 0)
        )
        const values = descending ? sorted.reverse() : sorted
        for (let row = 0; row < rows; row++) {
          const target = result[row]
          if (target) {
            target[column] = values[row] ?? 0
          }
        }
      }
      return result
    }
  }
  const flat = values as number[]
  const sorted = Internal.values(flat)
  return descending ? sorted.reverse() : sorted
}
