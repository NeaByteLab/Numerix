import type * as Types from '@app/types.ts'

/**
 * Select values using a condition.
 * @description Reports positions or picks values where the condition holds.
 * @param condition - Conditions deciding which values are used
 * @param yes - Value used where the condition holds
 * @param no - Value used where the condition fails
 * @param mode - Reporting mode for the selected positions
 * @returns Selected values or matching positions
 * @template T - Type of the selected values
 */
export default function where<T = number>(
  condition: (boolean | number)[] | (boolean | number)[][],
  yes?: T[] | T[][] | T,
  no?: T[] | T[][] | T,
  mode: Types.NumerixWhere = 'index'
): T[] | T[][] | number[] | number[][] | number[][][] {
  if (Array.isArray(condition[0])) {
    const matrix = condition as (boolean | number)[][]
    const rows = matrix.length
    if (yes === undefined || no === undefined) {
      if (mode === 'index') {
        const lines: number[] = []
        const columns: number[] = []
        for (let row = 0; row < rows; row++) {
          const current = matrix[row] ?? []
          for (let column = 0; column < current.length; column++) {
            if (current[column]) {
              lines.push(row)
              columns.push(column)
            }
          }
        }
        return [lines, columns]
      }
      const coordinates: number[][] = []
      for (let row = 0; row < rows; row++) {
        const current = matrix[row] ?? []
        for (let column = 0; column < current.length; column++) {
          if (current[column]) {
            coordinates.push([row, column])
          }
        }
      }
      return mode === 'coord' ? coordinates : coordinates.flat()
    }
    const yesArray = Array.isArray(yes)
    const yesGrid = yesArray && Array.isArray((yes as unknown[])[0])
    const noArray = Array.isArray(no)
    const noGrid = noArray && Array.isArray((no as unknown[])[0])
    const result = new Array<T[]>(rows)
    for (let row = 0; row < rows; row++) {
      const current = matrix[row] ?? []
      const columns = current.length
      const output = new Array<T>(columns)
      for (let column = 0; column < columns; column++) {
        if (current[column]) {
          output[column] = (
            yesGrid ? (yes as T[][])[row]?.[column] : yesArray ? (yes as T[])[column] : yes
          ) as T
        } else {
          output[column] = (
            noGrid ? (no as T[][])[row]?.[column] : noArray ? (no as T[])[column] : no
          ) as T
        }
      }
      result[row] = output
    }
    return result
  }
  const flat = condition as (boolean | number)[]
  const length = flat.length
  if (yes === undefined || no === undefined) {
    const indices: number[] = []
    for (let index = 0; index < length; index++) {
      if (flat[index]) {
        indices.push(index)
      }
    }
    return mode === 'index' ? [indices] : indices
  }
  const yesArray = Array.isArray(yes)
  const noArray = Array.isArray(no)
  const result = new Array<T>(length)
  for (let index = 0; index < length; index++) {
    result[index] = (
      flat[index] ? (yesArray ? (yes as T[])[index] : yes) : (noArray ? (no as T[])[index] : no)
    ) as T
  }
  return result
}
