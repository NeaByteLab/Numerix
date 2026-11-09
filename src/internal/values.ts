import finite from '@app/internal/finite.ts'

/**
 * Sort numeric values into ascending order.
 * @description Sorts with the native typed array sort.
 * @param values - Values to sort
 * @param reverse - When true, reverses the sorted finite entries
 * @returns Sorted values with NaN entries moved to the end
 */
export default function values(values: number[], reverse = false): number[] {
  if (values.length < 2) {
    return values.slice()
  }
  const sorted = finite(values)
  const count = sorted.length
  return Array.from(
    { length: values.length },
    (_outer, index) => index < count ? (sorted[reverse ? count - 1 - index : index] ?? NaN) : NaN
  )
}
