/**
 * Remove repeated values from sorted data.
 * @description Collapses adjacent duplicates in an ascending array.
 * @param sorted - Ascending values produced by a typed array sort
 * @returns Distinct values in ascending order
 */
export default function distinct(sorted: Float64Array): number[] {
  const length = sorted.length
  const result = new Array<number>()
  let index = 0
  while (index < length) {
    const value = sorted[index] ?? 0
    if (Number.isNaN(value)) {
      result.push(value)
      break
    }
    result.push(value === 0 ? 0 : value)
    index++
    while (index < length && sorted[index] === value) {
      index++
    }
  }
  return result
}
