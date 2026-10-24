import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Extract values at indexed positions.
 * @description Reads entries from the given positions.
 * @param input - Array the values are taken from
 * @param indices - Positions or pattern selecting the entries
 * @param offset - Diagonal offset applied to the pattern
 * @returns Taken values matching the requested shape
 * @template T - Type of the array values
 */
export default function take<T = number>(
  input: T[] | T[][],
  indices: number | number[] | number[][] | 'diag' = 0,
  offset = 0
): T | T[] | T[][] {
  if (indices === 'diag') {
    const matrix = (Array.isArray(input[0]) ? input : [input]) as T[][]
    return Internal.diagonal<T>(matrix, offset)
  }
  if (Array.isArray(input[0])) {
    const matrix = input as T[][]
    if (Array.isArray(indices) && Array.isArray(indices[0])) {
      const table = indices as number[][]
      const rows = table.length
      const result = new Array<T[]>(rows)
      if (offset === 1) {
        for (let row = 0; row < rows; row++) {
          const list = table[row] ?? []
          const columns = list.length
          const source = matrix[row] ?? []
          const output = new Array<T>(columns)
          for (let column = 0; column < columns; column++) {
            const raw = list[column] ?? 0
            output[column] = source[((raw % columns) + columns) % columns] as T
          }
          result[row] = output
        }
        return result
      }
      for (let row = 0; row < rows; row++) {
        const list = table[row] ?? []
        const columns = list.length
        const output = new Array<T>(columns)
        for (let column = 0; column < columns; column++) {
          const raw = list[column] ?? 0
          const target = ((raw % rows) + rows) % rows
          output[column] = matrix[target]?.[column] as T
        }
        result[row] = output
      }
      return result
    }
  }
  const flat = Array.isArray(input[0]) ? Shape.flatten<T>(input) : (input as T[])
  const length = flat.length
  if (typeof indices === 'number') {
    return flat[((indices % length) + length) % length] as T
  }
  const list = indices as number[]
  const count = list.length
  const result = new Array<T>(count)
  for (let index = 0; index < count; index++) {
    const position = list[index] ?? 0
    result[index] = flat[((position % length) + length) % length] as T
  }
  return result
}
