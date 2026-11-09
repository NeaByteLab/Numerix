import * as Internal from '@app/internal/index.ts'

/**
 * Count the entries in an array.
 * @description Counts valid values across rows or the whole array.
 * @param values - Values to count
 * @param level - Axis along which the counts are taken
 * @returns Entry counts for the requested axis
 */
export default function count(values: unknown[], level?: number | null): number | number[] {
  const layered = Array.isArray(values[0])
  if (level !== undefined && level !== null) {
    const normalized = level < 0 ? (layered ? 2 : 1) + level : level
    if (normalized < 0 || normalized > (layered ? 1 : 0)) {
      throw new RangeError(`axis is out of bounds for array of dimension ${layered ? 2 : 1}`)
    }
    if (layered) {
      const matrix = values as unknown[][]
      if (normalized === 1) {
        return matrix.map((slice) => count(slice ?? []) as number)
      }
      const width = matrix[0]?.length ?? 0
      const totals = new Array<number>(width).fill(0)
      for (let outer = 0; outer < matrix.length; outer++) {
        const slice = matrix[outer] ?? []
        for (let column = 0; column < width; column++) {
          if (Internal.settle('any', slice[column])) {
            totals[column] = (totals[column] ?? 0) + 1
          }
        }
      }
      return totals
    }
  }
  let total = 0
  for (let index = 0; index < values.length; index++) {
    const entry = values[index]
    total += Array.isArray(entry) ? (count(entry) as number) : Internal.settle('any', entry) ? 1 : 0
  }
  return total
}
