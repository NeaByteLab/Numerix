import finite from '@app/internal/finite.ts'

/**
 * Remove repeated values from sorted data.
 * @description Collapses adjacent duplicates in an ascending array.
 * @param values - Numeric values to sort and deduplicate
 * @returns Distinct values in ascending order
 */
export default function distinct(values: number[]): number[] {
  const sorted = finite(values)
  const result = new Array<number>()
  let index = 0
  while (index < sorted.length) {
    const value = sorted[index] ?? 0
    result.push(value || 0)
    index++
    while (index < sorted.length && sorted[index] === value) {
      index++
    }
  }
  if (sorted.length < values.length) {
    result.push(NaN)
  }
  return result
}
