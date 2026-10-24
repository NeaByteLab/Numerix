/**
 * Write values at indexed positions.
 * @description Assigns values into an array at the given positions.
 * @param input - Array receiving the written values
 * @param indices - Positions or mask selecting the targets
 * @param values - Values written into the array
 * @param axis - Axis along which the values are written
 * @returns Array containing the written values
 * @template T - Type of the array values
 */
export default function put<T = number>(
  input: T[] | T[][],
  indices: number[] | number[][] | boolean[] | 'diag',
  values: T | T[] | T[][],
  axis = 1
): T[] | T[][] {
  if (Array.isArray(input[0])) {
    const matrix = input as T[][]
    const rows = matrix.length
    const width = matrix[0]?.length ?? 0
    const result = new Array<T[]>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = (matrix[row] ?? []).slice()
    }
    if (indices === 'diag') {
      const source = Array.isArray(values) ? (values as T[]) : [values as T]
      const count = source.length
      const limit = rows < width ? rows : width
      for (let index = 0; index < limit; index++) {
        const value = source[index % count]
        if (value !== undefined) {
          result[index]![index] = value
        }
      }
      return result
    }
    if (Array.isArray(indices[0])) {
      const table = indices as number[][]
      const matrix = Array.isArray(values) && Array.isArray((values as unknown[])[0])
      const flat = !matrix ? (Array.isArray(values) ? (values as T[]) : [values as T]) : []
      const count = flat.length
      let cursor = 0
      const rows = table.length
      for (let row = 0; row < rows; row++) {
        const list = table[row] ?? []
        const columns = list.length
        for (let column = 0; column < columns; column++) {
          const raw = list[column] ?? 0
          const value = matrix ? (values as T[][])[row]?.[column] : flat[cursor++ % count]
          if (value !== undefined) {
            if (axis === 0) {
              const target = ((raw % rows) + rows) % rows
              result[target]![column] = value
            } else {
              const target = ((raw % width) + width) % width
              result[row]![target] = value
            }
          }
        }
      }
      return result
    }
    const source = Array.isArray(values) ? (values as T[]) : [values as T]
    const count = source.length
    const total = rows * width
    const list = indices as number[]
    for (let index = 0; index < list.length; index++) {
      const raw = list[index] ?? 0
      const target = ((raw % total) + total) % total
      const value = source[index % count]
      if (value !== undefined) {
        const row = Math.trunc(target / width)
        const column = target - row * width
        result[row]![column] = value
      }
    }
    return result
  }
  const source = Array.isArray(values) ? (values as T[]) : [values as T]
  const count = source.length
  const result = (input as T[]).slice()
  const length = result.length
  if (typeof indices[0] === 'boolean') {
    const mask = indices as boolean[]
    for (let index = 0; index < length; index++) {
      if (mask[index]) {
        const value = source[index % count]
        if (value !== undefined) {
          result[index] = value
        }
      }
    }
    return result
  }
  const list = indices as number[]
  for (let index = 0; index < list.length; index++) {
    const raw = list[index] ?? 0
    const position = ((raw % length) + length) % length
    const value = source[index % count]
    if (value !== undefined) {
      result[position] = value
    }
  }
  return result
}
