/**
 * Count the entries in an array.
 * @description Counts valid values across rows or the whole array.
 * @param values - Values to count
 * @param axis - Axis along which the counts are taken
 * @returns Entry counts for the requested axis
 */
export default function count(values: unknown[], axis?: number): number | number[] {
  if (axis !== undefined && Array.isArray(values[0])) {
    const matrix = values as unknown[][]
    const rows = matrix.length
    if (axis === 1 || axis === -1) {
      const result = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        result[row] = countFlat(matrix[row] ?? [])
      }
      return result
    }
    if (axis === 0 || axis === -2) {
      const width = matrix[0]?.length ?? 0
      const result = new Array<number>(width)
      for (let column = 0; column < width; column++) {
        let total = 0
        for (let row = 0; row < rows; row++) {
          if (matrix[row]?.[column]) {
            total++
          }
        }
        result[column] = total
      }
      return result
    }
  }
  return countFlat(values)
}

/**
 * Count entries in a flat array.
 * @description Tallies the valid entries of a flat array.
 * @param values - Entries to count
 * @returns Number of counted entries
 */
function countFlat(values: unknown[]): number {
  let total = 0
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    if (Array.isArray(entry)) {
      total += countFlat(entry)
    } else if (entry) {
      total++
    }
  }
  return total
}
