/**
 * Shift the order of spectral bins.
 * @description Moves the zero frequency bin to the array edge.
 * @param values - Spectral values to reorder
 * @param inverse - When true reverses the shift direction
 * @returns Reordered spectral values
 * @template T - Type of the spectral values
 */
export default function shift<T>(values: T[], inverse: boolean = false): T[] {
  const count = values.length
  const pivot = inverse ? (count >> 1) : ((count + 1) >> 1)
  const matrixed = Array.isArray(values[0])
  const result = new Array<T>(count)
  let cursor = 0
  for (let origin = pivot; origin < count; origin++) {
    const entry = values[origin] as T
    result[cursor++] = matrixed
      ? (shift(entry as unknown as unknown[], inverse) as unknown as T)
      : entry
  }
  for (let origin = 0; origin < pivot; origin++) {
    const entry = values[origin] as T
    result[cursor++] = matrixed
      ? (shift(entry as unknown as unknown[], inverse) as unknown as T)
      : entry
  }
  return result
}
