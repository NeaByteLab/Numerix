/**
 * Sort numeric values into ascending order.
 * @description Sorts with the native typed array sort.
 * @param values - Values to sort
 * @returns Sorted values with NaN entries moved to the end
 */
export default function values(values: number[]): number[] {
  const length = values.length
  if (length < 2) {
    return values.slice()
  }
  let missing = 0
  for (let index = 0; index < length; index++) {
    if (Number.isNaN(values[index] ?? 0)) {
      missing++
    }
  }
  if (missing === 0) {
    const typed = Float64Array.from(values)
    typed.sort()
    return toList(typed)
  }
  const finite: number[] = []
  const absent: number[] = []
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    if (Number.isNaN(value)) {
      absent.push(value)
    } else {
      finite.push(value)
    }
  }
  const typed = Float64Array.from(finite)
  typed.sort()
  return toList(typed).concat(absent)
}

/**
 * Convert typed array to list.
 * @description Copies the entries into a plain list.
 * @param typed - Typed array holding the values to copy
 * @returns List holding the same values in the same order
 */
function toList(typed: Float64Array): number[] {
  const length = typed.length
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    result[index] = typed[index] ?? 0
  }
  return result
}
